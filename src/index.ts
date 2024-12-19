import puppeteer, { Browser, Page } from "puppeteer";
import argv from "./helpers/args";
import { AMAZON_URL, SELECTORS } from "./helpers/constants";
import { RawText, SelectorsType } from "./models/types";

const { username: USERNAME, password: PASSWORD, count: COUNT } = argv;

const scrapeAmazonOrders = async (): Promise<void> => {

    try {
        const browser: Browser = await puppeteer.launch({ headless: false, defaultViewport: null });
        const page: Page = await browser.newPage();
        page.goto(AMAZON_URL, {
            waitUntil: 'networkidle2'
        });

        await page.waitForNavigation();
        // Log in
        console.log("Logging in...");

        await page.type(SELECTORS.IDs.Email, USERNAME, { delay: 100 });
        await page.click(SELECTORS.IDs.ContinueBtn);
        console.log("Clicking continuee....");

        await page.waitForSelector(SELECTORS.IDs.Password);
        await page.type(SELECTORS.IDs.Password, PASSWORD, { delay: 100 });
        await page.click(SELECTORS.IDs.Submit);

        console.log("Clicking password continuee....");
        await page.waitForNavigation();
        console.log("order loaded....");

        await page.waitForSelector(SELECTORS.Classes.OrderBox);

        const orders = await page.evaluate((_SELECTORS: SelectorsType, _COUNT: number) => {

            const processText = (rawText: RawText): string => {
                if (!rawText) return "N/A";
                return rawText.trim();
            }

            const orderElements = document.querySelectorAll(_SELECTORS.Classes.OrderBox);
            const recentOrders: { title: string; date: string; price: string }[] = [];

            orderElements.forEach((order, index) => {
                if (index < _COUNT) {
                    const title = order.querySelector(_SELECTORS.Classes.ProductTitle)?.textContent ?? "";

                    const infoElements = order.querySelectorAll(_SELECTORS.Classes.ProductInfo) ?? [];

                    const date = (infoElements[0]?.textContent) ?? "";
                    const price = (infoElements[1]?.textContent) ?? "";

                    recentOrders.push({
                        title: processText(title),
                        date: processText(date),
                        price: processText(price),
                    });
                }
            });
            return Promise.resolve(recentOrders)
        }, SELECTORS, COUNT ?? 10)


        console.log("----", orders)
        await browser.close();
    } catch (e) {
        console.log("Error >>>", e);
    }

}


scrapeAmazonOrders();


