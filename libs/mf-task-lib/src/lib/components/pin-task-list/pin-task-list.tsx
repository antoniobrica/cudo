import { useMutation, useQuery } from '@apollo/client';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { TaskDelete } from '@cudo/mf-task-lib';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LazyLoading, LoaderPage, ModalAlert, ModalTaskEdit, ModalViewTask, TaskListOnFilePins } from '@cudo/shared-components';
import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ITasks } from '../../interfaces/task';
import { GET_TASKS, GET_TASKS_BY_TYPES, UPDATE_TASK, DELETE_TASK, UPDATE_SUBTASK_STATUS, UPDATE_SUBTASK, DELETE_SUBTASK } from './../../graphql/graphql';
import './pin-task-list.module.scss';
import { useTaskUpdateMutation, useTaskDeleteMutation } from '../../services/useRequest';

import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface PinTaskListProps {
  filesData?
  cord?
  pinCount?
  taskHovered?
}

export function PinTaskList(props: PinTaskListProps) {
  const history = useHistory();
  const { t } = useTranslation();

  const [activeTaskList, setActiveTaskList] = React.useState([])

  const [viewTaskOpen, setViewTaskOpen] = React.useState(false);
  const [editTaskOpen, setEditTaskOpen] = React.useState(false);
  const [openTaskDelete, setOpenTaskDelete] = React.useState(false);
  const [taskStatusConfirmation, setTaskStatusConfirmation] = React.useState(false);
  const [pinTasks, setPinTasks] = React.useState([]);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const [workTypes, setWorkTypes] = React.useState([]);
  const [taskData, setTaskData] = React.useState();
  const [idx, setId] = React.useState('');
  const [taskStatus, settaskStatus] = React.useState('');


  const [subTaskId, setSubTaskId] = React.useState();
  const [taskErrors, setTaskErrors] = React.useState("")
  const [activeErrorClass, setActiveErrorClass] = React.useState(false)

  const res = history.location.pathname.split("/");
  const referenceID = res[3]?.toString();

  // #region Old code for axios call====
  // const getPinQuery = `query TasksByTasktypes(
  //  $referenceID: String!,
  // $fileID: String!
  //   ) {
  //   tasksByTasktypes(
  //   referenceFilter:{referenceID: $referenceID ,referenceType:PROJECTTYPE} 
  //   taskTypeFilter:{fileID: $fileID,taskType:PIN})
  //   { 
  //     taskID 
  //   taskTitle 
  //   startDate
  //   endDate
  //   estimatedDays
  //   sendNotification
  //   saveTaskAsTemplate
  //   BKPID
  //   BKPTitle
  //   phaseID
  //   description
  //   phaseName
  //   status
  //   updatedAt
  //   createdAt
  //   updatedBy
  //   createdBy
  //   taskTypeID
  //   fileID
  //   taskType
  //   workTypeID
  //   workTypeName
  //   fileName   
  //   files{
  //     fileID
  //     fileName
  //     fileUrl
  //   }
  //   assignees{
  //     userID
  //     userName
  //     imageUrl
  //   }
  //   followers{
  //     userID
  //     userName
  //     imageUrl
  //   }
  //   subtasks{
  //       subtaskID 
  //       subtaskTitle 
  //       status
  //       isDeleted
  //     }
  //   } 
  //  }`;
  // const getPins = async () => {
  //   setLoading(true);
  //   return axios.post(
  //     MS_SERVICE_URL['ms_task'].url,
  //     {
  //       query: getPinQuery,
  //       variables: {
  //         fileID: props.filesData?.uploadedFileID,
  //         referenceID: referenceID
  //       }
  //     }
  //   ).then(res => {
  //     setLoading(false);
  //     setPinTasks(res.data.data.tasksByTasktypes)
  //     props.pinCount(res.data.data.tasksByTasktypes?.length)
  //   })
  //     .catch(err => console.log(err))
  // }

  // React.useEffect(() => {
  //   getPins();
  // }, []);
  // #endregion

  const { loading: taskListLoading, error: taskListError, data: taskListData } = useQuery(GET_TASKS_BY_TYPES, {
    variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
  });

  React.useEffect(() => {
    setActiveTaskList(taskListData?.tasksByTasktypes?.filter(task => task.status === Status.INPROGRESS))

    props.pinCount(taskListData?.tasksByTasktypes.length)
  }, [taskListData])

  React.useEffect(() => {
    props.pinCount(activeTaskList?.length)
  }, [activeTaskList])

  // const [editTaskApi, { data: editData }] = useMutation(UPDATE_TASK);
  // const [taskDelete] = useMutation(DELETE_TASK);

  const [updateTaskApi, { loading: updateTaskLoading, error: updateTaskError, data: editData }] = useMutation(UPDATE_TASK);
  const [deleteTaskApi, { loading: deleteTaskLoading, error: deleteTaskError, data: deleteTaskData }] = useMutation(DELETE_TASK);


  const [addSubTaskApi, { loading: addSubTaskLoading, error: addSubTaskError, data: addedSubTaskData }] = useMutation(UPDATE_TASK);
  const [subTaskUpdateApi, { loading: updateSubTaskLoading, error: updateSubTaskError, data: updateSubTaskData }] = useMutation(UPDATE_SUBTASK);
  const [subTaskStatusUpdateApi, { loading: updateSubTaskStatusLoading, error: updateSubTaskStatusError, data: updateSubTaskStatusData }] = useMutation(UPDATE_SUBTASK_STATUS);
  const [subTaskDeleteApi, { loading: deleteSubTaskLoading, error: deleteSubTaskError, data: deleteSubTaskData }] = useMutation(DELETE_SUBTASK);

  enum Status {
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
  }

  const cancel = () => {
    setViewTaskOpen(false);
    setEditTaskOpen(false);
    setOpenTaskDelete(false);
    setTaskStatusConfirmation(false);
  };

  // on click open view task modal
  const viewTask = (task) => {
    setTaskData(task);
    setId(task.taskID)
    setViewTaskOpen(true);
  };

  // on click open edit task modal
  const editTask = (task) => {
    setTaskData(task);
    setEditTaskOpen(true);
  };

  // on click open delete task confirm modal
  const deleteTaskConfirm = (task) => {
    setTaskData(task);
    setOpenTaskDelete(true);
  };

  // on click open update task status confirm modal
  const updateTaskStatusConfirm = (task) => {

    const status = Status.COMPLETED
    setTaskData({ ...task, status });
    settaskStatus('Mark as complete')
    setTaskStatusConfirmation(true)
  };

  // #region task api call
  const updateTaskData = (data) => {

    const assignees = [];
    data.assignees.map((data, i) => {
      assignees.push({ userID: data.userID, userName: data.userName })
    })
    const followers = [];
    data.followers.map((data, i) => {
      followers.push({ userID: data.userID, userName: data.userName })
    })
    updateTaskApi({
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
        workTypeID: data.workTypeID,
        workTypeName: data.workTypeName,
        saveTaskAsTemplate: data.saveTaskAsTemplate || ' ',
        phaseID: data.phaseID,
        phaseName: data.phaseName,
        referenceID: data.referenceID,
        description: data.description,
        subtasks: [],
        assignees: assignees,
        followers: followers
      },
      update: (cache, updatedTaskData) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
        }) as ITasks;

        const updatedTaskList = cacheData?.tasksByTasktypes?.map((item) => {

          if (item.taskID === updatedTaskData?.data?.updateTask[0].taskID) {
            item = updatedTaskData?.data?.updateTask[0]
          }
          return item
        });

        cache.writeQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
          data: {
            tasksByTasktypes: updatedTaskList,
          },
        });
      },
    });
  };

  const confirmationDelete = (data, task) => {

    setOpenTaskDelete(false);
    // updateTask(taskData);
    const taskID = task.taskID;
    deleteTaskApi({
      variables: {
        taskID,
      },
      update: (cache, data) => {

        const cacheData = cache.readQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
        }) as ITasks;

        const newTaskList = cacheData?.tasksByTasktypes?.filter((task) => task.taskID !== taskID)

        cache.writeQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
          data: {
            tasksByTasktypes: newTaskList,
          },
        });
      },
    });
  };

  const updateTaskStatus = (data, task) => {
    setTaskStatusConfirmation(false)

    const assignees = [];
    task.assignees.map((data, i) => {
      assignees.push({ userID: data.userID, userName: data.userName })
    })
    const followers = [];
    task.followers.map((data, i) => {
      followers.push({ userID: data.userID, userName: data.userName })
    })
    updateTaskApi({
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
        assignees,
        followers,
        workTypeName: task.workTypeName,
        workTypeID: task.workTypeID,
      },
      update: (cache, data) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
        }) as ITasks;

        cache.writeQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
          data: {
            tasksByTasktypes: [...cacheData?.tasksByTasktypes, data],
          },
        });
      },
    });
  };
  // #endregion

  const taskHovered = (taskTypeID) => {
    props.taskHovered(taskTypeID)
  };

  // #region subtask api call
  const subTaskAdd = (data, title) => {

    const subtask = [];
    const createSt = {
      subtaskTitle: title,
      status: Status.INPROGRESS,
    };
    const assignees = [];
    data.assignees.map((data, i) => {
      assignees.push({ userID: data.userID, userName: data.userName })
    })
    const followers = [];
    data.followers.map((data, i) => {
      followers.push({ userID: data.userID, userName: data.userName })
    })
    subtask.push(createSt);

    addSubTaskApi({
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
        assignees: assignees,
        followers: followers,
        workTypeName: data.workTypeName,
        workTypeID: data.workTypeID,
      },

      update: (cache, updatedTaskData) => {

        const cacheData = cache.readQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
        }) as ITasks;

        const newTaskList = cacheData?.tasksByTasktypes?.map((task) => {
          if (task.taskID === data.taskID) {
            const subTaskList = updatedTaskData?.data?.updateTask[0]?.subtasks
            return { ...task, subtasks: subTaskList }
          } else {
            return task;
          }
        });

        cache.writeQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
          data: {
            tasksByTasktypes: newTaskList
          },
        });
      },

    });
  };

  const updateSubTask = (taskId, subtaskId, title) => {

    subTaskUpdateApi({
      variables: {
        subtaskID: subtaskId,
        subtaskTitle: title
      },
      update: (cache, data) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
        }) as ITasks;

        const newTaskList = cacheData?.tasksByTasktypes?.map((task) => {
          if (task.taskID === taskId) {

            const subTaskList = task.subtasks.map((subTask) => {
              if (subTask.subtaskID === subtaskId) {
                return { ...subTask, subtaskTitle: title };
              } else {
                return subTask
              }
            })

            return { ...task, subtasks: subTaskList }
          } else {
            return task;
          }
        });

        cache.writeQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
          data: {
            tasksByTasktypes: newTaskList,
          },
        });
      },
    })
  }

  const updateSubTaskStatus = (taskId, subtaskId, subtaskStatus) => {
    subTaskStatusUpdateApi({
      variables: {
        subtaskID: subtaskId,
        status: subtaskStatus === 'COMPLETED' ? Status.COMPLETED : Status.INPROGRESS
      },
      update: (cache, data) => {

        const cacheData = cache.readQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
        }) as ITasks;

        const newTaskList = cacheData?.tasksByTasktypes?.map((task) => {
          if (task.taskID === taskId) {

            const subTaskList = task.subtasks.map((subTask) => {
              if (subTask.subtaskID === subtaskId) {

                if (subTask.status === 'INPROGRESS') {
                  return { ...subTask, status: Status.COMPLETED };
                } else {
                  return { ...subTask, status: Status.INPROGRESS };
                }
              } else {
                return subTask
              }
            })

            return { ...task, subtasks: subTaskList }
          } else {
            return task;
          }
        });

        cache.writeQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
          data: {
            tasksByTasktypes: newTaskList,
          },
        });
      },
    })
  }

  const deleteSubTask = (taskId, subtaskId) => {

    subTaskDeleteApi({
      variables: {
        subtaskID: subtaskId
      },
      update: (cache, data) => {

        const cacheData = cache.readQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
        }) as ITasks;

        const newTaskList = cacheData?.tasksByTasktypes?.map((task) => {
          if (task.taskID === taskId) {
            const subTaskList = task.subtasks.filter((subTask) => subTask.subtaskID !== subtaskId)
            return { ...task, subtasks: subTaskList }
          } else {
            return task;
          }
        });

        cache.writeQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: props?.filesData?.uploadedFileID, referenceID },
          data: {
            tasksByTasktypes: newTaskList,
          },
        });
      },
    })
  };
  // #endregion

  if (taskListLoading) return (<LazyLoading />)

  if (updateTaskLoading) return (<LazyLoading />)

  if (deleteTaskLoading) return (<LazyLoading />)

  // #region Task list toast message
  // set sucess value to toaster function
  const getTaskToasterMessage = (data) => {
    setActiveErrorClass(false)
    toast(data)
  }

  // set error value to task error for toaster function
  const getTaskErrorMessage = (data) => {
    setActiveErrorClass(true)

    let errorExeptionMessage: string;
    switch (data) {
      case 7001:
        errorExeptionMessage = t("toaster.error.task.task_already_exists")
        break
      case 7002:
        errorExeptionMessage = t("toaster.error.task.task_not_found")
        break
      case 7003:
        errorExeptionMessage = t("toaster.error.task.task_not_created")
        break
      case 7004:
        errorExeptionMessage = t("toaster.error.task.no_title")
        break
      case 7005:
        errorExeptionMessage = t("toaster.error.task.no_worktype")
        break
      case 7006:
        errorExeptionMessage = t("toaster.error.planning.no_phase")
        break
      case 7007:
        errorExeptionMessage = t("toaster.error.task.no_assignee")
        break
      case 7008:
        errorExeptionMessage = t("toaster.error.task.wrong_date")
        break
      case 7009:
        errorExeptionMessage = t("toaster.error.planning.due_date")
        break
      case 7010:
        errorExeptionMessage = t("toaster.error.task.no_referance")
        break
      case 7011:
        errorExeptionMessage = t("toaster.error.task.subtask_not_found")
        break
      case 7012:
        errorExeptionMessage = t("toaster.error.task.no_subtask_title")
        break
      case 500:
        errorExeptionMessage = t("toaster.error.task.internal_server_error")
        break
      default:
        errorExeptionMessage = ""
    }
    setTaskErrors(errorExeptionMessage)
  }

  // set toaster for edit task
  // React.useEffect(() => {
  //   if (!editTaskLoading && updatedTaskData) {
  //     setLoadingOnEditTask(false)
  //     getTaskToasterMessage(t("toaster.success.task.task_edit"))
  //   }
  //   if (!editTaskLoading && editTaskError) {
  //     setLoadingOnEditTask(false)
  //     getTaskErrorMessage(editTaskError?.graphQLErrors[0]?.extensions.exception.status)
  //   }
  // }, [editTaskLoading])

  // set toaster for delete task
  // React.useEffect(() => {
  //   if (!deleteTaskLoading && deletedTaskData) {
  //     setLoadingOnDeleteTask(false)
  //     getTaskToasterMessage(t("toaster.success.task.task_deleted"))
  //   }
  //   if (!deleteTaskLoading && deleteTaskError) {
  //     setLoadingOnDeleteTask(false)
  //     getTaskErrorMessage(deleteTaskError?.graphQLErrors[0]?.extensions.exception.status)
  //   }
  // }, [deleteTaskLoading])

  // set toaster for update task status
  // React.useEffect(() => {
  //   if (!editTaskStatusLoading && updatedTaskStatusData) {
  //     setLoadingOnEditTaskStatus(false)
  //     getTaskToasterMessage(t("toaster.success.task.task_status_updated"))
  //   }
  //   if (!editTaskStatusLoading && editTaskStatusError) {
  //     setLoadingOnEditTaskStatus(false)
  //     getTaskErrorMessage(updateTaskStatusError?.graphQLErrors[0]?.extensions.exception.status)
  //   }
  // }, [updateTaskStatusLoading])

  // set toaster for add subtask
  // React.useEffect(() => {
  //   if (!addSubTaskLoading && addedSubTaskData) {
  //     getTaskToasterMessage(t("toaster.success.task.subtask_created"))
  //   }
  //   if (!addSubTaskLoading && addSubTaskError) {
  //     getTaskErrorMessage(addSubTaskError?.graphQLErrors[0]?.extensions.exception.status)
  //   }
  // }, [addSubTaskLoading])

  // set toaster for edit subtask
  // React.useEffect(() => {
  //   if (!updateSubTaskLoading && updateSubTaskData) {
  //     getTaskToasterMessage(t("toaster.success.task.subtask_edit"))
  //   }
  //   if (!updateSubTaskLoading && updateSubTaskError) {
  //     getTaskErrorMessage(updateSubTaskError?.graphQLErrors[0]?.extensions.exception.status)
  //   }
  // }, [updateSubTaskLoading])

  // set toaster for delete subtask
  // React.useEffect(() => {
  //   if (!deleteSubTaskLoading && deleteSubTaskData) {
  //     getTaskToasterMessage(t("toaster.success.task.subtask_deleted"))
  //   }
  //   if (!deleteSubTaskLoading && deleteSubTaskError) {
  //     getTaskErrorMessage(deleteSubTaskError?.graphQLErrors[0]?.extensions.exception.status)
  //   }
  // }, [deleteSubTaskLoading])


  // set toaster for edit sub task status
  // React.useEffect(() => {
  //   if (!updateSubTaskStatusLoading && updateSubTaskStatusData) {
  //     getTaskToasterMessage(t("toaster.success.task.subtask_status_updated"))
  //   }
  //   if (!updateSubTaskStatusLoading && updateSubTaskStatusError) {
  //     getTaskErrorMessage(updateSubTaskStatusError?.graphQLErrors[0]?.extensions.exception.status)
  //   }
  // }, [updateSubTaskStatusLoading])

  // set error message to toaster
  // React.useEffect(() => {
  //   if (taskErrors) {
  //     toast(taskErrors)
  //   }
  // }, [taskErrors])
  // #endregion

  return (
    <div>
      <ToastContainer className={`${activeErrorClass ? "error" : "success"}`} position="top-right" autoClose={5000} hideProgressBar={true} closeOnClick pauseOnFocusLoss pauseOnHover />

      {taskStatusConfirmation ? (
        <div className="pin_area">
          <ModalAlert
            name='task'
            openAlertF={taskStatusConfirmation}
            confirm={updateTaskStatus}
            taskData={taskData}
            taskStatus={taskStatus}
            cancel={cancel}
          ></ModalAlert>
        </div>
      ) : null}
      {openTaskDelete ? (
        <div className="pin_area">
          <TaskDelete
            openAlertF={openTaskDelete}
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
            id={idx}
            editTask={editTask}
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
            editTaskData={updateTaskData}
          ></ModalTaskEdit>
        </div>
      ) : null}
      {/* {loading ? <LoaderPage /> : <TaskListOnFilePins pinTasks={pinTasks} cord={props.cord} */}
      {loading ? <LoaderPage /> :
        <TaskListOnFilePins pinTasks={activeTaskList} cord={props.cord}
          updateTask={updateTaskStatusConfirm}
          deleteTask={deleteTaskConfirm}
          veiwTask={viewTask}
          editTask={editTask}
          taskHovered={taskHovered}
          subTaskAdd={subTaskAdd}
          addSubTaskLoading={addSubTaskLoading}
          updateSubTask={updateSubTask}
          updateSubTaskLoading={updateSubTaskLoading}
          updateSubTaskStatus={updateSubTaskStatus}
          updateSubTaskStatusLoading={updateSubTaskStatusLoading}
          deleteSubTask={deleteSubTask}
          deleteSubTaskLoading={deleteSubTaskLoading}
        ></TaskListOnFilePins>}
    </div>
  );
}


