import React from 'react';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea } from 'semantic-ui-react';
import { radios } from '@storybook/addon-knobs';
import { ITask, ITasks, TaskMutation } from "../../interfaces/task";
import { ApolloCache, FetchResult, useMutation, useQuery } from '@apollo/client';
import { ADD_TASK, GET_TASKS } from "../../graphql/graphql";
// import '../../../../../../libs/shared-components/src/style/index.scss';
import moment, { calendarFormat } from 'moment';
import { FollowersIndex, AssigneeIndex, BkpIndex, PhaseIndex } from "@cudo/mf-account-app-lib"
import { useHistory } from 'react-router';
import './create-file-task.module.scss';
import axios from 'axios';
import { MS_SERVICE_URL } from '@cudo/mf-core';


/* eslint-disable-next-line */
export interface CreateFileTaskProps {
  close,
  onSuccess,
  cord,
  fileData
}

export function CreateFileTask(props: CreateFileTaskProps) {
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
  const [description, setDescription] = React.useState("")

  const [workType, setworkType] = React.useState(null)
  const [workTypeD, setworkTypeD] = React.useState(null)
  const [workTypeData, setworkTypeData] = React.useState('')
  const [worktypeID, setworktypeID] = React.useState("")
  const [worktypeName, setworktypeName] = React.useState("")
  const [workTypes, setWorkTypes] = React.useState([]);
  const [fileData, setfileData] = React.useState(null)
  const [taskTypeID, settaskTypeID] = React.useState('')
  const history = useHistory();
  const res = history.location.pathname.split("/");
  const referenceID = res[3].toString();
  // const [addTask] = useTaskMutation(ADD_TASK, {
  //   variables: { referenceID },
  // });

  const [addTask, { data }] = useMutation(ADD_TASK,
    {
      refetchQueries: [
        { query: GET_TASKS, variables: { referenceID } }
      ],
      // variables: { referenceID },
    }
  )
  React.useEffect(() => {
    if (referenceID) {
      getWorkType(referenceID)
    }
  }, [referenceID])

  React.useEffect(() => {
    if (props.fileData) {
      console.log('fileData-task', props.fileData);

      setfileData(props.fileData)
    }
  }, [props.fileData])

  React.useEffect(() => {
    if (props.cord) {
      console.log('props.cord', props.cord);
      settaskTypeID(props.cord.pinsID)

    }
  })

  const query = `query Game($projectId: String!) {
    projectById( projectId: $projectId)
    {
      projectId
      projectName
      projectNum
      client
      buildingType
      printingCom
      projectWorkTypes{
        workTypeName
        projectWorkTypeID
         workTypeName
        estimatedCost
        }
      description
    }
 }`;

  const getWorkType = (referenceID) => {
    console.log('sasstoken');
    return axios.post(
      MS_SERVICE_URL['ms_project'].url,
      {
        query,
        variables: {
          projectId: referenceID
        }
      }
    ).then(res => {
      const wt = res.data.data.projectById[0].projectWorkTypes;
      setWorkTypes(wt);
    })
      .catch(err => console.log(err))
  }

  const onTaskTitleChange = e => {
    setTaskTitle(e.target.value)
  }
  const onStartDateChange = e => {
    const date = moment.utc(moment(e.target.value).utc()).format();
    setStartDate(e.target.value)
  }
  const onEndDateChange = e => {
    const date = moment.utc(moment(e.target.value).utc()).format();
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
  const onsetStatus = e => {
    setStatus(e.target.value)
  }

  React.useEffect(() => {
    if (workTypes) {
      console.log('worktypes', workTypes);
      setworkType(workTypes.map(({ workTypeName, projectWorkTypeID }) => ({ key: projectWorkTypeID, value: workTypeName, text: workTypeName, id: projectWorkTypeID })));

    }
  }, [workTypes]);
  const onMworkType = (event, data) => {
    const workT = {
      worktypeID: '',
      worktypeName: ''
    };
    for (let i = 0; i < workTypes.length; i++) {
      if (workTypes[i]?.workTypeName === data.value) {
        console.log('workTypes[i]', workTypes[i]);
        workT.worktypeID = workTypes[i].projectWorkTypeID;
        workT.worktypeName = data.value;
        setworktypeName(workT.worktypeName);
        setworktypeID(workT.worktypeID);
        setworkTypeD(workT)
      }
    }
    setworkTypeData(data.value)

    console.log('worktypeName-', workTypeD);
  }

  const cancel = () => {
    setOpen(false)
    props.close()
  }
  enum taskType {
    PIN = "PIN",
    PROTOCOL = "PROTOCOL",
    FILE = "FILE"
  }
  const handleSaveTask = () => {
    // setOpen(false);

    props.onSuccess();
    addTask({
      variables: {
        taskTitle, startDate, endDate, estimatedDays,
        sendNotification, BKPID, saveTaskAsTemplate, phaseID, phaseName, BKPTitle,
        fileID: fileData.uploadedFileID,
        fileName: fileData.fileTitle,
        taskTypeID,
        taskType: taskType.PIN,
        files,
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
            tasksD: [...cacheData.tasks, addTask]
          },
          variables: { referenceID },
        });
      }
    });
    props.close()
  };
  const onDescriptionChange = e => {
    console.log('des=>', e.target.value);
    setDescription(e.target.value);
  }


  return (
    <div >
      {/* <Modal className="modal_media" style={{ width: '800px', marginLeft: '155px' }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='mini' className="grey-btn taskmargin">+ Add  New Task</Button>}      >
        <Modal.Header><h3>Add New Task </h3></Modal.Header>
        <Modal.Content body> */}
      <div>
        <Form>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Pin Number {props.cord?.pinNumber} <span className="danger">*</span></label>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
                  <TextArea placeholder='Tell us more'
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
                <BkpIndex bkp={BKPID} parentBKPSelect={setBKPIDChange} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <AssigneeIndex parentAsigneeSelect={setAsignee} name="Assignee" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
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
      {/* </Modal.Content>
        <Modal.Actions>
        </Modal.Actions>
      </Modal> */}
    </div>
  );
}
export default CreateFileTask;
