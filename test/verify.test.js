const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('subject', () => {
  it('should capture the result of 1 plus 4 in a variable named sum', async () => {
    const sum = await page.evaluate(() => sum);
    expect(sum).toBe(1 + 4);
  });
  
  it('should capture the result of sum minus 2 in a variable named difference', async () => {
    const sum = await page.evaluate(() => sum);
    const difference = await page.evaluate(() => difference);
    expect(difference).toBe(sum - 2);
  });
  
  it('should capture the result of difference multiplied by 5 in a variable named product', async () => {
    const product = await page.evaluate(() => product);
    const difference = await page.evaluate(() => difference);
    expect(product).toBe(difference * 5);
  });
  
  it('should capture the result of product divided by 2 in a variable named quotient', async () => {
    const product = await page.evaluate(() => product);
    const quotient = await page.evaluate(() => quotient);
    expect(quotient).toBe(product / 2);
  });
  
  it('should capture the remainder of product remainder of 2 in a variable named remainder', async () => {
    const product = await page.evaluate(() => product);
    const remainder = await page.evaluate(() => remainder);
    expect(remainder).toBe(product % 2);
  });
  
  it('should assign the innerHTML of the HTML element with the id result to the quotient', async () => {
    const quotient = await page.evaluate(() => quotient);
    const innerHtml = await page.$eval("#result", (result) => {
      return result.innerHTML;
    });
      
    expect(innerHtml).toBe(`${quotient}`);
  });
});
