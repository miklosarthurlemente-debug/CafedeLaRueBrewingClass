$ErrorActionPreference = 'Stop'
$project = Split-Path -Parent $PSScriptRoot
$url = 'http://127.0.0.1:4317/'
function Test-Academy {
 try { return (Invoke-WebRequest -UseBasicParsing -Uri ($url + '__barista_local_status') -TimeoutSec 2).Content -eq 'cafe-de-la-rue-private' } catch { return $false }
}
try {
 if (!(Test-Path -LiteralPath (Join-Path $project 'dist/index.html'))) { throw 'The production build is missing. Run npm run build in the project folder first.' }
 if (!(Test-Academy)) {
  $nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
  $nodePath = if ($nodeCommand) { $nodeCommand.Source } else { $null }
  if (!$nodePath) {
   $runtimeRoot = Join-Path $env:ProgramFiles 'WindowsApps'
   $bundled = Get-ChildItem -LiteralPath $runtimeRoot -Directory -Filter 'OpenAI.CodexPrimaryRuntime*' -ErrorAction SilentlyContinue | Sort-Object Name -Descending
   foreach ($runtime in $bundled) {
    $candidate = Join-Path $runtime.FullName 'dependencies/node/bin/node.exe'
    if (Test-Path -LiteralPath $candidate) { $nodePath = $candidate; break }
   }
  }
  if (!$nodePath) { throw 'Node.js could not be found. Install Node.js once, then use this launcher without internet.' }
  $serverPath = Join-Path $PSScriptRoot 'offline-server.mjs'
  Start-Process -FilePath $nodePath -ArgumentList ('"' + $serverPath + '"') -WorkingDirectory $project -WindowStyle Hidden
  $ready = $false
  for ($attempt=0; $attempt -lt 20; $attempt++) {
   if (Test-Academy) { $ready = $true; break }
   Start-Sleep -Milliseconds 250
  }
  if (!$ready) { throw 'The local academy could not start. Port 4317 may be used by another application.' }
 }
 Start-Process ($url + '#landing')
 Write-Host 'Opened your private offline academy. No internet or public hosting is required.'
} catch { Write-Host $_.Exception.Message -ForegroundColor Red; exit 1 }
