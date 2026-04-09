$ErrorActionPreference = "Stop"

$base = "d:\literati-hub"
$standalone = "$base\.next\standalone"
$destZip = "$base\deploy.zip"

Write-Host "Creating standalone deployment package..."

# Remove old zip if it exists
if (Test-Path $destZip) {
    Remove-Item $destZip -Force
}

# 1. Copy public directory to standalone
if (Test-Path "$base\public") {
    Copy-Item -Path "$base\public" -Destination "$standalone\public" -Recurse -Force
    Write-Host "Copied public directory"
}

# 2. Copy .next/static to standalone/.next/static
$staticDest = "$standalone\.next\static"
if (-Not (Test-Path $staticDest)) {
    New-Item -ItemType Directory -Path $staticDest | Out-Null
}
if (Test-Path "$base\.next\static") {
    Copy-Item -Path "$base\.next\static\*" -Destination $staticDest -Recurse -Force
    Write-Host "Copied .next/static directory"
}

# 3. Copy .ebextensions
if (Test-Path "$base\.ebextensions") {
    Copy-Item -Path "$base\.ebextensions" -Destination "$standalone\.ebextensions" -Recurse -Force
    Write-Host "Copied .ebextensions"
}

# 4. Create Procfile for Node.js
Set-Content -Path "$standalone\Procfile" -Value "web: node server.js"
Write-Host "Created Procfile"

# 5. Zip the contents of .next/standalone
Write-Host "Zipping the standalone folder..."
# Using tar because Compress-Archive had path issues
Set-Location $standalone
cmd.exe /c "tar -a -c -f $destZip *"

$sizeMB = [math]::Round((Get-Item $destZip).Length / 1MB, 2)
Write-Host "SUCCESS: deploy.zip created ($sizeMB MB)"
