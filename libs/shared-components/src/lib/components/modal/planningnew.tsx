 
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

// import SampleModal from './sample-modal';

export function ModalPlanningNew() {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];
  const [phaseName, setPhasesName] = React.useState("");
  const [phaseID, setPhasesID] = React.useState("");
  const [fileTypeName, setfileTypeName] = React.useState("");
  const [milestone, setMilestoneName] = React.useState("");
  const [dueDate, setDueDate] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [open, setOpen] = React.useState(false);
  const onsetPhasesID = (data) => {
    console.log('phase',data);
    
    setPhasesID((data.phaseID).toString());
    setPhasesName(data.phaseName)
  }

   const onMilestoneChange=(e)=>{
     console.log('milestone=>',e.target.value);
     setMilestoneName(e.target.value);
   }

   const onDueDateChange = e => {
    const date= moment.utc(moment(e.target.value).utc()).format();
    setDueDate(e.target.value)
  }

  const onDescriptionChange = e=>{
    console.log('des=>',e.target.value);
    setDescription(e.target.value);
  }

  return (
    <div style={{ marginLeft: 900 }} >
      <Modal
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
                        options={countryOptions}
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
            onClick={() => setOpen(false)}
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
