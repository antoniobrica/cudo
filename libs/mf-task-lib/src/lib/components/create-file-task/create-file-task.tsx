import React from 'react';
import {
  Button,
  Header,
  Modal,
  Tab,
  Table,
  Input,
  Form,
  Grid,
  Image,
  Select,
  TextArea,
  Checkbox,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
// import { radios } from '@storybook/addon-knobs';
import { ITask, ITasks, TaskMutation } from '../../interfaces/task';
import { ApolloCache, FetchResult, useMutation, useQuery } from '@apollo/client';
import { ADD_TASK, GET_TASKS, GET_TASKS_BY_TYPES } from '../../graphql/graphql';
// import '../../../../../../libs/shared-components/src/style/index.scss';
import moment, { calendarFormat } from 'moment';
import { FollowersIndex, AssigneeIndex, BkpIndex, PhaseIndex, BkpsIndex } from '@cudo/mf-account-app-lib';
import './create-file-task.module.scss';
import axios from 'axios';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

/* eslint-disable-next-line */
export interface CreateFileTaskProps {
  close?;
  onSuccess?;
  cord?;
  fileData?;
  savePin?;
  pinsaved?;
  getTaskToasterMessage?;
  getTaskErrorMessage?;
  isVersionSelected?;
}

interface AddTaskErrors {
  titleError?: string;
  workTypeError?: string;
  assigneeError?: string;
  dateError?: string;
}

export function CreateFileTask(props: CreateFileTaskProps) {
  const [open, setOpen] = React.useState(false);
  const [taskTitle, setTaskTitle] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [estimatedDays, setEstimatedDays] = React.useState('');
  const [sendNotification, setEendNotification] = React.useState(false);
  const [BKPID, setBKPID] = React.useState('');
  const [saveTaskAsTemplate, setSaveTaskAsTemplate] = React.useState('');
  const [phaseID, setPhasesID] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [phaseName, setPhasesName] = React.useState('');
  const [BKPTitle, setBKPIDTitle] = React.useState('');
  const [files, setFileList] = React.useState<any>([]);
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(null);
  const [workType, setworkType] = React.useState(null);
  const [workTypeD, setworkTypeD] = React.useState(null);
  const [workTypeData, setworkTypeData] = React.useState('');
  const [worktypeID, setworktypeID] = React.useState('');
  const [worktypeName, setworktypeName] = React.useState('');
  const [workTypes, setWorkTypes] = React.useState([]);
  const [fileData, setfileData] = React.useState(null);
  const [taskTypeID, settaskTypeID] = React.useState('');
  const [assignees, setAssignees] = React.useState<any>([]);
  const [followers, setfollowers] = React.useState<any>([]);
  const [errors, setErrors] = React.useState<AddTaskErrors>({});
  const [addTaskLoading, setAddTaskLoading] = React.useState(false);

  const location = useLocation();
  const { t } = useTranslation();
  const res = location.pathname.split('/');
  const referenceID = res[3].toString();

  const [addTask, { loading: taskAddLoading, error: taskAddError, data: taskAddedData }] = useMutation(ADD_TASK);

  React.useEffect(() => {
    if (!taskAddLoading && taskAddedData) {
      setAddTaskLoading(false);
      props.onSuccess();
      props.savePin(false);
      cancel();
      props.getTaskToasterMessage(t('toaster.success.task.task_created'));
      updateTaskInfoOnPin(taskAddedData?.createTask);
    }
    if (!taskAddLoading && taskAddError) {
      setAddTaskLoading(false);
      props.onSuccess();
      props.savePin(false);
      cancel();
      props.getTaskErrorMessage(taskAddError?.graphQLErrors[0]?.extensions?.exception);
    }
  }, [taskAddedData]);

  React.useEffect(() => {
    if (referenceID) {
      getWorkType(referenceID);
    }
  }, [referenceID]);

  React.useEffect(() => {
    if (props.fileData) {
      setfileData(props.fileData);
    }
  }, [props.fileData]);

  React.useEffect(() => {
    if (props.cord) {
      settaskTypeID(props.cord.pinsID);
    }
  }, [props.cord]);

  const query = `query Game($projectId: String!) {
    projectById( projectId: $projectId)
    {
      projectId
      projectName
      printingCompany
      client
      buildingType
      printingCompany
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
    return axios
      .post(MS_SERVICE_URL['ms_project'].url, {
        query,
        variables: {
          projectId: referenceID,
        },
      })
      .then((res) => {
        const wt = res.data.data.projectById[0].projectWorkTypes;
        setWorkTypes(wt);
      })
      .catch((err) => console.log(err));
  };

  const onTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };
  const onStartDateChange = (e) => {
    setDate(e.target.value);
    const date = moment.utc(moment(e.target.value).utc()).format();
    setStartDate(e.target.value);
  };
  const onEndDateChange = (e) => {
    // const date = moment.utc(moment(e.target.value).utc()).format();
    const date1 = new Date(e.target.value);
    const date2 = new Date(date);
    const Difference_In_Time = date1.getTime() - date2.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    setEndDate(e.target.value);
    setEstimatedDays(Difference_In_Days.toString());
  };
  const onsetEstimatedDays = (event, data) => {
    setEstimatedDays(data.value);
  };

  const sendNotificationChange = (event) => {
    setEendNotification(event.target.value);
  };

  const onFollowers = (data) => {
    setfollowers(data);
  };
  const setBKPIDChange = (data) => {
    setBKPIDTitle(data.BKPIDTitle);
    setBKPID(data.BKPID);
  };
  const setAsignee = (data) => {
    if (data.userID) {
      const ppl = [];
      ppl.push(data);
      setAssignees(ppl);
      // setAsignis(data)
    } else {
      setAssignees([]);
    }
  };

  const setSaveTaskAsTemplateChange = (event, data) => {
    setSaveTaskAsTemplate(data.value);
  };

  const onsetPhasesID = (data) => {
    setPhasesID(data.phaseID.toString());
    setPhasesName(data.phaseName);
  };
  const onsetStatus = (e) => {
    setStatus(e.target.value);
  };

  React.useEffect(() => {
    if (workTypes) {
      setworkType(
        workTypes.map(({ workTypeName, projectWorkTypeID }) => ({
          key: projectWorkTypeID,
          value: workTypeName,
          text: workTypeName,
          id: projectWorkTypeID,
        }))
      );
    }
  }, [workTypes]);
  const onMworkType = (event, data) => {
    const workT = {
      worktypeID: '',
      worktypeName: '',
    };
    if (data.value) {
      for (let i = 0; i < workTypes.length; i++) {
        if (workTypes[i]?.workTypeName === data.value) {
          workT.worktypeID = workTypes[i].projectWorkTypeID;
          workT.worktypeName = data.value;
          setworktypeName(workT.worktypeName);
          setworktypeID(workT.worktypeID);
          setworkTypeD(workT);
        }
      }
    } else {
      setworktypeName('');
      setworktypeID('');
      setworkTypeD('');
    }

    setworkTypeData(data.value);
  };

  const cancel = () => {
    setOpen(false);
    props.close();
  };
  enum taskType {
    PIN = 'PIN',
    PROTOCOL = 'PROTOCOL',
    FILE = 'FILE',
  }
  React.useEffect(() => {
    if (props.pinsaved) {
      addNewTaskOnPin();
    }
  }, [props.pinsaved]);

  const validation = () => {
    const foundErrors: AddTaskErrors = {};
    if (!taskTitle) {
      foundErrors.titleError = t('common.errors.title_error');
    }
    if (!worktypeID) {
      foundErrors.workTypeError = t('common.errors.worktype_error');
    }
    if (!assignees.length) {
      foundErrors.assigneeError = t('common.errors.assignee_error');
    }
    if (startDate > endDate) {
      foundErrors.dateError = t('common.errors.date_error');
    }
    return foundErrors;
  };

  const handleSaveTask = () => {
    const validationResult = validation();
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult);
      return false;
    }
    setAddTaskLoading(true);
    props.savePin(true);
  };

  const addNewTaskOnPin = () => {
    // parentFileID: fileData?.versionCount && fileData?.versionCount > 0 && props?.isVersionSelected ? fileData.parentUploadedFileID : fileData.uploadedFileID,
    const variables = {
      taskTitle,
      estimatedDays,
      sendNotification,
      BKPID,
      saveTaskAsTemplate,
      phaseID,
      phaseName,
      BKPTitle,
      parentFileID: props?.isVersionSelected ? fileData.parentUploadedFileID : fileData.uploadedFileID,
      fileID: fileData.uploadedFileID,
      fileName: fileData.fileTitle,
      taskTypeID,
      taskType: taskType.PIN,
      files,
      assignees,
      followers,
      description,
      subtasks: [],
      referenceID,
      workTypeID: worktypeID,
      workTypeName: worktypeName,
    };
    if (startDate) {
      variables['startDate'] = startDate;
    }
    if (startDate) {
      variables['endDate'] = endDate;
    }
    addTask({
      variables,
      // update: (cache, addedTaskData) => {
      //   const cacheData = cache.readQuery({
      //     query: GET_TASKS_BY_TYPES,
      //     variables: { fileID: fileData?.uploadedFileID, referenceID },
      //   }) as ITasks;
      //   console.log("------cachedat--addedTask--", cacheData)
      //   cache.writeQuery({
      //     query: GET_TASKS,
      //     variables: { referenceID },
      //     data: {
      //       tasksByTasktypes: [...cacheData?.tasksByTasktypes, addedTaskData?.data?.createTask]
      //     },
      //   });
      // }
      update: (cache, { data: { addTask } }: FetchResult<TaskMutation>) => {
        const cacheData = cache.readQuery({
          query: GET_TASKS_BY_TYPES,
          variables: { fileID: fileData?.uploadedFileID, referenceID },
        }) as ITasks;
        // props.onSuccess();
        // props.savePin(false);
        // cache.writeQuery({
        //   query: GET_TASKS,
        //   data: {
        //     tasksD: [...cacheData.tasks, addTask]
        //   },
        //   variables: { referenceID },
        // });
      },
    });
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const mutationUpdateTaskInfoOnPin = `mutation UpdateTaskInfoInPinDetail(
    $taskID:String!,
    $taskTitle:String!,
    $uploadedFileID:String!,
    $pinsID:String!
  ){
    updateTaskInfoInPinDetail(
      pinsTaskInfoUpdateDto: { 
        taskID: $taskID # "5d012030-154e-11ec-bb00-a3885705ef72", 
        taskTitle: $taskTitle # "Task 3 on File 157 ", 
        status: INPROGRESS 
      }
      pinsFilter: { 
        uploadedFileID: $uploadedFileID # "ca813050-095f-11ec-b7f7-13a0db5fb508", 
        pinsID: $pinsID # "5cae6c50-154e-11ec-9fd2-cb6640933b51" 
      }
    ){
      pinsID
      uploadedFileID
      x_axis
      y_axis
      z_axis
      pinNumber
      pageNumber
      isDeleted
      createdBy
      createdAt
      updatedBy
      updatedAt
      status
      taskID
      taskTitle
    }
  }`;

  const updateTaskInfoOnPin = (taskAddedData) => {
    return axios
      .post(MS_SERVICE_URL['ms_document'].url, {
        query: mutationUpdateTaskInfoOnPin,
        variables: {
          taskID: taskAddedData.taskID,
          taskTitle: taskTitle,
          uploadedFileID: taskAddedData.fileID,
          pinsID: taskAddedData.taskTypeID,
        },
      })
      .then((res) => {
        //
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* <Modal className="modal_media" style={{ width: '800px', marginLeft: '155px' }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='mini' className="grey-btn taskmargin">+ Add  New Task</Button>}      >
        <Modal.Header><h3>Add New Task </h3></Modal.Header>
        <Modal.Content body> */}
      {addTaskLoading ? (
        <Dimmer active inverted Center inline>
          <Loader size="big">Loading</Loader>
        </Dimmer>
      ) : null}
      <div className="added-pin-number-con">
        <Form>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>
                    {t('project_tab_menu.task.pin_number')} {props.cord?.pinNumber} <span className="danger">*</span>
                  </label>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>
                    {t('project_tab_menu.task.task_title')} <span className="danger">*</span>
                  </label>
                  <Input
                    placeholder={t('project_tab_menu.task.task_title')}
                    size="small"
                    className="full-width"
                    type="text"
                    value={taskTitle}
                    onChange={onTaskTitleChange}
                    error={errors?.titleError && !taskTitle}
                  />
                  {errors?.titleError && !taskTitle ? <span className="error-message">{errors.titleError}</span> : null}
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>{t('common.desc')} </label>
                  <TextArea placeholder={t('common.tell_us_more')} value={description} onChange={onDescriptionChange} />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>
                    {t('project_tab_menu.task.work_type')} <span className="danger">*</span>
                  </label>
                  {/* <Select placeholder='Select' className="small" options={workTypes} /> */}
                  <Select
                    placeholder={t('common.select')}
                    className="small"
                    value={workTypeData}
                    options={workType}
                    onChange={onMworkType}
                    clearable
                    error={errors?.workTypeError && !worktypeID}
                  />
                  {errors?.workTypeError && !worktypeID ? (
                    <span className="error-message">{errors.workTypeError}</span>
                  ) : null}
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>{t('common.phase')} </label>
                  <PhaseIndex parentPhaseSelect={onsetPhasesID} />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <BkpsIndex bkp={BKPID} parentBKPSelect={setBKPIDChange} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <AssigneeIndex
                  assignees={[]}
                  parentAsigneeSelect={setAsignee}
                  name="Assignee"
                  error={errors?.assigneeError && !assignees.length}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <FollowersIndex followers={[]} parentFollowersSelect={onFollowers} />
              </Grid.Column>
            </Grid.Row>

            <div className="followers-label-area">
              <Form.Field>
                <div className="event top-event follower-listing-labels">
                  {followers.map((p, id) => {
                    const name = p.userName
                      .split(' ')
                      .map((n) => n[0])
                      .join('');
                    //   "FirstName LastName".split(" ").map((n)=>n[0]).join(".");
                    return (
                      <div className="label-light-purple-circle label-spacer" key={id}>
                        <span className="white-text">{name}</span>
                      </div>
                    );
                  })}
                </div>
              </Form.Field>
            </div>
          </Grid>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>{t('common.start_date')} </label>
                  <Input
                    placeholder="Default"
                    size="small"
                    className="full-width"
                    type="date"
                    value={startDate}
                    max="9999-12-31"
                    onChange={onStartDateChange}
                    error={errors?.dateError && startDate > endDate}
                  />
                  {errors?.dateError && startDate > endDate ? (
                    <span className="error-message">{errors.dateError}</span>
                  ) : null}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>{t('common.end_date')} </label>
                  <Input
                    placeholder="Default"
                    size="small"
                    className="full-width"
                    type="date"
                    value={endDate}
                    max="9999-12-31"
                    onChange={onEndDateChange}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>{t('common.estimated_days')} </label>
                  <Input
                    placeholder={t('project_tab_menu.task.enter_days')}
                    className="small"
                    value={estimatedDays}
                    onChange={onsetEstimatedDays}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>{t('common.task_configuration')} </label>
                  <div className="content configuration-toggle">
                    <p className="paragraph task-configuration">
                      {t('common.notification_for_task')} <Checkbox toggle className="task-toggle" />
                    </p>
                  </div>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        <Modal.Actions>
          <Button content={t('common.submit')} onClick={handleSaveTask} positive size="small" className="primary" />
          <Button size="small" className="icon-border" onClick={cancel}>
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i> {t('common.cancel')}
          </Button>
        </Modal.Actions>
      </div>
      {/* </Modal.Content>
        <Modal.Actions>
        </Modal.Actions>
      </Modal> */}
    </div>
  );
}
export default CreateFileTask;
