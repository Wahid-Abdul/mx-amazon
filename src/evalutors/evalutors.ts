import { Page } from "puppeteer";
import { AMAZON_URL, SELECTORS } from "./../helpers/constants";
import { Product, RawText, SelectorsType } from "./../models/types";
import argv from "./../helpers/args";

const { username: USERNAME, password: PASSWORD, count: COUNT, search_string: SEARCH_STRING } = argv;

const searchBasedResults = async (page: Page) => {

    await page.type(SELECTORS.IDs.SearchInput, SEARCH_STRING, { delay: 0 })
    await page.click(SELECTORS.IDs.SearchBtn);

    await page.waitForNavigation({
        waitUntil: "networkidle2"
    });


    await page.waitForSelector(SELECTORS.Classes.SearchedOrderBox);

    const orders = await page.evaluate((_SELECTORS: SelectorsType, _COUNT: number, _AMAZON_URL: string) => {

        const processText = (rawText: RawText): string => {
            if (!rawText) return "N/A";
            return rawText.trim();
        }

        const checkIfInvalid = <T>(content: T) => {
            if (content === null || content === undefined) return true;
            return false;
        }

        const orderElements = document.querySelectorAll(_SELECTORS.Classes.SearchedOrderBox);
        const recentOrders: Product[] = [];

        let allowAll = false;
        if (checkIfInvalid(_COUNT)) allowAll = true;

        orderElements.forEach((order, index) => {
            if (allowAll || index < _COUNT) {
                const title = order.querySelectorAll(_SELECTORS.Tags.Anchor)?.[2]?.textContent;
                const link = order.querySelectorAll(_SELECTORS.Tags.Anchor)?.[2]?.getAttribute("href");

                console.log({ order, title })

                recentOrders.push({
                    title: processText(title),
                    link: processText(`${_AMAZON_URL}${link}`),
                    price: 'N/A', // Price not available when searched
                });
            }
        });


        return Promise.resolve(recentOrders)
    }, SELECTORS, COUNT, AMAZON_URL);

    return orders;

}

const defaultResults = async (page: Page) => {
    await page.waitForSelector(SELECTORS.Classes.OrderBox);

    const orders = await page.evaluate((_SELECTORS: SelectorsType, _COUNT: number, _AMAZON_URL: string) => {

        const processText = (rawText: RawText): string => {
            if (!rawText) return "N/A";
            return rawText.trim();
        }

        const checkIfInvalid = <T>(content: T) => {
            if (content === null || content === undefined) return true;
            return false;
        }

        const orderElements = document.querySelectorAll(_SELECTORS.Classes.OrderBox);
        const recentOrders: Product[] = [];

        let allowAll = false;
        if (checkIfInvalid(_COUNT)) allowAll = true;

        orderElements.forEach((order, index) => {
            if (allowAll || index < _COUNT) {
                const title = order.querySelector(_SELECTORS.Classes.ProductTitle)?.textContent ?? "";

                const infoElements = order.querySelectorAll(_SELECTORS.Classes.ProductInfo) ?? [];
                const date = (infoElements[0]?.textContent) ?? "";
                const price = (infoElements[1]?.textContent) ?? "";

                const link = order.querySelectorAll(_SELECTORS.Tags.Anchor)?.[3]?.getAttribute("href");

                recentOrders.push({
                    title: processText(title),
                    link: processText(`${_AMAZON_URL}${link}`),
                    date: processText(date),
                    price: processText(price),
                });
            }
        });
        return Promise.resolve(recentOrders)
    }, SELECTORS, COUNT, AMAZON_URL)
    return orders;
}

export {
    searchBasedResults,
    defaultResults,
}