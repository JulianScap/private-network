$location = Get-Location
$canRun = Test-Path -PathType Container "../docker"
$canRun = $canRun -and (Test-Path -PathType Container "../front-end")
$canRun = $canRun -and (Test-Path -PathType Container "../back-end")
$canRun = $canRun -and $location.Path.EndsWith("docker")

if (-not $canRun) {
    "Please run this script in the folder private-network\docker"
    exit 1
}

docker build . -t private-network
