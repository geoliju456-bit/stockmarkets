const fs = require('fs');
const exchanges = JSON.parse(fs.readFileSync('data/exchanges.json', 'utf8'));

const codes = {};
exchanges.forEach((ex, index) => {
    if (!ex.code) return;
    const code = ex.code.trim(); // Case sensitive check first, though usually upper
    if (!codes[code]) codes[code] = [];
    codes[code].push({ index, name: ex.name });
});

Object.keys(codes).forEach(code => {
    if (codes[code].length > 1) {
        console.log(`Duplicate Code: ${code}`);
        codes[code].forEach(item => {
            console.log(`  Line (approx): ${item.index * 15} - ${item.name}`); // Approx line
            console.log(`  Index: ${item.index}`);
        });
    }
});
