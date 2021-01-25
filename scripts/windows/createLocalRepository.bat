@ECHO
SET mypath=%~dp0
echo %mypath:~0,-1%
cd %mypath:~0,-1%
ECHO Create Local repository 
docker run -d -p 5000:5000 --name registry registry:2

PAUSE