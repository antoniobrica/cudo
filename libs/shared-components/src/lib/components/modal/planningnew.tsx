
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
import { PhaseIndex } from "@cudo/mf-account-app-lib"
import moment, { calendarFormat } from 'moment';
import ReactQuill, { Quill } from 'react-quill';
import { useTranslation } from 'react-i18next';
import { object } from '@hapi/joi';

// import SampleModal from './sample-modal';

export interface PlanningProps {
  getMilestoneData?,
  worktypes?
  openNew?
  cancel?

}
interface PlanningErrors {
  titleError?:string,
  dateError?:string,
  workTypeError?:string,
  phaseError?:string
}
export function ModalPlanningNew(props: PlanningProps) {
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
  const [worktypeID, setworktypeID] = React.useState("")
  const [worktypeName, setworktypeName] = React.useState("")
  const [workTypeData, setworkTypeData] = React.useState('')
  const [workType, setworkType] = React.useState(null)
  const [workTypeD, setworkTypeD] = React.useState(null)
  
  const {t} = useTranslation()
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState<PlanningErrors>({})
  const [isSubmited, setIsSubmited] = React.useState(false)
  React.useEffect(() => {
    if (props.openNew) {
      setOpen(props.openNew)
    }
  }, [props.openNew])
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
        setworktypeName(workT.worktypeName);
        setworktypeID(workT.worktypeID);
        setworkTypeD(workT)
      }
    }
    setworkTypeData(data.value)

    console.log('worktypeName-', workTypeD);
  }
  const onsetPhasesID = (data) => {
    console.log('phase', data);

    setPhasesID((data.phaseID).toString());
    setPhasesName(data.phaseName)
  }

  const onMilestoneChange = (e) => {
    console.log('milestone=>', e.target.value);
    setMilestoneName(e.target.value);
  }

  const onDueDateChange = e => {
    const date = moment.utc(moment(e.target.value).utc()).format();
    setDueDate(e.target.value)
  }

  const onDescriptionChange = e => {
    setDescription(e);
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

  const handleFormSubmit = () => {
    setErrors(validation())
    setIsSubmited(true)
  }

  const cancel = () => {
    setOpen(false)
    props.cancel()
  }

  const resetAddData = () => {
    setPhasesName("")
    setPhasesID("")
    setMilestoneName("")
    setDueDate("")
    setDescription("")
    setworktypeID("")
    setworktypeName("")
    setworkTypeData("")
    setworkType(null)
    setworkTypeD(null)
    setErrors({})
  }

  React.useEffect(()=>{
    if(Object.keys(errors).length === 0 && isSubmited){
     const createMilestone = () =>{ const data = {
        milestoneTitle: milestone,
        dueDate: dueDate,
        description: description,
        phaseID: phaseID,
        phaseName: phaseName,
        worktypeID: workTypeD.worktypeID,
        worktypeName: workTypeD.worktypeName
      }
      props.getMilestoneData(data);
      props.cancel()
      resetAddData()
    }
    createMilestone()
    }
  },[errors,isSubmited])

  return (
    <div style={{ marginLeft: 900 }} >
      <Modal style={{ height: '650px' }}
        className="modal_media"
        onClose={cancel}
        onOpen={() => setOpen(true)}
        open={open}
      // trigger={
      //   <Button size="small" className="primary">
      //     + Add New
      //   </Button>
      // }
      closeOnDimmerClick={false}
      >
        <Modal.Header>
          <h3>{t("project_tab_menu.planning.add_milestone")} </h3>
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
                      {/* <TextArea placeholder="Tell us more"    
                       value={description}
                       onChange={onDescriptionChange}
                     /> */}
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
                      <label>
                      {t("project_tab_menu.task.work_type")} <span className="danger">*</span>

                      </label>
                      <Select
                        clearable
                        placeholder={t("common.select")}
                        className="small"
                        value={workTypeData}
                        options={workType}
                        onChange={onMworkType}
                        error={errors?.workTypeError && !workTypeD}
                      />
                      {errors?.workTypeError && !workTypeD ? <span className="error-message">{errors.workTypeError}</span> : null}
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
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field> */}
                    <PhaseIndex parentPhaseSelect={onsetPhasesID} error={errors?.phaseError && !phaseID}/>
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
            onClick={handleFormSubmit}
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

export default ModalPlanningNew;
