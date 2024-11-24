<#
    THIS IS THE SOURCE CODE OF KEYRUNNER.EXE, USE THE EXECUTABLE FOR PRODUCTION
#>
function log($v, $f) {if ($c.logs -eq "true" -or $f -eq $true) {Write-Host $v}}
function getAt() {$inv=$global:MyInvocation.MyCommand;if($inv.CommandType -eq "ExternalScript"){$ScriptPath=Split-Path -Parent -Path $inv.Definition}else{$ScriptPath=Split-Path -Parent -Path ([Environment]::GetCommandLineArgs()[0]);if(!$ScriptPath){$ScriptPath="."}}return $ScriptPath}

#LOCATION
$location = (getAt)

#GET CONFIG
$c = Get-Content "$location\installConfig.json" | ConvertFrom-Json

#GET LOCATION
$dest = ($c.installPath -replace "/","\").trimEnd("\") ## INSTALL PATH
if ($c.installPath -match "%") {
    $d = [regex]::Matches($dest, "^%.+%").groups[0].value -replace "%",""
    $p = [regex]::Matches($dest, "\\.+")
    if ($null -eq $p.groups) {$p=""} else {$p=$p.groups[0].value}
    try {$dest = "$([System.Environment]::GetEnvironmentVariable($d).trimEnd("\"))$p"}
    catch {Read-Host "Invalid dynamic path: ' %$d% ', press enter to exit..."}
}
$dest += "\"

#NODE RUNTIME PATH
$node = "$dest$($c.appName)\$($c.appExecutablesRoot)\node.exe"
#RUNNER.PS1/EXE PATH
$runner = "$dest$($c.appName)\$($c.appExecutablesRoot)\runner.$($c.runnableFileType)"
#MAIN PATH
$main = "$dest$($c.appName)\$($c.appRoot)\$($c.appMain)"

if ((Test-Path $runner) -and (Test-Path $node) -and (Test-Path $main)) {
    #EXECUTE RUNNER
    log "EXECUTING APP..."
    start-process powershell.exe -NoNewWindow -ArgumentList "-nop -ep Bypass -WindowStyle $($c.runnerWindowType) -File `"$runner`" -node `"$node`" -fullMain `"$main`""

    if ($c.confirmLogs -eq "true") {read-Host "Press enter to exit..."}
    exit
} else {
    #INCORRECT INSTALLATION
    log "APPLICATION NOT CORRECTLY INSTALLED AT '$dest' `nRUNNING THE INSTALLER... `n"
    start-process powershell.exe -NoNewWindow -ArgumentList "-nop -ep Bypass -WindowStyle $($c.runnerWindowType) -File `"$location/install.$($c.runnableFileType)`""
}

if ($c.confirmLogs -eq "true") {read-Host "Press enter to exit..."}
exit


