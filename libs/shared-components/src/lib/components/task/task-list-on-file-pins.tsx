import React, { Suspense } from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import img4 from 'libs/shared-components/src/dots.png';
import img3 from 'libs/shared-components/src/check_grey.png';
import img2 from 'libs/shared-components/src/people_1.png';
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
            return (
              <div key={task?.taskTypeID}>
                <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                  <div style={{ color: props.cord.pinsID === task?.taskTypeID ? "red" : "" }} className="d-flex align-items-center  py-2">
                    <span>
                      <img src={img4} style={{ marginRight: '6px !important;' }} />
                    </span>
                    <span>
                      <img src={img3} className=" mr-10 " />
                    </span>
                    <span className="font-weight-bold mb-0 mr-10  ">
                      <div style={{ color: props.cord.pinsID === task?.taskTypeID ? "red" : "black" }}>{task.taskTitle}</div>
                    </span>
                  </div>
                  <div className="symbol-group symbol-hover py-2 text-right">
                    <div className="symbol symbol-30">
                      <img src={img2} />
                    </div>
                  </div>
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
            )
          })}
        </div>
      </Form.Field>
    </div>
  );
}

export default TaskListOnFilePins;
