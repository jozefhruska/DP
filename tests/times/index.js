const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const EXTENSION_PATH = path.join(__dirname, "../../source/dist");
const WEBSITE_URL =
  "https://walrus-app-of2js.ondigitalocean.app/";
const OUTPUT_FILE = path.join(__dirname, "output-off.csv");
const DELAY = 300;

const N = 5

function delay(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

(async () => {
  for (let i = 0; i < N; i++) {
    console.log(`Iteration ${i + 1} of ${N}`);

    const browser = await puppeteer.launch({
      headless: false,
      args: [
        // `--disable-extensions-except=${EXTENSION_PATH}`,
        // `--load-extension=${EXTENSION_PATH}`,
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    try {
      const page = await browser.newPage();

      //await delay(DELAY);

      await page.evaluateOnNewDocument(() => {
        window.performance.mark('navigationStart');
      });

      await page.goto(WEBSITE_URL, {
        timeout: 1000,
      });

      const responseTime = await page.evaluate(() => {
        window.performance.mark('navigationEnd');
        window.performance.measure('responseTime', 'navigationStart', 'navigationEnd');
        const responseTimeEntry = window.performance.getEntriesByName('responseTime')[0];
        return responseTimeEntry.duration;
      });

      console.log(`${responseTime} ms`);

      fs.appendFileSync(OUTPUT_FILE, `${responseTime}\n`, "utf8");
    } catch (e) {
      console.log(e);
      console.log("Unsuccessful");
    } finally {
      await browser.close();
    }
  }
})();
