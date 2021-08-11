import { MS_SERVICE_URL } from '@cudo/mf-core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea, Checkbox, Radio } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
export interface FileProps {
  fileData?
  onFileSubmit?
  setting?
}

export function ModalAddPrint(props: FileProps) {
  
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },

  ]

  const {t}= useTranslation()
  const [open, setOpen] = React.useState(false)
  const [file, setFile] = React.useState(null)
  const onFileChange = event => {
    const fl = event.target.files;
    setFile(fl);
    props.fileData(fl);

  };
  const upload = () => {
    setOpen(false);
    props.onFileSubmit(file);
  }
  const openSetting = () => {
    props.setting();
  }
  return (
    <div id=" " className="add-files-modal" >
      <Modal className="modal_media modal_center add-file-setting-popup"
        closeIcon
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='small' className="primary"><i className="ms-Icon ms-font-xl ms-Icon--Add"></i> {t("project_tab_menu.add_file")}</Button>}
        closeOnDimmerClick={false}
      >
        <Modal.Header><h3>{t("project_tab_menu.add_file")}</h3></Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="dashed_area">
                        <div className="file-upload-message">
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/upload.png`} className="mr-10 " />
                          <p className="file-upload-default-message">{t("common.drag_and_drop")}</p>
                        </div>
                        <Input type="file" className="file-upload-input" multiple={true} onChange={onFileChange} />
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {/* <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="content" onClick={openSetting}>
                        <div className="description">{t("project_tab_menu.files.file_settings")}
                          <span className="float_right"><i className="ms-Icon ms-Icon--ChevronRightMed" aria-hidden="true"></i> </span>
                        </div>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid> */}

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <div className="uploaded-files">
                      <h3>Uploade files</h3>
                      <ul>
                        <li>
                          <p>
                            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/powerpoint.png`} alt="" />
                            file_name.cad
                          </p>
                          <i className="ms-Icon ms-Icon--CalculatorMultiply" aria-hidden="true"></i>
                        </li>
                        <li>
                          <p>
                            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/powerpoint.png`} alt="" />
                            file_name.cad
                          </p>
                          <i className="ms-Icon ms-Icon--CalculatorMultiply" aria-hidden="true"></i>
                        </li>
                        <li>
                          <p>
                            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/powerpoint.png`} alt="" />
                            file_name.cad
                          </p>
                          <i className="ms-Icon ms-Icon--CalculatorMultiply" aria-hidden="true"></i>
                        </li>
                      </ul>
                    </div>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <div className="file-setting-option">
                      <h3>File Settings</h3>
                      <div className="generate-file-number">
                        <p>Generate file number <span>Enable this option to generate file numbering</span></p>
                        <Checkbox toggle className="toggle_area" />
                      </div>
                    </div>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column>
                          <Form.Field>
                            <label>Project</label>
                            <Select placeholder='Select' className="small" options={countryOptions} clearable />
                          </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                            <label>Phase</label>
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
                            <Select placeholder='Select' className="small" options={countryOptions} clearable />
                          </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                            <label>File Structure</label>
                            <Select placeholder='Select' className="small" options={countryOptions} clearable />
                          </Form.Field>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Grid columns={1} className="select-access">
                      <Grid.Row>
                        <Grid.Column>
                          <Form.Field>
                            <label>Who can access</label>
                          </Form.Field>
                          <div className="access-radio">
                            <div className="radio">
                              <label>
                                <input type="radio" value="option1" checked={true} />
                                Everyone in the Project/Subproject
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <input type="radio" value="option2" />
                                Specific People only
                              </label>
                            </div>
                          </div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content={t("common.submit")}
            onClick={upload}
            positive
            size='small' className="primary"
          />
          <Button size='small' className="icon-border" onClick={() => setOpen(false)}>
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i>  {t("common.cancel")}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default ModalAddPrint
