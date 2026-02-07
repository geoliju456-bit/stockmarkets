$jsonPath = "data\exchanges.json"
$sitemapPath = "sitemap.xml"

if (-not (Test-Path $jsonPath)) {
    Write-Host "Error: exchanges.json not found in data directory"
    exit 1
}

$jsonContent = Get-Content -Raw -Path $jsonPath
$exchanges = $jsonContent | ConvertFrom-Json

$xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
$urlSetStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
$urlSetEnd = '</urlset>'

$today = Get-Date -Format "yyyy-MM-dd"

$staticUrls = @(
    @{loc="https://www.easystockmarkets.com/"; priority="1.0"; freq="daily"},
    @{loc="https://www.easystockmarkets.com/all-exchanges.html"; priority="0.9"; freq="weekly"},
    @{loc="https://www.easystockmarkets.com/exchanges.html"; priority="0.8"; freq="monthly"},
    @{loc="https://www.easystockmarkets.com/time-conversion.html"; priority="0.8"; freq="monthly"},
    @{loc="https://www.easystockmarkets.com/about.html"; priority="0.5"; freq="yearly"},
    @{loc="https://www.easystockmarkets.com/privacy-policy.html"; priority="0.3"; freq="yearly"},
    @{loc="https://www.easystockmarkets.com/terms-disclaimer.html"; priority="0.3"; freq="yearly"}
)

$sb = [System.Text.StringBuilder]::new()
[void]$sb.AppendLine($xmlHeader)
[void]$sb.AppendLine($urlSetStart)

foreach ($url in $staticUrls) {
    [void]$sb.AppendLine("  <url>")
    [void]$sb.AppendLine("    <loc>$($url.loc)</loc>")
    [void]$sb.AppendLine("    <lastmod>$today</lastmod>")
    [void]$sb.AppendLine("    <changefreq>$($url.freq)</changefreq>")
    [void]$sb.AppendLine("    <priority>$($url.priority)</priority>")
    [void]$sb.AppendLine("  </url>")
}

foreach ($ex in $exchanges) {
    if ($ex.code) {
        # Simple URL encoding for spaces
        $code = $ex.code -replace ' ', '%20'
        
        [void]$sb.AppendLine("  <url>")
        [void]$sb.AppendLine("    <loc>https://www.easystockmarkets.com/exchanges.html?exchange=$code</loc>")
        [void]$sb.AppendLine("    <lastmod>$today</lastmod>")
        [void]$sb.AppendLine("    <changefreq>weekly</changefreq>")
        [void]$sb.AppendLine("    <priority>0.7</priority>")
        [void]$sb.AppendLine("  </url>")
    }
}

[void]$sb.AppendLine($urlSetEnd)

$sb.ToString() | Out-File -FilePath $sitemapPath -Encoding utf8
Write-Host "Sitemap updated successfully with $($exchanges.Count) dynamic pages."
