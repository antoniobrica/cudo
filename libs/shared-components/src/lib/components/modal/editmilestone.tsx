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



export interface PlanningProps {
  getMilestoneData?,
  planData?,
  openEdit?,
  confirm?,
  cancel?,
  worktypes?
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
const updateMilestone=()=>{
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
            edit Milestone   
          </Button>
        }
      >
        <Modal.Header>
          <h3>Edit Milestone </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        Milestone Title <span className="danger">*</span>
                      </label>
                      <Input
                        placeholder="Swtichboard fitting"
                        size="small"
                        className="full-width"
                        type="text"
                        value={milestone}
                        onChange={onMilestoneChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Due Date <span className="danger">*</span></label>

                      <Input
                        placeholder="Default"
                        size="small"
                        className="full-width"
                        type="date"
                        value={dueDate}
                        onChange={onDueDateChange}
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
                      <TextArea placeholder="Tell us more" 
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
                        Associate with work type 
                        
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
                <PhaseIndex phaseName={phaseName} parentPhaseSelect={onsetPhasesID} />
                  </Grid.Column>
 
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Submit"
            onClick={updateMilestone}
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

export default EditMileStonePopup;
