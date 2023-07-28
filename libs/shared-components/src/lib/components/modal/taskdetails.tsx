import React from 'react';
import { Button, Modal, Form, Grid, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import img8 from 'libs/shared-components/src/default_area.png';
import Moment from 'moment';
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
  const openf = () => {
    setOpen(true)
  }
  const cancel = () => {
    setOpen(false)
    props.cancel()
  }

  return (
    <div id="navbar">
      <Modal style={{ width: '670px', marginLeft: '345px'}}
        className="modal_media"
        onClose={cancel}
        onOpen={openf}
        open={open}
        trigger={
          <Button size="mini" className="grey-btn">
            Task Details
          </Button>
        }
      >
        <Modal.Header>
          <h3>
            {' '}
            <span className="material-icons mr-2 mr-10 check-grey">
              check_circle_outline
            </span>
            Task Details <span className="textt">T-002</span>
            <span className="taskdetails">Edit</span>
          </h3>
          <span style={{ color: '#718898', fontSize: '12px' }}>
            Created on:{Moment(props?.taskData?.createdAt).format('DD-MM-YYYY')} - Created by: {props?.taskData?.createdBy}
          </span>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Task Title</label>
                      <span>{props?.taskData?.taskTitle}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Project/Work Type</label>
                      <span>{props?.taskData?.taskTitle}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Phase</label>
                      <span>{props?.taskData?.phaseName}</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Description </label>
                      <span>
                        {props?.taskData?.description}
                      </span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>BKP</label>
                      <span>{props?.taskData?.BKPTitle} </span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Assignee</label>
                      <div className="event">
                        <div className="label-green4 label-spacer">
                          <span className="white-text">AB</span>
                        </div>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Followers</label>
                      <div className="event">
                        <div className="label-purple4 label-spacer">
                          <span className="white-text ">RJ</span>
                        </div>
                        <div className="label-blue4 label-spacer">
                          <span className="white-text">JB</span>
                        </div>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Start date</label>
                      <span>{props?.taskData?.startDate}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>End date</label>
                      <span>{props?.taskData?.endDate}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Estimated days</label>
                      <span>{props?.taskData?.estimatedDays}</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <hr></hr>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Write an update </label>
                      <TextArea placeholder="Tell us more" />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        <a href="" style={{ color: '#2D62ED' }}>
                          {' '}
                          <i
                            className="ms-Icon ms-Icon--Attach"
                            aria-hidden="true"
                          ></i>{' '}
                          Add file
                        </a>
                        &nbsp;{' '}
                        <a href="" style={{ color: '#2D62ED' }}>
                          {' '}
                          <i
                            className="ms-Icon ms-Icon--Emoji"
                            aria-hidden="true"
                          ></i>{' '}
                          &nbsp; Emoji
                        </a>
                        &nbsp;{' '}
                        <a href="" style={{ color: '#2D62ED' }}>
                          {' '}
                          <i
                            className="ms-Icon ms-Icon--Accounts"
                            aria-hidden="true"
                          ></i>{' '}
                          &nbsp; Mention
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
                        size="mini"
                        className="grey-btn"
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
                        <img src={img8} className="image_center"></img>
                      </div>
                      <div className="text-center margin-top">
                        <span className="found">No update yet</span>
                        <p className="project-sub" style={{ color: '#9A9EA1' }}>
                          We are not able to see any update here.
                        </p>
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
