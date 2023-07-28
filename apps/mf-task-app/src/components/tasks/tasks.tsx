import React from 'react';
import CreateTask from '../../app/components/create-task/create-task';
import { DELETE_TASK, GET_TASKS, UPDATE_TASK } from '../../app/graphql/graphql';
import { useTaskDeleteMutation, useTaskQuery, useTaskUpdateMutation } from '../../app/services/useRequest';
import './tasks.module.scss';
import { MfAccountAppLib } from '@cudo/mf-account-app-lib';
import { LoaderPage, ModalTaskEdit, TaskArea } from '@cudo/shared-components/src';

import { ApolloCache, FetchResult, useMutation, useQuery } from '@apollo/client';
import { ITask, ITasks, TaskUpdateMutation } from '../../app/interfaces/task';
import { ModalAlert, ModalViewTask } from '@cudo/all-shared-components';
import { useLocation, useNavigate } from 'react-router-dom';
import TaskDelete from '../delete-task';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface TasksProps {}

export function Tasks(props: TasksProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const res = location.pathname.split('/');

  console.log(res);

  const referenceID = res[3].toString();

  const { loading, error, data } = useTaskQuery(GET_TASKS, {
    variables: { referenceID },
  });
  // const { loading, error, data } = useQuery(GET_TASKS, {
  //   variables: { referenceID},
  // });
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [viewTaskOpen, setViewTaskOpen] = React.useState(false);
  const [editTaskOpen, setEditTaskOpen] = React.useState(false);

  const [addTask] = useTaskUpdateMutation(UPDATE_TASK, {
    variables: { referenceID },
  });
  const [taskDelete] = useTaskDeleteMutation(DELETE_TASK, {
    variables: { referenceID },
  });

  const [editTaskApi, { data: editData }] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { referenceID } }],
    variables: { referenceID },
  });

  const [taskData, setTaskData] = React.useState();
  const [projectId, setProjectId] = React.useState('');

  const [isUpdate, setIsUpdate] = React.useState(false);
  const [taskStatus, settaskStatus] = React.useState('');

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
  if (error)
    return (
      <div style={{ marginLeft: 900 }}>
        <CreateTask />
      </div>
    );
  if (data) {
    console.log('tasks=>', data.tasks);
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
      },
      update: (cache) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS,
          variables: { referenceID },
        }) as ITasks;
        const newTask = cacheData.tasks.map((t) => {
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

        const newTask = cacheData.tasks.filter((item) => item.taskID !== taskID);
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
    // editTaskApi({
    //   variables: {
    //     taskID: data.taskID,
    //     status: data.status,
    //     files: [],
    //     taskTitle: data.taskTitle,
    //     startDate: data.startDate,
    //     endDate: data.endDate,
    //     estimatedDays: data.estimatedDays,
    //     sendNotification: false,
    //     BKPID: data.BKPID,
    //     BKPTitle: data.BKPTitle,
    //     saveTaskAsTemplate: data.saveTaskAsTemplate,
    //     phaseID: data.phaseID,
    //     phaseName: data.phaseName,
    //     referenceID: data.referenceID,
    //     description: data.description,
    //   },
    //   update: (cache, data) => {
    //     const cacheData = cache.readQuery({
    //       query: GET_TASKS,
    //       variables: { referenceID },
    //     }) as ITasks;
    //     cache.writeQuery({
    //       query: GET_TASKS,
    //       data: {
    //         tasksD: [...cacheData.tasks, data],
    //       },
    //       variables: { referenceID },
    //     });
    //   },
    // });
  };
  return (
    <div>
      <div style={{ marginLeft: 900 }}>
        <CreateTask onSuccess={refresh} />
      </div>
      {/* <MfAccountAppLib/> */}

      {open ? (
        <div style={{ marginLeft: 900 }}>
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
        <div style={{ marginLeft: 900 }}>
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
        <div style={{ marginLeft: 900 }}>
          <ModalViewTask
            openAlertF={viewTaskOpen}
            taskData={taskData}
            taskStatus={taskStatus}
            cancel={cancel}
          ></ModalViewTask>
        </div>
      ) : null}
      {editTaskOpen ? (
        <div style={{ marginLeft: 900 }}>
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
        <h3 className="alltask">All Tasks</h3>
        <br />
        {data.tasks.map((task, id) => {
          return (
            <div key={id}>
              <TaskArea
                task={task}
                id={id}
                updateTask={updateTask}
                deleteTask={deleteTask}
                veiwTask={viewTask}
                editTask={editTask}
              ></TaskArea>
            </div>
          );
        })}
      </div>
      {/* <button className="ui large button btn-dashed  btn-large"><i className="ms-Icon ms-Icon--AddTo" aria-hidden="true"></i> Add new task    </button> */}
    </div>
  );
}

export default Tasks;
