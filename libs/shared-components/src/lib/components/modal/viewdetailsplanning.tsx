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
import LoaderPage from '../loader/loader';
// import SampleModal from './sample-modal';
export interface PlanningProps {
  openPlanningDetail?,
  cancel?,
  milestoneDataById?,
  loading?
}
export function ModalViewPlanning(props: PlanningProps) {

  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];

  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    console.log('loading', props.loading);
    if (props.openPlanningDetail) {
      setOpen(props.openPlanningDetail);
    }
  }, [props.openPlanningDetail]);
  const openf = () => {
    setOpen(true)
  }
  const cancel = () => {
    setOpen(false)
    props.cancel()
  }
  if (props.loading) return <LoaderPage />;
  return (
    <div id="navbar">
      <Modal
        className="modal_media"
        onClose={() => setOpen(false)}
        onOpen={openf}
        open={open}
        trigger={
          <Button size="mini" className="grey-btn">
            View Milestone
          </Button>
        }
      >
        <Modal.Header>
          <h3> Milestone Details </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Milestone Title</label>
                      <span>{props?.milestoneDataById?.MileStoneByID.milestoneTitle}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Due Date</label>
                      <span>{props?.milestoneDataById?.MileStoneByID.dueDate}</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Description </label>
                      <span>{props?.milestoneDataById?.MileStoneByID.description}
                      </span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Associate with work type</label>
                      <span>Burj Khalifa (project ModalAddSubLevel) </span>
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
            onClick={cancel}
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

export default ModalViewPlanning;
