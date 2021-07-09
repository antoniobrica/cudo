import { MS_SERVICE_URL } from '@cudo/mf-core';
import React, { Suspense } from 'react';
import { Dropdown, Form, Label } from 'semantic-ui-react';
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
    <div>
      <Form.Field style={{ marginTop: '20px' }} >
        <div className="card1 card-custom gutter-b" style={{ paddingTop: '12px' }}>
          {props.pinTasks && props.pinTasks.map((task, i) => {
            console.log("task status", task.status)
            return (
              <div>
                {
                  task.status === "COMPLETED" ?
                    <div key={task?.taskTypeID}>
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div style={{ color: props.cord.pinsID === task?.taskTypeID ? "red" : "" }} className="d-flex align-items-center  py-2">
                          <span>
                            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} style={{ marginRight: '6px !important;' }} />
                          </span>
                          <span onClick={() => updateStatus(task)} className="anchor_complete">  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/green_tick.png`} className=" mr-2 mr-10 " />   </span>
                          <span className="font-weight-bold mb-0 mr-10  ">
                            <div style={{ color: props.cord.pinsID === task?.taskTypeID ? "red" : "black" }}>{task.taskTitle}</div>
                          </span>
                        </div>
                        {task?.assignees.length > 0 ?
                          <div className="symbol-group symbol-hover py-2 text-right">
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
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2">
                          <span className="  mr-10 "> </span>
                          <span className=" mr-2 mr-10 "> </span>
                          <span
                            style={{ color: '#718898', fontSize: '11px;', fontWeight: 'normal', marginTop: '-12px' }}
                            className="font-weight-bold mb-0 mr-10 fontcad "
                          >
                            ( {new Date(task?.startDate).toDateString()} ↦ Due {new Date(task?.endDate).toDateString()})
                          </span>
                        </div>
                      </div>
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2" style={{ marginTop: '-9px' }}>
                          <span className=" mr-2 mr-10 li_area"></span>
                          <span className=" mr-2 mr-10 li_area">
                            <i
                              className="ms-Icon ms-Icon--LocationDot "
                              aria-hidden="true"
                              style={{ color: '#D0D8DF', verticalAlign: 'middle' }}
                            ></i>
                            Tender
                          </span>
                          <span className=" mr-2 mr-10 li_area">
                            <i
                              className="ms-Icon ms-Icon--LocationDot "
                              aria-hidden="true"
                              style={{ color: '#D0D8DF', verticalAlign: 'middle' }}
                            ></i>
                            {task?.phaseName}
                          </span>
                        </div>
                        <div className="symbol-group symbol-hover py-2 text-right" style={{ marginTop: '-9px' }}>
                          <div className="symbol symbol-30">
                            <span className="mr-2">
                              <Dropdown icon='ellipsis horizontal'>
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
                      <div style={{ borderTop: '1px solid #ddd', paddingTop: '12px' }}>
                      </div>
                    </div>
                    : <div key={task?.taskTypeID}>
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div style={{ color: props.cord.pinsID === task?.taskTypeID ? "red" : "" }} className="d-flex align-items-center  py-2">
                          <span>
                            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} style={{ marginRight: '6px !important;' }} />
                          </span>
                          <span onClick={() => updateStatus(task)} >
                            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/check_grey.png`} className=" mr-10 " />
                          </span>
                          <span className="font-weight-bold mb-0 mr-10  ">
                            <div style={{ color: props.cord.pinsID === task?.taskTypeID ? "red" : "black" }}>{task.taskTitle}</div>
                          </span>
                        </div>

                        {task?.assignees.length > 0 ?
                          <div className="symbol-group symbol-hover py-2 text-right">
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
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2">
                          <span className="  mr-10 "> </span>
                          <span className=" mr-2 mr-10 "> </span>
                          <span
                            style={{ color: '#718898', fontSize: '11px;', fontWeight: 'normal', marginTop: '-12px' }}
                            className="font-weight-bold mb-0 mr-10 fontcad "
                          >
                            ( {new Date(task?.startDate).toDateString()} ↦ Due {new Date(task?.endDate).toDateString()})
                          </span>
                        </div>
                      </div>
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2" style={{ marginTop: '-9px' }}>
                          <span className=" mr-2 mr-10 li_area"></span>
                          <span className=" mr-2 mr-10 li_area">
                            <i
                              className="ms-Icon ms-Icon--LocationDot "
                              aria-hidden="true"
                              style={{ color: '#D0D8DF', verticalAlign: 'middle' }}
                            ></i>
                            Tender
                          </span>
                          <span className=" mr-2 mr-10 li_area">
                            <i
                              className="ms-Icon ms-Icon--LocationDot "
                              aria-hidden="true"
                              style={{ color: '#D0D8DF', verticalAlign: 'middle' }}
                            ></i>
                            {task?.phaseName}
                          </span>
                        </div>
                        <div className="symbol-group symbol-hover py-2 text-right" style={{ marginTop: '-9px' }}>
                          <div className="symbol symbol-30">
                            <span className="mr-2">
                              <Dropdown icon='ellipsis horizontal'>
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
                      <div style={{ borderTop: '1px solid #ddd', paddingTop: '12px' }}>
                      </div>
                    </div>
                }
              </div>
            )
          })}
        </div>
      </Form.Field>
    </div>
  );
}

export default TaskListOnFilePins;
