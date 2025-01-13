const puppeteer = require('puppeteer');     //require values
const mysql = require('mysql');

const con = mysql.createConnection({    //password and something
    host: 'localhost',
    user: 'root',
    password: 'groupa',
    database: 'express_db',
});

con.connect((err) => {      //check connecting to mysql
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL');
});

(async () => {      //scraping part
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.playnow.com/lottery/lotto-max-winning-numbers/', {
        waitUntil: 'networkidle2',
    });

    const numbers = await page.evaluate(() => {
        const elements = document.querySelectorAll('.product-winning-numbers__number_lmax');
        return Array.from(elements).map(el => el.textContent.trim());
    });

    console.log('Scraped Numbers:', numbers);   //check numbers

    const sql = 'INSERT INTO numbers (number) VALUES ?';    //insert to mysql part
    const values = numbers.map(num => [num]);

    con.query(sql, [values], (err, result) => {     //check successful
        if (err) {
            console.error('Error inserting data into MySQL:', err.message);
        } else {
            console.log('Data inserted successfully:', result.affectedRows);
        }
    });

    await browser.close();
})();