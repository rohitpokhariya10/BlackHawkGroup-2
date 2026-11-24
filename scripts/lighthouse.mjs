import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import fs from 'node:fs/promises';

const url = process.env.LIGHTHOUSE_URL || 'http://127.0.0.1:3002';
const directory = 'docs/audit/lighthouse';
await fs.mkdir(directory, { recursive: true });
const chrome = await launch({ chromeFlags: ['--headless', '--disable-gpu', '--no-first-run'] });
const results = {};
try {
  for (const formFactor of ['desktop', 'mobile']) {
    const report = await lighthouse(url, {
      port: chrome.port,
      output: ['html', 'json'],
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      formFactor,
      screenEmulation: formFactor === 'desktop' ? { mobile: false, width: 1440, height: 1000, deviceScaleFactor: 1, disabled: false } : { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false },
      throttling: formFactor === 'desktop' ? { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 } : undefined,
    });
    await fs.writeFile(`${directory}/${formFactor}.html`, report.report[0]);
    await fs.writeFile(`${directory}/${formFactor}.json`, report.report[1]);
    const lhr = report.lhr;
    results[formFactor] = { fetchTime: lhr.fetchTime, url: lhr.finalDisplayedUrl, categories: Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])), metrics: Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(k=>[k,lhr.audits[k].displayValue])), failedAudits: Object.values(lhr.audits).filter(a=>a.score!==null && a.score<.9).map(a=>({id:a.id,title:a.title,score:a.score,displayValue:a.displayValue})) };
    console.log(formFactor,JSON.stringify(results[formFactor]));
  }
} finally { await chrome.kill(); }
await fs.writeFile(`${directory}/summary.json`, JSON.stringify(results,null,2));
