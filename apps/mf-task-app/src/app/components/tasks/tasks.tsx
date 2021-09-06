import React, { useEffect, useState } from 'react';

import './tasks.module.scss';
import { MfAccountAppLib } from '@cudo/mf-account-app-lib';
import { AddPinFile, LazyLoading, LoaderPage, ModalTaskEdit, TaskArea } from '@cudo/shared-components';
import { Dropdown, Grid, Popup, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import {
  ApolloCache,
  FetchResult,
  useMutation,
  useQuery,
} from '@apollo/client';
import { ModalAlert, ModalViewTask, ConfirmSubTaskStatus } from '@cudo/shared-components';
import { useTranslation } from 'react-i18next';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { ADD_TASK, GET_TASKS } from '../../graphql/graphql';
import { ISubTask, ITasks } from '../../interfaces/task';
import { useHistory } from 'react-router-dom';
import { UPDATE_TASK, DELETE_TASK, UPDATE_SUBTASK_STATUS, UPDATE_SUBTASK, DELETE_SUBTASK } from '../../graphql/graphql';
import { useTaskQuery, useTaskUpdateMutation, useTaskDeleteMutation } from '../../services/useRequest';
import CreateTask from '../create-task/create-task';
import TaskDelete from '../delete-task/delete-task';
import SubTaskDelete from '../delete-subtask/delete-subtask';
import { FilterPopup, ToggleButton } from '@cudo/shared-components';
import { FileListIndex } from '@cudo/mf-document-lib';
import { toast, ToastContainer } from 'react-toastify';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TasksProps { }

export function Tasks(props: TasksProps) {
  const history = useHistory();
  const { t } = useTranslation();
  const [referenceID, setReferenceID] = React.useState<string>('')
  const { loading: taskListLoading, error: taskListError, data: taskListData } = useTaskQuery(GET_TASKS, {
    variables: { referenceID },
  });

  React.useEffect(() => {
    const res = history.location.pathname.split('/');
    setReferenceID(res[3].toString());
  }, [history]);
  React.useEffect(() => {
    if (referenceID) {
      getWorkType(referenceID);
    }
  }, [referenceID]);

  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [viewTaskOpen, setViewTaskOpen] = React.useState(false);
  const [editTaskOpen, setEditTaskOpen] = React.useState(false);
  const [workTypes, setWorkTypes] = React.useState([]);
  const [taskData, setTaskData] = React.useState();
  const [projectId, setProjectId] = React.useState('');

  const [isTaskFile, setIsTaskFile] = React.useState(false);
  const [isNewTask, setIsNewTask] = React.useState(false);
  const [taskStatus, settaskStatus] = React.useState('');

  const [openSubTaskStatusConfirm, setOpenSubTaskStatusConfirm] = React.useState(false);
  const [openSubTaskDeleteConfirm, setOpenSubTaskDeleteConfirm] = React.useState(false);
  const [taskId, setTaskId] = React.useState();
  const [subTaskId, setSubTaskId] = React.useState();
  const [subTaskStatus, setSubTaskStatus] = React.useState('');
  const [taskErrors, setTaskErrors] = useState("")
  const [activeErrorClass, setActiveErrorClass] = useState(false)
  const [taskDeleteUpdateStatusLoading, setTaskDeleteUpdateStatusLoading] = React.useState(false)
  const [loadingOnDeleteTask, setLoadingOnDeleteTask] = useState(false)
  const [loadingOnEditTask, setLoadingOnEditTask] = useState(false)
  const [loadingOnEditTaskStatus, setLoadingOnEditTaskStatus] = useState(false)

  const [idx, setId] = React.useState('');

  const [editTaskApi, { loading: editTaskLoading, error: editTaskError, data: updatedTaskData }] = useMutation(UPDATE_TASK);
  const [taskDelete, { loading: deleteTaskLoading, error: deleteTaskError, data: deletedTaskData }] = useMutation(DELETE_TASK);
  const [editTaskStatusApi, { loading: editTaskStatusLoading, error: editTaskStatusError, data: updatedTaskStatusData }] = useMutation(UPDATE_TASK);

  const [addSubTaskApi, { loading: addSubTaskLoading, error: addSubTaskError, data: addedSubTaskData }] = useMutation(UPDATE_TASK);
  const [subTaskUpdateApi, { loading: editSubTaskLoading, error: editSubTaskError, data: editSubTaskData }] = useMutation(UPDATE_SUBTASK);

  const [subTaskStatusUpdateApi, { loading: editSubTaskStatusLoading, error: editSubTaskStatusError, data: editSubTaskStatusData }] = useMutation(UPDATE_SUBTASK_STATUS, {
    refetchQueries: [{ query: GET_TASKS, variables: { referenceID } }],
  });

  const [subTaskDeleteApi, { loading: deleteSubTaskLoading, error: deleteSubTaskError, data: deleteSubTaskData }] = useMutation(DELETE_SUBTASK, {
    variables: { subtaskID: subTaskId },
  });
  // const [subTaskUpdateApi, { data }] = useMutation(UPDATE_SUBTASK, {
  //   refetchQueries: [{ query: GET_TASKS, variables: { referenceID } }],
  // });

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
  useEffect(() => {
    if (!editTaskLoading && updatedTaskData) {
      setLoadingOnEditTask(false)
      getTaskToasterMessage(t("toaster.success.task.task_edit"))
    }
    if (!editTaskLoading && editTaskError) {
      setLoadingOnEditTask(false)
      getTaskErrorMessage(editTaskError?.graphQLErrors[0]?.extensions.exception.status)
    }
  }, [editTaskLoading])

  // set toaster for delete task
  useEffect(() => {
    if (!deleteTaskLoading && deletedTaskData) {
      setLoadingOnDeleteTask(false)
      getTaskToasterMessage(t("toaster.success.task.task_deleted"))
    }
    if (!deleteTaskLoading && deleteTaskError) {
      setLoadingOnDeleteTask(false)
      getTaskErrorMessage(deleteTaskError?.graphQLErrors[0]?.extensions.exception.status)
    }
  }, [deleteTaskLoading])

  // set toaster for update task status
  useEffect(() => {
    if (!editTaskStatusLoading && updatedTaskStatusData) {
      setLoadingOnEditTaskStatus(false)
      getTaskToasterMessage(t("toaster.success.task.task_status_updated"))
    }
    if (!editTaskStatusLoading && editTaskStatusError) {
      setLoadingOnEditTaskStatus(false)
      getTaskErrorMessage(editTaskStatusError?.graphQLErrors[0]?.extensions.exception.status)
    }
  }, [editTaskStatusLoading])

  // set toaster for add subtask
  useEffect(() => {
    if (!addSubTaskLoading && addedSubTaskData) {
      getTaskToasterMessage(t("toaster.success.task.subtask_created"))
    }
    if (!addSubTaskLoading && addSubTaskError) {
      getTaskErrorMessage(addSubTaskError?.graphQLErrors[0]?.extensions.exception.status)
    }
  }, [addSubTaskLoading])

  // set toaster for edit subtask
  useEffect(() => {
    if (!editSubTaskLoading && editSubTaskData) {
      getTaskToasterMessage(t("toaster.success.task.subtask_edit"))
    }
    if (!editSubTaskLoading && editSubTaskError) {
      getTaskErrorMessage(editSubTaskError?.graphQLErrors[0]?.extensions.exception.status)
    }
  }, [editSubTaskLoading])

  // set toaster for delete subtask
  useEffect(() => {
    if (!deleteSubTaskLoading && deleteSubTaskData) {
      getTaskToasterMessage(t("toaster.success.task.subtask_deleted"))
    }
    if (!deleteSubTaskLoading && deleteSubTaskError) {
      getTaskErrorMessage(deleteSubTaskError?.graphQLErrors[0]?.extensions.exception.status)
    }
  }, [deleteSubTaskLoading])


  // set toaster for edit sub task status
  useEffect(() => {
    if (!editSubTaskStatusLoading && editSubTaskStatusData) {
      getTaskToasterMessage(t("toaster.success.task.subtask_status_updated"))
    }
    if (!editSubTaskStatusLoading && editSubTaskStatusError) {
      getTaskErrorMessage(editSubTaskStatusError?.graphQLErrors[0]?.extensions.exception.status)
    }
  }, [editSubTaskStatusLoading])

  // set error message to toaster
  useEffect(() => {
    if (taskErrors) {
      toast(taskErrors)
    }
  }, [taskErrors])


  const query = `query ProjectById($projectId: String!) {
    projectById( projectId: $projectId)
    {
      projectId
      projectName
      projectNum
      client
      buildingType
      printingCompany
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

    return axios
      .post(MS_SERVICE_URL['ms_project'].url, {
        query,
        variables: {
          projectId: referenceID,
        },
      })
      .then((res) => {

        const wt = res.data.data.projectById[0].projectWorkTypes;
        setWorkTypes(wt);
      })
      .catch((err) => console.log(err));
  };

  enum Status {
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
  }
  if (taskListLoading) return (<LazyLoading />)
  // if (taskListError) return (<div>Tasks not fetched. An internal server error occured</div>)
  // return (
  //   <h1>
  //     <LoaderPage />
  //   </h1>
  // );

  if (loadingOnDeleteTask) return (<LazyLoading />)
  // if (deleteTaskError) return (<div>Task not deleted. An internal server error occured</div>)
  // return (
  //   <h1>
  //     <LoaderPage />
  //   </h1>
  // );

  if (loadingOnEditTask) return (<LazyLoading />)
  // if (editTaskError) return (<div>Task not updated. An internal server error occured</div>)

  if (loadingOnEditTaskStatus) return (<LazyLoading />)
  // console.log(editTaskStatusError)
  // if (editTaskStatusError) return (<div>Task status not updated. An internal server error occured</div>)


  // if (addSubTaskLoading) return (<LazyLoading />)
  // if (addSubTaskError) return (<div>Sub-task not added. An internal server error occured</div>)

  // // if (editSubTaskLoading) return (<LazyLoading />)
  // if (editSubTaskError) return (<div>Sub-task not updated. An internal server error occured</div>)


  const cancel = () => {
    setOpen(false);
    setOpenD(false);
    setViewTaskOpen(false);
    setEditTaskOpen(false);
  };
  const confirmation = (data, task) => {
    setLoadingOnEditTaskStatus(true)
    setOpen(false);

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
    const variables = {
      taskID,
      status,
      files: [],
      taskTitle: task.taskTitle,
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
      assignees: assignees,
      followers: followers,
      workTypeName: task.workTypeName,
      workTypeID: task.workTypeID,
    }
    if (task.startDate) {
      variables['startDate'] = task.startDate
    }
    if (task.endDate) {
      variables['endDate'] = task.endDate
    }
    editTaskStatusApi({
      variables,
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

        cache.writeQuery({
          query: GET_TASKS,
          variables: { referenceID },
          data: {
            tasks: newTask,
          },
        });
      },
    });
  };

  const confirmationDelete = (data, task) => {
    setLoadingOnDeleteTask(true)
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

    setOpenD(false);
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
  const viewTask = (task, id) => {
    setTaskData(task);
    setId(id)
    setViewTaskOpen(true);
  };
  const editTask = (task) => {
    setTaskData(task);
    setEditTaskOpen(true);
  };

  const openViewAddPinFile = (task) => {
    setTaskData(task);
    setIsTaskFile(true)
  }

  const refresh = (data) => {
    console.log('refresh is called', data);
  };

  const editTaskData = (updateTaskData) => {
    setLoadingOnEditTask(true)
    const assignees = [];
    updateTaskData.assignees.map((data, i) => {
      assignees.push({ userID: data.userID, userName: data.userName })
    })
    const followers = [];
    updateTaskData.followers.map((data, i) => {
      followers.push({ userID: data.userID, userName: data.userName })
    })
    editTaskApi({
      variables: {
        taskID: updateTaskData.taskID,
        status: updateTaskData.status,
        files: [],
        taskTitle: updateTaskData.taskTitle,
        startDate: updateTaskData.startDate,
        endDate: updateTaskData.endDate,
        estimatedDays: updateTaskData.estimatedDays,
        sendNotification: false,
        BKPID: updateTaskData.BKPID,
        BKPTitle: updateTaskData.BKPTitle,
        saveTaskAsTemplate: updateTaskData.saveTaskAsTemplate,
        phaseID: updateTaskData.phaseID,
        phaseName: updateTaskData.phaseName,
        referenceID: updateTaskData.referenceID,
        description: updateTaskData.description,
        subtasks: [],
        assignees: assignees,
        followers: followers,
        workTypeName: updateTaskData.workTypeName,
        workTypeID: updateTaskData.workTypeID,
      },
      update: (cache, updatedTaskData) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS,
          variables: { referenceID },
        }) as ITasks;

        const updatedTaskList = cacheData?.tasks?.results?.map((item) => {

          if (item.taskID === updatedTaskData?.data?.updateTask[0].taskID) {
            item = updatedTaskData?.data?.updateTask[0]
          }
          return item
        });

        cache.writeQuery({
          query: GET_TASKS,
          variables: { referenceID },
          data: {
            tasks: updatedTaskList, // [...cacheData.tasks.results, data],
          },
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

      // update: (cache, data) => {
      //   const cacheData = cache.readQuery({
      //     query: GET_TASKS,
      //     variables: { referenceID },
      //   }) as ITasks;

      //   cache.writeQuery({
      //     query: GET_TASKS,
      //     data: {
      //       tasks: [...cacheData.tasks.results, data],
      //     },
      //     variables: { referenceID },
      //   });
      // },


      update: (cache, updatedTaskData) => {

        const cacheData = cache.readQuery({
          query: GET_TASKS,
          variables: { referenceID },
        }) as ITasks;

        const newTaskList = cacheData?.tasks?.results?.map((task) => {
          if (task.taskID === data.taskID) {
            const subTaskList = updatedTaskData?.data?.updateTask[0]?.subtasks
            return { ...task, subtasks: subTaskList }
          } else {
            return task;
          }
        });

        cache.writeQuery({
          query: GET_TASKS,
          variables: { referenceID },
          data: {
            tasks: newTaskList
          },
        });
      },

    });
  };
  const changeAdd = (data) => {

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

  const updateSubTaskStatus = (taskId, subtaskId, subtaskStatus) => {

    setTaskId(taskId);
    setSubTaskId(subtaskId);
    setOpenSubTaskStatusConfirm(true);
    if (subtaskStatus === 'COMPLETED') {
      setSubTaskStatus('Mark as Complete');
    } else {
      setSubTaskStatus('Re-open');
    }
  }
  const confirmSubTaskStatusUpdate = (taskId, subtaskId, subtaskStatus) => {

    setOpenSubTaskStatusConfirm(false)
    setTaskDeleteUpdateStatusLoading(true)
    subTaskStatusUpdateApi({
      variables: {
        subtaskID: subtaskId,
        status: subtaskStatus === 'Mark as Complete' ? Status.COMPLETED : Status.INPROGRESS
      },
      update: (cache, data) => {

        const cacheData = cache.readQuery({
          query: GET_TASKS,
          variables: { referenceID },
        }) as ITasks;

        const newTaskList = cacheData?.tasks?.results?.map((task) => {
          if (task.taskID === taskId) {

            const subTaskList = task.subtasks.map((subTask) => {
              if (subTask.subtaskID === subtaskId) {
                // return data;   

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
          query: GET_TASKS,
          data: {
            tasks: newTaskList,
          },
          variables: { referenceID },
        });
      },
    })


  };
  const cancelSubTaskStatusUpdate = () => {
    setOpenSubTaskStatusConfirm(false);
    setOpen(false);
    setOpenD(false);
    setViewTaskOpen(false);
    setEditTaskOpen(false);
    setTaskDeleteUpdateStatusLoading(false)
  };

  const deleteSubTask = (taskId, subtaskId) => {

    setTaskId(taskId);
    setSubTaskId(subtaskId);
    setOpenSubTaskDeleteConfirm(true);
  }
  const confirmSubTaskDelete = (taskId, subtaskId) => {

    setOpenSubTaskDeleteConfirm(false)
    setTaskDeleteUpdateStatusLoading(true)
    subTaskDeleteApi({
      variables: {
        subtaskID: subtaskId
      },
      update: (cache, data) => {

        const cacheData = cache.readQuery({
          query: GET_TASKS,
          variables: { referenceID },
        }) as ITasks;

        const newTaskList = cacheData?.tasks?.results?.map((task) => {
          if (task.taskID === taskId) {

            const subTaskList = task.subtasks.filter((subTask) => subTask.subtaskID !== subtaskId)

            return { ...task, subtasks: subTaskList }
          } else {
            return task;
          }
        });

        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasks: newTaskList,
          },
          variables: { referenceID },
        });
      },
    })
  };
  const cancelSubTaskDelete = () => {
    setOpenSubTaskDeleteConfirm(false);
    setOpenSubTaskStatusConfirm(false);
    setOpen(false);
    setOpenD(false);
    setViewTaskOpen(false);
    setEditTaskOpen(false);
  };

  const updateSubTask = (taskId, subtaskId, title) => {

    setTaskId(taskId);
    setSubTaskId(subtaskId);

    subTaskUpdateApi({
      variables: {
        subtaskID: subtaskId,
        subtaskTitle: title
      },
      update: (cache, data) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS,
          variables: { referenceID },
        }) as ITasks;

        const newTaskList = cacheData?.tasks?.results?.map((task) => {
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
          query: GET_TASKS,
          variables: { referenceID },
          data: {
            tasks: newTaskList,
          },
        });
      },
    })
  }

  return (
    <div>
      <ToastContainer className={`${activeErrorClass ? "error" : "success"}`} position="top-right" autoClose={5000} hideProgressBar={true} closeOnClick pauseOnFocusLoss pauseOnHover />

      <div className="pin_area">
        <FilterPopup />
        <ToggleButton changeAdd={changeAdd}></ToggleButton>
        {isNewTask ? (
          <CreateTask
            workTypes={workTypes}
            onSuccess={refresh}
            cancel={cancelTask}
            isNewTask={isNewTask}
            getTaskToasterMessage={getTaskToasterMessage}
            getTaskErrorMessage={getTaskErrorMessage}
            taskListData={taskListData}
          />
        ) : null}
      </div>
      {isTaskFile ? (
        <div className="pin_area" style={{ marginLeft: 804 }}>
          <FileListIndex isTaskFile={isTaskFile} cancel={cancelNew} taskData={taskData} />
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
            editTaskData={editTaskData}
            editTaskLoading={editTaskLoading}
            updatedTaskData={updatedTaskData}
          ></ModalTaskEdit>
        </div>
      ) : null}

      {openSubTaskStatusConfirm ?
        (<div className="pin_area">
          <ConfirmSubTaskStatus
            name='subtask'
            openAlertSTF={openSubTaskStatusConfirm}
            confirmSubTaskStatus={confirmSubTaskStatusUpdate}
            cancelSubTaskStatus={cancelSubTaskStatusUpdate}
            taskId={taskId}
            subTaskId={subTaskId}
            subTaskStatus={subTaskStatus}
          ></ConfirmSubTaskStatus>
        </div>) : null
      }

      {openSubTaskDeleteConfirm ? (
        <div className="pin_area">
          <SubTaskDelete
            openAlertSTDF={openSubTaskDeleteConfirm}
            confirmSubTaskDelete={confirmSubTaskDelete}
            cancelSubTaskDelete={cancelSubTaskDelete}
            taskId={taskId}
            subTaskId={subTaskId}
          ></SubTaskDelete>
        </div>) : null
      }
      {/* <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      /> */}

      <div className="TaskApp-container">
        <h3 className="alltask" style={{ marginBottom: '20px;' }}>{t("project_tab_menu.task.heading")}</h3>
        {taskListData?.tasks?.results?.map((task, id) => {
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
                viewAddPinFile={openViewAddPinFile}
                updateSubTaskStatus={updateSubTaskStatus}
                updateSubTask={updateSubTask}
                deleteSubTask={deleteSubTask}
                addSubTaskLoading={addSubTaskLoading}
                editSubTaskLoading={editSubTaskLoading}
                taskListData={taskListData}
                taskDeleteUpdateStatusLoading={taskDeleteUpdateStatusLoading}
              />
            </div>
          );
        })}

        {/* <div className="task-action-area">
          <button
            onClick={clickBottomAddTask}
            // className="ui large button btn-dashed  btn-large"
            className="ui small button primary add-new-task-btn">
            <i className="ms-Icon ms-Icon--Add" aria-hidden="true"></i> {t("project_tab_menu.task.add_new")}
          </button>
          <a href="">1 {t("project_tab_menu.task.completed_tasks")}</a>
        </div> */}

        <div className="completed-task-con expand">
          <h3 className="alltask">{t("project_tab_menu.task.completed_tasks")} <span>(1 {t("project_tab_menu.task.completed_tasks")})</span> <i className="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i></h3>
          <div className="tasks-completed-listing">
            <div className="card1 card-custom gutter-b card-complete">
              <div className="card-body">
                <div className="task-upper-con d-flex justify-content-between">
                  <div className="d-flex align-items-center py-2">
                    <span> <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} className="  mr-10 " />  </span>
                    <span className="textt">T-001</span>
                    <span className="anchor_complete">  <span className="check-it-complete task-completed mr-2 mr-10"><i className="ms-Icon ms-font-xl ms-Icon--Accept"></i></span>   </span>
                    <span className="completed-task-list-text line-through">Task title</span>
                    <div className="d-flex mr-3">
                      <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row task-listing-desc">
                        ( Fri Jul 30 2021 ↦ Due Sat Aug 07 2021)
                        <div className="navi-item">
                          <a className="navi-link">
                            <span className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>2 files  -  </span>
                          </a>
                        </div>
                        <div className="navi-item">
                          <a className="navi-link">
                            <span className="navi-text"> <i className="ms-Icon ms-Icon--CalendarAgenda" aria-hidden="true"></i> 5 days <span className="dash-seperator">-</span> </span>
                          </a>
                        </div>
                        <div className="navi-item">
                          <a className="navi-link">
                            <span className="navi-text">Realization  <span className="dash-seperator">-</span>  </span>
                          </a>
                        </div>
                        <div className="navi-item">
                          <a className="navi-link">
                            <span className="navi-text">Work Type 9   <span className="dash-seperator">-</span> </span>
                          </a>
                        </div>
                        <div className="navi-item">
                          <a className="navi-link">
                            <span className="navi-text"> 3 Check points  </span>
                          </a>
                        </div>
                      </div>

                    </div>

                    <div className="sub-task-list-toggle">
                      <Icon name='tasks' />
                    </div>

                  </div>

                  <div className="tasks-action-area">
                    <div className="navi-item  ">
                      <a className="navi-link">
                        <span className="navi-text">
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/pin_blue.png`} />
                        </span>
                      </a>
                    </div>

                    <div className="navi-item d-flex">
                      <a className="navi-link">
                        <span className="navi-text pin-action"> <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} /> </span>
                      </a>
                      <Popup trigger={<Button className="more-user-listing">3+</Button>} flowing hoverable>
                        <Grid>
                          <Grid.Column textAlign='center'>
                            <div className="user-tooltip-listing">
                              <Popup className="user-tooltip-name"
                                trigger={<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} />}
                                content='Mike'
                                size='mini'
                              />
                              <Popup className="user-tooltip-name"
                                trigger={<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} />}
                                content='John'
                                size='mini'
                              />
                              <Popup className="user-tooltip-name"
                                trigger={<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} />}
                                content='Hussy'
                                size='mini'
                              />
                              <Popup className="user-tooltip-name"
                                trigger={<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} />}
                                content='Kevin'
                                size='mini'
                              />
                            </div>
                          </Grid.Column>
                        </Grid>
                      </Popup>
                    </div>


                    <div className="symbol-group symbol-hover py-2" >
                      <div className="symbol symbol-30 d-flex">
                        <span>
                          <Dropdown icon='ellipsis horizontal' pointing='right'>
                            <Dropdown.Menu>
                              <Dropdown.Item icon='eye' text={t("common.view_details")} />
                              <Dropdown.Item icon='pencil' text={t("common.edit")} />
                              <Dropdown.Item icon='check circle outline' text={t("project_tab_menu.task.re_open")} />
                              <Dropdown.Item icon='trash alternate outline' text={t("common.delete")} />
                            </Dropdown.Menu>
                          </Dropdown>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <button
        onClick={clickBottomAddTask}
        className="ui large button btn-dashed  btn-large"
      >
        <i className="ms-Icon ms-Icon--AddTo" aria-hidden="true"></i> {t("project_tab_menu.task.add_new")}
      </button>
    </div>
  );
}

export default Tasks;
