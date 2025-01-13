const axios = require('axios');     //require values
const cheerio = require('cheerio');

const url = 'https://www.playnow.com/lottery/lotto-max-winning-numbers/';

async function scrapeLottoNumbers() {   
    let retries = 3;

    while (retries > 0) {
        try {
            const { data } = await axios.get(url, {     //axios part
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }   //User-Agent is a need to connect this web page
            });

            const $ = cheerio.load(data);   //cheerio read part    
            const numbers = [];
            $('.product-winning-numbers__number_lmax').each((index, element) => {
                numbers.push($(element).text().trim());
            });
            console.log('Lotto Max Winning Numbers:', numbers);
            return;
        } catch (error) {   //err
            console.error('Error scraping the webpage:', error.message);
            retries = retries - 1;
            console.log(`Retries left: ${retries}`);
            if (retries === 0) throw error;
        }
    }
}

scrapeLottoNumbers();