const fs = require('fs');

const path = 'data/exchanges.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.forEach(ex => {
    // Only append if we haven't already
    if (!ex.description.includes("market timings into their local timezone")) {
        const seoAddition = ` Investors and traders monitoring the ${ex.name} ${ex.code ? '(' + ex.code + ')' : ''} can utilize our global stock market hours tracker to convert ${ex.timezone} market timings into their local timezone. Whether you are tracking pre-market movers, after hours trading, or the opening and closing bell, understanding the exact stock market timings is crucial for navigating international stock exchanges, equity indices (like the S&P 500, Dow Jones, Nikkei 225, FTSE 100, DAX, or CAC 40), and forex trading hours. The ${ex.name} remains a vital part of the world stock markets, contributing significantly to global financial markets and regional market capitalization in ${ex.country}. Stay updated on stock market holidays, verify if the stock market is open, and refine your global trading strategy.`;
        ex.description += seoAddition;
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Descriptions expanded successfully.');
