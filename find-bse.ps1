$json = Get-Content "data/exchanges.json" -Raw | ConvertFrom-Json
$codes = @{}

for ($i = 0; $i -lt $json.Count; $i++) {
    $item = $json[$i]
    if ($item.code -match "BSE") {
        Write-Host "Match Found: $($item.code)"
        Write-Host "  Name: $($item.name)"
        Write-Host "  Index: $i"
        Write-Host "----------------"
    }
}
