import { useMutation, useQuery } from '@apollo/client';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { TaskDelete } from '@cudo/mf-task-lib';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LazyLoading, LoaderPage, ModalAlert, ModalTaskEdit, ModalViewTask, TaskListOnFilePins } from '@cudo/shared-components';
import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ITask, ITasks } from '../../interfaces/task';
import { GET_TASKS, GET_TASKS_BY_TYPES, UPDATE_TASK, DELETE_TASK, UPDATE_SUBTASK_STATUS, UPDATE_SUBTASK, DELETE_SUBTASK } from './../../graphql/graphql';

import { useTaskUpdateMutation, useTaskDeleteMutation } from '../../services/useRequest';

import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Dropdown, Label, Radio } from 'semantic-ui-react';

/* eslint-disable-next-line */
export interface PinCompletedTaskListProps {
  filesData?
  cord?
  pinCompletedCount?
  taskHovered?
  parentWiseTaskFetch?
  isVersionSelected?
  isCompletedTaskShow?
}

export function PinCompletedTaskList(props: PinCompletedTaskListProps) {
  const history = useHistory();
  const { t } = useTranslation();

  const [viewTaskOpen, setViewTaskOpen] = React.useState(false);
  const [editTaskOpen, setEditTaskOpen] = React.useState(false);
  const [updateTaskStatusConfirmOpen, setUpdateTaskStatusConfirmOpen] = React.useState(false);
  const [deleteTaskConfirmOpen, setDeleteTaskConfirmOpen] = React.useState(false);


  const [pinTasks, setPinTasks] = React.useState([]);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [workTypes, setWorkTypes] = React.useState([]);
  const [taskData, setTaskData] = React.useState<ITask>(null);
  const [idx, setId] = React.useState('');
  const [taskStatus, settaskStatus] = React.useState('');

  const [taskHoveredId, setTaskHoveredId] = React.useState(null)

  const [subTaskId, setSubTaskId] = React.useState();
  const [taskErrors, setTaskErrors] = React.useState("")
  const [activeErrorClass, setActiveErrorClass] = React.useState(false)

  const [completedTaskShow, setCompletedTaskShow] = React.useState(false);
  const [completedTaskList, setCompletedTaskList] = React.useState([])

  const res = history.location.pathname.split("/");
  const referenceID = res[3]?.toString();

  const taskFetchFilter = props?.parentWiseTaskFetch === true ? {
    parentFileID: props?.isVersionSelected === true ?
      props?.filesData?.parentUploadedFileID
      : props?.filesData?.uploadedFileID,
    referenceID
  } : {
    fileID: props?.filesData?.uploadedFileID,
    referenceID
  }

  const { loading: taskListLoading, error: taskListError, data: taskListData } = useQuery(GET_TASKS_BY_TYPES, {
    variables: taskFetchFilter,
  });

  React.useEffect(() => {
    setCompletedTaskList(taskListData?.tasksByTasktypes?.filter(task => task.status === Status.COMPLETED))
  }, [taskListData])

  React.useEffect(() => {
    props.pinCompletedCount(completedTaskList?.length)
  }, [completedTaskList])

  // #region  API CAll
  // Task API
  const [updateTaskApi, { loading: updateTaskLoading, error: updateTaskError, data: updateTaskData }] = useMutation(UPDATE_TASK);
  const [updateTaskStatusApi, { loading: updateTaskStatusLoading, error: updateTaskStatusError, data: updateTaskStatusData }] = useMutation(UPDATE_TASK);
  const [deleteTaskApi, { loading: deleteTaskLoading, error: deleteTaskError, data: deleteTaskData }] = useMutation(DELETE_TASK);

  // Sub task API
  const [addSubTaskApi, { loading: addSubTaskLoading, error: addSubTaskError, data: addedSubTaskData }] = useMutation(UPDATE_TASK);
  const [subTaskUpdateApi, { loading: updateSubTaskLoading, error: updateSubTaskError, data: updateSubTaskData }] = useMutation(UPDATE_SUBTASK);
  const [subTaskStatusUpdateApi, { loading: updateSubTaskStatusLoading, error: updateSubTaskStatusError, data: updateSubTaskStatusData }] = useMutation(UPDATE_SUBTASK_STATUS);
  const [subTaskDeleteApi, { loading: deleteSubTaskLoading, error: deleteSubTaskError, data: deleteSubTaskData }] = useMutation(DELETE_SUBTASK);
  // #endregion

  enum Status {
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
  }

  const onClickShowCompletedTask = () => {
    setCompletedTaskShow(!completedTaskShow)
    props?.isCompletedTaskShow(!completedTaskShow)
  }

  const cancel = () => {
    setViewTaskOpen(false);
    setEditTaskOpen(false);
    setDeleteTaskConfirmOpen(false);
    setUpdateTaskStatusConfirmOpen(false)
  };

  //#region Task Feature

  // #region open modal on click event
  const onClickOpenViewTask = (task) => {
    setId(task.taskID)
    setTaskData(task);
    setViewTaskOpen(true);
  };

  const onClickOpenEditTask = (task) => {
    setId(task.taskID)
    setTaskData(task);
    setEditTaskOpen(true)
  };

  const onClickOpenDeleteTask = (task) => {
    setId(task.taskID)
    setTaskData(task);
    setDeleteTaskConfirmOpen(true);
  };

  const onClickUpdateTaskStatus = (task) => {
    const status = Status.INPROGRESS
    settaskStatus('Re-open')
    setId(task.taskID)
    setTaskData({ ...task, status });
    setUpdateTaskStatusConfirmOpen(true);
  };
  // #endregion

  // #region on Api call methods

  const updateTaskDetail = (data) => {

    setEditTaskOpen(false)
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
        sendNotification: data.sendNotification,
        BKPID: data.BKPID,
        BKPTitle: data.BKPTitle,
        workTypeID: data.workTypeID,
        workTypeName: data.workTypeName,
        saveTaskAsTemplate: data.saveTaskAsTemplate,
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
          variables: taskFetchFilter,
        }) as ITasks;

        const updatedTaskList = cacheData?.tasksByTasktypes?.map((item) => {

          if (item.taskID === updatedTaskData?.data?.updateTask[0].taskID) {
            item = updatedTaskData?.data?.updateTask[0]
          }
          return item
        });

        cache.writeQuery({
          query: GET_TASKS_BY_TYPES,
          variables: taskFetchFilter,
          data: {
            tasksByTasktypes: updatedTaskList,
          },
        });
      },
    });
  };

  const deleteTaskDetail = (data, task) => {

    setDeleteTaskConfirmOpen(false);
    const taskID = task.taskID;
    deleteTaskApi({
      variables: {
        taskID,
      },
      update: (cache, data) => {

        const cacheData = cache.readQuery({
          query: GET_TASKS_BY_TYPES,
          variables: taskFetchFilter,
        }) as ITasks;

        const newTaskList = cacheData?.tasksByTasktypes?.filter((task) => task.taskID !== taskID)

        cache.writeQuery({
          query: GET_TASKS_BY_TYPES,
          variables: taskFetchFilter,
          data: {
            tasksByTasktypes: newTaskList,
          },
        });
      },
    });
  };

  const updateTaskStatusDetail = (data, task) => {

    setUpdateTaskStatusConfirmOpen(false)

    const assignees = [];
    task.assignees.map((data, i) => {
      assignees.push({ userID: data.userID, userName: data.userName })
    })
    const followers = [];
    task.followers.map((data, i) => {
      followers.push({ userID: data.userID, userName: data.userName })
    })

    updateTaskStatusApi({
      variables: {
        taskID: task.taskID,
        status: task.status,
        taskTitle: task.taskTitle,
        startDate: task.startDate,
        endDate: task.endDate,
        estimatedDays: task.estimatedDays,
        sendNotification: task.sendNotification,
        BKPID: task.BKPID,
        BKPTitle: task.BKPTitle,
        saveTaskAsTemplate: task.saveTaskAsTemplate,
        phaseID: task.phaseID,
        phaseName: task.phaseName,
        referenceID: task.referenceID,
        description: task.description,
        files: [],
        subtasks: [],
        assignees,
        followers,
        workTypeName: task.workTypeName,
        workTypeID: task.workTypeID,
      },
      update: (cache, updatedTaskData) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS_BY_TYPES,
          variables: taskFetchFilter,
        }) as ITasks;

        const updatedTaskList = cacheData?.tasksByTasktypes?.map((item) => {
          if (item.taskID === updatedTaskData?.data?.updateTask[0].taskID) {
            item = updatedTaskData?.data?.updateTask[0]
          }
          return item
        });

        cache.writeQuery({
          query: GET_TASKS_BY_TYPES,
          variables: taskFetchFilter,
          data: {
            tasksByTasktypes: updatedTaskList,
          },
        });
      },
    });
  };

  React.useEffect(() => {
    if (!updateTaskStatusLoading && updateTaskStatusData) {
      updatePinStatus(updateTaskStatusData?.updateTask[0])
    }
  }, [updateTaskStatusData])


  const mutationUpdatePinStatus = `mutation UpdatePinStatus(
    $uploadedFileID:String!,
    $pinsID:String!
  ){
    updatePinStatus(
      pinsStatusUpdateDto: { status: INPROGRESS }
      pinsFilter: {
        uploadedFileID: $uploadedFileID # "ca813050-095f-11ec-b7f7-13a0db5fb508"
        pinsID: $pinsID # "74c80bc0-1ef9-11ec-923a-794fe5586615"
      }
    ){
      pinsID
      uploadedFileID
      x_axis
      y_axis
      z_axis
      pinNumber
      pageNumber
      isDeleted
      createdBy
      createdAt
      updatedBy
      updatedAt
      status
      taskID
      taskTitle
    }
  }`

  const updatePinStatus = (taskData) => {

    return axios.post(
      MS_SERVICE_URL['ms_document'].url,
      {
        query: mutationUpdatePinStatus,
        variables: {
          uploadedFileID: taskData.fileID,
          pinsID: taskData.taskTypeID
        }
      }
    ).then(res => {

    })
      .catch(err => console.log(err))
  }


  // #endregion

  // #endregion

  // const taskHovered = (taskTypeID) => {
  //   props.taskHovered(taskTypeID)
  // };

  const getTaskHovered = (task) => {
    setTaskHoveredId(task.taskTypeID)
    props.taskHovered(task.taskTypeID)
  }

  // #region Subtask feature
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
          variables: taskFetchFilter,
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
          variables: taskFetchFilter,
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
          variables: taskFetchFilter,
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
          variables: taskFetchFilter,
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
        status: subtaskStatus === 'Mark as Complete' ? Status.COMPLETED : Status.INPROGRESS
      },
      update: (cache, data) => {

        const cacheData = cache.readQuery({
          query: GET_TASKS_BY_TYPES,
          variables: taskFetchFilter,
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
          variables: taskFetchFilter,
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
          variables: taskFetchFilter,
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
          variables: taskFetchFilter,
          data: {
            tasksByTasktypes: newTaskList,
          },
        });
      },
    })
  };
  // #endregion

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

  if (taskListLoading) return (<LazyLoading />)

  if (updateTaskLoading) return (<LazyLoading />)

  if (deleteTaskLoading) return (<LazyLoading />)

  return (
    <div>
      <ToastContainer className={`${activeErrorClass ? "error" : "success"}`} position="top-right" autoClose={5000} hideProgressBar={true} closeOnClick pauseOnFocusLoss pauseOnHover />

      {viewTaskOpen ? (
        <div className="pin_area">
          <ModalViewTask
            openAlertF={viewTaskOpen}
            taskData={taskData}
            taskStatus={taskStatus}
            cancel={cancel}
            id={idx}
            editTask={onClickOpenEditTask}
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
            editTaskData={updateTaskDetail}
          ></ModalTaskEdit>
        </div>
      ) : null}

      {deleteTaskConfirmOpen ? (
        <div className="pin_area">
          <TaskDelete
            openAlertF={deleteTaskConfirmOpen}
            confirm={deleteTaskDetail}
            taskData={taskData}
            taskStatus={taskStatus}
            cancel={cancel}
          ></TaskDelete>
        </div>
      ) : null}

      {updateTaskStatusConfirmOpen ? (
        <div className="pin_area">
          <ModalAlert
            name='task'
            openAlertF={updateTaskStatusConfirmOpen}
            confirm={updateTaskStatusDetail}
            taskData={taskData}
            taskStatus={taskStatus}
            cancel={cancel}
          ></ModalAlert>
        </div>
      ) : null}


      {loading ? <LoaderPage /> :
        <>
          <div className="toggle-label">
            <label>Completed Tasks ({completedTaskList?.length})</label>
            <Radio toggle onChange={onClickShowCompletedTask} />
          </div>
          {completedTaskShow ?
            <>
              {completedTaskList?.map((task) => {

                return (
                  <div className={props?.cord?.pinsID === task?.taskTypeID ? "pin-task-completed-card pin-task-hover" : "pin-task-completed-card"}
                    onMouseOver={() => getTaskHovered(task)}>
                    <div className="pin-task-description-box">
                      <div className="task-full-details">
                        <div className="pin-task-info">
                          <h3 className="task-completed">
                            <i className="ms-Icon ms-font-xl ms-Icon--Completed"></i>
                            {task?.taskTitle}
                          </h3>
                          {/* <p>Starts Tomorrow ↦ Due Fri Aug 28th</p> */}
                          <p>{new Date(task?.startDate).toDateString()} ↦ Due {new Date(task?.endDate).toDateString()}</p>
                        </div>
                        {/* <div className="user-img">
                              <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/people_1.png`} />
                            </div> */}
                        {task?.assignees?.length > 0 ?
                          <div className="symbol-group symbol-hover text-right">
                            <div className="symbol symbol-30">
                              {task.assignees.map(({ userID, userName, imageUrl }, id) => {
                                const name = userName.split(" ").map((n) => n[0]).join("");
                                //   "FirstName LastName".split(" ").map((n)=>n[0]).join(".");
                                if (imageUrl) {
                                  return (<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/people_1.png`} title={userName} />)
                                } else {
                                  return (
                                    <Label circular color="green" key={`${id}${userID}`}>{name}</Label>
                                  )
                                }
                              })
                              }
                            </div>
                          </div>
                          : null
                        }
                      </div>
                      <div className="added-task-listing">
                        {/* <p>Strategic Planning - Paint Work</p> */}
                        <p>{task?.workTypeName} - {task?.phaseName}</p>
                        <div className="symbol-group">
                          <div className="symbol symbol-30">
                            <span className="">
                              <Dropdown icon='ellipsis horizontal' pointing="right">
                                <Dropdown.Menu>
                                  <Dropdown.Item icon='eye' text='View detail' onClick={() => onClickOpenViewTask(task)} />
                                  <Dropdown.Item icon='pencil' text='Edit' onClick={() => onClickOpenEditTask(task)} />
                                  <Dropdown.Item icon='check circle outline' text='Re-open' onClick={() => onClickUpdateTaskStatus(task)} />
                                  <Dropdown.Item icon='trash alternate outline' text='Delete' onClick={() => onClickOpenDeleteTask(task)} />

                                </Dropdown.Menu>
                              </Dropdown>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
            : null}
        </>
      }
    </div>
  );
}


