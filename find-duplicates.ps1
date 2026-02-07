$json = Get-Content "data/exchanges.json" -Raw | ConvertFrom-Json
$codes = @{}

for ($i = 0; $i -lt $json.Count; $i++) {
    $item = $json[$i]
    if ($null -ne $item.code) {
        $key = $item.code.Trim()
        if ($codes.ContainsKey($key)) {
            Write-Host "Duplicate Code Found: $key"
            Write-Host "  Index 1: $($codes[$key].Index) - $($codes[$key].Name)"
            Write-Host "  Index 2: $i - $($item.name)"
        } else {
            $codes[$key] = @{ Index = $i; Name = $item.name }
        }
    }
}
