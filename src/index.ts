import puppeteer, { Browser, Page } from "puppeteer";
import { AMAZON_ORDERS_URL, AMAZON_URL, SELECTORS } from "./helpers/constants";
import { defaultResults, searchBasedResults } from "./evalutors/evalutors";
import argv from "./helpers/args";

const { username: USERNAME, password: PASSWORD, count: COUNT, search_string: SEARCH_STRING } = argv;

const scrapeAmazonOrders = async (): Promise<void> => {

    try {
        const browser: Browser = await puppeteer.launch({ headless: false, defaultViewport: null });
        const page: Page = await browser.newPage();
        page.goto(AMAZON_URL + AMAZON_ORDERS_URL, {
            waitUntil: 'networkidle2'
        });
        await page.waitForNavigation();

        // Log in
        console.log("Logging in...");
        await page.type(SELECTORS.IDs.Email, USERNAME, { delay: 0 });
        await page.click(SELECTORS.IDs.ContinueBtn);
        console.log("Clicking continuee....");

        await page.waitForSelector(SELECTORS.IDs.Password);
        await page.type(SELECTORS.IDs.Password, PASSWORD, { delay: 0 });
        await page.click(SELECTORS.IDs.Submit);
        console.log("Clicking password continuee....");

        await page.waitForNavigation();
        console.log("orders loaded....");

        let orders = [];
        if (SEARCH_STRING) {
            orders = await searchBasedResults(page);
        }
        else {
            orders = await defaultResults(page);
        }

        console.log("----result----", orders, orders.length)

        await page.waitForNetworkIdle();
        await browser.close();
    } catch (e) {
        console.log("Error >>>", e);
    }

}


scrapeAmazonOrders();


