import React from 'react';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea } from 'semantic-ui-react';
import { radios } from '@storybook/addon-knobs';
import { IPeople, IPeoples, ITask, ITasks, TaskMutation } from "../../interfaces/task";
import { useTaskMutation } from '../../services/useRequest';
import { ApolloCache, FetchResult, useMutation } from '@apollo/client';
import { ADD_TASK, GET_TASKS } from "../../graphql/graphql";
import './create-task.module.scss';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment, { calendarFormat } from 'moment';
import { FollowersIndex, AssigneeIndex, BkpsIndex, PhaseIndex } from "@cudo/mf-account-app-lib"
import { useHistory } from 'react-router';
/* eslint-disable-next-line */
export interface CreateTaskProps {
  onSuccess?,
  workTypes?,
  isNewTask?,
  cancel?

}

export function CreateTask(props: CreateTaskProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ]
  let quillObj: any;
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
  const [phaseName, setPhasesName] = React.useState("");
  const [BKPTitle, setBKPIDTitle] = React.useState("");
  const [files, setFileList] = React.useState<any>([]);
  const [description, setDescription] = React.useState("")

  const [workType, setworkType] = React.useState(null)
  const [workTypeD, setworkTypeD] = React.useState(null)
  const [workTypeData, setworkTypeData] = React.useState('')
  const [worktypeID, setworktypeID] = React.useState("")
  const [worktypeName, setworktypeName] = React.useState("")
  const [assignees, setAssignees] = React.useState<any>([]);
  const [followers, setfollowers] = React.useState<any>([]);
  const [date, setDate] = React.useState(null)
  const history = useHistory();
  const res = history.location.pathname.split("/");
  const referenceID = res[3].toString();
  // const [addTask] = useTaskMutation(ADD_TASK, {
  //   variables: { referenceID },
  // });

  React.useEffect(() => {
    if (props.isNewTask) {
      setOpen(props.isNewTask)
    }
  }, [props.isNewTask])
  const [addTask, { data }] = useMutation(ADD_TASK,
    {
      refetchQueries: [
        { query: GET_TASKS, variables: { referenceID } }
      ],
      // variables: {
      //   taskTitle, startDate, endDate, estimatedDays,
      //   sendNotification, BKPID, saveTaskAsTemplate, phaseID, phaseName, BKPTitle,
      //   fileID,
      //   fileName,
      //   taskTypeID,
      //   files,
      //   description, referenceID,

      // },
    }
  )

  const onTaskTitleChange = e => {
    setTaskTitle(e.target.value)
  }
  const onStartDateChange = e => {
    setDate(e.target.value)
    const date = moment.utc(moment(e.target.value).utc()).format();
    console.log('====================================');
    console.log('date', date);
    console.log('====================================');
    setStartDate(e.target.value)
  }
  const onEndDateChange = e => {
    // const date = moment.utc(moment(e.target.value).utc()).format();
    const date1 = new Date(e.target.value)
    const date2 = new Date(date)
    var Difference_In_Time = date1.getTime() - date2.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    setEndDate(e.target.value);
    setEstimatedDays(Difference_In_Days.toString())
  }
  const onsetEstimatedDays = (event, data) => {
    // To calculate the time difference of two dates

    setEstimatedDays(data.value)
  }

  const sendNotificationChange = (event) => {
    setEendNotification(event.target.value)
  }

  const onFollowers = (data) => {
    console.log('====================================');
    console.log('asignee', data);
    console.log('====================================');
    const ppl = []
    ppl.push(data)
    setAssignees(ppl)
  }
  const setBKPIDChange = (data) => {
    setBKPIDTitle(data.BKPIDTitle)
    setBKPID(data.BKPID)
    console.log('bkp==>', data);
  }
  const setAsignee = (data) => {
    console.log('assignee', data)
    setfollowers(data)
    // setAsignis(data)
  }


  const setSaveTaskAsTemplateChange = (event, data) => {
    setSaveTaskAsTemplate(data.value)
  }

  const onsetPhasesID = (data) => {
    setPhasesID((data.phaseID).toString());
    setPhasesName(data.phaseName)
  }
  const onsetStatus = e => {
    setStatus(e.target.value)
  }

  React.useEffect(() => {
    if (props.workTypes) {
      console.log('worktypes', props.workTypes);
      setworkType(props.workTypes.map(({ workTypeName, projectWorkTypeID }) => ({ key: projectWorkTypeID, value: workTypeName, text: workTypeName, id: projectWorkTypeID })));

    }
  }, [props.workTypes]);
  const onMworkType = (event, data) => {
    const workT = {
      worktypeID: '',
      worktypeName: ''
    };
    for (let i = 0; i < props.workTypes.length; i++) {
      if (props.workTypes[i]?.workTypeName === data.value) {
        console.log('props.worktypes[i]', props.workTypes[i]);
        workT.worktypeID = props.workTypes[i].projectWorkTypeID;
        workT.worktypeName = data.value;
        setworktypeName(workT.worktypeName);
        setworktypeID(workT.worktypeID);
        setworkTypeD(workT)
      }
    }
    setworkTypeData(data.value)

    console.log('worktypeName-', workTypeD);
  }

  const handleSaveTask = () => {
    // setOpen(false);
    console.log('====================================');
    console.log('assignee', assignees);
    console.log('followes', followers);
    console.log('====================================');
    cancel();
    addTask({
      variables: {
        taskTitle, startDate, endDate, estimatedDays,
        sendNotification, BKPID, saveTaskAsTemplate, phaseID, phaseName, BKPTitle,
        fileID: "",
        fileName: "$fileName",
        taskTypeID: "$taskTypeID",
        files,
        assignees,
        followers,
        description,
        subtasks: [],
        referenceID
      },
      update: (
        cache,
        { data: { addTask } }: FetchResult<TaskMutation>
      ) => {
        const cacheData = cache.readQuery({ query: GET_TASKS, variables: { referenceID }, }) as ITasks;
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasksD: [...cacheData.tasks.results, addTask]
          },
          variables: { referenceID },
        });
      }
    });

  };
  const onDescriptionChange = (e) => {
    console.log('des=>', e);
    setDescription(e);
  }
  const cancel = () => {
    setOpen(false)
    props.cancel(false)
  }

  return (
    <div >
      <Modal className="modal_media" style={{ width: '800px', marginLeft: '155px' }}
        onClose={cancel}
        onOpen={() => setOpen(true)}
        open={open}
      // trigger={<Button size='mini' className="grey-btn taskmargin">+ Add  New Task</Button>} 
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
                        onChange={onTaskTitleChange} />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Description </label>
                      {/* <TextArea placeholder='Tell us more'
                        value={description}
                        onChange={onDescriptionChange} /> */}
                      <ReactQuill
                        value={description}
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
                            ]
                          }
                        }}
                        placeholder="Add a description"
                        onChange={(content, delta, source, editor) => onDescriptionChange(content)}
                        id="txtDescription"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Associate with work type <span className="danger">*</span></label>
                      {/* <Select placeholder='Select' className="small" options={workTypes} /> */}
                      <Select
                        placeholder="Select"
                        className="small"
                        value={workTypeData}
                        options={workType}
                        onChange={onMworkType}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <PhaseIndex parentPhaseSelect={onsetPhasesID} />
                  </Grid.Column>
                  <Grid.Column>
                    <BkpsIndex bkp={''} parentBKPSelect={setBKPIDChange} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <FollowersIndex parentFollowersSelect={onFollowers} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <AssigneeIndex parentAsigneeSelect={setAsignee} name="Followers" />

                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <div className="event top-event">
                        {followers.map((p, id) => {
                          return (
                            <div className="label-light-purple-circle label-spacer" key={id}>
                              <span className="white-text">AB</span>
                            </div>
                          )
                        })
                        }

                        {/* <div className="label-light-black-circle label-spacer">
                          <span className="white-text ">RJ</span>
                        </div>
                        <div className="label-light-blue-circle label-spacer">
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
            <Button size='mini' className="icon-border" onClick={cancel}>
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

