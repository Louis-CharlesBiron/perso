cls
$appName = "APPNAME" # global folder name

$source = "C:\temp\SOURCE\$appName" # USB KEY
$dest = "C:\DESTINATION" # TEMP FOLDER

#INSTALL APP
Copy-Item -Path $source -Destination $dest -Recurse
Set-Location $dest

#NODE RUNTIME
$node = "$dest\$appName\nodeRuntime\node.exe"

#APP PATHS
$root = "script"
$main = "server.js"

#RUN
& $node "$appName\$root\$main"
