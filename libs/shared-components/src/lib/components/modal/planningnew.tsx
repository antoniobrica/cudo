
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

// import SampleModal from './sample-modal';

export interface PlanningProps {
  getMilestoneData?,
  worktypes?
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


  const [open, setOpen] = React.useState(false);
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
  const createMilestone = () => {

    const data = {
      milestoneTitle: milestone,
      dueDate: dueDate,
      description: description,
      phaseID: phaseID,
      phaseName: phaseName,
      worktypeID: workTypeD.worktypeID,
      worktypeName: workTypeD.worktypeName
    }
    props.getMilestoneData(data);
    setOpen(false)
  }
  return (
    <div style={{ marginLeft: 900 }} >
      <Modal style={{ height: '650px' }}
        className="modal_media"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button size="mini" className="grey-btn">
            + Add New
          </Button>
        }
      >
        <Modal.Header>
          <h3>Add Milestone </h3>
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
                        placeholder="Milestone title"
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
                    <PhaseIndex parentPhaseSelect={onsetPhasesID} />
                  </Grid.Column>

                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Submit"
            onClick={createMilestone}
            positive
            size="mini"
            className="grey-btn"
          />
          <Button
            size="mini"
            className="icon-border"
            onClick={() => setOpen(false)}
          >
            X Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalPlanningNew;
