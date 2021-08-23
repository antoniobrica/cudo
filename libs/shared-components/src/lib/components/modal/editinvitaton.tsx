import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';

import { MS_SERVICE_URL } from '@cudo/mf-core';
import './../../../assets/style/index.scss' // added for edit modal
import {
  Button,
  Modal,
  Input,
  Form,
  Grid,
  Dropdown,
  TextArea,
  Icon, // added for edit modal
  Dimmer,
  Loader
} from 'semantic-ui-react';

import moment from 'moment'
import { MembersIndex } from '@cudo/mf-account-app-lib';
// import { showToastMessage } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';

export interface EditInvitationProps {
  meetingDetail?
  editInvitation?
  openEditInvitation?
  cancel?
  loading?
  data?
  dataList?
  getInvitationErrorMessage?
  getInvitationToasterMessage?
  error?
}

interface EditInvitationErrors {
  titleError?: string,
  dateError?: string,
  startTimeError?: string,
  endTimeError?: string,
  startEndTimeError?: string,
  membersError?: string
}

export function ModalEditInvitation(props: EditInvitationProps) {

  const { t } = useTranslation();

  const [openEditModal, setOpenEditModal] = useState(false)

  const [invitationTitle, setInvitationTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingStartTime, setMeetingStartTime] = useState("");
  const [meetingEndTime, setMeetingEndTime] = useState("");
  const [inviteGuests, setInviteGuests] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  // const [protocolId, setProtocolID] = useState("");
  // const [protocolTitle, setProtocolTitle] = useState("");
  const [members, setMembers] = React.useState<any>([]);

  const [errors, setErrors] = useState<EditInvitationErrors>({})
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (props.openEditInvitation) {
      setOpenEditModal(true);
    }
  }, [props.openEditInvitation])

   //on show or hide loader
   useEffect(() => {
    if (!props.loading && props.data) {
      props.getInvitationToasterMessage(t("toaster.success.meeting.meeting_edit"))
      cancel()
    }
    if (!props.loading && props.error) {
      props.getInvitationErrorMessage(props.error?.graphQLErrors[0]?.extensions?.exception?.status)
      cancel()
    }
  }, [props.loading])

  useEffect(() => {
    if (props?.meetingDetail) {
      setInvitationTitle(props?.meetingDetail?.meetingTitle)
      setMeetingDate(formatDate(props?.meetingDetail?.meetingDate))
      setMeetingStartTime(formatTime(props?.meetingDetail?.meetingStartTime))
      setMeetingEndTime(formatTime(props?.meetingDetail?.meetingEndTime))
      if (props?.meetingDetail?.members) {
        const editMemberData = props?.meetingDetail?.members?.map((item) => {
          return { userID: item.memberID, userName: item.memberName }
        })
        setMembers(editMemberData)
      }
      setInviteGuests(props?.meetingDetail?.inviteGuests)
      setMeetingDescription(props?.meetingDetail?.meetingDescription)
    }
  }, [props?.meetingDetail])

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  const formatTime = (date) => {
    var d = new Date(date),
      hour = '' + (d.getHours()),
      minute = '' + d.getMinutes();

    if (hour.length < 2)
      hour = '0' + hour;
    if (minute.length < 2)
    minute = '0' + minute;

    return [hour, minute].join(':');
  }

  const openInvitationEditPopup = () => {
    setOpenEditModal(true)
    props.openEditInvitation(true)
  }

  const cancel = () => {
    setOpenEditModal(false)
    props.cancel(true)
    resetEditData()
    setLoader(false)
  }
  
  const resetEditData = () => {
    setInvitationTitle("")
    setMeetingDate("")
    setMeetingStartTime("")
    setMeetingEndTime("")
    setInviteGuests("")
    setMembers([])
    setMeetingDescription("")
    setErrors({
      titleError: null,
      dateError: null,
      startTimeError: null,
      endTimeError: null,
      startEndTimeError: null,
      membersError: null
    })
  }

  const onInvitationTitleChange = (e) => {
    setInvitationTitle(e.target.value)
    setErrors({ ...errors, titleError: "" })
  }

  const onMembers = (data) => {
    console.log('----errors.memberError----', errors.membersError)
    setMembers(data)
    setErrors({ ...errors, membersError: "" })
  }

  const onDescription = (html) => {
    // if(html.length > 10){
    // event.preventDefault()
    setMeetingDescription(html)
    // }
  }

  const onClickStartTime = (e) => {
    setMeetingStartTime(e.target.value)
    if (meetingEndTime) {
      checkTimeValidation(e.target.value, meetingEndTime)
    }
  }

  const onClickEndTime = (e) => {
    setMeetingEndTime(e.target.value)
    if (meetingStartTime) {
      checkTimeValidation(meetingStartTime, e.target.value)
    }
  }

  const checkTimeValidation = (startTime, endTime) => {
    if (!meetingDate) {
      setErrors({ ...errors, dateError: t('invitation_add.error_date') })
      return false
    } else {
      setErrors({ ...errors, dateError: "" })
    }

    const startMeetingDateTime = getDateTime(meetingDate, startTime)
    const endMeetingDateTime = getDateTime(meetingDate, endTime)

    if (startMeetingDateTime > endMeetingDateTime) {
      setErrors({ ...errors, startEndTimeError: t('invitation_add.error_start_end_time') })
      return false
    } else {
      setErrors({ ...errors, startEndTimeError: "" })
    }
  }

  const validation = () => {
    let errorResponse: EditInvitationErrors = {}

    if (!invitationTitle) {
      errorResponse.titleError = t('invitation_add.error_title')
    }
    if (!meetingDate) {
      errorResponse.dateError = t('invitation_add.error_date')
    }
    if (!meetingStartTime) {
      errorResponse.startTimeError = t('invitation_add.error_start_time')
    }
    if (!meetingEndTime) {
      errorResponse.endTimeError = t('invitation_add.error_end_time')
    }
    if (!members.length) {
      errorResponse.membersError = t('invitation_add.error_members')
    }

    return errorResponse
  }

  const getDateTime = (selectedDate, selectedTime) => {

    const momentObj = moment(selectedDate + selectedTime, 'YYYY-MM-DDLT');

    const finalDateTime = momentObj.format('YYYY-MM-DD HH:mm:ss');
    return new Date(finalDateTime)
  }

  const updateInvitation = () => {

    const validationResult = validation()
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult)
      return false
    }
    setLoader(true)
    const memberList = members?.map((item, index) => {
      return { memberID: item.userID, memberName: item.userName, image: "" }
    })

    const startMeetingDateTime = getDateTime(meetingDate, meetingStartTime)
    const endMeetingDateTime = getDateTime(meetingDate, meetingEndTime)

    if (startMeetingDateTime > endMeetingDateTime) {
      setErrors({ ...errors, startEndTimeError: t('invitation_add.error_start_end_time') })
      return false
    } else {
      setErrors({ ...errors, startEndTimeError: null })
    }
    const meetingDurationSeconds = (endMeetingDateTime.getTime() - startMeetingDateTime.getTime()) / 1000
    const meetingDurationMinutes = `${meetingDurationSeconds / 60} min`

    const data = {
      sessionId: props?.meetingDetail?.sessionId,
      meetingId: props?.meetingDetail?.meetingId,
      meetingTitle: invitationTitle,
      meetingDate: meetingDate,
      meetingStartTime: new Date(startMeetingDateTime),
      meetingEndTime: endMeetingDateTime,
      inviteGuests: inviteGuests,
      meetingDescription: meetingDescription,
      protocolId: "protocol_1",
      protocolTitle: "protocolTitle_1",
      members: memberList,
      meetingFiles: [],
      meetingDuration: meetingDurationMinutes,
      status: 'SCHEDULED'
    }

    props.editInvitation(data);

    // setOpenEditModal(false);
    // props.openEditInvitation(false)
    // resetEditData();
    // props.cancel(true)
  }

  return (
    <div>
      <Modal className={`modal_media right-side--fixed-modal add-new-invitation-modal${loader && " overflow-hidden"}`}
        closeIcon
        onClose={() => setOpenEditModal(false)}
        onOpen={openInvitationEditPopup}
        // onOpen={() => setOpenEditModal(true)}
        open={openEditModal}
        trigger={
          <Button size="mini" className="grey-btn">
            Edit Invitation
          </Button>
        }
        closeOnDimmerClick={false}
      >
        {
          loader && (
            <Dimmer active inverted Center inline>
              <Loader size='big'>Loading</Loader>
            </Dimmer>
          )
        }
        <Modal.Header>
          <h3>Edit Invitation </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
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
                        error={errors.titleError !== null && !invitationTitle}
                      />
                      {errors?.titleError && !invitationTitle ? <span className="error-message">{errors.titleError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
                        type="date" value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        error={errors.dateError !== null && !meetingDate}
                      />
                      {errors?.dateError && !meetingDate ? <span className="error-message">{errors.dateError}</span> : null}
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
                        name="startTime"
                        value={meetingStartTime}
                        onChange={onClickStartTime}
                        error={errors.startTimeError !== null && !meetingStartTime}
                      />
                      {errors?.startTimeError && !meetingStartTime ? <span className="error-message">{errors.startTimeError}</span> : null}
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
                        name="endTime"
                        value={meetingEndTime}
                        onChange={onClickEndTime}
                        error={errors.endTimeError !== null && !meetingEndTime}
                      />
                      {errors?.endTimeError && !meetingEndTime ? <span className="error-message">{errors.endTimeError}</span> : null}
                      {errors?.startEndTimeError ? <span className="error-message">{errors.startEndTimeError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Members<span className="danger">*</span></label>
                      <MembersIndex members={members} parentMembersSelect={onMembers} error={errors?.membersError && !members.length} />
                      {errors?.membersError && !members.length ? <span className="error-message">{errors.membersError}</span> : null}
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

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Invite Guests</label>
                      <Input
                        placeholder="Enter the email to add more... "
                        size="small"
                        className="full-width"
                        type="text"
                        value={inviteGuests}
                        onChange={(e) => setInviteGuests(e.target.value)}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Description</label>
                      {/* <TextArea placeholder="Tell us more" /> */}
                      <ReactQuill
                        value={meetingDescription}
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
                        placeholder="Tell us more"
                        onChange={(content, delta, source, editor) => onDescription(content)}
                        // onKeyDown={onKeyPresDescription}
                        id="txtDescription"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {/* <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="add-files-dropdown-area">
                      <label>Add Files</label>

                      <div className="dashed_area md_upload">
                        <div className="file-upload-message">
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/upload.png`} className="mr-10 " />
                          <p className="file-upload-default-message">
                            Drag & drop or click here to upload file
                          </p>
                        </div>
                         <Input type="file" className="file-upload-input" /> 
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid> */}

              {/* <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="add-files-dropdown-area">
                      <label>Associated protocols</label>
                      <div className="invitation-listing">
                        <div className="ui segment">

                          <div className="ui-tabs">
                            <div className="card1 card-custom gutter-b">
                              <div className="card-body d-flex align-items-center justify-content-between flex-wrap invitation-list-card">
                                <div className="d-flex align-items-center invitaiton-info-left">
                                  <Icon name="newspaper outline" />
                                  <div className="invitation-date-time">
                                    <div className="timing-details">
                                      <span className="invitation-date-time">
                                        10 Aug, 2020
                                      </span>
                                      <span className="invitaiton-time-left">
                                        <i className="ms-Icon ms-Icon--Clock" aria-hidden="true"></i>
                                        11:00 AM - 11:45 AM
                                      </span>
                                    </div>
                                    <div className="invitation-title">
                                      This is Invitation title
                                    </div>
                                  </div>
                                </div>

                                <div className="session-actions-con">
                                  <div className="session-attach-dropdown tasks-action-area">
                                    <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} />
                                    <div className="symbol-group symbol-hover py-2" >
                                      <div className="symbol symbol-30 d-flex">
                                        <span className="dropdown-action">
                                          <Dropdown icon='ellipsis horizontal' pointing='right'>
                                            <Dropdown.Menu>
                                              <Dropdown.Item icon="eye" text="View detail" />
                                              <Dropdown.Item icon="pencil" text="Edit" />
                                              <Dropdown.Item
                                                icon="trash alternate outline"
                                                text="Delete"
                                              />
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid> */}
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Submit"
            onClick={updateInvitation}
            positive
            size="small"
            className="primary"
          />
          <Button
            size="small"
            className="icon-border"
            // onClick={() => setOpenEditModal(false)}
            onClick={cancel}
          >
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply ms-fontColor-themePrimary"></i> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalEditInvitation;
