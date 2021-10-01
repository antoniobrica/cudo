import React, { useEffect, useState } from 'react';

import './../../../assets/style/index.scss'
import { Segment, Dropdown, Input, Grid, Form, Icon, Popup, Button, Dimmer, Loader } from 'semantic-ui-react';

import { useTranslation } from 'react-i18next';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import LazyLoading from '../loader/lazyloader';
/* eslint-disable-next-line */
export interface Tasks {
  task?,
  comments?
  id?,
  updateTask?,
  veiwTask?,
  deleteTask?,
  editTask?
  subTask?
  updateSubTaskStatus?
  updateSubTask?
  deleteSubTask?
  addSubTaskLoading?
  editSubTaskLoading?
  taskListData?
  taskDeleteUpdateStatusLoading?
  viewAddPinFile?
}

export function TaskArea(props: Tasks) {
  const { t, i18n } = useTranslation();
  const [taskId, setTaskId] = React.useState(null);
  const [subTaskId, setSubTaskId] = React.useState(null);
  const [subtaskTitle, setSubtaskTitle] = React.useState('')
  const [subtaskData, setSubtaskData] = React.useState([])
  const [viewSubTaskAdd, setViewSubTaskAdd] = React.useState(false);
  const [isExpended, setIsExpended] = React.useState(false)
  const [openSubTaskEdit, setOpenSubTaskEdit] = React.useState(false)
  const [subtaskAddLoading, setSubTaskAddLoading] = useState(false)
  const [subtaskEditLoading, setSubTaskEditLoading] = useState(false)
  const [subtaskDeleteLoading, setSubTaskDeleteLoading] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const filteredSubTasks = props?.task?.subtasks.filter((item) => item.isDeleted !== true)
    setSubtaskData(filteredSubTasks)
  }, [props?.task])

  useEffect(() => {
    const taskComments = props?.comments?.filter(comment => comment.taskID === props.task.taskID)
    setComments(taskComments)
  }, [props?.comments])

  useEffect(() => {
    if (!props.addSubTaskLoading) {
      setSubTaskAddLoading(false)
    }
    setViewSubTaskAdd(false)
  }, [props?.taskListData])

  useEffect(() => {
    setSubTaskDeleteLoading(false)
  }, [props.taskListData])

  useEffect(() => {
    if (!props.editSubTaskLoading) {
      setSubTaskEditLoading(false)

    }
    setOpenSubTaskEdit(false)
  }, [props?.taskListData])

  const description = [
    <Segment>Pellentesque habitant morbi tristique senectus.</Segment>
  ]
  const updateStatus = (task, id) => {
    props.updateTask(task, id)
  }
  const deleteTaskbyId = (task, id) => {
    props.deleteTask(task, id)
  }
  const veiwTaskbyId = (task, id) => {
    if (props.task?.taskType === 'PIN') {
      props.viewAddPinFile(task, id)
    } else {
      props.veiwTask(task, id)
    }
  }
  const editTaskbyId = (task, id) => {
    props.editTask(task, id)
  }
  const openSubTask = (task, id) => {
    setTaskId(id)
    setIsExpended(true)
  }
  const closeSubTask = () => {
    setTaskId(null)
    setIsExpended(false)
  }
  const onSubtaskTitle = (e) => {
    setSubtaskTitle(e.target.value);
  }
  const createSubTask = (task) => {
    setSubTaskAddLoading(true)
    const subTaskTitle = subtaskTitle;
    props.subTask(task, subTaskTitle)
    // setViewSubTaskAdd(false)
    setSubtaskTitle('')
  }

  const cancelSubtaskAdd = (task) => {
    setViewSubTaskAdd(false)
  }
  const addNewSubTask = () => {
    if (subTaskId !== null && openSubTaskEdit === true) {
      setSubTaskId(null)
      setOpenSubTaskEdit(false)
    }
    setSubtaskTitle('')
    setViewSubTaskAdd(true)
  }

  const onClickSubTaskStatusUpdate = (taskId, subTaskId, status) => {
    setSubTaskDeleteLoading(true)
    props.updateSubTaskStatus(taskId, subTaskId, status)
  }

  const onClickEditSubTask = (taskId, subTaskId, subTaskTitle) => {
    setSubTaskId(subTaskId)
    setSubtaskTitle(subTaskTitle)
    setOpenSubTaskEdit(true)
  }

  const onClickSubTaskUpdate = (taskId, subTaskId, subTaskTitle) => {
    setSubTaskEditLoading(true)
    if (viewSubTaskAdd === true) {
      setViewSubTaskAdd(false)
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

  let renderSubTaskEditForm = null
  const showEditForm = () => {
    if (taskId !== null && subTaskId !== null && subtaskTitle !== '') {

      renderSubTaskEditForm =
        <div key={`edit-form-${subTaskId}`} className="add-new-task-con">
          {subtaskEditLoading ? <LazyLoading /> : <>
            <span className="anchor_complete checklist-complete-box"><a title={t("project_tab_menu.task.completed")}> <span><i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></span> </a> </span>
            <div className="classtop add-new-task-field">
              <Form.Field className="fillarea">

                <Input placeholder='Enter your text here....' size='small' className="full-width "
                  type="text"
                  value={subtaskTitle}
                  onChange={onSubtaskTitle}
                />
              </Form.Field>
              <Form.Field className="d-flex">
                <button className="greenbutton anchor_complete" onClick={() => onClickSubTaskUpdate(props.task.taskID, subTaskId, subtaskTitle)}>
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
      <div className="d-flex align-items-center checklist-listing-main" key={subTaskId}>
        <span className="anchor_complete" onClick={() => onClickSubTaskStatusUpdate(taskId, subTaskId, subtaskStatus === 'INPROGRESS' ? 'COMPLETED' : 'INPROGRESS')}>
          {subtaskStatus === 'INPROGRESS' ?
            <a title={t("project_tab_menu.task.completed")}><i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i> </a>
            :
            <i className="ms-Icon ms-Icon--Accept completed" aria-hidden="true"></i>
          }
        </span>
        <span className="task-checklisting-text">{index + 1}. {subTaskTitle}</span>


        <span className="checklist-actions" onClick={() => onClickEditSubTask(taskId, subTaskId, subTaskTitle)}> <Icon name="pencil" /></span>
        <span className="checklist-actions" onClick={() => onClickDeleteSubTask(taskId, subTaskId)}>< Icon name="trash alternate outline" /> </span>

      </div>

    return renderSubtaskItems
  }


  return (
    <div>
      {props?.task?.status === "COMPLETED" ?
        <div className="card1 card-custom gutter-b card-complete">

          <div className="card-body">

            <div className="task-upper-con d-flex justify-content-between">

              <div className="d-flex align-items-center py-2">
                <span> <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} className="  mr-10 " />  </span>
                <span className="textt">T-{props?.task?.sequenceNumber}</span>
                <span onClick={() => updateStatus(props.task, props.id)} className="anchor_complete">  <span className="check-it-complete task-completed mr-2 mr-10"><i className="ms-Icon ms-font-xl ms-Icon--Accept"></i></span>   </span>
                <span className="completed-task-list-text line-through">{props?.task?.taskTitle}</span>
                <div className="d-flex mr-3">

                  <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row task-listing-desc">
                    {props?.task?.files.length > 0 && (
                      <div className="navi-item">
                        <a className="navi-link">
                          <span className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>{props?.task?.files?.length} files  -  </span>
                        </a>
                      </div>
                    )
                    }
                    <div className="navi-item">
                      <a className="navi-link">
                        <span className="navi-text"> <i className="ms-Icon ms-Icon--CalendarAgenda" aria-hidden="true"></i> 5 {t("project_tab_menu.task.days")} <span className="dash-seperator">-</span> </span>
                      </a>
                    </div>
                    {props?.task?.phaseName && (
                      <div className="navi-item">
                        <a className="navi-link">
                          <span className="navi-text">{props?.task?.phaseName}  <span className="dash-seperator">-</span>  </span>
                        </a>
                      </div>
                    )}
                    {props?.task?.workTypeName &&
                      <div className="navi-item">
                        <a className="navi-link">
                          <span className="navi-text">{props?.task?.workTypeName} </span>
                        </a>
                      </div>
                    }

                    {/* <div className="navi-item">
                      <a className="navi-link">
                        <span className="navi-text">Paint Work   <span className="dash-seperator">-</span> </span>
                      </a>
                    </div> */}
                    { // props?.task?.subtasks?.length > 0 ?
                      subtaskData?.length > 0 ?
                        <div className="navi-item">
                          <a className="navi-link">
                            <span className="navi-text"> - &nbsp;{subtaskData?.length} {t("project_tab_menu.task.check_points")}  </span>
                          </a>
                        </div> : null
                    }
                    {/* {props.task.taskType &&
                      <div className="navi-item">
                        <a className="navi-link">
                          <span className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>{props.task.taskType} </span>
                        </a>
                      </div>
                    } */}
                    {/* {props.task.assignees && props.task.assignees.map((as, i) => {
                      return (
                        <div className="navi-item">
                          <a className="navi-link">
                            <span className="navi-text">as  - </span>
                          </a>
                        </div>
                      )
                    })} */}
                  </div>

                </div>

                <div className="sub-task-list-toggle">
                  <Icon name='tasks' />
                </div>

              </div>

              <div className="tasks-action-area">

                {props.task?.taskType &&
                  <div className="navi-item  ">
                    <a className="navi-link">
                      <span className="navi-text">
                        {props.task.taskType == 'PIN' &&
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/pin_blue.png`} />
                        }

                      </span>
                    </a>
                  </div>
                }
                {/* {props.task.assignees && props.task.assignees.map((as, i) => {
                  return (
                    <div className="navi-item " style={{ paddingLeft: '154px' }}>
                      <a className="navi-link">
                        <span className="navi-text"> <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} /> </span>
                      </a>
                    </div>
                  )
                })} */}
                {props.task?.assignees.length > 0 ?

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
                  </div> : null
                }


                <div className="symbol-group symbol-hover py-2" >
                  <div className="symbol symbol-30 d-flex">


                    {/* <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user2.png`} /> */}
                    <span  >

                      <Dropdown icon='ellipsis horizontal' pointing='right'>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => veiwTaskbyId(props.task, props.id)} icon='eye' text={t("common.view_details")} />
                          <Dropdown.Item onClick={() => editTaskbyId(props.task, props.id)} icon='pencil' text={t("common.edit")} />
                          <Dropdown.Item onClick={() => updateStatus(props.task, props.id)} icon='check circle outline' text={t("project_tab_menu.task.re_open")} />
                          <Dropdown.Item onClick={() => deleteTaskbyId(props.task, props.id)} icon='trash alternate outline' text={t("common.delete")} />
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        :

        <div className={props?.task?.taskType && props?.task?.taskType == 'PIN' ? "card1 card-custom gutter-b task-main-con pinned-box" : "card1 card-custom gutter-b task-main-con"} >
          <div className="card-body">
            <div className="task-upper-con d-flex justify-content-between">
              <div className="d-flex align-items-center py-2">
                <span> <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} className="  mr-10 " />  </span>
                <span className="textt">T-{props?.task?.sequenceNumber}</span>
                <span onClick={() => updateStatus(props.task, props.id)}><span className="anchor_complete"><a title={t("project_tab_menu.task.completed")}> <span className="check-it-complete mr-2 mr-10"><i className="ms-Icon ms-font-xl ms-Icon--Accept"></i></span></a> </span></span>
                <span className="task-heading">{props?.task?.taskTitle}</span>
                <div className="d-flex mr-3">

                  <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row task-listing-desc">

                    {(props?.task.startDate || props?.task?.endDate) && (
                      <div className="navi-item">
                        <a className="navi-link active">
                          <span className="navi-text">( {props?.task?.startDate && new Date(props?.task?.startDate).toDateString()} ↦ {props?.task?.endDate && new Date(props?.task?.endDate).toDateString()})</span>
                        </a>
                      </div>)}

                    {props?.task?.files.length > 0 && (
                      <div className="navi-item">
                        <a className="navi-link">
                          <span className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>{props?.task?.files?.length} files  -  </span>
                        </a>
                      </div>
                    )
                    }

                    {props?.task?.estimatedDays && (
                      <div className="navi-item">
                        <a className="navi-link">
                          <span className="navi-text"> <i className="ms-Icon ms-Icon--CalendarAgenda" aria-hidden="true"></i> {props?.task?.estimatedDays} {t("project_tab_menu.task.days")} <span className="dash-seperator">-</span> </span>
                        </a>
                      </div>)}
                    {props?.task?.phaseName && (
                      <div className="navi-item">
                        <a className="navi-link">
                          <span className="navi-text">{props?.task?.phaseName} <span className="dash-seperator"> - </span> </span>
                        </a>
                      </div>)}
                    {props?.task?.workTypeName &&
                      <div className="navi-item">
                        <a className="navi-link">
                          <span className="navi-text"> {props?.task?.workTypeName}  </span>
                        </a>
                      </div>
                    }
                    {
                      comments.length > 0 && (
                        <div className="navi-item">
                          <a className="navi-link">
                            <span className="navi-text">- &nbsp; {comments.length} &nbsp; <i className="ms-Icon ms-Icon--Comment" aria-hidden="true"></i></span>
                          </a>
                        </div>
                      )
                    }
                    {// props?.task?.subtasks?.length > 0 ?
                      subtaskData?.length > 0 ?
                        <div className="navi-item">
                          <a className="navi-link">
                            <span className="navi-text"> - &nbsp;{subtaskData?.length} {t("project_tab_menu.task.check_points")}  </span>
                          </a>
                        </div> : null
                    }

                  </div>

                </div>

                <div className="sub-task-list-toggle" onClick={() => !isExpended ? openSubTask(props.task, props.id) : closeSubTask()}>
                  <Icon name='tasks' />
                </div>
              </div>

              <div className="tasks-action-area">
                {props.task?.taskType &&
                  <div className="navi-item  ">
                    <a className="navi-link">
                      <span className="navi-text pin-action">
                        {props.task.taskType == 'PIN' &&
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/pin_blue.png`} />
                        }

                      </span>
                    </a>
                  </div>
                }
                {props.task?.assignees.length > 0 ?

                  <div className="navi-item d-flex">
                    <a className="navi-link">
                      <span className="navi-text"> <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} /> </span>
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
                  </div> : null
                }
                <div className="symbol-group symbol-hover py-2">
                  <div className="symbol symbol-30 d-flex">


                    {/* <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} /> */}
                    <span  >

                      <Dropdown icon='ellipsis horizontal' pointing='right'>
                        <Dropdown.Menu className="dropdowncomplete">
                          <Dropdown.Item onClick={() => veiwTaskbyId(props.task, props.id)} icon='eye' text={t("common.view_details")} />
                          <Dropdown.Item onClick={() => editTaskbyId(props.task, props.id)} icon='pencil' text={t("common.edit")} />
                          <Dropdown.Item onClick={() => updateStatus(props.task, props.id)} icon='check circle outline' text={t("project_tab_menu.task.completed")} />
                          <Dropdown.Item onClick={() => deleteTaskbyId(props.task, props.id)} icon='trash alternate outline' text={t("common.delete")} />
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                  </div>

                </div>
              </div>
            </div>
            {
              isExpended && subtaskData && (taskId === props.id) ?

                <div className="card1 card-custom gutter-b checklist-main-con">
                  {/* <LazyLoading /> */}

                  <div className="card-body">

                    {
                      (subtaskDeleteLoading && props.taskDeleteUpdateStatusLoading) ? <LazyLoading /> : (
                        <div>
                          {subtaskData.map((subtask, index) => {

                            const isSubtaskShowEdit = openSubTaskEdit === true && subtask.subtaskID === subTaskId

                            return isSubtaskShowEdit ? showEditForm() : showSubTaskItems(props.task.taskID, subtask.subtaskID, subtask.subtaskTitle, subtask.status, index)

                          })}

                          {
                            openSubTaskEdit === false && viewSubTaskAdd ?
                              <div className="add-new-task-con">
                                {subtaskAddLoading ? <LazyLoading /> : <>
                                  <span className="anchor_complete checklist-complete-box"><a title={t("project_tab_menu.task.completed")}> <i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i> </a> </span>
                                  <div className="classtop add-new-task-field">
                                    <Form.Field className="fillarea">
                                      <Input placeholder='Enter your text here....' size='small' className="full-width "
                                        type="text"
                                        value={subtaskTitle}
                                        onChange={onSubtaskTitle}
                                      />
                                    </Form.Field>
                                    <Form.Field className="d-flex">
                                      <button className="greenbutton anchor_complete" onClick={() => createSubTask(props.task)}>
                                        <i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i>
                                      </button> &nbsp;  <button className="redbutton anchor_complete" onClick={cancelSubtaskAdd}>
                                        <i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i> </button>
                                    </Form.Field>
                                  </div>
                                </>}
                              </div>
                              :
                              <div onClick={addNewSubTask} className="add-new-link"> <span className="anchor_complete"><i className="ms-Icon ms-Icon--Add" aria-hidden="true"></i> {t("common.add_new_button")}</span></div>

                          }

                        </div>)
                    }

                  </div>
                </div>
                : null
            }
            {/* <button className="ui large button btn-dashed  btn-large"><i className="ms-Icon ms-Icon--AddTo" aria-hidden="true"></i> Add new task    </button> */}


          </div>
        </div>
      }

    </div>
  );
}

export default TaskArea;
