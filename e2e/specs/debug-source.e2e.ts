/**
 * Debug: dump page source to inspect view hierarchy.
 * Run: npm run e2e:debug
 * Output: e2e/logs/page-source.xml
 */
import { browser } from '@wdio/globals';
import fs from 'fs';
import path from 'path';

describe('Debug: Page Source', () => {
  it('dumps page source', async () => {
    await browser.activateApp('com.snehi_raj.expotodo');
    await browser.pause(5000);
    const source = await browser.getPageSource();
    const outPath = path.join(process.cwd(), 'e2e', 'logs', 'page-source.xml');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, source, 'utf8');
    console.log('\nPage source:', outPath);
  });
});
