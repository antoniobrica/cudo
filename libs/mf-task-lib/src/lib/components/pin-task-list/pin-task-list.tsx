import { useMutation } from '@apollo/client';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { TaskDelete } from '@cudo/mf-task-lib';
import { LoaderPage, ModalAlert, ModalTaskEdit, ModalViewTask, TaskListOnFilePins } from '@cudo/shared-components';
import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ITasks } from '../../interfaces/task';
import { UPDATE_TASK, DELETE_TASK, GET_TASKS } from './../../graphql/graphql';
import './pin-task-list.module.scss';
import { useTaskUpdateMutation, useTaskDeleteMutation } from '../../services/useRequest';
/* eslint-disable-next-line */
export interface PinTaskListProps {
  filesData?
  cord?
}

export function PinTaskList(props: PinTaskListProps) {
  const history = useHistory();
  const [taskStatusConfirmation, settaskStatusConfirmation] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [viewTaskOpen, setViewTaskOpen] = React.useState(false);
  const [editTaskOpen, setEditTaskOpen] = React.useState(false);
  const [pinTasks, setPinTasks] = React.useState([]);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [workTypes, setWorkTypes] = React.useState([]);
  const [taskData, setTaskData] = React.useState();
  const [idx, setId] = React.useState('');
  const [taskStatus, settaskStatus] = React.useState('');
  const res = history.location.pathname.split("/");
  const referenceID = res[3]?.toString();
  const getPinQuery = `query TasksByTasktypes(
   $referenceID: String!,
  $fileID: String!
    ) {
    tasksByTasktypes(
    referenceFilter:{referenceID: $referenceID ,referenceType:PROJECTTYPE} 
    taskTypeFilter:{fileID: $fileID,taskType:PIN})
    { 
    taskTitle 
    fileID 
    fileName
    taskID 
    taskType
    taskTypeID
    taskType 
    status
    startDate
    endDate
    description
    estimatedDays
    BKPID
    BKPTitle
    phaseID
    phaseName
    assignees{
      userID
      userName
      }
      followers{
      userID
      userName
      }
    } 
   }`;
  const getPins = async () => {
    setLoading(true);
    return axios.post(
      MS_SERVICE_URL['ms_task'].url,
      {
        query: getPinQuery,
        variables: {
          fileID: props.filesData?.uploadedFileID,
          referenceID: referenceID
        }
      }
    ).then(res => {
      setLoading(false);
      console.log('get_pin_tasks', res.data.data);
      setPinTasks(res.data.data.tasksByTasktypes)

    })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    getPins();
  }, []);

  const [editTaskApi, { data: editData }] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { referenceID } }],
  });
  const [taskDelete] = useTaskDeleteMutation(DELETE_TASK, {
    variables: { referenceID },
  });
  enum Status {
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
  }

  const cancel = () => {
    console.log('canceled');
    setOpen(false);
    setOpenD(false);
    setViewTaskOpen(false);
    setEditTaskOpen(false);
  };
  const confirmation = (data, task) => {
    console.log('data', task);
    setOpen(false);
    updateTask(taskData);

    let status;
    if (task.status === 'COMPLETED') {
      status = Status.INPROGRESS;
    } else {
      status = Status.COMPLETED;
    }
    const taskID = task.taskID;
    const assignees = [];
    task.assignees.map((data, i) => {
      assignees.push({ userID: data.userID, userName: data.userName })
    })
    const followers = [];
    task.followers.map((data, i) => {
      followers.push({ userID: data.userID, userName: data.userName })
    })
  };
  const confirmationDelete = (data, task) => {

    setOpenD(false);
    // updateTask(taskData);
    const taskID = task.taskID;
    taskDelete({
      variables: {
        taskID,
      },
    });
  };
  const updateTask = (task) => {
    console.log("Update status", task);
    setTaskData(task);
    setOpen(true);
    if (task.status === 'COMPLETED') {
      settaskStatus('Re-open');
    } else {
      settaskStatus('Mark as Complete');
    }
    editTaskApi({
      variables: {
        taskID: task.taskID,
        status: task.status,
        files: [],
        taskTitle: task.taskTitle,
        startDate: task.startDate,
        endDate: task.endDate,
        estimatedDays: task.estimatedDays,
        sendNotification: false,
        BKPID: task.BKPID,
        BKPTitle: task.BKPTitle,
        saveTaskAsTemplate: task.saveTaskAsTemplate || ' ',
        phaseID: task.phaseID,
        phaseName: task.phaseName,
        referenceID: task.referenceID,
        description: task.description,
        subtasks: [],
        assignees: task.assignees,
        followers: task.followers
      },
      update: (cache, data) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS,
          variables: { referenceID },
        }) as ITasks;
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasksD: [...cacheData?.tasks, data],
          },
          variables: { referenceID },
        });
      },
    });
  };
  const deleteTask = (task) => {
    setTaskData(task);
    setOpenD(true);
  };
  const viewTask = (task) => {
    setTaskData(task);
    setId(task.taskID)
    setViewTaskOpen(true);
  };
  const editTask = (task) => {
    setTaskData(task);
    setEditTaskOpen(true);
  };
  const editTaskData = (data) => {
    console.log('editTaskData', data);
    const assignees = [];
    data.assignees.map((data, i) => {
      assignees.push({ userID: data.userID, userName: data.userName })
    })
    const followers = [];
    data.followers.map((data, i) => {
      followers.push({ userID: data.userID, userName: data.userName })
    })
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
        saveTaskAsTemplate: data.saveTaskAsTemplate || ' ',
        phaseID: data.phaseID,
        phaseName: data.phaseName,
        referenceID: data.referenceID,
        description: data.description,
        subtasks: [],
        assignees: assignees,
        followers: followers
      },
      update: (cache, data) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS,
          variables: { referenceID },
        }) as ITasks;
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasksD: [...cacheData?.tasks, data],
          },
          variables: { referenceID },
        });
      },
    });
  };
  return (
    <div>
      {taskStatusConfirmation ? (
        <div className="pin_area">
          <ModalAlert
            name='task'
            openAlertF={taskStatusConfirmation}
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
      {open ? (
        <div className="pin_area">
          <ModalAlert
            name='task'
            openAlertF={open}
            confirm={confirmation}
            taskData={taskData}
            taskStatus={taskStatus}
            cancel={cancel}
          ></ModalAlert>
        </div>
      ) : null}
      {viewTaskOpen ? (
        <div className="pin_area">
          <ModalViewTask
            openAlertF={viewTaskOpen}
            taskData={taskData}
            taskStatus={taskStatus}
            cancel={cancel}
            id={idx}
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
      {loading ? <LoaderPage /> : <TaskListOnFilePins pinTasks={pinTasks} cord={props.cord}
        updateTask={updateTask}
        deleteTask={deleteTask}
        veiwTask={viewTask}
        editTask={editTask}></TaskListOnFilePins>}
    </div>
  );
}


