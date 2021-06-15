import React from 'react';

import './../../../assets/style/index.scss'
import { Segment, Dropdown, Input, Grid, Form } from 'semantic-ui-react';
import img from 'libs/shared-components/src/user.png';
import img2 from 'libs/shared-components/src/user2.png';
import img3 from 'libs/shared-components/src/green_tick.png';
import img4 from 'libs/shared-components/src/dots.png';
import img5 from 'libs/shared-components/src/tasks.png';
import img6 from 'libs/shared-components/src/assets/images/pin_blue.png';

import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface Tasks {
  task?,
  id?,
  updateTask?,
  veiwTask?,
  deleteTask?,
  editTask?
  subTask?
}

export function TaskArea(props: Tasks) {
  const { t, i18n } = useTranslation();
  const [taskId, setTaskId] = React.useState(null);
  const [subtaskTitle, setSubtaskTitle] = React.useState('')
  const [subtaskData, setSubtaskData] = React.useState([])


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
    props.veiwTask(task, id)
  }
  const editTaskbyId = (task, id) => {
    props.editTask(task, id)
  }
  const openSubTask = (task, id) => {
    console.log(task.subtasks);

    setSubtaskData(task.subtasks)
    setTaskId(id)
    console.log('subtaskTitle', taskId, subtaskData);

    //props.subTask(task, id)
  }
  const onSubtaskTitle = (e) => {
    setSubtaskTitle(e.target.value);
  }
  const createSubTask = (task) => {
    const subTaskTitle = subtaskTitle;
    props.subTask(task, subTaskTitle)
  }
  return (
    <div>

      {props?.task?.status === "COMPLETED" ?
        <div className="card1 card-custom gutter-b card-complete">

          <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

            <div className="d-flex align-items-center  py-2">
              <span> <img src={img4} className="  mr-10 " />  </span>
              <span className="textt">T-0{props.id + 1}</span>
              <span onClick={() => updateStatus(props.task, props.id)} className="anchor_complete">  <img src={img3} className=" mr-2 mr-10 " />   </span>
              <span className="font-weight-bold mb-0 mr-10 line-through">{props?.task?.taskTitle}</span>
              <div className="d-flex mr-3">

                <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                  {props.task.file &&
                    <div className="navi-item mr-2">
                      <a className="navi-link">
                        <span className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>{props.task.files.length} files  -  </span>
                      </a>
                    </div>
                  }


                  <div className="navi-item mr-2">
                    <a href="" className="navi-link">
                      <span className="navi-text"> <i className="ms-Icon ms-Icon--CalendarAgenda" aria-hidden="true"></i> 5 days  - </span>
                    </a>
                  </div>

                  <div className="navi-item mr-2">
                    <a className="navi-link">
                      <span className="navi-text">{props?.task?.phaseName}  -  </span>
                    </a>
                  </div>

                  <div className="navi-item mr-2">
                    <a href="" className="navi-link">
                      <span className="navi-text">Paint Work  </span>
                    </a>
                  </div>
                </div>

              </div>

            </div>

            {props.task.taskType &&
              <div className="navi-item">
                <a className="navi-link">
                  <span className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>{props.task.taskType} </span>
                </a>
              </div>
            }
            {/* {props.task.assignees && props.task.assignees.map((as, i) => {
              return (
                <div className="navi-item " style={{ paddingLeft: '154px' }}>
                  <a className="navi-link">
                    <span className="navi-text"> <img src={img} /> </span>
                  </a>
                </div>
              )
            })} */}
            {props.task?.assignees.length > 0 ?

              <div className="navi-item ">
                <a className="navi-link">
                  <span className="navi-text"> <img src={img} /> </span>
                </a>
              </div> : null
            }
            <div className="symbol-group symbol-hover py-2" >
              <div className="symbol symbol-30">


                <img src={img2} />
                <span className="mr-2"  >

                  <Dropdown text='...'>
                    <Dropdown.Menu>

                      <Dropdown.Item onClick={() => veiwTaskbyId(props.task, props.id)} icon='eye' text='View detail' />
                      <Dropdown.Item onClick={() => editTaskbyId(props.task, props.id)} icon='pencil' text='Edit' />
                      <Dropdown.Item onClick={() => updateStatus(props.task, props.id)} icon='check circle outline' text='Re-open' />
                      <Dropdown.Item onClick={() => deleteTaskbyId(props.task, props.id)} icon='trash alternate outline' text='Delete' />
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
              </div>

            </div>

          </div>
        </div>
        :

        <div className="card1 card-custom gutter-b" onClick={() => openSubTask(props.task, props.id)}>
          <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
            <div className="d-flex align-items-center py-2">
              <span> <img src={img4} className="  mr-10 " />  </span>
              <span className="textt">T-0{props.id + 1}</span>
              <span onClick={() => updateStatus(props.task, props.id)}><span className="anchor_complete"><a title="Mark as complete"> <span className="material-icons mr-2 mr-10 check-grey">check_circle_outline</span> </a> </span></span>
              <span className="font-weight-bold mb-0 mr-10">{props?.task?.taskTitle}</span>
              <div className="d-flex mr-3">

                <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

                  <div className="navi-item mr-2">
                    <a href=" " className="navi-link active">
                      <span className="navi-text">( {new Date(props?.task?.startDate).toDateString()} ↦ Due {new Date(props?.task?.endDate).toDateString()})</span>
                    </a>
                  </div>

                  {props.task?.file &&
                    <div className="navi-item mr-2">
                      <a className="navi-link">
                        <span className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>{props.task.files.length} files  -  </span>
                      </a>
                    </div>
                  }

                  <div className="navi-item mr-2">
                    <a href="" className="navi-link">
                      <span className="navi-text"> <i className="ms-Icon ms-Icon--CalendarAgenda" aria-hidden="true"></i> {props?.task?.estimatedDays} Days- </span>
                    </a>
                  </div>
                  <div className="navi-item mr-2">
                    <a href="" className="navi-link">
                      <span className="navi-text">{props?.task?.phaseName}  - </span>
                    </a>
                  </div>
                  <div className="navi-item mr-2">
                    <a href="" className="navi-link">
                      <span className="navi-text">HVAC Work  </span>
                    </a>
                  </div>

                </div>

              </div>

            </div>
            {props.task?.taskType &&
              <div className="navi-item  " style={{ paddingLeft: '154px' }}>
                <a className="navi-link">
                  <span className="navi-text">
                    {props.task.taskType == 'PIN' &&
                      <img src={img6} />
                    }

                  </span>
                </a>
              </div>
            }
            {props.task?.assignees.length > 0 ?

              <div className="navi-item ">
                <a className="navi-link">
                  <span className="navi-text"> <img src={img} /> </span>
                </a>
              </div> : null
            }
            <div className="symbol-group symbol-hover py-2">
              <div className="symbol symbol-30">


                {/* <img src={img} /> */}
                <span className="mr-2"  >

                  <Dropdown text='...'>
                    <Dropdown.Menu className="dropdowncomplete">
                      <Dropdown.Item onClick={() => veiwTaskbyId(props.task, props.id)} icon='eye' text='View detail' />
                      <Dropdown.Item onClick={() => editTaskbyId(props.task, props.id)} icon='pencil' text='Edit' />
                      <Dropdown.Item onClick={() => updateStatus(props.task, props.id)} icon='check circle outline' text='Mark as complete' />
                      <Dropdown.Item onClick={() => deleteTaskbyId(props.task, props.id)} icon='trash alternate outline' text='Delete' />
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
              </div>

            </div>
            {
              subtaskData && (taskId === props.id) ?
                <div className="card1 card-custom gutter-b">

                  <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

                    <div className="  align-items-center py-2">
                      {subtaskData.map((subt, i) => {
                        return (
                          <div key={i}>
                            <span className="anchor_complete"><a title="Mark as complete"> <span className="material-icons mr-2 mr-10 check-grey">check_circle_outline</span> </a> </span>
                            <span className="font-weight-bold mb-0 mr-10">{i + 1}. {subt.subtaskTitle}</span>
                          </div>
                        )
                      })}
                      <br />

                      <span className="anchor_complete"><a title="Mark as complete"> <span className="material-icons mr-2 mr-10 check-grey">check_circle_outline</span> </a> </span>

                      <Grid columns={2} className="classtop">
                        <Grid.Row>
                          <Grid.Column>
                            <Form.Field className="fillarea">

                              <Input placeholder='Enter your text here....' size='small' className="full-width "
                                type="text"
                                value={subtaskTitle}
                                onChange={onSubtaskTitle}
                              />
                            </Form.Field>
                          </Grid.Column>

                          <Grid.Column>
                            <Form.Field style={{ marginleft: '145px' }}>
                              <button className="greenbutton" onClick={() => createSubTask(props.task)}>
                                <i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i>
                              </button> &nbsp;  <button className="redbutton">
                                <i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i> </button>
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </div>


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
