@ECHO
SET mypath=%~dp0
echo %mypath:~0,-1%
cd %mypath:~0,-1%
ECHO Start building ms-project.
cd ../../
docker build -t cudotestacr.azurecr.io/ms-project .
ECHO Start pushing ms-project.
docker push cudotestacr.azurecr.io/ms-project
@REM docker build -t 192.168.1.38:5000/ms-project .
@REM ECHO Start pushing ms-project.
@REM docker push 192.168.1.38:5000/ms-project
cd .\deploy\ms-project-deploy
ECHO Create sidecar components.
kubectl apply  -f .
@REM kubectl replace  -f .
PAUSE