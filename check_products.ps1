$r = Invoke-WebRequest -Uri 'http://localhost:3000/api/products' -UseBasicParsing
$data = $r.Content | ConvertFrom-Json
Write-Host "Total products: $($data.Count)"
$data | Select-Object id, name, category, subcategory, gender | Format-Table -AutoSize
