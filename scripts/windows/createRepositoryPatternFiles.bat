@ECHO
SET mypath=%~dp0
echo %mypath:~0,-1%
cd %mypath:~0,-1%
ECHO Create Project task files in repository Pattern 
nx g @nrwl/nest:module projectTasks --project=ms-task --directory=app/components/project-tasks --flat=true
nx g @nrwl/nest:service project-tasks --project=ms-task --directory=app/components/project-tasks/service --flat=true
nx g @nrwl/nest:class get-project-tasks.args --project=ms-task --directory=app/components/project-tasks/dto/args --flat=true
nx g @nrwl/nest:class create-project-task.input --project=ms-task --directory=app/components/project-tasks/dto/input --flat=true
nx g @nrwl/nest:interface project-tasks-repository --project=ms-task --directory=app/components/project-tasks/interface --flat=true
nx g @nrwl/nest:interface project-tasks-service --project=ms-task --directory=app/components/project-tasks/interface --flat=true   
nx g @nrwl/nest:resolver project-tasks --project=ms-task --directory=app/components/project-tasks/resolver --flat=true

PAUSE