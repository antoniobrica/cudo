import React from 'react';
import ReactQuill, { Quill } from 'react-quill';

import { Button, Modal, Form, Grid, TextArea, Icon, Divider } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import Moment from 'moment';
import { MS_SERVICE_URL } from '@cudo/mf-core';
function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}

interface AlertProps {
  openAlertF?,
  taskData?,
  cancel?,
  taskStatus?
  id?
}

export const ModalViewTask = (props: AlertProps) => {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];

  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if (props.openAlertF) {
      setOpen(props.openAlertF);
    }
  }, [props.openAlertF]);
  React.useEffect(() => {
    console.log('taskData', props.taskData)
  })
  const openf = () => {
    setOpen(true)
  }
  const cancel = () => {
    setOpen(false)
    props.cancel()
  }

  return (
    <div id="navbar">
      <Modal
        className="modal_media right-side--fixed-modal task-details-modal"
        closeIcon
        onClose={cancel}
        onOpen={openf}
        open={open}
        trigger={
          <Button size="small" className="primary">
            Task Details
          </Button>
        }
      >
        <Modal.Header>
          <h3 className="d-flex align-items-center">
            {' '}
            <span className="material-icons check-grey">
              check_circle_outline
            </span>
            Task Details <span className="textt task-s-number">T-00{props.id} </span>
            <span className="edit-task-link"><Icon name="edit" /> Edit</span>
          </h3>
          <span className="task-created-date">
            Created on:{Moment(props?.taskData?.createdAt).format('DD-MM-YYYY')} - Created by: {props?.taskData?.createdBy}
          </span>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Task Title</label>
                      <span>{props?.taskData?.taskTitle}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Project/Work Type</label>
                      <span>{props?.taskData?.workTypeName}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Phase</label>
                      <span>{props?.taskData?.phaseName}</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Description </label>
                      {/* <span>
                        {props?.taskData?.description}
                      </span> */}
                      <ReactQuill
                        value={props?.taskData?.description}
                        readOnly={true}
                        modules={{
                          toolbar: {
                            container: [
                              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                              ['bold', 'italic', 'underline'],
                              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                              [{ 'align': [] }],
                              ['link', 'image'],
                              ['clean'],
                              [{ 'color': [] }]
                            ],
                          }
                        }}
                        placeholder="Add a description"
                        id="txtDescription"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>BKP</label>
                      <span>{props?.taskData?.BKPTitle} </span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Assignee</label>
                      <div className="event">
                        {(props?.taskData?.assignees || []).map((as, i) => {
                          const name = as.userName.split(" ").map((n) => n[0]).join("");
                          return (
                            <div className="label-green4 label-spacer">
                              <span className="white-text">{name}</span>
                            </div>
                          )
                        })}

                      </div>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Followers</label>
                      <div className="event">
                        {(props?.taskData?.followers || []).map((p, id) => {
                          const name = p.userName.split(" ").map((n) => n[0]).join("");
                          //   "FirstName LastName".split(" ").map((n)=>n[0]).join(".");
                          return (
                            <div className="label-purple4 label-spacer">
                              <span className="white-text ">{name}</span>
                            </div>
                          )
                        })
                        }
                        {/* <div className="label-purple4 label-spacer">
                          <span className="white-text ">RJ</span>
                        </div>
                        <div className="label-blue4 label-spacer">
                          <span className="white-text">JB</span>
                        </div> */}
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Start date</label>
                      <span>{new Date(props?.taskData?.startDate).toDateString()}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>End date</label>
                      <span>{new Date(props?.taskData?.endDate).toDateString()}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Estimated days</label>
                      <span>{props?.taskData?.estimatedDays}</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <br />
              <Divider />
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Write an update </label>
                      <TextArea placeholder="Tell us more" />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>
                        <a href="">
                          {' '}
                          <i
                            className="ms-Icon ms-Icon--Attach"
                            aria-hidden="true"
                          ></i>{' '}
                          Add file
                        </a>
                        {' '}
                        <a href="">
                          {' '}
                          <i
                            className="ms-Icon ms-Icon--Emoji"
                            aria-hidden="true"
                          ></i>{' '}
                          Emoji
                        </a>
                        {' '}
                        <a href="">
                          {' '}
                          <i
                            className="ms-Icon ms-Icon--Accounts"
                            aria-hidden="true"
                          ></i>{' '}
                          Mention
                        </a>
                      </label>
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <Button
                        style={{ float: 'right' }}
                        content="Update"
                        onClick={cancel}
                        positive
                        size="small"
                        className="primary"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div>
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default_area.png`} className="image_center"></img>
                      </div>
                      <div className="text-center margin-top no-update-message">
                        <span>No update yet</span>
                        <p>We are not able to see any update here.</p>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default ModalViewTask;
