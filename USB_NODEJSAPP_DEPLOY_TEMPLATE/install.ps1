<#
    THIS IS THE SOURCE CODE OF INSTALL.EXE, USE THE EXECUTABLE FOR PRODUCTION
#>
function log($v, $f) {if ($c.logs -eq "true" -or $f -eq $true) {Write-Host $v}}
function getAt() {$inv=$global:MyInvocation.MyCommand;if($inv.CommandType -eq "ExternalScript"){$ScriptPath=Split-Path -Parent -Path $inv.Definition}else{$ScriptPath=Split-Path -Parent -Path ([Environment]::GetCommandLineArgs()[0]);if(!$ScriptPath){$ScriptPath="."}}return $ScriptPath}

#LOCATION
$at = (getAt)
log "STARTED INSTALLER... `nSOURCE LOCATION: '$at'" $true

#GET CONFIG
$c = Get-Content "$at\installConfig.json" | ConvertFrom-Json
log "LOADED CONFIG FILE: $c"

$source = "$at\$($c.appName)" # GET SOURCE CODE PATH
$dest = ($c.installPath -replace "/","\").trimEnd("\") # GET INSTALL PATH
if ($c.installPath -match "%") {
    $d = [regex]::Matches($dest, "^%.+%").groups[0].value -replace "%",""
    $p = [regex]::Matches($dest, "\\.+")
    if ($null -eq $p.groups) {$p=""} else {$p=$p.groups[0].value}
    try {$dest = "$([System.Environment]::GetEnvironmentVariable($d).trimEnd("\"))$p"}
    catch {Read-Host "Invalid dynamic path: ' %$d% ', press enter to exit..."}
}
$dest += "\"

#CREATE DEST TOP FOLDER IF DOES NOT EXIST
if (!(Test-Path $dest)) {
    New-Item -Path $dest -ItemType Directory | Out-Null
    log "CREATED TOP FOLDER AT '$dest'"
}
#DELETE APP IF ALREADY EXISTS
if (Test-Path "$dest$($c.appName)") {
    Remove-Item -Path "$dest$($c.appName)" -Recurse -Force
    log "REMOVED ALREADY EXISTING APP: '$dest'"
}

#INSTALL APP
log "COPYING APP FILES AT '$dest'"
Copy-Item -Path $source -Destination "$dest$($c.appName)" -Recurse
log "APP INSTALLED AT '$dest'"

#HIDE FOLDER
if ($c.hideAppFolder) {
    (Get-Item -Path "$dest$($c.appName)").Attributes = [System.IO.FileAttributes]::Hidden
    log "APP FOLDER SET TO HIDDEN"
}

#NODE RUNTIME PATH
$node = "$dest$($c.appName)\$($c.appExecutablesRoot)\node.exe"

#EXECUTE RUNNER
start-process powershell.exe -NoNewWindow -ArgumentList "-nop -ep Bypass -WindowStyle $($c.runnerWindowType) -File `"$dest$($c.appName)\$($c.appExecutablesRoot)\runner.$($c.runnableFileType)`" -node `"$node`" -fullMain `"$dest$($c.appName)\$($c.appRoot)\$($c.appMain)`""

log "EXECUTED APP RUNNER FOR: '$($c.appName)'...`n"
if ($c.confirmLogs -eq "true") {read-Host "Press enter to exit..."}
exit