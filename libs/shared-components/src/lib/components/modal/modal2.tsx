import { radios } from '@storybook/addon-knobs';
import React from 'react';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea, Checkbox } from 'semantic-ui-react';
// import SampleModal from './sample-modal';




export function ModalExampleModal2() {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },

  ]


  const [open, setOpen] = React.useState(false)

  return (
    <div id="navbar">
      <Modal className="modal_media"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='mini' className="grey-btn">+ Add  New Task</Button>}
        closeOnDimmerClick={false}
      >
        <Modal.Header><h3>Add New Task </h3></Modal.Header>
        <Modal.Content body>

          <div>


            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Task Title <span className="danger">*</span></label>
                      <Input placeholder='Swtichboard fitting' size='small' className="full-width" type="text" />
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Description </label>
                      <TextArea placeholder='Tell us more' />
                    </Form.Field>
                  </Grid.Column>


                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Associate with work type <span className="danger">*</span></label>
                      <Input placeholder='Electrical work' size='small' className="full-width" type="text" />
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>

              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Select Phase </label>
                      <Select clearable placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <label>Select BKP   </label>
                      <Select clearable placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Assignee <span className="danger">*</span></label>
                      <Input placeholder='Electrical work' size='small' className="full-width" type="text" />
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>

              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Followers  </label>
                      <Select clearable placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <div className="event top-event">
                        <div className="label-light-purple-circle label-spacer">
                          <span className="white-text">AB</span>
                        </div>
                        <div className="label-light-black-circle label-spacer">
                          <span className="white-text ">RJ</span>
                        </div>
                        <div className="label-light-blue-circle label-spacer">
                          <span className="white-text">JB</span>
                        </div>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>

              </Grid>

              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Start Date  </label>

                      <Input placeholder='Default' size='small' className="full-width" type="date" />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>End Date </label>

                      <Input placeholder='Default' size='small' className="full-width" type="date" />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Estimated Days  </label>
                      <Select clearable placeholder='Select' className="small" options={countryOptions} />

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
                      <label>Task Configuration  </label>

                      <div className="content configuration-toggle">
                        <p className="paragraph task-configuration">Send notification to assignee/followers for the task <Checkbox toggle className="task-toggle" /></p></div>
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
            onClick={() => setOpen(false)}
            positive
            size='small' className="primary"
          />
          <Button size='small' className="icon-border" onClick={() => setOpen(false)}>
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i>  Cancel
        </Button>

        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default ModalExampleModal2
