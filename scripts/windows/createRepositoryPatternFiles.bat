@ECHO
SET mypath=%~dp0
echo %mypath:~0,-1%
cd %mypath:~0,-1%
ECHO Create Project task files in repository Pattern 
nx g @nrwl/nest:module projectTasks --project=ms-task --directory=app/components/tasks --flat=true
nx g @nrwl/nest:service tasks --project=ms-task --directory=app/components/tasks/service --flat=true
nx g @nrwl/nest:class get-tasks.args --project=ms-task --directory=app/components/tasks/dto/args --flat=true
nx g @nrwl/nest:class task-details.input --project=ms-task --directory=app/components/tasks/dto/input --flat=true
nx g @nrwl/nest:interface tasks-repository --project=ms-task --directory=app/components/tasks/interface --flat=true
nx g @nrwl/nest:interface tasks-service --project=ms-task --directory=app/components/tasks/interface --flat=true   
nx g @nrwl/nest:resolver tasks --project=ms-task --directory=app/components/tasks/resolver --flat=true

PAUSE