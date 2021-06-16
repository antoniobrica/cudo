import React from 'react';

import './tasks.module.scss';
import { MfAccountAppLib } from '@cudo/mf-account-app-lib';
import { LoaderPage, ModalTaskEdit, TaskArea } from '@cudo/shared-components';
import axios from 'axios';
import {
  ApolloCache,
  FetchResult,
  useMutation,
  useQuery,
} from '@apollo/client';
import { ModalAlert, ModalViewTask } from '@cudo/shared-components';
import { useTranslation } from 'react-i18next';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { ADD_TASK, GET_TASKS } from '../../graphql/graphql';
import { ITasks } from '../../interfaces/task';
import { useHistory } from 'react-router-dom';
import { UPDATE_TASK, DELETE_TASK } from '../../graphql/graphql';
import { useTaskQuery, useTaskUpdateMutation, useTaskDeleteMutation } from '../../services/useRequest';
import CreateTask from '../create-task/create-task';
import TaskDelete from '../delete-task/delete-task';
import { FilterPopup, ToggleButton } from '@cudo/shared-components';
import { FileListIndex } from '@cudo/mf-document-lib';
export interface TasksProps { }

export function Tasks(props: TasksProps) {
  const history = useHistory();
  const { t } = useTranslation();
  const [referenceID, setReferenceID] = React.useState<string>('')
  const { loading, error, data } = useTaskQuery(GET_TASKS, {
    variables: { referenceID },
  });

  React.useEffect(() => {
    const res = history.location.pathname.split('/');
    console.log("URL Path", res);
    setReferenceID(res[3].toString());
  }, [history]);
  React.useEffect(() => {
    console.log("Refernce ID", referenceID);
    if (referenceID) {
      getWorkType(referenceID);
    }
  }, [referenceID]);

  // const { loading, error, data } = useQuery(GET_TASKS, {
  //   variables: { referenceID},
  // });
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [viewTaskOpen, setViewTaskOpen] = React.useState(false);
  const [editTaskOpen, setEditTaskOpen] = React.useState(false);
  const [workTypes, setWorkTypes] = React.useState([]);

  const [taskData, setTaskData] = React.useState();
  const [projectId, setProjectId] = React.useState('');

  const [isUpdate, setIsUpdate] = React.useState(false);
  const [isTaskFile, setIsTaskFile] = React.useState(false);
  const [isNewTask, setIsNewTask] = React.useState(false);
  const [taskStatus, settaskStatus] = React.useState('');

  const [addTask] = useTaskUpdateMutation(UPDATE_TASK, {
    variables: { referenceID },
  });
  const [addSubTask, { data: subtasks }] = useMutation(ADD_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { referenceID } }],
    variables: { referenceID },
  });

  const [taskDelete] = useTaskDeleteMutation(DELETE_TASK, {
    variables: { referenceID },
  });

  const [editTaskApi, { data: editData }] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { referenceID } }],
  });

  const query = `query ProjectById($projectId: String!) {
    projectById( projectId: $projectId)
    {
      projectId
      projectName
      projectNum
      client
      buildingType
      printingCom
      projectWorkTypes{
        workTypeName
        projectWorkTypeID
         workTypeName
        estimatedCost
        }
      description
    }
 }`;

  const getWorkType = (referenceID) => {
    console.log('sasstoken', referenceID);
    return axios
      .post(MS_SERVICE_URL['ms_project'].url, {
        query,
        variables: {
          projectId: referenceID,
        },
      })
      .then((res) => {
        console.log("Value of project query", res);
        const wt = res.data.data.projectById[0].projectWorkTypes;
        setWorkTypes(wt);
      })
      .catch((err) => console.log(err));
  };

  enum Status {
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
  }
  if (loading)
    return (
      <h1>
        {' '}
        <LoaderPage />
      </h1>
    );
  // if (error) return (
  //   <div style={{ marginLeft: 900 }} >
  //     <CreateTask workTypes={workTypes} onSuccess={refresh} cancel={cancelTask} isNewTask={isNewTask} />
  //   </div>
  // );
  if (data) {
    console.log('tasks=>', data.tasks.results);
  }

  // setProjectId(res[3]);

  const cancel = () => {
    setOpen(false);
    setOpenD(false);
    setViewTaskOpen(false);
    setEditTaskOpen(false);
  };
  const confirmation = (data, task) => {
    console.log('data', task);
    setIsUpdate(data);
    setOpen(false);
    // updateTask(taskData);

    let status;
    if (task.status === 'COMPLETED') {
      status = Status.INPROGRESS;
    } else {
      status = Status.COMPLETED;
    }
    const taskID = task.taskID;
    addTask({
      variables: {
        taskID,
        status,
        files: [],
        taskTitle: task.taskTitle,
        startDate: task.startDate,
        endDate: task.endDate,
        estimatedDays: task.estimatedDays,
        sendNotification: false,
        BKPID: task.BKPID,
        BKPTitle: task.BKPTitle,
        saveTaskAsTemplate: task.saveTaskAsTemplate,
        phaseID: task.phaseID,
        phaseName: task.phaseName,
        referenceID: task.referenceID,
        description: task.description,
        subtasks: [],
      },
      update: (cache) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS,
          variables: { referenceID },
        }) as ITasks;
        const newTask = cacheData?.tasks?.results?.map((t) => {
          if (t.taskID === taskID) {
            if (t.status === 'INPROGRESS') {
              return { ...t, status: Status.COMPLETED };
            } else {
              return { ...t, status: Status.INPROGRESS };
            }
          } else {
            return t;
          }
        });
        //    setOpen(false)
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasks: newTask,
          },
          variables: { referenceID },
        });
      },
    });
  };
  const confirmationDelete = (data, task) => {
    setIsUpdate(data);
    setOpenD(false);
    // updateTask(taskData);
    const taskID = task.taskID;
    taskDelete({
      variables: {
        taskID,
      },
      update: (cache) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS,
          variables: { referenceID },
        }) as ITasks;
        // const newTask = cacheData.tasks.map(t => {
        //   if (t.taskID === taskID) {
        //     if (t.status === 'INPROGRESS') {
        //       return { ...t, status: Status.COMPLETED };
        //     }
        //     else {
        //       return { ...t, status: Status.INPROGRESS };
        //     }
        //   } else {
        //     return t;
        //   }
        // });

        const newTask = cacheData?.tasks?.results?.filter(
          (item) => item.taskID !== taskID
        );
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasks: newTask,
          },
          variables: { referenceID },
        });
      },
    });
  };
  const updateTask = (task) => {
    setTaskData(task);
    setOpen(true);
    if (task.status === 'COMPLETED') {
      settaskStatus('Re-open');
    } else {
      settaskStatus('Mark as Complete');
    }
  };
  const deleteTask = (task) => {
    setTaskData(task);
    setOpenD(true);
  };
  const viewTask = (task) => {
    setTaskData(task);
    setViewTaskOpen(true);
  };
  const editTask = (task) => {
    setTaskData(task);
    setEditTaskOpen(true);
  };

  const refresh = (data) => {
    console.log('refresh is called', data);
  };
  const editTaskData = (data) => {
    console.log('editTaskData', data);
    editTaskApi({
      variables: {
        taskID: data.taskID,
        status: data.status,
        files: [],
        taskTitle: data.taskTitle,
        startDate: data.startDate,
        endDate: data.endDate,
        estimatedDays: data.estimatedDays,
        sendNotification: false,
        BKPID: data.BKPID,
        BKPTitle: data.BKPTitle,
        saveTaskAsTemplate: data.saveTaskAsTemplate,
        phaseID: data.phaseID,
        phaseName: data.phaseName,
        referenceID: data.referenceID,
        description: data.description,
        subtasks: [],
      },
      update: (cache, data) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS,
          variables: { referenceID },
        }) as ITasks;
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasksD: [...cacheData.tasks.results, data],
          },
          variables: { referenceID },
        });
      },
    });
  };
  const subTask = (data, title) => {
    const subtask = [];
    const createSt = {
      subtaskTitle: title,
      status: Status.INPROGRESS,
    };
    subtask.push(createSt);
    editTaskApi({
      variables: {
        taskID: data.taskID,
        status: data.status,
        files: [],
        taskTitle: data.taskTitle,
        startDate: data.startDate,
        endDate: data.endDate,
        estimatedDays: data.estimatedDays,
        sendNotification: false,
        BKPID: data.BKPID,
        BKPTitle: data.BKPTitle,
        saveTaskAsTemplate: data.saveTaskAsTemplate,
        phaseID: data.phaseID,
        phaseName: data.phaseName,
        referenceID: data.referenceID,
        description: data.description,
        subtasks: subtask,
      },
      update: (cache, data) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS,
          variables: { referenceID },
        }) as ITasks;
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasksD: [...cacheData.tasks.results, data],
          },
          variables: { referenceID },
        });
      },
    });
  };

  const changeAdd = (data) => {
    console.log('changeTask', data);
    if (data === 'add') {
      setIsTaskFile(false);
      setIsNewTask(true);
    }
    if (data === 'file') {
      setIsNewTask(false);
      setIsTaskFile(true);
    }
  };
  const cancelNew = () => {
    setIsTaskFile(false);
  };
  const cancelTask = () => {
    setIsNewTask(false);
  };

  const clickBottomAddTask = () => {
    setIsNewTask(true);
  };

  return (
    <div>
      <div className="pin_area">
        <FilterPopup />

        <ToggleButton changeAdd={changeAdd}></ToggleButton>
        {isNewTask ? (
          <CreateTask
            workTypes={workTypes}
            onSuccess={refresh}
            cancel={cancelTask}
            isNewTask={isNewTask}
          />
        ) : null}
      </div>
      {isTaskFile ? (
        <div className="pin_area" style={{ marginLeft: 804 }}>
          <FileListIndex isTaskFile={isTaskFile} cancel={cancelNew} />
        </div>
      ) : null}

      {/* <MfAccountAppLib/> */}
      {open ? (
        <div className="pin_area">
          <ModalAlert
            openAlertF={open}
            confirm={confirmation}
            taskData={taskData}
            taskStatus={taskStatus}
            cancel={cancel}
          ></ModalAlert>
        </div>
      ) : null}
      {openD ? (
        <div className="pin_area">
          <TaskDelete
            openAlertF={openD}
            confirm={confirmationDelete}
            taskData={taskData}
            taskStatus={taskStatus}
            cancel={cancel}
          ></TaskDelete>
        </div>
      ) : null}
      {viewTaskOpen ? (
        <div className="pin_area">
          <ModalViewTask
            openAlertF={viewTaskOpen}
            taskData={taskData}
            taskStatus={taskStatus}
            cancel={cancel}
          ></ModalViewTask>
        </div>
      ) : null}
      {editTaskOpen ? (
        <div className="pin_area">
          <ModalTaskEdit
            openAlertF={editTaskOpen}
            taskData={taskData}
            taskStatus={taskStatus}
            cancel={cancel}
            editTaskData={editTaskData}
          ></ModalTaskEdit>
        </div>
      ) : null}
      <div className="TaskApp-container">
        <h3 className="alltask" style={{ marginBottom: '20px;' }}>All Tasks</h3>
        {data?.tasks?.results?.map((task, id) => {
          return (
            <div key={id} >
              <TaskArea
                task={task}
                id={id}
                updateTask={updateTask}
                deleteTask={deleteTask}
                veiwTask={viewTask}
                editTask={editTask}
                subTask={subTask}
              />
              {/* </TaskArea> */}
            </div>
          );
        })}
      </div>
      <button
        onClick={clickBottomAddTask}
        className="ui large button btn-dashed  btn-large"
      >
        <i className="ms-Icon ms-Icon--AddTo" aria-hidden="true"></i> Add new
        task{' '}
      </button>
    </div>
  );
}

export default Tasks;
