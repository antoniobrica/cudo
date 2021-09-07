import { MS_SERVICE_URL } from '@cudo/mf-core';
import React, { Suspense } from 'react';
import { Dropdown, Form, Label, Button, Input, Icon } from 'semantic-ui-react';
/* eslint-disable-next-line */
export interface TaskListOnFilePinsProps {
  pinTasks?
  cord?
  updateTask?
  deleteTask?
  veiwTask?
  editTask?
}

export function TaskListOnFilePins(props: TaskListOnFilePinsProps) {
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
  return (
    <div className="detail-file-listing-box">
      <Form.Field>
          {props.pinTasks && props.pinTasks.map((task, i) => {
            return (
              <div>
                <div className={props?.cord?.pinsID === task?.taskTypeID ? "pin-task-completed-card pin-task-hover" : "pin-task-completed-card"}>
                  {/* <div className= "pin-task-completed-card"> */}
                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} />
                  <div className="pin-task-description-box">
                    <div className="task-full-details">
                      <div className="pin-task-info">
                        <h3>
                          <i className="ms-Icon ms-font-xl ms-Icon--Completed"></i>
                          {task.taskTitle}
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
                    <div className="add-task-checklist">
                      <div className="d-flex align-items-center checklist-listing-main">
                        <span className="anchor_complete">
                            <i className="ms-Icon ms-Icon--Accept completed" aria-hidden="true"></i>
                        </span>
                        <span className="task-checklisting-text">1. Checklist 1</span>
                        <span className="checklist-actions"> <Icon name="pencil" /></span>
                        <span className="checklist-actions">< Icon name="trash alternate outline" /> </span>
                      </div>

                      <div className="add-new-task-con">
                        <span className="anchor_complete checklist-complete-box">
                          <a title="Mark as complete"> <span><i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></span> </a>
                        </span>
                        <div className="classtop add-new-task-field">
                          <Form.Field className="fillarea">
                            <Input placeholder='Enter your text here....' size='small' className="full-width" type="text" />
                          </Form.Field>
                          <Form.Field className="d-flex">
                            <button className="greenbutton anchor_complete">
                              <i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i>
                            </button> 
                            <button className="redbutton anchor_complete">
                              <i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i> 
                            </button>
                          </Form.Field>
                        </div>
                      </div>

                      <div className="add-new-checklist-button">
                        <div className="add-new-link"> <span className="anchor_complete"><i className="ms-Icon ms-Icon--Add" aria-hidden="true"></i> Add new</span></div>
                      </div>
                    </div>
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
