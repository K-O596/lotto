const puppeteer = require('puppeteer'); //require values

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.playnow.com/lottery/lotto-max-winning-numbers/', {
        waitUntil: 'networkidle2',
    });

    const numbers = await page.evaluate(() => {
        const elements = document.querySelectorAll('.product-winning-numbers__number_lmax');
        return Array.from(elements).map(el => el.textContent.trim());
    });

    console.log('Lotto Max Winning Numbers:', numbers); //check numbers

    await browser.close();
})();