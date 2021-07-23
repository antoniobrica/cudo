import React from 'react';
import {
  Button,
  Header,
  Modal,
  Input,
  Form,
  Grid,
  Dropdown,
  Select,
  TextArea,
  FormButton,
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
      <Modal className="modal_media right-side--fixed-modal view-milestone-modal"
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={openf}
        open={open}
        // trigger={
        //   <Button size="mini" className="grey-btn">
        //     View Milestone
        //   </Button>
        // }
        closeOnDimmerClick={false}>
        <Modal.Header>
          <h3 className="header-w-icon d-flex align-item-center"><i className="ms-Icon ms-Icon--Completed" aria-hidden="true"></i> Milestone Details
            <div className="symbol symbol-30 d-flex">
              <span className="dropdown-action">
                <Dropdown icon='ellipsis horizontal' floating labeled>
                  <Dropdown.Menu className="dropdowncomplete">
                    <Dropdown.Item
                      icon="pencil" text="Edit" />
                    <Dropdown.Item
                      icon="trash alternate outline"
                      text="Delete" />
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            </div>
          </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Milestone Title</label>
                      <span>{props?.milestoneDataById?.MileStoneByID.milestoneTitle}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Due Date</label>
                      <span>{props?.milestoneDataById?.MileStoneByID.dueDate}</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
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
                    <Form.Field className="filled-fields">
                      <label>Associate with work type</label>
                      <span>{props?.milestoneDataById?.MileStoneByID.worktypeName} </span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Phase type</label>
                      <span>{props?.milestoneDataById?.MileStoneByID.phaseName} </span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        {/* <Modal.Actions>
          <Button
            content="Ok"
            onClick={cancel}
            positive
            size="small"
            className="primary"
          />
          <Button
            size="small"
            className="icon-border"
            onClick={cancel}
          >
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i> Cancel
          </Button>
        </Modal.Actions> */}
      </Modal>
    </div>
  );
}

export default ModalViewPlanning;
