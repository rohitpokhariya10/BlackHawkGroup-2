import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const url = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3001';
const pass = process.argv[2] || 'final';
const directory = `docs/implementation-screenshots/${pass}`;
await fs.mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const page = await context.newPage();
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
const measurements = {};
for (const [name, width, height] of [['desktop',1440,1000],['tablet',768,1024],['mobile',390,844]]) {
  await page.setViewportSize({ width, height });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1900);
  await page.screenshot({ path: `${directory}/${name}-hero.png` });
  for (const id of ['about','values','options','owners','properties','communities','office','team','connections','buyers','sellers','contact']) {
    const el = page.locator(`#${id}`);
    const top = await el.evaluate(e => e.getBoundingClientRect().top + scrollY);
    const bottom = await el.evaluate(e => e.getBoundingClientRect().bottom + scrollY);
    for(let y=top; y<bottom; y+=height*.65) {await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(120);}
    await page.waitForTimeout(1950);
    await page.evaluate(top => scrollTo({ top: Math.max(0,top - 115), behavior: 'instant' }), top);
    await page.waitForTimeout(1950);
    await el.screenshot({ path: `${directory}/${name}-${id}.png`, style: '.site-header { visibility: hidden; }' });
  }
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800);
  await page.locator('footer').screenshot({ path: `${directory}/${name}-footer.png`, style: '.site-header { visibility: hidden; }' });
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${directory}/${name}-full.png`, fullPage: true });
  measurements[name] = await page.evaluate(() => ({
    viewport: { width: innerWidth, height: innerHeight }, height: document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth > innerWidth,
    sections: [...document.querySelectorAll('main section,footer')].map(e => {const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{id:e.id,class:e.className,width:r.width,height:r.height,padding:s.padding};}),
    headings: [...document.querySelectorAll('h1,h2')].map(e=>{const s=getComputedStyle(e);return{text:e.innerText,font:s.fontFamily,size:s.fontSize,weight:s.fontWeight,line:s.lineHeight};}),
    images: [...document.images].map(e=>({src:e.currentSrc,loaded:e.complete && e.naturalWidth>0})),
  }));
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(600);
  if(name==='mobile') {await page.getByRole('button',{name:'Open navigation menu'}).click();await page.waitForTimeout(600);await page.screenshot({path:`${directory}/mobile-menu.png`});await page.keyboard.press('Escape');}
  await page.getByRole('button',{name:'Get in Touch',exact:true}).click();await page.waitForTimeout(600);await page.screenshot({path:`${directory}/${name}-inquiry.png`});await page.keyboard.press('Escape');
  console.log(`Captured ${name}: ${width}x${height}, height ${measurements[name].height}, overflow=${measurements[name].overflow}`);
}
// Complete the requested nine-width collection after the three detailed reviews.
for (const width of [1920,1280,1024,430,375,320]) {
  const height = width >= 768 ? 1000 : 844;
  await page.setViewportSize({width,height});
  await page.goto(url,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(1900);
  await page.screenshot({path:`${directory}/${width}-hero.png`});
  const total = await page.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<total;y+=height*.7) {
    await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);
    await page.waitForTimeout(90);
  }
  await page.waitForFunction(()=>[...document.images].every(img=>img.complete&&img.naturalWidth>0));
  await page.waitForTimeout(1950);
  const state=await page.evaluate(()=>({viewport:{width:innerWidth,height:innerHeight},height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,unrevealed:[...document.querySelectorAll('[data-reveal]')].filter(e=>Number(getComputedStyle(e).opacity)<.99).map(e=>e.textContent?.slice(0,80))}));
  if(state.overflow||state.unrevealed.length)throw new Error(`Incomplete capture at ${width}: ${JSON.stringify(state)}`);
  measurements[width]=state;
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(500);
  await page.screenshot({path:`${directory}/${width}-full.png`,fullPage:true});
  console.log(`Captured ${width}x${height}, height ${state.height}, overflow=${state.overflow}`);
}
await fs.writeFile(`docs/audit/implementation-${pass}.json`, JSON.stringify({url,errors,measurements}, null, 2));
console.log('Browser errors:',JSON.stringify(errors));
await context.close();await browser.close();
