const fs = require('fs');
const path = require('path');

const exchangesPath = path.join(__dirname, 'data', 'exchanges.json');
const sitemapPath = path.join(__dirname, 'sitemap.xml');

const exchanges = JSON.parse(fs.readFileSync(exchangesPath, 'utf8'));

// Base static URLs
const staticUrls = [
    { loc: 'https://www.easystockmarkets.com/', priority: '1.0', freq: 'daily' },
    { loc: 'https://www.easystockmarkets.com/all-exchanges.html', priority: '0.9', freq: 'weekly' },
    { loc: 'https://www.easystockmarkets.com/exchanges.html', priority: '0.8', freq: 'monthly' },
    { loc: 'https://www.easystockmarkets.com/time-conversion.html', priority: '0.8', freq: 'monthly' },
    { loc: 'https://www.easystockmarkets.com/about.html', priority: '0.5', freq: 'yearly' },
    { loc: 'https://www.easystockmarkets.com/privacy-policy.html', priority: '0.3', freq: 'yearly' },
    { loc: 'https://www.easystockmarkets.com/terms-disclaimer.html', priority: '0.3', freq: 'yearly' },
];

const today = new Date().toISOString().split('T')[0];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Add static URLs
staticUrls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${url.freq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
});

// Add dynamic exchange URLs
exchanges.forEach(ex => {
    // Use the code parameter as that is what the JS logic uses
    const exCode = encodeURIComponent(ex.code);
    xml += '  <url>\n';
    xml += `    <loc>https://www.easystockmarkets.com/exchanges.html?exchange=${exCode}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`; // Slightly lower than main pages but high enough
    xml += '  </url>\n';
});

xml += '</urlset>';

fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log('Sitemap updated successfully with ' + exchanges.length + ' exchange pages.');
