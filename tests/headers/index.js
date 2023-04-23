const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const EXTENSION_PATH = path.join(__dirname, "../../source/dist");
const WEBSITE_URL =
    "https://walrus-app-of2js.ondigitalocean.app/";
const OUTPUT_FILE = path.join(__dirname, "output.csv");
const DELAY = 500;

const N = 1;

function delay(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

(async () => {
  for (let i = 0; i < N; i++) {
    console.log(`Iteration ${i + 1} of ${N}`);

    const browser = await puppeteer.launch({
      headless: false,
      args: [
        //`--disable-extensions-except=${EXTENSION_PATH}`,
        //`--load-extension=${EXTENSION_PATH}`,
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    try {

      const page = await browser.newPage();

      // await delay(DELAY);

      await page.goto(WEBSITE_URL, {
        timeout: 2000,
      });

      const allData = await page.evaluate(() => {
        const rows = document.querySelectorAll("table tr");
        const rowData = [];

        for (const row of rows) {
          const cells = row.querySelectorAll("td");
          const cellData = [];
          for (const cell of cells) {
            cellData.push(cell.innerText.trim());
          }
          rowData.push(cellData);
        }
        return rowData;
      });

      const selectedData = [
        allData[5],
        allData[8],
        allData[14],
        allData[15],
        allData[16],
        allData[17],
        allData[18],
      ];

      const joinedData = selectedData.join("|");
      //fs.appendFileSync(OUTPUT_FILE, `${joinedData}\n`, "utf8");
      console.log(joinedData);
    } catch (e) {
      console.log(e);
      console.log("Unsuccessful");
    } finally {
      //await browser.close();
    }
  }
})();
