import { Vitest, Awaitable } from "vitest";
import { remote, Browser } from "webdriverio";

/** interface matching that described in https://vitest.dev/config/#browser-provider */
interface BrowserProvider {
  name: string;
  getSupportedBrowsers(): readonly string[];
  initialize(ctx: Vitest, options: { browser: string }): Awaitable<void>;
  openPage(url: string): Awaitable<void>;
  close(): Awaitable<void>;
}

export default class ChromeProvider implements BrowserProvider {
  public name = "webdriverio";

  private ctx!: Vitest;
  private browserName!: string;
  private browser: Browser | null = null;

  getSupportedBrowsers() {
    return ["chrome"];
  }

  async initialize(ctx: Vitest, { browser }: { browser: string }) {
    if (!this.getSupportedBrowsers().includes(browser)) {
      throw new Error(`Unsupported browser "${browser}"`);
    }
    this.ctx = ctx;
    this.browserName = browser;
  }

  async openBrowser() {
    if (!this.browser) {
      this.browser = await remote({
        logLevel: "error",
        capabilities: {
          browserName: this.browserName,
          "goog:chromeOptions": {
            args: [
              // allow self signed certificates
              "--allow-insecure-localhost",
              // deactivate cors
              "--disable-web-security",
            ],
            headless: this.ctx.config.browser.headless,
          },
        },
      });
    }
    return this.browser;
  }

  async openPage(url: string) {
    const browserInstance = await this.openBrowser();
    await browserInstance.url(url);
  }

  async close() {
    await this.browser?.deleteSession?.();
    process.exit(0);
  }

  catchError(_cb: (error: Error) => Awaitable<void>) {
    // we dont care about provider errors
    return () => {};
  }
}
