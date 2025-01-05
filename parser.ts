import { chromium } from "playwright";

interface IResponse {
  title?: string | null;
  price?: string | null;
}

export const findPrice = async (urlLink: string): Promise<IResponse> => {
  const browser = await chromium.launch();

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0",
  });

  const page = await context.newPage();

  // Перейдите на страницу и подождите
  await page.goto(urlLink, { waitUntil: "networkidle" });

  await page.waitForTimeout(3000);
  const price = await page.evaluate(() => {
    const priceElement = document.querySelector(
      "div.base-price-text-module--price-part---xQlz>span+span>span"
    )?.textContent;

    const title = document.querySelector(".clp-lead__title")?.textContent;

    return {
      title,
      price: priceElement,
    };
  });

  await browser.close();
  
  return price;
};
