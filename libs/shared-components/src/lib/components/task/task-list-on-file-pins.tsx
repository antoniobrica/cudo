import { MS_SERVICE_URL } from '@cudo/mf-core';
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
}

export function TaskListOnFilePins(props: TaskListOnFilePinsProps) {
  const [taskHoveredId, setTaskHoveredId] = useState(null)

  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isExpended, setIsExpended] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [subtaskList, setSubtaskList] = useState([])
  const [isOpenSubtaskAdd, setIsOpenSubtaskAdd] = useState(false)

  const [subtaskTitle, setSubtaskTitle] = React.useState('')

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

  const updateStatus = (task) => {
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
    // console.log('--task-list-on-file-pins--getTaskHovered--task--', task)
    setTaskHoveredId(task.taskTypeID)
    props.taskHovered(task.taskTypeID)
  }

  const openSubTask = (taskID) => {
    console.log('--taskID--', taskID)
    if (selectedTaskId === taskID) {
      setIsExpended(!isExpended)
    } else {
      setIsExpended(true)
      setSelectedTaskId(taskID)
    }
  }

  const onClickOpenSubTaskAdd = () => {
    // if (selectedTaskId !== null && openSubTaskEdit === true) {
    //   setSubTaskId(null)
    //   setOpenSubTaskEdit(false)
    // }
    // setSubtaskTitle('')
    setIsOpenSubtaskAdd(true)
  }

  const onChangeSubtaskTitle = (e) => {
    setSubtaskTitle(e.target.value);
  }

  const createSubTask = (task) => {
    console.log('--createSubTask--task--', task)
    // setSubTaskAddLoading(true)
    // props.subTaskAdd(task, subtaskTitle)
    // setSubtaskTitle('')
  }

  const cancelSubtaskAdd = (task) => {
    setIsOpenSubtaskAdd(false)
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
                              <Dropdown.Item onClick={() => updateStatus(task)} icon='check circle outline' text='Mark as complete' />
                              <Dropdown.Item onClick={() => deleteTaskbyId(task)} icon='trash alternate outline' text='Delete' />
                            </Dropdown.Menu>
                          </Dropdown>
                        </span>
                      </div>
                    </div>
                  </div>

                  {subtaskList && isExpended && (selectedTaskId === task.taskID) ?
                    <div className="add-task-checklist">

                      {subtaskList?.map((subtask, index) => {

                        return (<div id={subtask?.subtaskID} className="d-flex align-items-center checklist-listing-main">
                          <span className="anchor_complete">
                            <i className="ms-Icon ms-Icon--Accept completed" aria-hidden="true"></i>
                          </span>
                          <span className="task-checklisting-text">{index + 1}. {subtask?.subtaskTitle}</span>
                          <span className="checklist-actions"> <Icon name="pencil" /></span>
                          <span className="checklist-actions">< Icon name="trash alternate outline" /> </span>
                        </div>)
                      })}

                      {isOpenSubtaskAdd ?
                        <div className="add-new-task-con">
                          <span className="anchor_complete checklist-complete-box">
                            <a title="Mark as complete"> <span><i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></span> </a>
                          </span>
                          <div className="classtop add-new-task-field">
                            <Form.Field className="fillarea">
                              <Input placeholder='Enter your text here....' size='small' className="full-width" type="text" value={subtaskTitle}
                                onChange={onChangeSubtaskTitle} />
                            </Form.Field>
                            <Form.Field className="d-flex">
                              <button className="greenbutton anchor_complete" onClick={() => createSubTask(task)}>
                                <i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i>
                              </button>
                              <button className="redbutton anchor_complete" onClick={cancelSubtaskAdd}>
                                <i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i>
                              </button>
                            </Form.Field>
                          </div>
                        </div>
                        :
                        <div className="add-new-checklist-button">
                          <div className="add-new-link" onClick={onClickOpenSubTaskAdd}> <span className="anchor_complete"><i className="ms-Icon ms-Icon--Add" aria-hidden="true"></i> Add new</span></div>
                        </div>
                      }
                    </div>
                    : null}

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
