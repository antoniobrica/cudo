import React from 'react';
import { Button, Checkbox, Modal, Input, Form, Grid, Select } from 'semantic-ui-react';
// import SampleModal from './sample-modal';

import img from 'libs/shared-components/src/default.png';

interface AlertProps {
  opennewF?,
  cancel?,
  file?
}
export function UploadNewVersion(props: AlertProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },

  ]


  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if (props.opennewF) {
      setOpen(props.opennewF);
    }
  }, [props.opennewF]);
  const openf = () => {
    setOpen(true)
  }
  const cancel = () => {
    setOpen(false)
    props.cancel()
  }
  const submit = () => {
    setOpen(false)
    props.cancel()
  }
  return (
    <div>
      <Modal className="modal_media modal_center modal_media_1"
        onClose={cancel}
        onOpen={openf}
        open={open}
        trigger={<Button size='mini' className="grey-btn"> New version</Button>}
      >
        <Modal.Header><h3>Upload new version </h3></Modal.Header>
        <Modal.Content body>

          <div>


            <Form>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>File to replace:</label>

                      <img src={img} className="mr-10 " /> 1542.313.3231_project_plan_0358.cad
    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>


              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="dashed_area">
                        <div className="file-upload-message">
                          <p className="file-upload-default-message">
                            <i className="ms-Icon ms-Icon--Upload" aria-hidden="true"></i>  Click to upload new file</p>

                        </div>
                        <Input type="file" className="file-upload-input" />
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>File settings</label>
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="content">
                        <div className="description">Generate file number
                  <p className="enable">Enable this option to generate file numbering</p>
                          <Checkbox toggle className="toggle_area" />

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
                      <label>Project</label>
                      <Select placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Work type</label>
                      <Select placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Phase</label>
                      <Select placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>BKP/Folder</label>
                      <Select placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field>

                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <label>File type</label>
                      <Select placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>File structure</label>
                      <Select placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid  >
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Who can access</label>

                    </Form.Field>

                  </Grid.Column>

                </Grid.Row>
              </Grid>
              <Grid columns={2} >
                <Grid.Row>


                  <Grid.Column>
                    <Form.Field>
                      <Checkbox label='Everyone in the Project/Subproject' className="small" />
                    </Form.Field>

                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <Checkbox label='Specific People only' className="small" />

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
            onClick={submit}
            positive
            size='mini' className="grey-btn"
          />
          <Button size='mini' className="icon-border" onClick={cancel}>
            X  Cancel
        </Button>

        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default UploadNewVersion
