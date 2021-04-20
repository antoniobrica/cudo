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
import {FollowersIndex, AssigneeIndex, BkpIndex, PhaseIndex} from "@cudo/mf-account-app-lib"
import { useHistory } from 'react-router';
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
  const workTypes = [
    { key: 'w1', value: 'w1', text: 'Electrical Work' },
    { key: 'w2', value: 'w2', text: 'HVAC work' },
    { key: 'w3', value: 'w3', text: 'Pipelines work' },
    { key: 'w4', value: 'w4', text: 'Plumbing Work' },


  ]

const [open, setOpen] = React.useState(false)
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

const history = useHistory();
var res = history.location.pathname.split("/");
const referenceID = res[3].toString();
  const [addTask] = useTaskMutation(ADD_TASK,{
    variables: { referenceID },
});

const onTaskTitleChange = e => {
  setTaskTitle(e.target.value)
}
const onStartDateChange = e => {
  const date= moment.utc(moment(e.target.value).utc()).format();
  setStartDate(e.target.value)
}
const onEndDateChange = e => {
  const date= moment.utc(moment(e.target.value).utc()).format();
  setEndDate(e.target.value);
}
const onsetEstimatedDays = (event, data) => {
  setEstimatedDays(data.value)
}

  const sendNotificationChange = (event) => {
    setEendNotification(event.target.value)
  }

  const onFollowers=(data) =>{
    setfollowers(data.value);
  }
  const setBKPIDChange = (data) => {
    setBKPIDTitle(data.BKPIDTitle)
    setBKPID(data.BKPID)  
    console.log('bkp==>',data);
  }
    
    

  const setSaveTaskAsTemplateChange = (event, data) => {
    setSaveTaskAsTemplate(data.value)
  }

  const onsetPhasesID = ( data) => {
    setPhasesID((data.phaseID).toString());
    setPhasesName(data.phaseName)
  }
  const onsetStatus = e => {
    setStatus(e.target.value)
  }

 const handleSaveTask = () => {
  setOpen(false);
  addTask({
    variables: {
      taskTitle, startDate, endDate, estimatedDays,
      sendNotification, BKPID, saveTaskAsTemplate, phaseID, phaseName, BKPTitle,
      files
    },
    update: (
      cache,
      { data: { addTask } }: FetchResult<TaskMutation>
    ) => {
      const cacheData = cache.readQuery({ query: GET_TASKS,  variables: { referenceID },}) as ITasks;
      cache.writeQuery({
        query: GET_TASKS,
        data: {
          tasks: [...cacheData.tasks, addTask]
        },
        variables: { referenceID },
      });
    }
  });

};



  return (
    <div >
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
      <Input placeholder='Task title' size='small' className="full-width" type="text" 
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
      <Select placeholder='Select' className="small" options={phaseOptions} />
            
    </Form.Field> */}
    <PhaseIndex  parentPhaseSelect={onsetPhasesID}/>
  </Grid.Column>

  <Grid.Column>
    {/* <Form.Field>
      <label>Select BKP   </label>
      <Select placeholder='Select' className="small" options={bkpOptions} />
            
    </Form.Field> */}
    <BkpIndex parentBKPSelect={setBKPIDChange}/>
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
    <FollowersIndex  parentFollowersSelect ={onFollowers}/>
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

