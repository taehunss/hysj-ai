import { Injectable, NotFoundException } from '@nestjs/common';
import { Browser, Page } from 'puppeteer';

import { TSLogger } from '../logger/logger';
import { BrowserManager } from './browser/browser.manager';

@Injectable()
export class CrawlingService {
  constructor(
    private readonly logger: TSLogger,
    private readonly browserManager: BrowserManager,
  ) {}

  public async getPage(url: string): Promise<{
    page: Page;
    browser: Browser;
  }> {
    return await this.browserManager.getPage(url);
  }

  public async waitFor(page: Page, selector: string, timeout = 3000) {
    try {
      await page.waitForSelector(selector, { timeout });
    } catch (error) {
      this.logger.error(
        `Failed to wait for selector within ${timeout}ms: ${selector}. ${error}`,
      );
      throw new NotFoundException(
        `Failed to wait for selector within ${timeout}ms: ${selector}.`,
      );
    }
  }

  public async click(page: Page, selector: string, timeout = 1500) {
    try {
      await this.waitFor(page, selector, timeout);
      await page.click(selector);
    } catch (error) {
      this.logger.error(`Failed to click selector: ${selector}. ${error}`);
      throw new Error(`Failed to click selector: ${selector}. ${error}`);
    }
  }

  public async type(
    page: Page,
    selector: string,
    text: string,
    timeout = 3000,
  ) {
    try {
      await this.waitFor(page, selector, timeout);
      await page.type(selector, text);
    } catch (error) {
      this.logger.error(`Failed to type into selector: ${selector}. ${error}`);
      throw new Error(`Failed to type into selector: ${selector}. ${error}`);
    }
  }

  public async exists(page: Page, selector: string, timeout = 2000) {
    try {
      await page.waitForSelector(selector, { timeout });
      return true;
    } catch (_) {
      return false;
    }
  }

  public async getText(page: Page, selector: string, timeout = 3000) {
    await this.waitFor(page, selector, timeout);
    try {
      const text = await page.$eval(selector, (el) =>
        (el.textContent || '').toString().trim(),
      );
      return text;
    } catch (error) {
      this.logger.error(`Failed to get text: ${selector}. ${error}`);
      throw new Error(`Failed to get text: ${selector}. ${error}`);
    }
  }

  public async getHtml(page: Page, selector: string, timeout = 3000) {
    await this.waitFor(page, selector, timeout);
    try {
      const html = await page.$eval(
        selector,
        (el) => (el as HTMLElement).innerHTML,
      );
      return html;
    } catch (error) {
      this.logger.error(`Failed to get HTML: ${selector}. ${error}`);
      throw new Error(`Failed to get HTML: ${selector}. ${error}`);
    }
  }

  public async getAttr(
    page: Page,
    selector: string,
    attribute: string,
    timeout = 3000,
  ) {
    await this.waitFor(page, selector, timeout);
    try {
      const value = await page.$eval(
        selector,
        (el, attr) => (el as HTMLElement).getAttribute(attr as string),
        attribute,
      );
      return value;
    } catch (error) {
      this.logger.error(
        `Failed to get attribute '${attribute}' from ${selector}. ${error}`,
      );
      throw new Error(
        `Failed to get attribute '${attribute}' from ${selector}. ${error}`,
      );
    }
  }

  public async transformImageToBase64(
    page: Page,
    selector: string,
    canvasWidth: number,
    canvasHeight: number,
    timeout = 3000,
  ): Promise<string> {
    const startTime = Date.now();
    await this.waitFor(page, selector, timeout);
    try {
      const base64 = await page.$eval(
        selector,
        (imgEl, { width, height }) => {
          const image = imgEl as HTMLImageElement;
          const canvas = document.createElement('canvas');
          canvas.width = width as number;
          canvas.height = height as number;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Canvas 2D context is not available');
          }
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          return canvas
            .toDataURL('image/png')
            .replace(/^data:image\/png;base64,/, '');
        },
        { width: canvasWidth, height: canvasHeight },
      );
      this.logger.log(
        `캡챠 이미지 변환 소요 시간: ${Date.now() - startTime}ms`,
      );
      return base64;
    } catch (error) {
      this.logger.error(
        `Failed to transform image to base64 from ${selector}. ${error}`,
      );
      throw new Error(
        `Failed to transform image to base64 from ${selector}. ${error}`,
      );
    }
  }
}
