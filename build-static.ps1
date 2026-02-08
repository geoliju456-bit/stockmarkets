# Configuration
$dataDir = "data"
$exchangesPath = Join-Path $dataDir "exchanges.json"
$templatePath = "exchanges.html"
$outputDir = "markets"
$sitemapPath = "sitemap.xml"

# Ensure output directory exists
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
}

# Read Data
if (-not (Test-Path $exchangesPath)) {
    Write-Host "Error: exchanges.json not found"
    exit
}
$jsonContent = Get-Content -Raw -Path $exchangesPath -Encoding UTF8
$exchanges = $jsonContent | ConvertFrom-Json

if (-not (Test-Path $templatePath)) {
    Write-Host "Error: exchanges.html template not found"
    exit
}
$template = Get-Content -Raw -Path $templatePath -Encoding UTF8

$generatedCount = 0

foreach ($ex in $exchanges) {
    if (-not $ex.code) { continue }

    $slug = $ex.name.ToLower().Trim() -replace '[^a-z0-9]+', '_' -replace '^_+|_+$', ''
    $filename = "$slug.html"
    $filePath = Join-Path $outputDir $filename

    # 1. SEO Data
    $title = "$($ex.name) ($($ex.code)) - Trading Hours & Market Info"
    $description = "Track $($ex.name) ($($ex.code)) trading hours, holidays, and market status. Convert $($ex.name) opening times to your local timezone."
    $canonical = "https://www.easystockmarkets.com/markets/$filename"

    # 2. Modify Template
    $html = $template

    # Replace Title (Simplistic Regex)
    $html = $html -replace '<title>.*?</title>', "<title>$title</title>"
    
    # Replace Description
    $html = $html -replace 'content="Detailed information on global.*?"', "content=""$description"""

    # Dynamic Keywords
    $keywords = "$($ex.name) trading hours, $($ex.code) market holidays, $($ex.name) opening time, convert $($ex.timezone) to local time, $($ex.country) stock market, $($ex.index) index, is $($ex.name) open, $($ex.name) timezone, $($ex.region) stock exchanges"
    $html = $html -replace 'content="stock exchange details, trading hours.*?"', "content=""$keywords"""
    
    # Replace Canonical
    $html = $html -replace 'href="https://www.easystockmarkets.com/exchanges.html"', "href=""$canonical"""

    # Inject Preloaded Data
    $jsonEx = $ex | ConvertTo-Json -Depth 5 -Compress
    
    # Escape for embedding in HTML script
    # Powershell's ConvertTo-Json is usually safe for basic objects but let's be careful
    $preloader = "<script>window.PRELOADED_EXCHANGE = $jsonEx;</script>"
    $favicon = '<link rel="icon" href="../assets/favicon.png" type="image/png">'
    $html = $html.Replace('</head>', "$favicon`n$preloader`n</head>")

    # Fix Relative Paths (simple string replace)
    $html = $html.Replace('href="assets/', 'href="../assets/')
    $html = $html.Replace('src="assets/', 'src="../assets/')
    $html = $html.Replace('src="data/', 'src="../data/')
    $html = $html.Replace('src="exchanges.js"', 'src="../exchanges.js"')
    $html = $html.Replace('href="index.html"', 'href="../index.html"')
    $html = $html.Replace('href="all-exchanges.html"', 'href="../all-exchanges.html"')
    $html = $html.Replace('href="exchanges.html"', 'href="../exchanges.html"')
    $html = $html.Replace('href="time-conversion.html"', 'href="../time-conversion.html"')
    $html = $html.Replace('href="about.html"', 'href="../about.html"')
    $html = $html.Replace('href="privacy-policy.html"', 'href="../privacy-policy.html"')
    $html = $html.Replace('href="terms-disclaimer.html"', 'href="../terms-disclaimer.html"')

    $html | Out-File -FilePath $filePath -Encoding utf8
    $generatedCount++
}

Write-Host "Generated $generatedCount static pages in /markets/"

# 3. Update Sitemap
$today = Get-Date -Format "yyyy-MM-dd"
$xml = '<?xml version="1.0" encoding="UTF-8"?>' + "`n"
$xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "`n"

$staticUrls = @("https://www.easystockmarkets.com/", 
                "https://www.easystockmarkets.com/all-exchanges.html",
                "https://www.easystockmarkets.com/exchanges.html",
                "https://www.easystockmarkets.com/time-conversion.html",
                "https://www.easystockmarkets.com/about.html",
                "https://www.easystockmarkets.com/privacy-policy.html",
                "https://www.easystockmarkets.com/terms-disclaimer.html")

foreach ($url in $staticUrls) {
    $xml += "  <url>`n"
    $xml += "    <loc>$url</loc>`n"
    $xml += "    <lastmod>$today</lastmod>`n"
    $xml += "    <changefreq>weekly</changefreq>`n"
    $xml += "    <priority>0.8</priority>`n"
    $xml += "  </url>`n"
}

# Add dynamic pages
foreach ($ex in $exchanges) {
        $slug = $ex.name.ToLower().Trim() -replace '[^a-z0-9]+', '_' -replace '^_+|_+$', ''
        $xml += "  <url>`n"
        $xml += "    <loc>https://www.easystockmarkets.com/markets/$slug.html</loc>`n"
        $xml += "    <lastmod>$today</lastmod>`n"
        $xml += "    <changefreq>weekly</changefreq>`n"
        $xml += "    <priority>0.7</priority>`n"
        $xml += "  </url>`n"
    }


$xml += '</urlset>'
$xml | Out-File -FilePath $sitemapPath -Encoding utf8
Write-Host "Sitemap updated."
