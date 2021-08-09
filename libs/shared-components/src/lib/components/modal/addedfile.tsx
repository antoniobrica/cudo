import { MS_SERVICE_URL } from '@cudo/mf-core';
import React from 'react';
import { Button, Checkbox, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import { Dropdown } from 'semantic-ui-react';
function ModalAddFile() {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
  ]

  const [open, setOpen] = React.useState(false)

  return (
    <div id="navbar">
      <Modal className="modal_media modal_center modal_media_1"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='mini' className="grey-btn">Uploaded File</Button>}
        closeOnDimmerClick={false}
      >
        <Modal.Header><h3>Add File</h3></Modal.Header>
        <Modal.Content body>

          <div>


            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="dashed_area md_upload">
                        <div className="file-upload-message">
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/upload.png`} className="mr-10 " />
                          <p className="file-upload-default-message">Drag & drop or click here to upload file</p>

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
                      <label>Upload files</label>


                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>
              <Grid columns={12}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>

                      <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/file_1.png`} />

                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label></label>
                      <label>File_name.cad</label>


                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>

                      <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>

              <Grid columns={12}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>

                      <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/file_1.png`} />

                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label></label>
                      <label>File_name.cad</label>


                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>

                      <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>
              <Grid columns={12}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>

                      <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/file_2.png`} />

                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label></label>
                      <label>File_name.cad</label>


                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>

                      <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>
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
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Project</label>
                      <Select placeholder='Select' className="small" options={countryOptions} clearable />

                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>BKP/Folder</label>
                      <Select placeholder='Select' className="small" options={countryOptions} clearable />

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
                      <Select placeholder='Select' className="small" options={countryOptions} clearable />

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
                      <Checkbox label='Everyone in the Project/Work type' className="small" />
                    </Form.Field>

                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <Checkbox label='Specify People only' className="small" />

                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>

              <Grid columns={1} >
                <Grid.Row>

                  <Grid.Column>
                    <Form.Field>
                      <label>Select Multiple people</label>

                      <Dropdown className="small_drop"
                        clearable
                        fluid
                        multiple
                        search
                        selection
                        options={countryOptions}
                        placeholder='Select Country'
                      />
                    </Form.Field>

                  </Grid.Column>


                </Grid.Row>
              </Grid>

              <Grid columns={5} >
                <Grid.Row>


                  <Grid.Column>
                    <Form.Field>

                      <div className="below_area">
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_1.png`} className="avatar" />
                        <span className="span_name">Barthelemy Chalvet</span>
                        <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>

                      </div>
                    </Form.Field>

                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>

                      <div className="below_area">
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_2.png`} className="avatar" />
                        <span className="span_name">Barthelemy Chalvet</span>
                        <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>

                      </div>
                    </Form.Field>

                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>

                      <div className="below_area">
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_3.png`} className="avatar" />
                        <span className="span_name">Barthelemy Chalvet</span>
                        <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>

                      </div>
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
            X  Cancel
          </Button>

        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default ModalAddFile
