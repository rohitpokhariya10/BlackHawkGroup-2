import sharp from 'sharp';
import fs from 'node:fs/promises';

const directory = 'docs/comparisons';
await fs.mkdir(directory, {recursive:true});
const pairs = [
  ...['desktop','tablet','mobile'].flatMap(view=>['hero','full'].map(section=>({name:`${view}-${section}`,reference:`${view}-${section}.png`,implementation:`${view}-${section}.png`}))),
  ...[['about','about'],['00-Our-Core-Values','values'],['01-A-Stellar-Track-Record','options'],['02-Meet-Your-Broker','owners'],['03-Exclusive-Listings','properties'],['05-Communities','communities'],['06-Our-Office','office'],['08-Brokerage','connections'],['09-Buyers---Sellers','buyers'],['footer','footer']].map(([reference,implementation])=>({name:`desktop-${implementation}`,reference:`desktop-${reference}.png`,implementation:`desktop-${implementation}.png`})),
  {name:'mobile-menu',reference:'mobile-menu.png',implementation:'mobile-menu.png'},
];
for(const pair of pairs.filter(p=>p.name.endsWith('hero')||p.name.endsWith('full'))){
  const width=pair.name.startsWith('mobile')?390:720;
  const inputs=await Promise.all([`docs/reference-screenshots/${pair.reference}`,`docs/implementation-screenshots/final/${pair.implementation}`].map(async path=>{const buffer=await sharp(path).resize({width}).png().toBuffer();return {buffer,metadata:await sharp(buffer).metadata()};}));
  const height=Math.max(...inputs.map(p=>p.metadata.height))+44;
  const label=Buffer.from(`<svg width="${width*2+20}" height="44"><rect width="100%" height="100%" fill="#171717"/><g font-family="Arial,sans-serif" font-size="15" fill="white"><text x="16" y="28">Reference — Watch Realty Co.</text><text x="${width+36}" y="28">Blackhawk — ${pair.name}</text></g></svg>`);
  await sharp({create:{width:width*2+20,height,channels:3,background:'#e8e8e5'}}).composite([{input:label,top:0,left:0},...inputs.map((p,i)=>({input:p.buffer,top:44,left:i*(width+20)}))]).png().toFile(`${directory}/${pair.name}.png`);
}
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Blackhawk visual comparisons</title><style>body{margin:0;padding:32px;background:#eee;color:#222;font:16px/1.5 system-ui}h1{font-size:28px}section{margin:48px 0}h2{font-size:20px} .pair{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start}figure{margin:0;background:white}figcaption{padding:12px;background:#222;color:white}img{width:100%;height:auto;display:block}nav a{display:inline-block;margin:4px 16px 4px 0}small{display:block;margin:8px 0}</style><h1>Blackhawk / Watch Realty Co.</h1><p>Same source viewport: desktop 1440 × 1000, tablet 768 × 1024, mobile 390 × 844. Reference on the left, final implementation on the right. Full pages differ in length because approved Blackhawk content replaces listings, metrics and biographies. Images, branding and previews intentionally differ.</p><p>Local QA document; this is not an application route.</p><nav>${pairs.map(p=>`<a href="#${p.name}">${p.name}</a>`).join('')}</nav>${pairs.map(p=>`<section id="${p.name}"><h2>${p.name}</h2><div class="pair"><figure><figcaption>Reference</figcaption><a href="../reference-screenshots/${p.reference}"><img loading="lazy" src="../reference-screenshots/${p.reference}" alt="Reference ${p.name}"></a></figure><figure><figcaption>Blackhawk</figcaption><a href="../implementation-screenshots/final/${p.implementation}"><img loading="lazy" src="../implementation-screenshots/final/${p.implementation}" alt="Blackhawk ${p.name}"></a></figure></div></section>`).join('')}</html>`;
await fs.writeFile(`${directory}/index.html`,html);
// Contact sheets support visual review without shrinking a 15,000px page to unreadable scale.
for(const view of ['desktop','tablet','mobile']){
  const ids=['about','values','options','owners','properties','communities','office','team','connections','buyers','sellers','contact','footer'];
  for(let group=0;group<3;group++){
    const groupIds=ids.slice(group*5,group*5+5);const tiles=[];
    for(const id of groupIds){const buffer=await sharp(`docs/implementation-screenshots/final/${view}-${id}.png`).resize({width:600,height:900,fit:'inside'}).png().toBuffer();tiles.push({id,buffer,meta:await sharp(buffer).metadata()});}
    let top=0;const layers=[];
    for(let i=0;i<tiles.length;i+=2){const row=tiles.slice(i,i+2);for(let j=0;j<row.length;j++){const t=row[j];layers.push({input:t.buffer,top:top+30,left:j*620});}top+=Math.max(...row.map(t=>t.meta.height))+50;}
    await sharp({create:{width:1220,height:top,channels:3,background:'#d7d7d2'}}).composite(layers).png().toFile(`${directory}/${view}-review-${group+1}.png`);
  }
}
console.log(`Saved ${pairs.length} comparison pairs and nine section review sheets.`);
