import React from 'react';
import {
  Button,
  Header,
  Modal,
  Checkbox,
  Input,
  Form,
  Grid,
  Select,
  TextArea,
} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import { FollowersIndex, AssigneeIndex, BkpIndex, PhaseIndex } from "@cudo/mf-account-app-lib";

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
  taskStatus?,
  editTaskData?
}
export const ModalTaskEdit = (props: AlertProps) => {

  const [open, setOpen] = React.useState(false);
  const [taskTitle, setTaskTitle] = React.useState("")
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState("")
  const [estimatedDays, setEstimatedDays] = React.useState("")
  const [sendNotification, setEendNotification] = React.useState(false)
  const [BKPID, setBKPID] = React.useState("")
  const [saveTaskAsTemplate, setSaveTaskAsTemplate] = React.useState("")
  const [phaseID, setPhasesID] = React.useState("")
  const [status, setStatus] = React.useState("")
  const [followers, setfollowers] = React.useState("")
  const [phaseName, setPhasesName] = React.useState("");
  const [BKPTitle, setBKPIDTitle] = React.useState("");
  const [files, setFileList] = React.useState<any>([]);
  const [description, setDescription] = React.useState("")
  React.useEffect(() => {
    if (props.openAlertF) {
      setOpen(props.openAlertF);
    }
  }, [props.openAlertF]);

  React.useEffect(() => {
    if (props.taskData) {
      const date = new Date(props.taskData.startDate).toLocaleDateString();
      console.log('date', date);
      setStartDate(date);
      setTaskTitle(props.taskData.taskTitle);
      setDescription(props.taskData.description);
      setEstimatedDays(props.taskData.estimatedDays);
      setBKPIDTitle(props.taskData.BKPTitle)
      setBKPID(props.taskData.BKPID)
      setPhasesID((props.taskData.phaseID).toString());
      setPhasesName(props.taskData.phaseName)
    }
  }, [props.taskData]);

  const openf = () => {
    setOpen(true)
  }
  const cancel = () => {
    setOpen(false)
    props.cancel()
  }

  const onTaskTitleChange = e => {
    setTaskTitle(e.target.value)
  }
  const onStartDateChange = e => {
    // const date = moment.utc(moment(e.target.value).utc()).format();
    setStartDate(e.target.value)
  }
  const onEndDateChange = e => {
    setEndDate(e.target.value);
  }
  const onsetEstimatedDays = (event, data) => {
    setEstimatedDays(data.value)
  }

  const sendNotificationChange = (event) => {
    setEendNotification(event.target.value)
  }

  const onFollowers = (data) => {
    setfollowers(data.value);
  }
  const setBKPIDChange = (data) => {
    setBKPIDTitle(data.BKPIDTitle)
    setBKPID(data.BKPID)
    console.log('bkp==>', data);
  }
  const setAsignee = (data) => {
    // setAsignis(data)
  }


  const setSaveTaskAsTemplateChange = (event, data) => {
    setSaveTaskAsTemplate(data.value)
  }

  const onsetPhasesID = (data) => {
    setPhasesID((data.phaseID).toString());
    setPhasesName(data.phaseName)
  }
  const onDescriptionChange = e => {
    console.log('des=>', e.target.value);
    setDescription(e.target.value);
  }

  const editTask = () => {
    const editTaskData = {
      taskID: props.taskData.taskID,
      taskTitle: taskTitle,
      startDate: startDate,
      endDate: endDate,
      description: description,
      estimatedDays: estimatedDays,
      BKPID: BKPID,
      BKPTitle: BKPTitle,
      phaseID: phaseID,
      phaseName: phaseName,
      sendNotification: false,
      status: props.taskData.status,
      files: [],
      saveTaskAsTemplate: props.taskData.saveTaskAsTemplate,
    }
    props.editTaskData(editTaskData);
    setOpen(false)
    props.cancel()
  }
  const workTypes = [
    { key: 'w1', value: 'w1', text: 'Electrical Work' },
    { key: 'w2', value: 'w2', text: 'HVAC work' },
    { key: 'w3', value: 'w3', text: 'Pipelines work' },
    { key: 'w4', value: 'w4', text: 'Plumbing Work' },
  ]

  return (
    <div id="navbar">
      <Modal style={{ width: '670px', marginLeft: '345px' }}
        className="modal_media"
        onClose={cancel}
        onOpen={openf}
        open={open}
        trigger={
          <Button size="mini" className="grey-btn">
            Edit Task
          </Button>
        }
      >
        <Modal.Header>
          <h3>Edit Task </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        Task Title <span className="danger">*</span>
                      </label>
                      <Input
                        placeholder="Swtichboard fitting"
                        size="small"
                        className="full-width"
                        type="text"
                        value={taskTitle}
                        onChange={onTaskTitleChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Description </label>
                      <TextArea placeholder="Tell us more"
                        value={description}
                        onChange={onDescriptionChange} />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        Associate with work type{' '}
                        <span className="danger">*</span>
                      </label>
                      <Select placeholder='Select' className="small" options={workTypes} />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    {/* <Form.Field>
                      <label>Select Phase </label>
                      <Select
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field> */}
                    <PhaseIndex phaseName={phaseName} parentPhaseSelect={onsetPhasesID} />
                  </Grid.Column>

                  <Grid.Column>
                    {/* <Form.Field>
                      <label>Select BKP </label>
                      <Select
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field> */}
                    <BkpIndex bkp={BKPTitle} parentBKPSelect={setBKPIDChange} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    {/* <Form.Field>
                      <label>
                        Assignee <span className="danger">*</span>
                      </label>
                      <Input
                        placeholder="Electrical work"
                        size="small"
                        className="full-width"
                        type="text"
                      />
                    </Form.Field> */}
                    <AssigneeIndex parentAsigneeSelect={setAsignee} name="Assignee" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    {/* <Form.Field>
                      <label>Followers </label>
                      <Select
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field> */}
                    <FollowersIndex parentFollowersSelect={onFollowers} />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <div className="event top-event">
                        <div className="label-light-purple-circle label-spacer">
                          <span className="white-text">AB</span>
                        </div>
                        <div className="label-light-black-circle label-spacer">
                          <span className="white-text ">RJ</span>
                        </div>
                        <div className="label-light-blue-circle label-spacer">
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
                      <label>Start Date </label>
                      <Input
                        placeholder='Default'
                        size='small'
                        className="full-width"
                        type="date"
                        value={startDate}
                        onChange={onStartDateChange} />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>End Date </label>
                      <Input
                        placeholder="Default"
                        size="small"
                        className="full-width"
                        type="date"
                        value={endDate}
                        onChange={onEndDateChange} />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Estimated Days </label>
                      <Input placeholder='Enter days' className="small"
                        value={estimatedDays}
                        onChange={onsetEstimatedDays}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row></Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <Checkbox label="Send notification to assignee/followers for the task" />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Submit"
            onClick={editTask}
            positive
            size="mini"
            className="grey-btn"
          />
          <Button
            size="mini"
            className="icon-border"
            onClick={cancel}
          >
            X Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalTaskEdit;
