import { chromium } from "playwright";

interface IResponse {
  title?: string | null;
  price?: number | null;
}

export const findPrice = async (urlLink: string): Promise<IResponse> => {
  const browser = await chromium.launch();

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0",
  });

  const page = await context.newPage();

  try {
    
    await page.goto(urlLink, { waitUntil: "networkidle" });

    const priceData = await page.evaluate(() => {
      const priceElement = document.querySelector(
        "div.base-price-text-module--price-part---xQlz>span+span>span"
      )?.textContent;

      const title = document.querySelector(".clp-lead__title")?.textContent;

      if (!priceElement) {
        return {
          title: title || "Title not found",
          price: null,
        };
      }

      // Обработка числового формата
      const price = parseFloat(
        priceElement.replace(/[^0-9,.]/g, "").replace(",", ".")
      );

      return {
        title: title || "Title not found",
        price: isNaN(price) ? null : price,
      };
    });

    return priceData;
  } catch (error) {
    console.error("Error parsing price:", error);
    return {
      title: null,
      price: null,
    };
  } finally {
    // Закрытие браузера
    await browser.close();
  }
};
