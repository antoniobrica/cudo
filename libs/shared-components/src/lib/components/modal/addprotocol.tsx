import { MembersIndex } from '@cudo/mf-account-app-lib';
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
  meetingTitleError?: string
  meetingDateError?: string,
  meetingStartTimeError?: string,
  meetingEndTimeError?: string,
  meetingMembersError?: string,
  MeetingstartEndTimeError?: string
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
  const [meetingDate, setMeetingDate] = React.useState("");
  const [meetingStartTime, setMeetingStartTime] = React.useState("");
  const [meetingEndTime, setMeetingEndTime] = React.useState("");
  const [members, setMembers] = React.useState<any>([]);


  const [errors, setErrors] = React.useState<AddProtocolErrors>({});
  const [meetingErrors, setMeetingErrors] = React.useState<AddProtocolErrors>({});
  const { t } = useTranslation()

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
  const onClickMeetingStartTime = (e) => {
    setMeetingStartTime(e.target.value)
    if (meetingEndTime) {
      checkMeetingTimeValidation(e.target.value, meetingEndTime)
    }
  }

  const onClickMeetingEndTime = (e) => {
    setMeetingEndTime(e.target.value)
    if (meetingStartTime) {
      checkMeetingTimeValidation(meetingStartTime, e.target.value)
    }
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

  const checkMeetingTimeValidation = (startTime, endTime) => {
    if (!protocolDate) {
      setErrors({ ...errors, dateError: "please provide date" })
      return false
    } else {
      setErrors({ ...errors, dateError: "" })
    }

    const startMeetingDateTime = getDateTime(meetingDate, startTime)
    const endMeetingDateTime = getDateTime(meetingDate, endTime)

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

  const onDescription = (e) => {
    setProtocolDescription(e.target.value)
  }

  // const onInvitationTitleChange = (e) => {
  //   setInvitationTitle(e.target.value)
  //   setErrors({ ...errors, titleError: "" })
  // }

  const onMembers = (data) => {
    setMembers(data)
    setErrors({ ...errors, meetingMembersError: "" })
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
    if (protocolStartTime > protocolEndTime) {
      errorResponse.startEndTimeError = t("common.errors.start_end_time")
    }
    return errorResponse
  }

  const meetingValidation = () => {
    const errorResponse: AddProtocolErrors = {}

    // if (!invitationTitle) {
    //   errorResponse.meetingTitleError = t('invitation_add.error_title')
    // }
    if (!meetingDate) {
      errorResponse.meetingDateError = t('invitation_add.error_date')
    }
    if (!meetingStartTime) {
      errorResponse.meetingStartTimeError = t('invitation_add.error_start_time')
    }
    if (!meetingEndTime) {
      errorResponse.meetingEndTimeError = t('invitation_add.error_end_time')
    }
    if (!members.length) {
      errorResponse.meetingMembersError = t('invitation_add.error_members')
    }

    return errorResponse
  }

  const createProtocol = () => {
    const validationResult = validation()
    const meetingValidationResult = meetingValidation()
    if ((Object.keys(validationResult).length > 0) || (openAddInvitation && Object.keys(meetingValidationResult).length > 0)) {
      setErrors(validationResult)
      setMeetingErrors(meetingValidationResult)
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

    const startMeetingDateTime = getDateTime(meetingDate, meetingStartTime)
    const endMeetingDateTime = getDateTime(meetingDate, meetingEndTime)

    if (startMeetingDateTime > endMeetingDateTime) {
      setErrors({ ...errors, MeetingstartEndTimeError: "must be greater than start time" })
      return false
    } else {
      setErrors({ ...errors, MeetingstartEndTimeError: null })
    }

    const meetingDurationSeconds = (endMeetingDateTime.getTime() - startMeetingDateTime.getTime()) / 1000
    const meetingDurationMinutes = `${meetingDurationSeconds / 60} min`

    const memberList = members?.map((item, index) => {
      return { memberID: item.userID, memberName: item.userName, image: "" }
    })
    const meetingsData = []
    if(openAddInvitation) {
      meetingsData.push({
        meetingBasics: {
          companyId: props.companyId,
          projectTypeId: props.projectTypeId,
          workTypeId: props.sessionDetail.SessionByID.worktypeID,
          sessionId: props.sessionId,
          protocolTitle,
          meetingTitle: protocolTitle,
          inviteGuests: "",
          meetingDate,
          meetingDuration: meetingDurationMinutes,
          meetingEndTime: startMeetingDateTime,
          meetingStartTime: endMeetingDateTime,
          protocolId: "",
          status: "SCHEDULED",
        },
        members:memberList,
        meetingFiles:[]
      });
    }
    

    const data = {
      companyId: props.companyId,
      projectTypeId: props.projectTypeId,
      workTypeId: props.sessionDetail.SessionByID.worktypeID,
      sessionId: props.sessionId,
      protocolTitle,
      protocolDate,
      protocolStartTime: new Date(startProtocolDateTime),
      protocolEndTime: endProtocolDateTime,
      protocolDescription,
      meetings: meetingsData,
      protocolFiles: [],
      protocolDuration: protocolDurationMinutes,
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
    // setInvitationTitle("")
    setMeetingDate("")
    setMeetingStartTime("")
    setMeetingEndTime("")
    setMembers([])
    setMeetingErrors({})
  }

  return (
    <div id="navbar">
      <Modal
        className="modal_media right-side--fixed-modal add-new-invitation-modal"
        closeIcon
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
                        max="9999-12-31"
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
                      <TextArea placeholder={t("common.tell_us_more")}
                        value={protocolDescription}
                        onChange={onDescription}
                      />                      {/* <ReactQuill
                        value={protocolDescription}
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
                        placeholder={t("common.tell_us_more")}
                        onChange={(content, delta, source, editor) => onDescription(content)}
                        // onKeyDown={onKeyPresDescription}
                        id="txtDescription"
                      /> */}
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
                  {/* <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>
                            Title <span className="danger">*</span>
                          </label>
                          <Input
                            placeholder="Team onboarding"
                            size="small"
                            className="full-width"
                            type="text"
                            value={invitationTitle}
                            onChange={onInvitationTitleChange}
                            error={meetingErrors.meetingTitleError && !invitationTitle}
                          />
                          {meetingErrors?.meetingTitleError && !invitationTitle ? <span className="error-message">{meetingErrors.meetingTitleError}</span> : null}
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid> */}
                  <Grid columns={3}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>Date <span className="danger">*</span></label>
                          <Input
                            name="meetingDate"
                            placeholder="Default"
                            size="small"
                            className="full-width"
                            type="date"
                            max="9999-12-31"
                            value={meetingDate}
                            onChange={(e) => setMeetingDate(e.target.value)}
                            error={meetingErrors.meetingDateError && !meetingDate}
                          />
                          {meetingErrors?.meetingDateError && !meetingDate ? <span className="error-message">{meetingErrors.meetingDateError}</span> : null}
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>Start time <span className="danger">*</span></label>
                          <Input
                            placeholder="Default"
                            size="small"
                            className="full-width"
                            type="time"
                            name="time"
                            value={meetingStartTime}
                            onChange={onClickMeetingStartTime}
                            error={meetingErrors.meetingStartTimeError && !meetingStartTime}
                          />
                          {meetingErrors?.meetingStartTimeError && !meetingStartTime ? <span className="error-message">{meetingErrors.meetingStartTimeError}</span> : null}
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>End time <span className="danger">*</span></label>
                          <Input
                            placeholder="Default"
                            size="small"
                            className="full-width"
                            type="time"
                            value={meetingEndTime}
                            onChange={onClickMeetingEndTime}
                            error={meetingErrors.meetingEndTimeError && !meetingEndTime}
                          />
                          {meetingErrors?.meetingEndTimeError && !meetingEndTime ? <span className="error-message">{meetingErrors.meetingEndTimeError}</span> : null}
                          {meetingErrors?.startEndTimeError ? <span className="error-message">{meetingErrors.startEndTimeError}</span> : null}
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>Members<span className="danger">*</span></label>
                          <MembersIndex members={[]} parentMembersSelect={onMembers} error={meetingErrors?.meetingMembersError && !members.length} />
                          {meetingErrors?.meetingMembersError && !members.length ? <span className="error-message">{meetingErrors.meetingMembersError}</span> : null}
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <div className="followers-label-area">
                    <Form.Field>
                      <div className="event top-event follower-listing-labels">
                        {members?.map((p, id) => {
                          const name = p.userName.split(" ").map((n) => n[0]).join("");
                          return (
                            <div className="label-light-purple-circle label-spacer" key={id}>
                              <span className="white-text">{name}</span>
                            </div>
                          )
                        })
                        }
                      </div>
                    </Form.Field>
                  </div>

                  {/* <Grid columns={5}>
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
                  </Grid> */}

                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("project_tab_menu.meeting.invite_guest")}</label>

                          {/* <Dropdown
                            className="small_drop"
                            clearable
                            fluid
                            multiple
                            search
                            selection
                            options={countryOptions}
                            placeholder="Select Country"
                          /> */}
                          <Input
                            placeholder="Enter the email to add more... "
                            size="small"
                            className="full-width"
                            type="text"
                          // value={inviteGuests}
                          // onChange={(e) => setInviteGuests(e.target.value)}
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
