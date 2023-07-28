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
  Dimmer,
  Loader,
} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import moment, { calendarFormat } from 'moment';
import { PhaseIndex } from "@cudo/mf-account-app-lib"
import { useTranslation } from 'react-i18next';
// import PopupLoading from '../loader/popuploader';

export interface PlanningProps {
  getMilestoneData?,
  planData?,
  openEdit?,
  confirm?,
  cancel?,
  worktypes?
  updateLoading?
  updateData?
  listData?
}
interface PlanningErrors {
  titleError?: string,
  dateError?: string,
  workTypeError?: string,
  phaseError?: string
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
  const [milestoneID, setmilestoneID] = React.useState('');
  const [workTypeData, setworkTypeData] = React.useState('')
  const [workType, setworkType] = React.useState(null)
  const [workTypeD, setworkTypeD] = React.useState(null)
  const [worktypeID, setworktypeID] = React.useState("")
  const [worktypeName, setWorktypeName] = React.useState("")
  const [status, setStatus] = React.useState("null")

  const { t } = useTranslation()
  const [errors, setErrors] = React.useState<PlanningErrors>({})

  const [loader, setLoader] = React.useState(false)

  // React.useEffect(() => {
  //   if (!props.updateLoading && props.updateData) {
  //     cancel()
  //   }
  // }, [props.updateData])

  React.useEffect(() => {
    if (props.openEdit) {
      setOpen(props.openEdit);
    }
  }, [props.openEdit]);
  React.useEffect(() => {
    if (props.worktypes) {
      setworkType(props.worktypes.map(({ workTypeName, projectWorkTypeID }) => ({ key: projectWorkTypeID, value: workTypeName, text: workTypeName, id: projectWorkTypeID })));
    }
  }, [props.worktypes]);

  const onMworkType = (event, data) => {
    const workT = {
      worktypeID: '',
      worktypeName: ''
    };
    if (data.value) {
      for (let i = 0; i < props.worktypes.length; i++) {
        if (props.worktypes[i]?.workTypeName === data.value) {

          workT.worktypeID = props.worktypes[i].projectWorkTypeID;
          workT.worktypeName = data.value;
          setWorktypeName(workT.worktypeName)
          setworktypeID(workT.worktypeID)
          setworkTypeD(workT)
        }
      }
    } else {
      setWorktypeName("")
      setworktypeID("")
      setworkTypeD(null)
    }

    setworkTypeData(data.value)

  }

  function formatDate(date) {
    var d = new Date(date),
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
    if (props.planData) {
      const d = props.planData.dueDate;

      setMilestoneName(props.planData.milestoneTitle);
      const date = moment.utc(moment(props.planData.dueDate).utc()).format();
      setDueDate(formatDate(d));
      setDescription(props.planData.description);
      setmilestoneID(props.planData.milestoneID);
      setPhasesName(props.planData.phaseName);
      setStatus(props.planData.status)
      setWorktypeName(props.planData.worktypeName)
      setworktypeID(props.planData.worktypeID)
      setworkTypeData(props.planData.worktypeName)
    }

  }, [props.planData]);
  const openf = () => {
    setOpen(true)
  }
  const cancel = () => {
    setOpen(false)
    props.cancel()
    // resetEditData()
    setLoader(false)
  }
  const onsetPhasesID = (data) => {
    setPhasesID((data.phaseID).toString());
    setPhasesName(data.phaseName)
  }

  const onMilestoneChange = (e) => {
    setMilestoneName(e.target.value);
  }

  const onDueDateChange = e => {
    const date = moment.utc(moment(e.target.value).utc()).format();
    setDueDate(e.target.value)
  }

  const onDescriptionChange = e => {
    setDescription(e.target.value);
  }
  const validation = () => {
    const foundErrors: PlanningErrors = {}
    if (!milestone) {
      foundErrors.titleError = t("common.errors.title_error")
    }
    if (!dueDate) {
      foundErrors.dateError = t("common.errors.due_date_error")
    }
    if (!worktypeID) {
      foundErrors.workTypeError = t("common.errors.worktype_error")
    }
    if (!phaseName) {
      foundErrors.phaseError = t("common.errors.phase_error")
    }
    return foundErrors
  }

  const updateMilestone = () => {
    const validationResult = validation()
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult)
      return false
    }
    setLoader(true)
    const data = {
      milestoneID: milestoneID,
      milestoneTitle: milestone,
      dueDate: dueDate,
      description: description,
      phaseName: phaseName,
      status: status,
      worktypeID: worktypeID,
      worktypeName: worktypeName
    }
    props.getMilestoneData(data);
    cancel()
  }




  return (
    <div id="navbar">
      <Modal
        className={`modal_media right-side--fixed-modal edit-milestone-modal${loader && " overflow-hidden"}`}
        closeIcon
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
        {
          loader && (
            // <PopupLoading />
            <Dimmer active inverted Center inline>
              <Loader size='big'>Loading</Loader>
            </Dimmer>
          )
        }
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
                        max="9999-12-31"
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
                        {t("project_tab_menu.task.work_type")} <span className="danger">*</span>
                      </label>
                      <Select
                        clearable
                        placeholder={t("common.select")}
                        className="small"
                        value={workTypeData}
                        options={workType}
                        onChange={onMworkType}
                        error={errors?.workTypeError && !worktypeID}
                      />
                      {errors?.workTypeError && !worktypeID ? <span className="error-message">{errors.workTypeError}</span> : null}
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
                    <Form.Field>
                      <label>{t("common.select_phase")} <span className="danger">*</span></label>
                      <PhaseIndex phaseName={phaseName} parentPhaseSelect={onsetPhasesID} error={errors?.phaseError && !phaseName} />
                      {errors?.phaseError && !phaseName ? <span className="error-message">{t("common.errors.phase_error")}</span> : null}
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
