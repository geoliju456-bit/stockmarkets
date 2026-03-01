$ErrorActionPreference = "Stop"

$jsonPath = "d:\website\data\exchanges.json"
$jsonRaw = Get-Content $jsonPath -Raw
$data = $jsonRaw | ConvertFrom-Json

foreach ($ex in $data) {
    if ($null -ne $ex.description) {
        $ex.description = $ex.description -replace "Ã¢â‚¬â„¢", "'"
        $ex.description = $ex.description -replace "â€™", "'"
        $ex.description = $ex.description -replace "â€œ", "`""
        $ex.description = $ex.description -replace "â€", "`""
    }
    if ($null -ne $ex.name) {
        $ex.name = $ex.name -replace "Ã¢â‚¬â„¢", "'"
        $ex.name = $ex.name -replace "â€™", "'"
        $ex.name = $ex.name -replace "â€œ", "`""
        $ex.name = $ex.name -replace "â€", "`""
    }
}

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText($jsonPath, ($data | ConvertTo-Json -Depth 10), $Utf8NoBomEncoding)

Write-Host "Encoding artifacts fixed successfully."
