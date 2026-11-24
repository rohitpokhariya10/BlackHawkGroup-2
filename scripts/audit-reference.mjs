import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, recordVideo: {dir:'docs/reference-screenshots/video',size:{width:1440,height:1000}} });
const page = await context.newPage();
await page.goto('https://www.watchrealtyco.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(6000);
if(process.argv.includes('--interactions')){
 const inspect = async label => fs.writeFile(`docs/audit/${label}.json`,JSON.stringify(await page.evaluate(()=>({scrollY,header:{class:document.querySelector('header').className,height:document.querySelector('header').getBoundingClientRect().height},animated:[...document.querySelectorAll('[data-aos]')].slice(0,25).map(e=>({class:e.className,opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform,aos:e.getAttribute('data-aos')}))})),null,2));
 await page.locator('.core-values').scrollIntoViewIfNeeded();await page.waitForTimeout(1800);
 await page.locator('.core-values__item').first().hover();await page.waitForTimeout(500);
 await page.screenshot({path:'docs/reference-screenshots/desktop-values-hover.png'});
 await inspect('motion-entered');
 await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(1800);await inspect('motion-returned-top');
 await page.locator('header').getByRole('link',{name:/about/i}).hover();await page.waitForTimeout(500);
 await page.screenshot({path:'docs/reference-screenshots/desktop-dropdown.png'});
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(1000);
 console.log('MENU DOM',await page.evaluate(()=>document.elementFromPoint(355,35)?.parentElement.outerHTML.slice(0,2000)));
 await page.mouse.click(355,35);await page.waitForTimeout(800);
 await page.screenshot({path:'docs/reference-screenshots/mobile-menu.png'});
 console.log('MENU OPEN',await page.locator('body').innerText().then(t=>t.slice(0,900)));
 await page.keyboard.press('Escape');await page.waitForTimeout(500);await page.screenshot({path:'docs/reference-screenshots/mobile-menu-escape.png'});
 await context.close();await browser.close();process.exit(0);
}
await page.screenshot({path:'docs/reference-screenshots/desktop-hero.png'});
const measure = () => {
  const style = e => { const s=getComputedStyle(e),r=e.getBoundingClientRect(); return {tag:e.tagName,id:e.id,class:e.className,text:e.innerText?.slice(0,130),x:r.x,y:r.y+scrollY,w:r.width,h:r.height,font:s.fontFamily,size:s.fontSize,weight:s.fontWeight,line:s.lineHeight,spacing:s.letterSpacing,color:s.color,bg:s.backgroundColor,padding:s.padding,margin:s.margin,display:s.display,columns:s.gridTemplateColumns,position:s.position,transform:s.transform,transition:s.transition,animation:s.animation}; };
  return {viewport:{w:innerWidth,h:innerHeight},height:document.documentElement.scrollHeight,headings:[...document.querySelectorAll('h1,h2,h3')].map(style),sections:[...document.querySelectorAll('section,header,footer')].map(style),buttons:[...document.querySelectorAll('a,button')].filter(e=>e.innerText?.trim()).slice(0,65).map(style),fonts:[...document.fonts].map(f=>({family:f.family,weight:f.weight,status:f.status})),animations:document.getAnimations().map(a=>({timing:a.effect.getTiming(),keyframes:a.effect.getKeyframes()})).slice(0,10)};
};
await fs.writeFile('docs/audit/reference-desktop.json',JSON.stringify(await page.evaluate(measure),null,2));
console.log('Desktop measured');
const sections=await page.locator('section').evaluateAll(es=>es.map(e=>({id:e.id,label:e.getAttribute('aria-label'),height:e.getBoundingClientRect().height})));
console.log(JSON.stringify(sections));
for(let i=0;i<sections.length;i++){
  if(sections[i].height === 0) continue;
  const section=page.locator('section').nth(i);
  await section.scrollIntoViewIfNeeded();
  await page.mouse.wheel(0,120);
  await page.waitForTimeout(1100);
  const slug=(sections[i].id||sections[i].label||`section-${i}`).replace(/[^a-z0-9-]/gi,'-');
  await section.screenshot({path:`docs/reference-screenshots/desktop-${String(i).padStart(2,'0')}-${slug}.png`}).catch(e=>console.log('Screenshot skipped',slug,e.message.slice(0,100)));
}
await page.locator('footer').last().scrollIntoViewIfNeeded().catch(()=>{});
await page.waitForTimeout(1000);
await page.screenshot({path:'docs/reference-screenshots/desktop-footer.png'});
await page.screenshot({path:'docs/reference-screenshots/desktop-full.png',fullPage:true});
await fs.writeFile('docs/audit/reference-details.json',JSON.stringify(await page.evaluate(()=>{
 const selectors=['.welcome','.welcome p','.welcome__subheading','.header','.header a','.core-values__item','.core-values__item p','.track-record','.meet-broker p','.exclusive-listings a','.communities a','.brokerage','.buyers-sellers','.footer','[data-aos]'];
 return Object.fromEntries(selectors.map(sel=>[sel,[...document.querySelectorAll(sel)].slice(0,20).map(e=>{let s=getComputedStyle(e),r=e.getBoundingClientRect();return {tag:e.tagName,class:e.className,text:e.innerText?.slice(0,80),w:r.width,h:r.height,css:Object.fromEntries(['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','backgroundAttachment','padding','margin','border','opacity','transform','transition','transitionTimingFunction','position','zIndex','overflow','clipPath'].map(k=>[k,s[k]])),aos:e.getAttribute('data-aos'),delay:e.getAttribute('data-aos-delay'),duration:e.getAttribute('data-aos-duration')};})]));
}),null,2));
const welcome=page.locator('.welcome');
if(await welcome.count()){await welcome.scrollIntoViewIfNeeded();await page.waitForTimeout(1800);await welcome.screenshot({path:'docs/reference-screenshots/desktop-about.png',style:'header.header {visibility:hidden}'});}
await page.mouse.wheel(0,-1200);
await page.waitForTimeout(800);
await page.screenshot({path:'docs/reference-screenshots/desktop-reverse-scroll.png'});
await page.evaluate(()=>scrollTo(0,0));
await page.waitForTimeout(1200);
const about=page.getByRole('navigation').getByRole('link',{name:'About',exact:true});
if(await about.count()) {await about.first().hover();await page.waitForTimeout(500);await page.screenshot({path:'docs/reference-screenshots/desktop-dropdown.png'});}
await page.reload({waitUntil:'domcontentloaded'});
await page.screenshot({path:'docs/reference-screenshots/desktop-load.png'});
await page.waitForTimeout(2500);
await page.screenshot({path:'docs/reference-screenshots/desktop-loaded.png'});
for (const [name,width,height] of [['tablet',768,1024],['mobile',390,844]]) {
 await page.setViewportSize({width,height});
 await page.evaluate(()=>scrollTo(0,0));
 await page.waitForTimeout(1500);
 await page.screenshot({path:`docs/reference-screenshots/${name}-hero.png`});
 await fs.writeFile(`docs/audit/reference-${name}.json`,JSON.stringify(await page.evaluate(measure),null,2));
 for (let y=0;y<await page.evaluate(()=>document.documentElement.scrollHeight);y+=height*.8) {await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(150);}
 await page.screenshot({path:`docs/reference-screenshots/${name}-full.png`,fullPage:true});
 await page.evaluate(()=>scrollTo(0,0));
 await page.waitForTimeout(1000);
 await fs.writeFile(`docs/audit/reference-${name}-navigation.txt`,await page.locator('body').innerText());
 const candidates=await page.locator('button,a').evaluateAll(es=>es.filter(e=>/menu/i.test(e.textContent+' '+e.getAttribute('aria-label'))).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent,aria:e.getAttribute('aria-label')})));
 console.log(name,'menu',JSON.stringify(candidates));
 const menu=page.locator('button,a').filter({hasText:/^\s*Menu\s*$/i});
 if(await menu.count() && await menu.first().isVisible()){await menu.first().click();await page.waitForTimeout(800);await page.screenshot({path:`docs/reference-screenshots/${name}-menu.png`});await page.keyboard.press('Escape');}
}
await context.close();
await browser.close();
