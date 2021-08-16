import { MS_SERVICE_URL } from '@cudo/mf-core';
import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import {
  Button,
  Select,
  Modal,
  Input,
  Form,
  Grid,
  Dropdown,
  TextArea,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import moment from 'moment'
import { MembersIndex } from '@cudo/mf-account-app-lib';

import { useTranslation } from 'react-i18next';

export interface AddInvitationProps {
  sessionId?
  openAddInvitation?
  createInvitation?
  cancel?
  sessionDetail?
  projectTypeId?
  companyId?
  loading?
  data?
}

interface AddInvitationErrors {
  titleError?: string,
  dateError?: string,
  startTimeError?: string,
  endTimeError?: string,
  startEndTimeError?: string,
  membersError?: string
}

export function ModalAddInvitation(props: AddInvitationProps) {

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [invitationTitle, setInvitationTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingStartTime, setMeetingStartTime] = useState("");
  const [meetingEndTime, setMeetingEndTime] = useState("");
  const [inviteGuests, setInviteGuests] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  // const [protocolId, setProtocolID] = useState("");
  // const [protocolTitle, setProtocolTitle] = useState("");
  const [members, setMembers] = useState<any>([]);

  const [errors, setErrors] = useState<AddInvitationErrors>({})

  useEffect(() => {
    if (props.openAddInvitation) {
      setOpen(true);
    }
  }, [props.openAddInvitation])

  //on show or hide loader
  useEffect(() => {
    if (!props.loading && props.data) {
      cancel()
    }
  }, [props.loading])

  const openInvitationAddPopup = () => {
    setOpen(true)
    props.openAddInvitation(true)
  }

  const onInvitationTitleChange = (e) => {
    setInvitationTitle(e.target.value)
    setErrors({ ...errors, titleError: "" })
  }

  const onMembers = (data) => {
    setMembers(data)
    setErrors({ ...errors, membersError: "" })
  }

  const onDescription = (html) => {
    // if(html.length > 10){
    // event.preventDefault()
    setMeetingDescription(html)
    // }
  }
  // const onKeyPresDescription = (e) => {
  //   if (e.getLength().length > 10 && e.key !== 'Backspace') {
  //     e.preventDefault();
  //   }
  // }

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

  const getDateTime = (selectedDate, selectedTime) => {

    const momentObj = moment(selectedDate + selectedTime, 'YYYY-MM-DDLT');

    const finalDateTime = momentObj.format('YYYY-MM-DD HH:mm:ss');
    return new Date(finalDateTime)
  }

  const validation = () => {
    let errorResponse: AddInvitationErrors = {}

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

  const createInvitation = () => {
    const validationResult = validation()
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult)
      return false
    }

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

      companyId: props.companyId,
      projectTypeId: props.projectTypeId,
      workTypeId: props.sessionDetail.SessionByID.worktypeID,
      sessionId: props.sessionId,
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

    props.createInvitation(data);

    // setOpen(false);
    // props.openAddInvitation(false)
    // resetAddData();
    // props.cancel(true)
  }

  const cancel = () => {
    setOpen(false)
    props.cancel(true)
    resetAddData()
  }

  const resetAddData = () => {
    setInvitationTitle("")
    setMeetingDate("")
    setMeetingStartTime("")
    setMeetingEndTime("")
    setInviteGuests("")
    setMembers([])
    setMeetingDescription("")
    setErrors({})
  }

  return (
    <div id="navbar">
      <Modal className={`modal_media right-side--fixed-modal add-new-invitation-modal${props.loading && !props.data && " overflow-hidden"}`}
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={openInvitationAddPopup}
        // onOpen={() => setOpen(true)}
        open={open}
        // trigger={
        //   <Button size="mini" className="grey-btn">
        //     Add Invitation
        //   </Button>
        // }
        closeOnDimmerClick={false}
      >
        {
          props.loading && !props.data && (
            <Dimmer active inverted Center inline>
              <Loader size='big'>Loading</Loader>
            </Dimmer>
          )
        }
        <Modal.Header>
          <h3>Add Invitation </h3>
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
                        error={errors.titleError && !invitationTitle}
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
                        type="date"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        error={errors.dateError && !meetingDate}
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
                        name="time"
                        value={meetingStartTime}
                        onChange={onClickStartTime}
                        error={errors.startTimeError && !meetingStartTime}
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
                        value={meetingEndTime}
                        onChange={onClickEndTime}
                        error={errors.endTimeError && !meetingEndTime}
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
                    <MembersIndex members={[]} parentMembersSelect={onMembers} error={errors?.membersError && !members.length} />
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
                      <label>Invite Guests</label>
                      {/* <Select options={countryOptions} placeholder='Select Company' className="small" /> */}
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
              <Grid columns={1}>
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
                        {/* <Input type="file" className="file-upload-input" /> */}
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {/* <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Select protocols</label>
                      <Select options={countryOptions} placeholder='Select Company' className="small" />
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
            onClick={createInvitation}
            positive
            size="small"
            className="primary"
          />
          <Button
            size="small"
            className="icon-border"
            // onClick={() => setOpen(false)}
            onClick={cancel}
          >
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply ms-fontColor-themePrimary"></i> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalAddInvitation;
