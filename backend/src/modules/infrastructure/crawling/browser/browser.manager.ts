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
  async getPage(
    url: string,
    headless: boolean = true,
  ): Promise<{
    page: Page;
    browser: Browser;
  }> {
    const browser = await puppeteer.launch({
      headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    this.browsers.add(browser);
    browser.on('disconnected', () => {
      this.logger.log('Browser disconnected');
      this.browsers.delete(browser);
    });

    const page = await browser.newPage();
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
