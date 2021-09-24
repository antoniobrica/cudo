import { useTranslation } from 'react-i18next';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { LazyLoading } from '@cudo/shared-components';
import React, { Suspense, useEffect, useState } from 'react';
import { Dropdown, Form, Label, Button, Input, Icon } from 'semantic-ui-react';
/* eslint-disable-next-line */
export interface TaskListOnFilePinsProps {
  pinTasks?
  cord?
  updateTask?
  deleteTask?
  veiwTask?
  editTask?
  taskHovered?
  subTaskAdd?
  addSubTaskLoading?
  updateSubTask?
  updateSubTaskLoading?
  updateSubTaskStatus?
  updateSubTaskStatusLoading?
  deleteSubTask?
  deleteSubTaskLoading?
}

export function TaskListOnFilePins(props: TaskListOnFilePinsProps) {

  const { t, i18n } = useTranslation();

  const [taskHoveredId, setTaskHoveredId] = useState(null)

  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isExpended, setIsExpended] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [subtaskList, setSubtaskList] = useState([])
  const [isOpenSubtaskAdd, setIsOpenSubtaskAdd] = useState(false)

  const [subtaskTitle, setSubtaskTitle] = React.useState('')

  const [taskId, setTaskId] = React.useState(null);
  const [subTaskId, setSubTaskId] = React.useState(null);

  const [subtaskAddLoading, setSubTaskAddLoading] = useState(false)
  const [subtaskEditLoading, setSubTaskEditLoading] = useState(false)
  const [subtaskUpdateStatusLoading, setSubTaskUpdateStatusLoading] = useState(false)
  const [subtaskDeleteLoading, setSubTaskDeleteLoading] = useState(false)

  const [openSubTaskEdit, setOpenSubTaskEdit] = React.useState(false)

  // useEffect(() => {
  //   const filteredSubTasks = props?.pinTasks?.subtasks?.filter((item) => item.isDeleted !== true)
  //   setSubtaskData(filteredSubTasks)
  // }, [props?.pinTasks])

  useEffect(() => {
    if (props?.pinTasks) {
      setTaskList(props.pinTasks)
    }
  }, [props?.pinTasks])

  useEffect(() => {
    if (taskList && selectedTaskId) {
      const selectedTask = taskList.filter(task => task.taskID === selectedTaskId)
      const subTaskList = selectedTask[0].subtasks
      const filteredSubTasks = subTaskList?.filter((item) => item.isDeleted !== true)
      setSubtaskList(filteredSubTasks)
    }
  }, [selectedTaskId, taskList])

  useEffect(() => {
    if (!props.addSubTaskLoading) {
      setSubTaskAddLoading(false)
      setIsOpenSubtaskAdd(false)
    }
    if (!props.updateSubTaskLoading) {
      setSubTaskEditLoading(false)
      setOpenSubTaskEdit(false)
    }
    if (!props.updateSubTaskStatusLoading) {
      setSubTaskUpdateStatusLoading(false)
    }
    if (!props.deleteSubTaskLoading) {
      setSubTaskDeleteLoading(false)
    }
  }, [props?.pinTasks])

  const updateTaskStatus = (task) => {
    props.updateTask(task)
  }
  const deleteTaskbyId = (task) => {
    props.deleteTask(task)
  }
  const veiwTaskbyId = (task) => {
    props.veiwTask(task)
  }
  const editTaskbyId = (task) => {
    props.editTask(task)
  }

  const getTaskHovered = (task) => {
    setTaskHoveredId(task.taskTypeID)
    props.taskHovered(task.taskTypeID)
  }

  const openSubTask = (taskID) => {
    if (selectedTaskId === taskID) {
      setIsExpended(!isExpended)
    } else {
      setIsExpended(true)
      setSelectedTaskId(taskID)
    }
  }

  const onChangeSubtaskTitle = (e) => {
    setSubtaskTitle(e.target.value);
  }

  const onClickOpenSubTaskAdd = () => {
    if (selectedTaskId !== null && openSubTaskEdit === true) {
      setSubTaskId(null)
      setOpenSubTaskEdit(false)
    }
    setSubtaskTitle('')
    setIsOpenSubtaskAdd(true)
  }

  const createSubTask = (e, task) => {
    e.preventDefault()
    setSubTaskAddLoading(true)
    props.subTaskAdd(task, subtaskTitle)
    setSubtaskTitle('')
  }

  const cancelSubtaskAdd = (task) => {
    setIsOpenSubtaskAdd(false)
  }

  const onClickEditSubTask = (taskId, subTaskId, subTaskTitle) => {
    setSelectedTaskId(taskId)
    setSubTaskId(subTaskId)
    setSubtaskTitle(subTaskTitle)
    setOpenSubTaskEdit(true)
  }

  const onClickSubTaskUpdate = (taskId, subTaskId, subTaskTitle) => {
    setSubTaskEditLoading(true)
    if (isOpenSubtaskAdd === true) {
      setIsOpenSubtaskAdd(false)
    }
    // setOpenSubTaskEdit(false)
    props.updateSubTask(taskId, subTaskId, subTaskTitle)
  }

  const onClickCancelEditSubTask = () => {
    setSubTaskId(null)
    setSubtaskTitle('')
    setOpenSubTaskEdit(false)
  }

  const onClickDeleteSubTask = (taskId, subTaskId) => {
    setSubTaskDeleteLoading(true)
    props.deleteSubTask(taskId, subTaskId)
  }

  const onClickSubTaskStatusUpdate = (taskId, subTaskId, status) => {
    setSubTaskUpdateStatusLoading(true)
    props.updateSubTaskStatus(taskId, subTaskId, status)
  }


  let renderSubTaskEditForm = null
  const showEditForm = (subTaskStatus) => {
    if (selectedTaskId !== null && subTaskId !== null) {

      renderSubTaskEditForm =
        <div key={`edit-form-${subTaskId}`} className="add-new-task-con">
          {subtaskEditLoading ? <LazyLoading /> : <>
            <span className="anchor_complete">
              <i className={subTaskStatus === 'INPROGRESS' ? "ms-Icon ms-Icon--Accept" : "ms-Icon ms-Icon--Accept completed"} aria-hidden="true"></i>
            </span>
            <div className="classtop add-new-task-field">
              <Form.Field className="fillarea">

                <Input placeholder='Enter your text here....' size='small' className="full-width "
                  type="text"
                  value={subtaskTitle}
                  onChange={onChangeSubtaskTitle}
                />
              </Form.Field>
              <Form.Field className="d-flex">
                <button className="greenbutton anchor_complete" onClick={() => onClickSubTaskUpdate(selectedTaskId, subTaskId, subtaskTitle)}>
                  <i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i>
                </button> &nbsp;  <button className="redbutton anchor_complete" onClick={onClickCancelEditSubTask}>
                  <i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i> </button>
              </Form.Field>
            </div>
          </>}
        </div>
    }
    return renderSubTaskEditForm
  }

  let renderSubtaskItems = null
  const showSubTaskItems = (taskId, subTaskId, subTaskTitle, subtaskStatus, index) => {
    renderSubtaskItems =
      <div id={subTaskId} className="d-flex align-items-center checklist-listing-main">
        <span className="anchor_complete" onClick={() => onClickSubTaskStatusUpdate(taskId, subTaskId, subtaskStatus === 'INPROGRESS' ? 'COMPLETED' : 'INPROGRESS')}>

          {subtaskStatus === 'INPROGRESS' ?
            <a title={t("project_tab_menu.task.completed")}><i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i> </a>
            :
            <i className="ms-Icon ms-Icon--Accept completed" aria-hidden="true"></i>
          }
        </span>
        <span className="task-checklisting-text">{index + 1}. {subTaskTitle}</span>
        <span className="checklist-actions" onClick={() => onClickEditSubTask(taskId, subTaskId, subTaskTitle)} > <Icon name="pencil" /></span>
        <span className="checklist-actions" onClick={() => onClickDeleteSubTask(taskId, subTaskId)} >< Icon name="trash alternate outline" /> </span>
      </div>

    return renderSubtaskItems
  }

  return (
    <div className="detail-file-listing-box">
      <Form.Field>
        {taskList?.map((task, i) => {

          return (
            <div>
              <div
                className={props?.cord?.pinsID === task?.taskTypeID ? "pin-task-completed-card pin-task-hover" : "pin-task-completed-card"}
                onMouseOver={() => getTaskHovered(task)}
              >
                {/* <div className= "pin-task-completed-card"> */}
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} />
                <div className="pin-task-description-box">
                  <div className="task-full-details">
                    <div className="pin-task-info">
                      <h3>
                        <i className="ms-Icon ms-font-xl ms-Icon--Completed"></i>
                        {task.taskTitle}
                        <div className="sub-task-list-toggle" onClick={() => openSubTask(task.taskID)}> <Icon name='tasks' /> </div>
                      </h3>
                      {new Date(task?.startDate).toDateString()} ↦ Due {new Date(task?.endDate).toDateString()}
                    </div>
                    {/* <div className="user-img">
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/people_1.png`} />
                      </div> */}
                    {task?.assignees.length > 0 ?
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
                    <ul>
                      <li>Tender</li>
                      <li> {task?.phaseName}</li>
                    </ul>
                    <div className="symbol-group">
                      <div className="symbol symbol-30">
                        <span className="">
                          <Dropdown icon='ellipsis horizontal' pointing="right">
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => veiwTaskbyId(task)} icon='eye' text='View detail' />
                              <Dropdown.Item onClick={() => editTaskbyId(task)} icon='pencil' text='Edit' />
                              <Dropdown.Item onClick={() => updateTaskStatus(task)} icon='check circle outline' text='Mark as complete' />
                              <Dropdown.Item onClick={() => deleteTaskbyId(task)} icon='trash alternate outline' text='Delete' />
                            </Dropdown.Menu>
                          </Dropdown>
                        </span>
                      </div>
                    </div>
                  </div>

                  {
                    (subtaskDeleteLoading || subtaskUpdateStatusLoading) ? <LazyLoading /> : (
                      <>
                        {subtaskList && isExpended && (selectedTaskId === task.taskID) ?
                          <div className="add-task-checklist">

                            {subtaskList?.map((subtask, index) => {

                              const isSubTaskShowEdit = openSubTaskEdit === true && subtask.subtaskID === subTaskId

                              return isSubTaskShowEdit ? showEditForm(subtask?.status) : showSubTaskItems(task?.taskID, subtask?.subtaskID, subtask?.subtaskTitle, subtask?.status, index)

                            })}

                            {isOpenSubtaskAdd ?
                              <div className="add-new-task-con">
                                {subtaskAddLoading ? <LazyLoading /> :
                                  <>
                                    <span className="anchor_complete checklist-complete-box">
                                      <a title="Mark as complete"> <span><i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></span> </a>
                                    </span>
                                    <div className="classtop add-new-task-field">
                                      <Form.Field className="fillarea">
                                        <Input placeholder='Enter your text here....' size='small' className="full-width" type="text" value={subtaskTitle}
                                          onChange={onChangeSubtaskTitle} />
                                      </Form.Field>
                                      <Form.Field className="d-flex">
                                        <button className="greenbutton anchor_complete" onClick={(e) => createSubTask(e, task)}>
                                          <i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i>
                                        </button>
                                        <button className="redbutton anchor_complete" onClick={cancelSubtaskAdd}>
                                          <i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i>
                                        </button>
                                      </Form.Field>
                                    </div>
                                  </>}
                              </div>
                              :
                              <div className="add-new-checklist-button">
                                <div className="add-new-link" onClick={onClickOpenSubTaskAdd}> <span className="anchor_complete"><i className="ms-Icon ms-Icon--Add" aria-hidden="true"></i> Add new</span></div>
                              </div>
                            }
                          </div>
                          : null}
                      </>)
                  }

                </div>
              </div>




              {

                // task.status === "COMPLETED" ?
                // <div key={task?.taskTypeID}>
                //   <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
                //     <div style={{ color: props.cord.pinsID === task?.taskTypeID ? "red" : "" }} className="d-flex align-items-center">
                //       <span>
                //         <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} />
                //       </span>
                //       <span onClick={() => updateStatus(task)} className="anchor_complete">  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/green_tick.png`}  />   </span>
                //       <span>
                //         <div style={{ color: props.cord.pinsID === task?.taskTypeID ? "red" : "black" }}>{task.taskTitle}</div>
                //       </span>
                //     </div>
                //     {task?.assignees.length > 0 ?
                //       <div className="symbol-group symbol-hover text-right">
                //         <div className="symbol symbol-30">
                //           {task.assignees.map(({ userID, userName, imageUrl }, id) => {
                //             const name = userName.split(" ").map((n) => n[0]).join("");
                //             //   "FirstName LastName".split(" ").map((n)=>n[0]).join(".");
                //             if (imageUrl) {
                //               return (<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/people_1.png`} title={userName} />)
                //             } else {
                //               return (
                //                 <Label circular color="green" key={`${id}${userID}`}>{name}</Label>
                //               )
                //             }
                //           })
                //           }
                //         </div>
                //       </div>
                //       : null
                //     }
                //   </div>
                //   <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
                //     <div className="d-flex align-items-center">
                //       <span className=""> </span>
                //       <span className=""> </span>
                //       <span className="">
                //         ( {new Date(task?.startDate).toDateString()} ↦ Due {new Date(task?.endDate).toDateString()})
                //       </span>
                //     </div>
                //   </div>
                //   <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
                //     <div className="d-flex align-items-center">
                //       <span className=""></span>
                //       <span className="">
                //         <i className="ms-Icon ms-Icon--LocationDot " aria-hidden="true"></i>
                //         Tender
                //       </span>
                //       <span className="">
                //         <i className="ms-Icon ms-Icon--LocationDot " aria-hidden="true"></i>
                //         {task?.phaseName}
                //       </span>
                //     </div>
                //     <div className="symbol-group symbol-hover text-right">
                //       <div className="symbol symbol-30">
                //         <span className="">
                //           <Dropdown icon='ellipsis horizontal'>
                //             <Dropdown.Menu>
                //               <Dropdown.Item onClick={() => veiwTaskbyId(task)} icon='eye' text='View detail' />
                //               <Dropdown.Item onClick={() => editTaskbyId(task)} icon='pencil' text='Edit' />
                //               <Dropdown.Item onClick={() => updateStatus(task)} icon='check circle outline' text='Mark as complete' />
                //               <Dropdown.Item onClick={() => deleteTaskbyId(task)} icon='trash alternate outline' text='Delete' />
                //             </Dropdown.Menu>
                //           </Dropdown>
                //         </span>
                //       </div>
                //     </div>
                //   </div>
                // </div>
                // : <div key={task?.taskTypeID}>
                //   <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
                //     <div style={{ color: props.cord.pinsID === task?.taskTypeID ? "red" : "" }} className="d-flex align-items-center">
                //       <span>
                //         <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} />
                //       </span>
                //       <span onClick={() => updateStatus(task)} >
                //         <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/check_grey.png`} />
                //       </span>
                //       <span className="">
                //         <div style={{ color: props.cord.pinsID === task?.taskTypeID ? "red" : "black" }}>{task.taskTitle}</div>
                //       </span>
                //     </div>

                //     {task?.assignees.length > 0 ?
                //       <div className="symbol-group symbol-hover text-right">
                //         <div className="symbol symbol-30">
                //           {task.assignees.map(({ userID, userName, imageUrl }, id) => {
                //             const name = userName.split(" ").map((n) => n[0]).join("");
                //             //   "FirstName LastName".split(" ").map((n)=>n[0]).join(".");                                    
                //             if (imageUrl) {
                //               return (<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/people_1.png`} title={userName} />)
                //             } else {
                //               return (
                //                 <Label circular color="green" key={`${id}${userID}`}>{name}</Label>
                //               )
                //             }
                //           })
                //           }
                //         </div>
                //       </div>
                //       : null
                //     }
                //   </div>
                //   <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
                //     <div className="d-flex align-items-center  py-2">
                //       <span className=""> </span>
                //       <span className=""> </span>
                //       <span className="">
                //         ( {new Date(task?.startDate).toDateString()} ↦ Due {new Date(task?.endDate).toDateString()})
                //       </span>
                //     </div>
                //   </div>
                //   <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
                //     <div className="">
                //       <span className=""></span>
                //       <span className="">
                //         <i
                //           className="ms-Icon ms-Icon--LocationDot "
                //           aria-hidden="true"
                //         ></i>
                //         Tender
                //       </span>
                //       <span className="">
                //         <i
                //           className="ms-Icon ms-Icon--LocationDot "
                //           aria-hidden="true"
                //         ></i>
                //         {task?.phaseName}
                //       </span>
                //     </div>
                //     <div className="symbol-group symbol-hover text-right">
                //       <div className="symbol symbol-30">
                //         <span className="mr-2">
                //           <Dropdown icon='ellipsis horizontal'>
                //             <Dropdown.Menu>
                //               <Dropdown.Item onClick={() => veiwTaskbyId(task)} icon='eye' text='View detail' />
                //               <Dropdown.Item onClick={() => editTaskbyId(task)} icon='pencil' text='Edit' />
                //               <Dropdown.Item onClick={() => updateStatus(task)} icon='check circle outline' text='Mark as complete' />
                //               <Dropdown.Item onClick={() => deleteTaskbyId(task)} icon='trash alternate outline' text='Delete' />
                //             </Dropdown.Menu>
                //           </Dropdown>
                //         </span>
                //       </div>
                //     </div>
                //   </div>
                // </div>

              }
            </div>
          )
        })}
      </Form.Field>
    </div>
  );
}

export default TaskListOnFilePins;
