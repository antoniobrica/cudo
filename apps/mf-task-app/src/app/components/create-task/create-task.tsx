import React, { useEffect, useState } from 'react';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea, Checkbox, Loader, Dimmer } from 'semantic-ui-react';
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
import { start } from 'repl';
import { useTranslation } from 'react-i18next';

import { LazyLoading } from '@cudo/shared-components'

/* eslint-disable-next-line */
export interface CreateTaskProps {
  onSuccess?,
  workTypes?,
  isNewTask?,
  cancel?
  // stopLoading?
}

interface AddTaskErrors {
  titleError?: string,
  workTypeError?: string,
  assigneeError?: string,
  dateError?: string
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
  const [workTypeID, setworktypeID] = React.useState("")
  const [workTypeName, setworktypeName] = React.useState("")
  const [assignees, setAssignees] = React.useState<any>([]);
  const [followers, setfollowers] = React.useState<any>([]);
  const [date, setDate] = React.useState(null)
  const { t } = useTranslation();
  const history = useHistory();
  const res = history.location.pathname.split("/");
  const referenceID = res[3].toString();
  // const [addTask] = useTaskMutation(ADD_TASK, {
  //   variables: { referenceID },
  // });
  const [errors, setErrors] = React.useState<AddTaskErrors>({})

  // const [isLoading, setIsLoading] = useState(false)

  React.useEffect(() => {
    if (props.isNewTask) {
      setOpen(props.isNewTask)
    }
  }, [props.isNewTask])
  const [addTask, { loading, error, data }] = useMutation(ADD_TASK,
    {
      refetchQueries: [
        { query: GET_TASKS, variables: { referenceID } }
      ],

    }
  )

  // useEffect(() => {
  //   if (!loading && data) {
  //     cancel()
  //   }
  // }, [loading])

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
    const Difference_In_Time = date1.getTime() - date2.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
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
    console.log('followers', data);
    console.log('====================================');
    setfollowers(data)
  }
  const setBKPIDChange = (data) => {
    setBKPIDTitle(data.BKPIDTitle)
    setBKPID(data.BKPID)
    console.log('bkp==>', data);
  }
  const setAsignee = (data) => {
    // console.log('assignee', data)
    if (data.userID) {
      const ppl = []
      ppl.push(data)
      setAssignees(ppl)
      // setAsignis(data)
    } else {
      setAssignees([])
    }
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
    if (data.value) {
      for (let i = 0; i < props.workTypes.length; i++) {
        if (props.workTypes[i]?.workTypeName === data.value) {
          // console.log('props.worktypes[i]', props.workTypes[i]);
          workT.worktypeID = props.workTypes[i].projectWorkTypeID;
          workT.worktypeName = data.value;
          setworktypeName(workT.worktypeName);
          setworktypeID(workT.worktypeID);
          setworkTypeD(workT)
        }
      }
    } else {
      setworktypeName("")
      setworktypeID("")
      setworkTypeD("")
    }
    setworkTypeData(data.value)

    // console.log('worktypeName-', workTypeD, setworkTypeData);
  }


  const onDescriptionChange = (e) => {
    console.log('des=>', e);
    setDescription(e);
  }
  const cancel = () => {
    setOpen(false)
    props.cancel(false)
    resetAddData()
  }

  const resetAddData = () => {
    setTaskTitle('')
    setStartDate('')
    setEndDate('')
    setDescription('')
    setEstimatedDays('')
    setAsignee([])
    setfollowers([])
    setEendNotification(false)
    setBKPID('')
    setSaveTaskAsTemplate('')
    setPhasesID('')
    setStatus('')
    setPhasesName('')
    setPhasesID('')
    setBKPIDTitle('')
    setworkTypeD(null)
    setworktypeName('')
    setworktypeID('')
    setworkType(null)
    setworkTypeData('')
    setDate(null)
    setErrors({})

  }

  const validation = () => {
    const foundErrors: AddTaskErrors = {}
    if (!taskTitle) {
      foundErrors.titleError = t("common.errors.title_error")
    }
    if (!workTypeID) {
      foundErrors.workTypeError = t("common.errors.worktype_error")
    }
    if (!assignees.length) {
      foundErrors.assigneeError = t("common.errors.assignee_error")
    }
    if (startDate > endDate) {
      foundErrors.dateError = t("common.errors.date_error")
    }
    return foundErrors
  }

  const handleSaveTask = () => {
    //  setIsLoading(true);
    const validationResult = validation()
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult)
      return false
    }


    const variables = {
      taskTitle, estimatedDays,
      sendNotification, BKPID, saveTaskAsTemplate, phaseID, phaseName, BKPTitle,
      fileID: "",
      fileName: "$fileName",
      taskTypeID: "$taskTypeID",
      files,
      assignees,
      followers,
      description,
      subtasks: [],
      referenceID,
      workTypeID,
      workTypeName
    }
    if (startDate) {
      variables['startDate'] = startDate
    }
    if (startDate) {
      variables['endDate'] = endDate
    }

    addTask({
      variables,
      update: (
        cache,
        { data: { addTask } }: FetchResult<TaskMutation>
      ) => {
        const cacheData = cache.readQuery({ query: GET_TASKS, variables: { referenceID }, }) as ITasks;
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            taskD: [...cacheData.tasks.results, addTask]
          },
          variables: { referenceID },
        });
      }
    });

    // setIsLoading(false);
    // console.log('---loader--after response api---', isLoading)
    // cancel();
  };


  if (loading) return (<LazyLoading />);
  if (error) return <p>Tasks not added. An error occured</p>;

  return (
    <div >
      <Modal className="modal_media right-side--fixed-modal add-new-task-modal"
        closeIcon
        onClose={cancel}
        onOpen={() => setOpen(true)}
        open={open}
        // trigger={<Button size='mini' className="grey-btn taskmargin">+ Add  New Task</Button>} 
        closeOnDimmerClick={false}
      >

      <Dimmer active inverted Center inline>
        <Loader size='big'>Loading</Loader>
      </Dimmer>
        <Modal.Header><h3>{t("project_tab_menu.task.add_new_task")} </h3></Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("project_tab_menu.task.task_title")} <span className="danger">*</span></label>
                          <Input placeholder={t("project_tab_menu.task.task_title")} size='small' className="full-width" type="text"
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
                          <label>{t("common.desc")} </label>
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
                            placeholder={t("common.desc_placeholder")}
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
                          <label>{t("project_tab_menu.task.work_type")} <span className="danger">*</span></label>
                          {/* <Select placeholder='Select' className="small" options={workTypes} /> */}
                          <Select
                            placeholder={t("common.select")}
                            className="small"
                            value={workTypeData}
                            options={workType}
                            onChange={onMworkType}
                            selection
                            clearable
                            error={errors?.workTypeError && !workTypeID}
                          />
                          {errors?.workTypeError && !workTypeID ? <span className="error-message">{errors.workTypeError}</span> : null}
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("common.select_phase")} </label>
                          <PhaseIndex parentPhaseSelect={onsetPhasesID} />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <BkpsIndex bkp={''} parentBKPSelect={setBKPIDChange} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <AssigneeIndex assignees={[]} parentAsigneeSelect={setAsignee} name="Assignee" error={errors?.assigneeError && !assignees.length} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <FollowersIndex followers={[]} parentFollowersSelect={onFollowers} />
                      </Grid.Column>
                    </Grid.Row>
                    <div className="followers-label-area">
                      <Form.Field>
                        <div className="event top-event follower-listing-labels">
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

                          {/* <div className="label-light-black-circle label-spacer">
                        <span className="white-text ">RJ</span>
                      </div>
                      <div className="label-light-blue-circle label-spacer">
                        <span className="white-text">JB</span>
                      </div> */}
                        </div>
                      </Form.Field>
                    </div>
                  </Grid>

                  <Grid columns={3}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("common.start_date")} </label>
                          {/* <Input icon='calendar alternate outline' placeholder='Electrical work' size='small' className="full-width" type="text" /> */}
                          <Input placeholder='Default' size='small' className="full-width"
                            type="date"
                            value={startDate}
                            onChange={onStartDateChange}
                            error={errors?.dateError && (startDate > endDate)}
                          />
                          {errors?.dateError && (startDate > endDate) ? <span className="error-message">{errors.dateError}</span> : null}
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("common.end_date")} </label>
                          {/* <Input icon='calendar alternate outline' placeholder='Electrical work' size='small' className="full-width" type="text" /> */}
                          <Input placeholder='Default' size='small' className="full-width" type="date"
                            defaultValue={startDate}
                            value={endDate}
                            onChange={onEndDateChange}
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("common.estimated_days")}  </label>
                          <Input placeholder={t("project_tab_menu.task.enter_days")} className="small"
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
                          <label>{t("common.task_configuration")}   </label>
                          <div className="content configuration-toggle">
                            <p className="paragraph task-configuration">{t("common.notification_for_task")} <Checkbox toggle className="task-toggle" /></p></div>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
               
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content={t("common.submit")}
            onClick={handleSaveTask}
            positive
            size='small' className="primary"
          />
          <Button size='small' className="icon-border" onClick={cancel}>
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i>  {t("common.cancel")}
          </Button>
          {/* <LazyLoading /> */}
        </Modal.Actions>
      </Modal>

    </div>
  );
}

export default CreateTask;

