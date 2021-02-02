@ECHO
SET mypath=%~dp0
echo %mypath:~0,-1%
cd %mypath:~0,-1%
cd ../../
cd .\deploy\ms-tender-deploy
ECHO Delete All deployments.
kubectl delete  -f .
@REM kubectl replace  -f .
PAUSE