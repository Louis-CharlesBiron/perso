<#
    THIS IS THE SOURCE CODE OF UNINSTALL.EXE, USE THE EXECUTABLE FOR PRODUCTION
#>
function log($v, $f) {if ($c.logs -eq "true" -or $f -eq $true) {Write-Host $v}}
function getAt() {$inv=$global:MyInvocation.MyCommand;if($inv.CommandType -eq "ExternalScript"){$ScriptPath=Split-Path -Parent -Path $inv.Definition}else{$ScriptPath=Split-Path -Parent -Path ([Environment]::GetCommandLineArgs()[0]);if(!$ScriptPath){$ScriptPath="."}}return $ScriptPath}

#GET CONFIG
$c = Get-Content "$(getAt)\installConfig.json" | ConvertFrom-Json

#GET LOCATION
$location = ($c.installPath -replace "/","\").trimEnd("\") #GET INSTALL PATH
if ($c.installPath -match "%") {
    $d = [regex]::Matches($location, "^%.+%").groups[0].value -replace "%",""
    $p = [regex]::Matches($location, "\\.+")
    if ($null -eq $p.groups) {$p=""} else {$p=$p.groups[0].value}
    try {$location = "$([System.Environment]::GetEnvironmentVariable($d).trimEnd("\"))$p"}
    catch {Read-Host "Invalid dynamic path: ' %$d% ', press enter to exit..."}
}
$location += "\$($c.appName)"

log "STARTING UNINSTALL: '$location'"

# CHECK IF DESTINATION EXISTS
log "DELETING: '$location'"
if (Test-Path $location) {
    Remove-Item -Path $location -Recurse -Force
    log "SUCCESSFULLY DELETED: $location"
} else {
   log "CANNOT DELETE BECAUSE THE PATH IS INVALID OR THE APP IS NOT INSTALLED: '$location'"
}

if ($c.confirmLogs -eq "true") {read-Host "Press enter to exit..."}
exit

