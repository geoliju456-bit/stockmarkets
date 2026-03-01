$ErrorActionPreference = "Stop"

$jsonPath = "d:\website\data\exchanges.json"
$jsonRaw = Get-Content $jsonPath -Raw
$data = $jsonRaw | ConvertFrom-Json

foreach ($ex in $data) {
    if (-not $ex.description.Contains("market timings into their local timezone")) {
        $codeStr = ""
        if ($null -ne $ex.code -and $ex.code -ne "") {
            $codeStr = " ($($ex.code))"
        }
        $seoAddition = " Investors and traders monitoring the $($ex.name)$codeStr can utilize our global stock market hours tracker to convert $($ex.timezone) market timings into their local timezone. Whether you are tracking pre-market movers, after hours trading, or the opening and closing bell, understanding the exact stock market timings is crucial for navigating international stock exchanges, equity indices (like the S&P 500, Dow Jones, Nikkei 225, FTSE 100, DAX, or CAC 40), and forex trading hours. The $($ex.name) remains a vital part of the world stock markets, contributing significantly to global financial markets and regional market capitalization in $($ex.country). Stay updated on stock market holidays, verify if the stock market is open, and refine your global trading strategy."
        
        $ex.description += $seoAddition
    }
}

$jsonText = $data | ConvertTo-Json -Depth 10 -Compress
# We use regex to pretty-print or just leave it compressed? Better structure it properly or use Python if we want formatting. But powershell convertto-json works too. Let's just output standard json.
# Out-File with UTF8 no BOM is preferred but Set-Content -Encoding UTF8 works in modern PS. For compatibility:
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText($jsonPath, ($data | ConvertTo-Json -Depth 10), $Utf8NoBomEncoding)

Write-Host "Descriptions expanded successfully."
