import { MS_SERVICE_URL } from '@cudo/mf-core';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import {
  Button,
  Checkbox,
  Modal,
  Input,
  Form,
  Grid,
  Dropdown,
  TextArea,
} from 'semantic-ui-react';
// import SampleModal from './sample-modal';

export interface AddProtocolProps {
  sessionId?
  openAddProtocol?
  createProtocol?
  cancel?
  sessionDetail?
  projectTypeId?
  companyId?
}

interface AddProtocolErrors {
  titleError?: string,
  dateError?: string,
  startTimeError?: string,
  endTimeError?: string,
  startEndTimeError?: string,
}

export function ModalAddProtocol(props: AddProtocolProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];

  const [open, setOpen] = React.useState(false);
  const [openAddInvitation, setOpenAddInvitation] = React.useState(false)
  const [protocolTitle, setProtocolTitle] = React.useState("");
  const [protocolDate, setProtocolDate] = React.useState("");
  const [protocolStartTime, setProtocolStartTime] = React.useState("");
  const [protocolEndTime, setProtocolEndTime] = React.useState("");
  const [protocolDescription, setProtocolDescription] = React.useState("");
  const [errors, setErrors] = React.useState<AddProtocolErrors>({});
  const {t} = useTranslation()

  React.useEffect(() => {
    if (props.openAddProtocol) {
      setOpen(true)
    }
  }, [props.openAddProtocol])

  const onProtocolTitleChange = (e) => {
    setProtocolTitle(e.target.value)
    setErrors({ ...errors, titleError: "" })
  }

  const onClickStartTime = (e) => {
    setProtocolStartTime(e.target.value)
    if (protocolEndTime) {
      checkTimeValidation(e.target.value, protocolEndTime)
    }
  }

  const onClickEndTime = (e) => {
    setProtocolEndTime(e.target.value)
    if (protocolStartTime) {
      checkTimeValidation(protocolStartTime, e.target.value)
    }
  }

  const hanleCheckbox = (event) => {
    setOpenAddInvitation(!openAddInvitation)
  }

  const checkTimeValidation = (startTime, endTime) => {
    if (!protocolDate) {
      setErrors({ ...errors, dateError: "please provide date" })
      return false
    } else {
      setErrors({ ...errors, dateError: "" })
    }

    const startMeetingDateTime = getDateTime(protocolDate, startTime)
    const endMeetingDateTime = getDateTime(protocolDate, endTime)

    if (startMeetingDateTime > endMeetingDateTime) {
      setErrors({ ...errors, startEndTimeError: t("common.errors.start_end_time") })
      return false
    } else {
      setErrors({ ...errors, startEndTimeError: "" })
    }
  }

  const getDateTime = (selectedDate, selectedTime) => {

    const momentObj = moment(selectedDate + selectedTime, 'YYYY-MM-DDLT');

    const finalDateTime = momentObj.format('YYYY-MM-DD HH:mm:ss');
    return new Date(finalDateTime)
  }

  const onDescription = (html) => {
    setProtocolDescription(html)
  }

  const openProtocolAddPopup = () => {
    setOpen(true)
    props.openAddProtocol(true)
  }

  const validation = () => {
    const errorResponse: AddProtocolErrors = {}

    if (!protocolTitle) {
      errorResponse.titleError = t("project_tab_menu.meeting.errors.title_error")
    }
    if (!protocolDate) {
      errorResponse.dateError = t("project_tab_menu.meeting.errors.date_error")
    }
    if (!protocolStartTime) {
      errorResponse.startTimeError = t("common.errors.start_time")
    }
    if (!protocolEndTime) {
      errorResponse.endTimeError = t("common.errors.end_time")
    }
    if(protocolStartTime > protocolEndTime) {
      errorResponse.startEndTimeError = t("common.errors.start_end_time")
    }
    return errorResponse
  }

  const createProtocol = () => {
    const validationResult = validation()
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult)
      return false
    }

    const startProtocolDateTime = getDateTime(protocolDate, protocolStartTime)
    const endProtocolDateTime = getDateTime(protocolDate, protocolEndTime)

    if (startProtocolDateTime > endProtocolDateTime) {
      setErrors({ ...errors, startEndTimeError: "must be greater than start time" })
      return false
    } else {
      setErrors({ ...errors, startEndTimeError: null })
    }

    const protocolDurationSeconds = (endProtocolDateTime.getTime() - startProtocolDateTime.getTime()) / 1000
    const protocolDurationMinutes = `${protocolDurationSeconds / 60} min`
    
    const data = {
      companyId:props.companyId,
      projectTypeId: props.projectTypeId,
      workTypeId: props.sessionDetail.SessionByID.worktypeID,
      sessionId: props.sessionId,
      protocolTitle,
      protocolDate,
      protocolStartTime: new Date(startProtocolDateTime),
      protocolEndTime: endProtocolDateTime,
      protocolDescription,
      meetings:[],
      protocolFiles:[],
      protocolDuration:protocolDurationMinutes,
      status: 'SCHEDULED'
    }

    props.createProtocol(data)
    setOpen(false)
    resetAddData()
    setOpenAddInvitation(false)
    props.cancel()
  }

  const cancel = () => {
    setOpen(false)
    props.cancel(true)
    setOpenAddInvitation(false)
    resetAddData()
  }

  const resetAddData = () => {
    setProtocolTitle("")
    setProtocolDate("")
    setProtocolStartTime("")
    setProtocolEndTime("")
    setProtocolDescription("")
    setErrors({})
  }

  return (
    <div id="navbar">
      <Modal
        className="modal_media right-side--fixed-modal add-new-invitation-modal"
        onClose={() => setOpen(false)}
        onOpen={openProtocolAddPopup}
        open={open}
        // trigger={
        //   <Button size="mini" className="grey-btn">
        //     + Add Protocol
        //   </Button>
        // }
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <h3>{t("project_tab_menu.meeting.add_protocol")} </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                      {t("common.title")} <span className="danger">*</span>
                      </label>
                      <Input
                        placeholder="Team onboarding"
                        size="small"
                        className="full-width"
                        type="text"
                        value={protocolTitle}
                        onChange={onProtocolTitleChange}
                        error={errors.titleError && !protocolTitle}
                      />
                      {errors?.titleError && !protocolTitle ? <span className="error-message">{errors.titleError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t("common.date")} <span className="danger">*</span></label>
                      <Input
                        placeholder="Default"
                        size="small"
                        className="full-width"
                        type="date"
                        value={protocolDate}
                        onChange={e => setProtocolDate(e.target.value)}
                        error={errors.dateError && !protocolDate}
                      />
                      {errors?.dateError && !protocolDate ? <span className="error-message">{errors.dateError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t("common.start_time")} <span className="danger">*</span></label>
                      <Input
                        placeholder="Default"
                        size="small"
                        className="full-width"
                        type="time"
                        value={protocolStartTime}
                        onChange={onClickStartTime}
                        error={errors.startTimeError && !protocolStartTime}
                      />
                      {errors?.startTimeError && !protocolStartTime ? <span className="error-message">{errors.startTimeError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t("common.end_time")} <span className="danger">*</span></label>
                      <Input
                        placeholder="Default"
                        size="small"
                        className="full-width"
                        type="time"
                        value={protocolEndTime}
                        onChange={onClickEndTime}
                        error={errors.endTimeError && !protocolEndTime}
                      />
                      {errors?.endTimeError && !protocolEndTime ? <span className="error-message">{errors.endTimeError}</span> : null}
                      {errors?.startEndTimeError ? <span className="error-message">{errors.startEndTimeError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t("common.desc")}</label>
                      {/* <TextArea placeholder="Tell us more" /> */}
                      <ReactQuill
                        value={protocolDescription}
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
                        placeholder={t("common.tell_us_more")}
                        onChange={(content, delta, source, editor) => onDescription(content)}
                        // onKeyDown={onKeyPresDescription}
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
                      <label>{t("common.add_files")}</label>
                      <div className="dashed_area md_upload">
                        <div className="file-upload-message">
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/upload.png`} className="mr-10 " />
                          <p className="file-upload-default-message">
                            {t("common.drag_and_drop")}
                          </p>
                        </div>
                        {/* <Input type="file" className="file-upload-input" /> */}
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <Checkbox
                      label="Add Invitation"
                      checked={openAddInvitation}
                      onChange={hanleCheckbox}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {openAddInvitation && (
                <>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>
                            {t("common.title")} <span className="danger">*</span>
                          </label>
                          <Input
                            placeholder="Team onboarding"
                            size="small"
                            className="full-width"
                            type="text"
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={3}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("common.date")} </label>
                          <Input
                            placeholder="Default"
                            size="small"
                            className="full-width"
                            type="date"
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("common.start_time")} </label>
                          <Input
                            placeholder="Default"
                            size="small"
                            className="full-width"
                            type="time"
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("common.end_time")} </label>
                          <Input
                            placeholder="Default"
                            size="small"
                            className="full-width"
                            type="time"
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("project_tab_menu.meeting.members")}</label>

                          <Dropdown
                            className="small_drop"
                            clearable
                            fluid
                            multiple
                            search
                            selection
                            options={countryOptions}
                            placeholder={t("common.select")}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={5}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <div className="below_area">
                            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_1.png`} className="avatar" />
                            <span className="span_name">Barthelemy Chalvet</span>
                            <i
                              className="ms-Icon ms-Icon--CalculatorMultiply right_float"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </Form.Field>
                      </Grid.Column>

                      <Grid.Column>
                        <Form.Field>
                          <div className="below_area">
                            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_2.png`} className="avatar" />
                            <span className="span_name">Barthelemy Chalvet</span>
                            <i
                              className="ms-Icon ms-Icon--CalculatorMultiply right_float"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <div className="below_area">
                            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_3.png`} className="avatar" />
                            <span className="span_name">Barthelemy Chalvet</span>
                            <i
                              className="ms-Icon ms-Icon--CalculatorMultiply right_float"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("project_tab_menu.meeting.invite_guest")}</label>

                          <Dropdown
                            className="small_drop"
                            clearable
                            fluid
                            multiple
                            search
                            selection
                            options={countryOptions}
                            placeholder="Select Country"
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("common.desc")}</label>

                          <TextArea placeholder={t("common.tell_us_more")} />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </>)}
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content={t("project_tab_menu.meeting.save_and_cont")}
            onClick={createProtocol}
            positive
            size="small"
            className="primary"
          />
          <Button
            size="small"
            className="icon-border"
            onClick={cancel}
          >
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i> {t("common.cancel")}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalAddProtocol;
