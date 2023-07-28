import { MS_SERVICE_URL } from '@cudo/mf-core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea } from 'semantic-ui-react';
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
      <Modal className="modal_media modal_center modal_media_1"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='small' className="primary">+ {t("project_tab_menu.add_file")}</Button>}
        closeOnDimmerClick={false}
      >
        <Modal.Header><h3>{t("project_tab_menu.add_file")} </h3></Modal.Header>
        <Modal.Content body>

          <div>


            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="dashed_area" style={{ paddingTop: 15 }}>
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
              <br /><br />
              <Grid columns={1}>
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
            X  {t("common.cancel")}
          </Button>



        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default ModalAddPrint
