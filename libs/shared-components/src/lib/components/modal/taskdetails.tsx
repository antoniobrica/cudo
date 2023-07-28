import React from 'react';
import ReactQuill, { Quill } from 'react-quill';

import { Button, Modal, Form, Grid, TextArea, Icon, Divider } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import Moment from 'moment';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';
function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}

interface AlertProps {
  openAlertF?,
  taskData?,
  cancel?,
  taskStatus?
  id?
  editTask?
}

export const ModalViewTask = (props: AlertProps) => {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];

  const [open, setOpen] = React.useState(false)
  const {t} = useTranslation()
  React.useEffect(() => {
    if (props.openAlertF) {
      setOpen(props.openAlertF);
    }
  }, [props.openAlertF]);
 
  const openf = () => {
    setOpen(true)
  }
  const cancel = () => {
    setOpen(false)
    props.cancel()
  }

  return (
    <div id="navbar">
      <Modal
        className="modal_media right-side--fixed-modal task-details-modal"
        closeIcon
        onClose={cancel}
        onOpen={openf}
        open={open}
        trigger={
          <Button size="small" className="primary">
            {t("project_tab_menu.task.task_details")}
          </Button>
        }
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <h3 className="d-flex align-items-center">
            <i className="ms-Icon ms-Icon--CheckMark circle-checkmark" aria-hidden="true"></i>
            {t("project_tab_menu.task.task_details")} <span className="textt task-s-number">T-00{props.id} </span>
            <span onClick={() => props.editTask(props.taskData)} className="edit-task-link"><Icon name="edit" /> {t("common.edit")}</span>
          </h3>
          <span className="task-created-date">
          {t("common.created_on")}:{Moment(props?.taskData?.createdAt).format('DD-MM-YYYY')} - {t("common.created_by")}: {props?.taskData?.createdBy}
          </span>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("project_tab_menu.task.task_title")}</label>
                      <span>{props?.taskData?.taskTitle}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("project_tab_menu.task.project_worktype")}</label>
                      <span>{props?.taskData?.workTypeName}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("common.phase")}</label>
                      <span>{props?.taskData?.phaseName}</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("common.desc")} </label>
                      <span>
                        {props?.taskData?.description}
                      </span>
                      {/* <ReactQuill
                        value={props?.taskData?.description}
                        readOnly={true}
                        modules={{
                          toolbar: false
                          // {
                          //   container: [
                          //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                          //     ['bold', 'italic', 'underline'],
                          //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                          //     [{ 'align': [] }],
                          //     ['link', 'image'],
                          //     ['clean'],
                          //     [{ 'color': [] }]
                          //   ]
                          // }
                        }}
                        placeholder={t("common.desc_placeholder")}
                        id="txtDescription"
                      /> */}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("common.bkp")}</label>
                      <span>{props?.taskData?.BKPTitle} </span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("common.assignee")}</label>
                      <div className="event">
                        {(props?.taskData?.assignees || []).map((as, i) => {
                          const name = as.userName.split(" ").map((n) => n[0]).join("");
                          return (
                            <div className="label-green4 label-spacer">
                              <span className="white-text">{name}</span>
                            </div>
                          )
                        })}

                      </div>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("common.followers")}</label>
                      <div className="event">
                        {(props?.taskData?.followers || []).map((p, id) => {
                          const name = p.userName.split(" ").map((n) => n[0]).join("");
                          //   "FirstName LastName".split(" ").map((n)=>n[0]).join(".");
                          return (
                            <div className="label-purple4 label-spacer">
                              <span className="white-text ">{name}</span>
                            </div>
                          )
                        })
                        }
                        {/* <div className="label-purple4 label-spacer">
                          <span className="white-text ">RJ</span>
                        </div>
                        <div className="label-blue4 label-spacer">
                          <span className="white-text">JB</span>
                        </div> */}
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("common.start_date")}</label>
                      <span>{new Date(props?.taskData?.startDate).toDateString()}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("common.end_date")}</label>
                      <span>{new Date(props?.taskData?.endDate).toDateString()}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("common.estimated_days")}</label>
                      <span>{props?.taskData?.estimatedDays}</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1} className="add-extra-files">
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Files</label>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="add-files-list">
                  <Grid.Column className="uploaded-files">
                    <ul>
                      <li>
                        <p>
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/pdf.png`} />
                          Test_2BHK.jpg1628517497176
                        </p>
                        <i className="eye icon"></i>
                      </li>
                      <li>
                        <p>
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/pdf.png`} />
                          Test_2BHK.jpg1628517497176
                        </p>
                        <i className="eye icon"></i>
                      </li>
                    </ul>
                  </Grid.Column>
                </Grid.Row>
              </Grid>


              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("project_tab_menu.task.write_update")} </label>
                      <TextArea placeholder={t("common.tell_us_more")} />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>
                        <a href="">
                          
                          <i
                            className="ms-Icon ms-Icon--Attach"
                            aria-hidden="true"
                          ></i>
                          {t("project_tab_menu.add_file")}
                        </a>
                        
                        <a href="">
                          
                          <i
                            className="ms-Icon ms-Icon--Emoji"
                            aria-hidden="true"
                          ></i>
                          {t("project_tab_menu.task.emoji")}
                        </a>
                        
                        <a href="">
                          
                          <i
                            className="ms-Icon ms-Icon--Accounts"
                            aria-hidden="true"
                          ></i>
                          {t("project_tab_menu.task.mention")}
                        </a>
                      </label>
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <Button
                        style={{ float: 'right' }}
                        content={t("project_tab_menu.task.update")}
                        onClick={cancel}
                        positive
                        size="small"
                        className="primary"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div>
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default_area.png`} className="image_center"></img>
                      </div>
                      <div className="text-center margin-top no-update-message">
                        <span>{t("project_tab_menu.task.no_update_yet")}</span>
                        <p>{t("project_tab_menu.task.no_update_yet_para")}</p>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default ModalViewTask;
