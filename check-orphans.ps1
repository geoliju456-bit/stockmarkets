$data = Get-Content "data/exchanges.json" | ConvertFrom-Json
$generatedFiles = @()

foreach ($ex in $data) {
    if (-not $ex.code) { continue }
    $slug = $ex.name.ToLower().Trim() -replace '[^a-z0-9]+', '_' -replace '^_+|_+$', ''
    $generatedFiles += "$slug.html"
}

$existingFiles = Get-ChildItem "markets/*.html" | Select-Object -ExpandProperty Name
$orphanedFiles = $existingFiles | Where-Object { $generatedFiles -notcontains $_ }

if ($orphanedFiles.Count -eq 0) {
    Write-Host "No orphaned files found in markets/."
} else {
    Write-Host "Found $($orphanedFiles.Count) orphaned files in markets/:"
    $orphanedFiles
}
