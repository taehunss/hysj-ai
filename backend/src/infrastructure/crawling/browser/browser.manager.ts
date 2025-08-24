import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import puppeteer, { Browser, Page } from 'puppeteer';
import { TSLogger } from '../../logger/logger';

@Injectable()
export class BrowserManager {
  private browsers: Set<Browser>;
  constructor(private readonly logger: TSLogger) {
    this.browsers = new Set();
  }
  async getPage(url: string): Promise<{
    page: Page;
    browser: Browser;
  }> {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });
    this.browsers.add(browser);
    browser.on('disconnected', () => {
      this.logger.log('Browser disconnected');
      this.browsers.delete(browser);
    });

    const page = await browser.newPage();
    // browser.manager.ts - getPage() 내, const page = await browser.newPage(); 바로 다음
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    );
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      'Upgrade-Insecure-Requests': '1',
    });
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });
    return {
      page,
      browser,
    };
  }

  async closeAll() {
    this.logger.log(`Closing ${this.browsers.size} browsers`);
    for (const browser of this.browsers) {
      await browser.close();
    }
  }

  @Cron('0 0 0 * * *')
  async closeAllDaily() {
    this.logger.log('Closing all browsers');
    await this.closeAll();
  }
}
