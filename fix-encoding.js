const fs = require('fs');

const path = 'd:\\website\\data\\exchanges.json';
const raw = fs.readFileSync(path, 'utf8');

let data = JSON.parse(raw);

data.forEach(ex => {
    if (ex.description) {
        ex.description = ex.description
            .replace(/Ã¢â‚¬â„¢/g, "'")
            .replace(/â€™/g, "'")
            .replace(/â€œ/g, '"')
            .replace(/â€/g, '"')
            .replace(/â€/g, '"');
    }
    if (ex.name) {
        ex.name = ex.name
            .replace(/Ã¢â‚¬â„¢/g, "'")
            .replace(/â€™/g, "'")
            .replace(/â€œ/g, '"')
            .replace(/â€/g, '"')
            .replace(/â€/g, '"');
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log("Encoding artifacts fixed via JS.");
