@ECHO
SET mypath=%~dp0
echo %mypath:~0,-1%
cd %mypath:~0,-1%
ECHO Start building ms-tender.
cd ../../
docker build -t 192.168.0.31:5000/ms-tender .
ECHO Start pushing ms-tender.
docker push 192.168.0.31:5000/ms-tender
cd .\deploy\ms-tender-deploy
ECHO Create sidecar components.
kubectl apply  -f .
@REM kubectl replace  -f .
PAUSE