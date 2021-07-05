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
import { FollowersIndex, AssigneeIndex, BkpIndex, BkpsIndex, PhaseIndex } from "@cudo/mf-account-app-lib";
import ReactQuill, { Quill } from 'react-quill';
import axios from 'axios';
import { MS_SERVICE_URL } from '@cudo/mf-core';

import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom';

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
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)
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
  const [workTypes, setWorkTypes] = React.useState([]);
  const [date, setDate] = React.useState(null)

  const [worktypeID, setworktypeID] = React.useState("")
  const [worktypeName, setworktypeName] = React.useState("")
  const [assignees, setAssignees] = React.useState<any>([]);
  const [followers, setfollowers] = React.useState<any>([]);
  const history = useHistory();
  const res = history.location.pathname.split("/");
  const referenceID = res[3].toString();
  React.useEffect(() => {
    if (referenceID) {
      getWorkType(referenceID)
    }
  }, [referenceID])

  React.useEffect(() => {
    if (props.openAlertF) {
      setOpen(props.openAlertF);
    }
  }, [props.openAlertF]);


  function formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  React.useEffect(() => {
    if (props.taskData) {
      const d = props.taskData.startDate;
      const de = props.taskData.endDate
      // console.log('dateE', d);

      // var d2 = d.substring(5, 7) + '/' + d.substring(8, 10) + '/' + d.substring(0, 4);

      const assignees = [];
      props?.taskData?.assignees?.map((data, i) => {
        assignees.push({ userID: data.userID, userName: data.userName })
      })
      const followers = [];
      props?.taskData?.followers?.map((data, i) => {
        followers.push({ userID: data.userID, userName: data.userName })
      })
      setAssignees(assignees)
      setfollowers(followers)
      setStartDate(formatDate(d));
      setDate(formatDate(d))

      setEndDate(formatDate(de));
      setTaskTitle(props.taskData.taskTitle);
      setDescription(props.taskData.description);
      setEstimatedDays(props.taskData.estimatedDays);
      setBKPIDTitle(props.taskData.BKPTitle)
      setBKPID(props.taskData.BKPID)
      setPhasesID((props.taskData.phaseID).toString());
      setPhasesName(props.taskData.phaseName)
    }
  }, [props.taskData]);

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
    setworkTypeData(data.value);
    console.log('worktypeName-', workTypeD);
  }
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
    console.log('startdate>', e.target.value);

    // const date = moment.utc(moment(e.target.value).utc()).format();
    setStartDate(e.target.value)
  }
  const onEndDateChange = e => {
    const date1 = new Date(e.target.value)
    const date2 = new Date(date)
    const Difference_In_Time = date1.getTime() - date2.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    setEndDate(e.target.value);
    setEstimatedDays(Difference_In_Days.toString())
    setEndDate(e.target.value);
  }
  const onsetEstimatedDays = (event, data) => {
    setEstimatedDays(data.value)
  }

  const sendNotificationChange = (event) => {
    setEendNotification(event.target.value)
  }


  const setBKPIDChange = (data) => {
    setBKPIDTitle(data.BKPIDTitle)
    setBKPID(data.BKPID)
    console.log('bkp==>', data);
  }
  const setAsignee = (data) => {
    console.log('assignee', data)

    const ppl = []
    ppl.push(data)
    setAssignees(ppl)
    // setAsignis(data)
  }
  const onFollowers = (data) => {
    console.log('====================================');
    console.log('followers', data);
    console.log('====================================');
    setfollowers(data)
  }

  const setSaveTaskAsTemplateChange = (event, data) => {
    setSaveTaskAsTemplate(data.value)
  }

  const onsetPhasesID = (data) => {
    setPhasesID((data.phaseID).toString());
    setPhasesName(data.phaseName)
  }
  const onDescriptionChange = e => {
    console.log('des=>', e);
    setDescription(e);
  }

  const editTask = () => {
    // const assignees = [];
    // props.taskData.assignees.map((data, i) => {
    //   assignees.push({ userID: data.userID, userName: data.userName })
    // })
    // const followers = [];
    // props.taskData.followers.map((data, i) => {
    //   followers.push({ userID: data.userID, userName: data.userName })
    // })
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
      assignees: assignees,
      followers: followers,
      saveTaskAsTemplate: props.taskData.saveTaskAsTemplate,
    }
    props.editTaskData(editTaskData);
    setOpen(false)
    props.cancel()
  }


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
                      {/* <TextArea placeholder="Tell us more"
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
                            ],
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
                      <label>
                        Associate with work type{' '}
                        <span className="danger">*</span>
                      </label>
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
                    <BkpsIndex bkp={BKPTitle} parentBKPSelect={setBKPIDChange} />
                    {/* <BkpIndex bkp={BKPTitle} parentBKPSelect={setBKPIDChange} /> */}
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
                    <AssigneeIndex assignees={props.taskData.assignees} parentAsigneeSelect={setAsignee} name="Assignee" />
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
                    <FollowersIndex followers={followers} parentFollowersSelect={onFollowers} />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <div className="event top-event">
                        {followers.map((p, id) => {
                          const name = p.userName.split(" ").map((n) => n[0]).join("");
                          //   "FirstName LastName".split(" ").map((n)=>n[0]).join(".");
                          return (
                            <div className="label-light-purple-circle label-spacer" key={id}>
                              <span className="white-text">{name}</span>
                            </div>
                          )
                        })
                        }
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
