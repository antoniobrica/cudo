import React from 'react';
import {
  Button,
  Header,
  Modal,
  
  Input,
  Form,
  Grid,
  
  Select,
  TextArea,
} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import moment, { calendarFormat } from 'moment';
import { PhaseIndex } from "@cudo/mf-account-app-lib"
import { useTranslation } from 'react-i18next';



export interface PlanningProps {
  getMilestoneData?,
  planData?,
  openEdit?,
  confirm?,
  cancel?,
  worktypes?
}
interface PlanningErrors {
  titleError?:string,
  dateError?:string,
  workTypeError?:string,
  phaseError?:string
}
export function EditMileStonePopup(props: PlanningProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];
  const workTypes = [
    { key: 'w1', value: 'w1', text: 'Electrical Work' },
    { key: 'w2', value: 'w2', text: 'HVAC work' },
    { key: 'w3', value: 'w3', text: 'Pipelines work' },
    { key: 'w4', value: 'w4', text: 'Plumbing Work' },


  ]
  const [phaseName, setPhasesName] = React.useState("");
  const [phaseID, setPhasesID] = React.useState("");
  const [fileTypeName, setfileTypeName] = React.useState("");
  const [milestone, setMilestoneName] = React.useState("");
  const [dueDate, setDueDate] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [open, setOpen] = React.useState(false);
  const [milestoneID, setmilestoneID]= React.useState('');
  const [workTypeData, setworkTypeData]= React.useState('')
  const [workType, setworkType] = React.useState(null) 
  const [workTypeD, setworkTypeD] = React.useState(null) 
  const {t} = useTranslation()
  const [errors, setErrors] = React.useState<PlanningErrors>({})
  React.useEffect(() => {
    if (props.openEdit) {
      setOpen(props.openEdit);
    }
  }, [props.openEdit]);
  React.useEffect(() => {
    if (props.worktypes) {
      console.log('worktypes', props.worktypes);
      setworkType(props.worktypes.map(({ workTypeName, projectWorkTypeID }) => ({ key: projectWorkTypeID, value: workTypeName, text: workTypeName, id: projectWorkTypeID })));

    }
  }, [props.worktypes]);

  const onMworkType = (event, data) => {
    const workT = { 
      worktypeID: '',
      worktypeName: ''
     };
    for (let i = 0; i < props.worktypes.length; i++) {
      if (props.worktypes[i]?.workTypeName === data.value) {
        console.log('props.worktypes[i]', props.worktypes[i]);
        workT.worktypeID = props.worktypes[i].projectWorkTypeID;
        workT.worktypeName = data.value;
        setworkTypeD(workT)
      }
    }
    setworkTypeData(data.value)

    console.log('worktypeName-', workTypeD);
  }

  React.useEffect(() => {
    if (props.planData) {
     console.log('plan-edit-data', props.planData);
     setMilestoneName(props.planData.milestoneTitle);
     setDueDate(props.planData.dueDate);
     setDescription(props.planData.description);
     setmilestoneID(props.planData.milestoneID);
     setPhasesName(props.planData.phaseName);
    }

  }, [props.planData]);
  const openf = () => {
    setOpen(true)
  }
  const cancel =()=>{
    setOpen(false)
    props.cancel()
  }
  const onsetPhasesID = (data) => {
    setPhasesID((data.phaseID).toString());
    setPhasesName(data.phaseName)
  }

   const onMilestoneChange=(e)=>{
     setMilestoneName(e.target.value);
   }

   const onDueDateChange = e => {
    const date= moment.utc(moment(e.target.value).utc()).format();
    setDueDate(e.target.value)
  }

  const onDescriptionChange = e=>{
    setDescription(e.target.value);
  }
  const validation = () => {
    const foundErrors:PlanningErrors= {}
    if (!milestone) {
     foundErrors.titleError = t("common.errors.title_error")
    }
    if (!dueDate) {
      foundErrors.dateError = t("common.errors.due_date_error")
     }
    if (!workTypeD) {
      foundErrors.workTypeError= t("common.errors.worktype_error")
     }
    if (!phaseID) {
      foundErrors.phaseError =  t("common.errors.phase_error") 
    }
    return foundErrors
  }

  const updateMilestone=()=>{
    const validationResult = validation()
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult)
      return false
    }
      const data ={
       milestoneID: milestoneID,
       milestoneTitle: milestone,
       dueDate: dueDate,
       description: description,
       phaseName: phaseName,
       // worktypeID: workTypeD.worktypeID,
       // worktypeName: workTypeD.worktypeName
      }
      props.getMilestoneData(data);
      setOpen(false)
   }
   



  return (
    <div id="navbar">
      <Modal  style={{height:'650px'}}
        className="modal_media"
        onClose={cancel}
        onOpen={openf}
        open={open}
        trigger={
          <Button size="mini" className="grey-btn">
            {t("project_tab_menu.planning.edit_milestone")}   
          </Button>
        }
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <h3>{t("project_tab_menu.planning.edit_milestone")}  </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                      {t("project_tab_menu.planning.milestone_title")} <span className="danger">*</span>
                      </label>
                      <Input
                        placeholder={t("project_tab_menu.planning.milestone_title")}
                        size="small"
                        className="full-width"
                        type="text"
                        value={milestone}
                        onChange={onMilestoneChange}
                        error={errors?.titleError && !milestone}
                      />
                       {errors?.titleError && !milestone ? <span className="error-message">{errors.titleError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t("common.due_date")} <span className="danger">*</span></label>

                      <Input
                        placeholder="Default"
                        size="small"
                        className="full-width"
                        type="date"
                        value={dueDate}
                        onChange={onDueDateChange}
                        error={errors?.dateError && !dueDate}
                      />
                      {errors?.dateError && !dueDate ? <span className="error-message">{errors.dateError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t("common.desc")} </label>
                      <TextArea placeholder={t("common.tell_us_more")} 
                       value={description}
                       onChange={onDescriptionChange}
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
                      {t("project_tab_menu.task.work_type")} 
                        
                      </label>
                      <Select
                        clearable
                        placeholder={t("common.select")}
                        className="small"
                        value={workTypeData}
                        options={workType}
                        onChange={onMworkType}     
                        error={errors?.workTypeError && !workTypeData}
                      />
                      {errors?.workTypeError && !workTypeData ? <span className="error-message">{errors.workTypeError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    {/* <Form.Field>
                      <label>Select Phase </label>
                      <Select
                        clearable
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field> */}
                <PhaseIndex phaseName={phaseName} parentPhaseSelect={onsetPhasesID} error={errors?.phaseError && !phaseID} />
                {errors?.phaseError && !phaseID ? <span className="error-message">{errors.phaseError}</span> : null}
                  </Grid.Column>
 
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content={t("common.submit")}
            onClick={updateMilestone}
            positive
            size="small"
            className="primary"
          />
          <Button
            size="small"
            className="icon-border"
            onClick={cancel}
          >
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i> {t("common.cancel")}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default EditMileStonePopup;
