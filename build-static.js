const fs = require('fs');
const path = require('path');

// Configuration
const exchangesPath = path.join(__dirname, 'data', 'exchanges.json');
const templatePath = path.join(__dirname, 'exchanges.html');
const outputDir = path.join(__dirname, 'markets');
const sitemapPath = path.join(__dirname, 'sitemap.xml');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Helper: Read JSON
const exchanges = JSON.parse(fs.readFileSync(exchangesPath, 'utf8'));
const template = fs.readFileSync(templatePath, 'utf8');

// Helper: Escape HTML
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

let generatedCount = 0;

exchanges.forEach(ex => {
    if (!ex.code) return;

    // Create filename: markets/HKEX.html
    const filename = `${ex.code.trim().toUpperCase()}.html`;
    const filePath = path.join(outputDir, filename);

    // 1. Prepare SEO & Content
    const title = `${ex.name} (${ex.code}) - Trading Hours & Market Info`;
    const description = `Track ${ex.name} (${ex.code}) trading hours, holidays, and market status. Convert ${ex.name} opening times to your local timezone.`;
    const canonical = `https://www.easystockmarkets.com/markets/${filename}`;

    // 2. Modify Template
    let html = template;

    // -- SEO Meta Tags --
    // Replace Title
    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

    // Replace Description
    html = html.replace(/content="Detailed information on global.*?"/, `content="${description}"`);

    // Replace Canonical
    html = html.replace(/href="https:\/\/www.easystockmarkets.com\/exchanges.html"/, `href="${canonical}"`);

    // -- Pre-fill Data (Server Side Rendering Simulation) --
    // We need to inject the data so it displays without JS, 
    // BUT the existing JS logic (exchanges.js) might conflict if we don't handle it.
    // actually, the robust way is to inject a script that initializes the state
    // or simple HTML injection.

    // Let's inject a script block that pre-loads this exchange
    const preloader = `
  <script>
    window.PRELOADED_EXCHANGE = ${JSON.stringify(ex)};
  </script>
  `;
    html = html.replace('</head>', `${preloader}\n</head>`);

    // -- Fix Relative Paths --
    // Since file is in markets/ folder, assets are ../assets
    html = html.replace(/href="assets\//g, 'href="../assets/');
    html = html.replace(/src="assets\//g, 'src="../assets/');
    html = html.replace(/src="data\//g, 'src="../data/');
    html = html.replace(/src="exchanges.js"/g, 'src="../exchanges.js"');

    // -- Fix Navigation Links --
    html = html.replace(/href="index.html"/g, 'href="../index.html"');
    html = html.replace(/href="all-exchanges.html"/g, 'href="../all-exchanges.html"');
    html = html.replace(/href="exchanges.html"/g, 'href="../exchanges.html"');
    html = html.replace(/href="time-conversion.html"/g, 'href="../time-conversion.html"');
    html = html.replace(/href="about.html"/g, 'href="../about.html"');
    html = html.replace(/href="privacy-policy.html"/g, 'href="../privacy-policy.html"');
    html = html.replace(/href="terms-disclaimer.html"/g, 'href="../terms-disclaimer.html"');

    fs.writeFileSync(filePath, html, 'utf8');
    generatedCount++;
});

console.log(`Generated ${generatedCount} static exchange pages in /markets/`);

// 3. Update Sitemap
const today = new Date().toISOString().split('T')[0];
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Static URLs (Root)
const staticUrls = [
    { loc: 'https://www.easystockmarkets.com/', priority: '1.0' },
    { loc: 'https://www.easystockmarkets.com/all-exchanges.html', priority: '0.9' },
    { loc: 'https://www.easystockmarkets.com/exchanges.html', priority: '0.8' },
    { loc: 'https://www.easystockmarkets.com/time-conversion.html', priority: '0.8' },
    { loc: 'https://www.easystockmarkets.com/about.html', priority: '0.5' },
    { loc: 'https://www.easystockmarkets.com/privacy-policy.html', priority: '0.3' },
    { loc: 'https://www.easystockmarkets.com/terms-disclaimer.html', priority: '0.3' },
];

staticUrls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`; // Simplified
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
});

// Dynamic (now Static) Exchange URLs
exchanges.forEach(ex => {
    if (!ex.code) return;
    xml += '  <url>\n';
    xml += `    <loc>https://www.easystockmarkets.com/markets/${ex.code.trim().toUpperCase()}.html</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += '  </url>\n';
});

xml += '</urlset>';
fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log('Sitemap updated with new static URLs.');
