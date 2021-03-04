import React from 'react';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea } from 'semantic-ui-react';
import { radios } from '@storybook/addon-knobs';
import { ITask, ITasks, TaskMutation } from "../../interfaces/task";
import { useTaskMutation } from '../../services/useRequest';
import { ApolloCache, FetchResult } from '@apollo/client';
import { ADD_TASK, GET_TASKS } from "../../graphql/graphql";
import '../../../../../../libs/shared-components/src/style/index.scss';
import './create-task.module.scss';
import moment, { calendarFormat } from 'moment';
import {FollowersIndex, AssigneeIndex} from "@cudo/mf-account-app-lib"
/* eslint-disable-next-line */
export interface CreateTaskProps { }

export function CreateTask(props: CreateTaskProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },

  ]

  const phaseOptions = [
    { key: 'Phase_1', value: 'Phase_1', text: 'Phase 1' },
    { key: 'Phase_2', value: 'Phase_2', text: 'Phase 2' },

  ]
  const bkpOptions = [
    { key: 'BKP_1', value: 'BKP_1', text: 'BKP 1' },
    { key: 'BKP_2', value: 'BKP_2', text: 'BKP 2' },

  ]

const [open, setOpen] = React.useState(false)
const [taskTitle, setTaskTitle] = React.useState("")
const [startDate, setStartDate] = React.useState('')
const [endDate, setEndDate] = React.useState("")
const [estimatedDays, setEstimatedDays] = React.useState("")
const [sendNotification, setEendNotification] = React.useState("")
const [BKPID, setBKPID] = React.useState("")
const [saveTaskAsTemplate, setSaveTaskAsTemplate] = React.useState("")
const [phasesID, setPhasesID] = React.useState("")
const [status, setStatus] = React.useState("")

  const [addTask] = useTaskMutation(ADD_TASK);

const onTaskTitleChange = e => {
  setTaskTitle(e.target.value)
  console.log('taskTitle', taskTitle)
}
const onStartDateChange = e => {
  const date= moment.utc(moment(e.target.value).utc()).format();
  setStartDate(e.target.value)
  console.log('start-date', startDate)
}
const onEndDateChange = e => {
  const date= moment.utc(moment(e.target.value).utc()).format();
  setEndDate(e.target.value);
  console.log('end-date', endDate)
}
const onsetEstimatedDays = (event, data) => {
  setEstimatedDays(data.value)
  console.log('setEstimatedDays', estimatedDays)
}

  const sendNotificationChange = (event) => {
    setEendNotification(event.target.value)
  }

  const setBKPIDChange = (event, data) => {
    setBKPID(data.value)
  }

  const setSaveTaskAsTemplateChange = (event, data) => {
    setSaveTaskAsTemplate(data.value)
  }

  const onsetPhasesID = (event, data) => {
    setPhasesID(data.value);
  }
  const onsetStatus = e => {
    setStatus(e.target.value)
  }

 const handleSaveTask = () => {
  setOpen(false);
  addTask({
    variables: {
      taskTitle, startDate, endDate, estimatedDays,
      sendNotification, BKPID, saveTaskAsTemplate, phasesID, status
    },
    update: (
      cache: ApolloCache<TaskMutation>,
      { data: { addTask } }: FetchResult<TaskMutation>
    ) => {
      const cacheData = cache.readQuery({ query: GET_TASKS}) as ITasks;
      cache.writeQuery({
        query: GET_TASKS,
        data: {
          getTasks: [...cacheData.tasks, addTask]
        }
      });
    }
  });

};



  return (
    <div id="navbar">
    <Modal className="modal_media"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button size='mini' className="grey-btn">+ Add  New Task</Button> }
    >
      <Modal.Header><h3>Add New Task </h3></Modal.Header>
      <Modal.Content body>
        
        <div>
 
      
      <Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Task Title <span className="danger">*</span></label>
      <Input placeholder='Swtichboard fitting' size='small' className="full-width" type="text" 
       value={taskTitle}
       onChange={onTaskTitleChange}/>
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>

<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Description </label>
      <TextArea placeholder='Tell us more' />
    </Form.Field>
  </Grid.Column>

  
</Grid.Row>
</Grid>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Associate with work type <span className="danger">*</span></label>
      <Input placeholder='Electrical work' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>

</Grid>
<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Select Phase </label>
      <Select placeholder='Select' className="small" options={phaseOptions} />
            
    </Form.Field>
  </Grid.Column>

  <Grid.Column>
    <Form.Field>
      <label>Select BKP   </label>
      <Select placeholder='Select' className="small" options={bkpOptions} />
            
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    {/* <Form.Field>
      <label>Assignee <span className="danger">*</span></label>
      <Input placeholder='Electrical work' size='small' className="full-width" type="text" />
    </Form.Field> */}
    <AssigneeIndex />
  </Grid.Column>
 
</Grid.Row>
 
</Grid>
<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    {/* <Form.Field>
      <label>Followers  </label>
      <Select placeholder='Select' className="small" options={countryOptions} />
      
    </Form.Field> */}
    <FollowersIndex />
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
      <label>Start Date  </label>
      {/* <Input icon='calendar alternate outline' placeholder='Electrical work' size='small' className="full-width" type="text" /> */}
      <Input placeholder='Default' size='small' className="full-width"
       type="date" 
       value={startDate}
       onChange={onStartDateChange}
       />

    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>End Date </label>
      {/* <Input icon='calendar alternate outline' placeholder='Electrical work' size='small' className="full-width" type="text" /> */}
      <Input placeholder='Default' size='small' className="full-width" type="date"
       value={endDate}
       onChange={onEndDateChange}
      />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>Estimated Days  </label>
      <Input placeholder='Enter days' className="small" 
        value={estimatedDays}
        onChange={onsetEstimatedDays}
      />
     
    </Form.Field>
  </Grid.Column>
</Grid.Row>
<Grid.Row>
  
 
</Grid.Row>
 

</Grid>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Task Configuration  </label>
       
       <div className="content">
            <p className="paragraph">Send notification to assignee/followers for the task</p></div>
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>

</Grid>

</Form>
<Button
          content="Submit" 
          onClick={handleSaveTask}
          positive
          size='mini' className="grey-btn"
        />
        <Button size='mini' className="icon-border" onClick={() => setOpen(false)}>
        X  Cancel
        </Button>




          </div>


        </Modal.Content>
        <Modal.Actions>


        </Modal.Actions>
      </Modal>
    </div>

  );
}

export default CreateTask;

