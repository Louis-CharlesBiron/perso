param (
    [string[]]$exc = @("index.js"), #files to exclude forom the bundle
    [string]$out = "cvsProject.js" #output file name 
)

$bundledContent = ""
Get-ChildItem -Force -Recurse -Filter *.js | ? {-not ($exc -icontains $_.Name)} | % {
    $bundledContent += "$(Get-Content $_.FullName -Raw) `n`n`n"
    write-host $_.Name
}

New-Item -Name $out -Value $bundledContent -Force
