$json = Get-Content "data/exchanges.json" -Raw -Encoding UTF8 | ConvertFrom-Json
$names = @{}

for ($i = 0; $i -lt $json.Count; $i++) {
    $item = $json[$i]
    if ($null -ne $item.name) {
        $key = $item.name.Trim()
        # Case insensitive key for detection, but preserve original for display
        $lookupKey = $key.ToLower()
        
        if ($names.ContainsKey($lookupKey)) {
            Write-Host "Duplicate Name: '$key'"
            Write-Host "  Found at Index: $i"
            Write-Host "  Conflict with Index: $($names[$lookupKey])"
            Write-Host "----------------"
        } else {
            $names[$lookupKey] = $i
        }
    }
}
