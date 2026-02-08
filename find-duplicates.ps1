$json = Get-Content "data/exchanges.json" -Raw -Encoding UTF8 | ConvertFrom-Json
$slugs = @{}

for ($i = 0; $i -lt $json.Count; $i++) {
    $item = $json[$i]
    if ($null -ne $item.name) {
        $slug = $item.name.ToLower().Trim() -replace '[^a-z0-9]+', '_' -replace '^_+|_+$', ''
        
        if ($slugs.ContainsKey($slug)) {
            Write-Host "Duplicate Slug Found: $slug"
            Write-Host "  Index 1: $($slugs[$slug].Index) - $($slugs[$slug].Name)"
            Write-Host "  Index 2: $i - $($item.name)"
        } else {
            $slugs[$slug] = @{ Index = $i; Name = $item.name }
        }
    }
}
