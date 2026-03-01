$ErrorActionPreference = "Stop"

$jsonPath = "d:\website\data\exchanges.json"
$jsonRaw = Get-Content $jsonPath -Raw
$data = $jsonRaw | ConvertFrom-Json

foreach ($ex in $data) {
    $idx = $ex.description.IndexOf(" Investors and traders monitoring the")
    if ($idx -gt 0) {
        $ex.description = $ex.description.Substring(0, $idx)
    }
}

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText($jsonPath, ($data | ConvertTo-Json -Depth 10), $Utf8NoBomEncoding)

Write-Host "Descriptions reverted successfully."
