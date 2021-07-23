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
  Icon // added for edit modal
} from 'semantic-ui-react';

import moment from 'moment'
import { MembersIndex } from '@cudo/mf-account-app-lib';

import { useTranslation } from 'react-i18next';

export interface EditInvitationProps {
  meetingDetail?
  editInvitation?
  openEditInvitation?
  cancel?
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

  const [errors, setErrors] = useState({
    titleError: null,
    dateError: null,
    startTimeError: null,
    endTimeError: null,
    startEndTimeError: null,
    membersError: null
  })

  useEffect(() => {
    if (props.openEditInvitation) {
      setOpenEditModal(true);
    }

  }, [props.openEditInvitation])



  const openInvitationAddPopup = () => {
    setOpenEditModal(true)
    props.openEditInvitation(true)
  }

  const onInvitationTitleChange = (e) => {
    setInvitationTitle(e.target.value)
  }

  const onMembers = (data) => {
    setMembers(data)
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
      setErrors({ ...errors, dateError: null })
    }

    const startMeetingDateTime = getDateTime(meetingDate, startTime)
    const endMeetingDateTime = getDateTime(meetingDate, endTime)

    if (startMeetingDateTime > endMeetingDateTime) {
      setErrors({ ...errors, startEndTimeError: t('invitation_add.error_start_end_time') })
      return false
    } else {
      setErrors({ ...errors, startEndTimeError: null })
    }
  }

  const validation = () => {
    let response = true

    if (!invitationTitle) {
      response = false
      // errorMessages.push("Please provide Title")
      setErrors({ ...errors, titleError: t('invitation_add.error_title') })
      return false
    }
    else if (errors.titleError) {
      setErrors({ ...errors, titleError: null })
    }
    if (!meetingDate) {
      response = false
      setErrors({ ...errors, dateError: t('invitation_add.error_date') })
      return false
    }

    if (!meetingStartTime) {
      response = false
      setErrors({ ...errors, startTimeError: t('invitation_add.error_start_time') })
      return false
    }

    if (!meetingEndTime) {
      response = false
      setErrors({ ...errors, endTimeError: t('invitation_add.error_end_time') })
      return false
    }

    if (!members.length) {
      response = false
      setErrors({ ...errors, membersError: t('invitation_add.error_members') })
      return false
    }


    if (!response) {
      return false
    }
    return true
  }

  const getDateTime = (selectedDate, selectedTime) => {

    const momentObj = moment(selectedDate + selectedTime, 'YYYY-MM-DDLT');

    const finalDateTime = momentObj.format('YYYY-MM-DD HH:mm:ss');
    return new Date(finalDateTime)
  }

  const updateInvitation = () => {

    if (!validation()) {
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

    setOpenEditModal(false);
    props.openEditInvitation(false)
    resetAddData();
    props.cancel(true)
  }


  const cancel = () => {
    setOpenEditModal(false)
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
    setErrors({
      titleError: null,
      dateError: null,
      startTimeError: null,
      endTimeError: null,
      startEndTimeError: null,
      membersError: null
    })
  }


  return (
    <div>
      <Modal className="modal_media right-side--fixed-modal add-new-invitation-modal"
        closeIcon
        onClose={() => setOpenEditModal(false)}
        // onOpen={openEditInvitationPopup}
        onOpen={() => setOpenEditModal(true)}
        open={openEditModal}
        trigger={
          <Button size="mini" className="grey-btn">
            Edit Invitation
          </Button>
        }
        closeOnDimmerClick={false}
      >
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
                      />
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
                      />
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
                      />
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
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Members</label>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <div className="followers-label-area">
                <Form.Field>
                  <div className="event top-event follower-listing-labels">

                  </div>
                </Form.Field>
              </div>

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
                      <label>Description</label>
                      <TextArea placeholder="Tell us more" />
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

              <Grid columns={1}>
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
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Submit"
            // onClick={createInvitation}
            positive
            size="small"
            className="primary"
          />
          <Button
            size="small"
            className="icon-border"
          // onClick={() => setOpenEditModal(false)}
          // onClick={cancel}
          >
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply ms-fontColor-themePrimary"></i> Cancel
          </Button>
        </Modal.Actions>
      </Modal>

    </div>
    //#region Commented for help to Edit by Add modal Functionality
    // <div id="navbar">
    //   <Modal className="modal_media right-side--fixed-modal add-new-invitation-modal"
    //     closeIcon
    //     onClose={() => setOpen(false)}
    //     onOpen={openInvitationAddPopup}
    //     // onOpen={() => setOpen(true)}
    //     open={open}
    //   // trigger={
    //   //   <Button size="mini" className="grey-btn">
    //   //     Add Invitation
    //   //   </Button>
    //   // }
    //   closeOnDimmerClick={false}
    //   >
    //     <Modal.Header>
    //       <h3>Add Invitation </h3>
    //     </Modal.Header>
    //     <Modal.Content body>
    //       <div>
    //         <Form>
    //           <Grid columns={1}>
    //             <Grid.Row>
    //               <Grid.Column>
    //                 <Form.Field>
    //                   <label>
    //                     Title <span className="danger">*</span>
    //                   </label>
    //                   <Input
    //                     placeholder="Team onboarding"
    //                     size="small"
    //                     className="full-width"
    //                     type="text"
    //                     value={invitationTitle}
    //                     onChange={onInvitationTitleChange}
    //                     error={errors.titleError !== null && !invitationTitle}
    //                   />
    //                   {errors?.titleError && !invitationTitle ? <span className="error-message">{errors.titleError}</span> : null}
    //                 </Form.Field>
    //               </Grid.Column>
    //             </Grid.Row>
    //           </Grid>
    //           <Grid columns={3}>
    //             <Grid.Row>
    //               <Grid.Column>
    //                 <Form.Field>
    //                   <label>Date <span className="danger">*</span></label>
    //                   <Input
    //                     name="meetingDate"
    //                     placeholder="Default"
    //                     size="small"
    //                     className="full-width"
    //                     type="date"
    //                     value={meetingDate}
    //                     onChange={(e) => setMeetingDate(e.target.value)}
    //                     error={errors.dateError !== null && !meetingDate}
    //                   />
    //                   {errors?.dateError && !meetingDate ? <span className="error-message">{errors.dateError}</span> : null}
    //                 </Form.Field>
    //               </Grid.Column>
    //               <Grid.Column>
    //                 <Form.Field>
    //                   <label>Start time <span className="danger">*</span></label>
    //                   <Input
    //                     placeholder="Default"
    //                     size="small"
    //                     className="full-width"
    //                     type="time"
    //                     name="time"
    //                     value={meetingStartTime}
    //                     onChange={onClickStartTime}
    //                     error={errors.startTimeError !== null && !meetingStartTime}
    //                   />
    //                   {errors?.startTimeError && !meetingStartTime ? <span className="error-message">{errors.startTimeError}</span> : null}
    //                 </Form.Field>
    //               </Grid.Column>
    //               <Grid.Column>
    //                 <Form.Field>
    //                   <label>End time <span className="danger">*</span></label>
    //                   <Input
    //                     placeholder="Default"
    //                     size="small"
    //                     className="full-width"
    //                     type="time"
    //                     value={meetingEndTime}
    //                     onChange={onClickEndTime}
    //                     error={errors.endTimeError !== null && !meetingEndTime}
    //                   />
    //                   {errors?.endTimeError && !meetingEndTime ? <span className="error-message">{errors.endTimeError}</span> : null}
    //                   {errors?.startEndTimeError ? <span className="error-message">{errors.startEndTimeError}</span> : null}
    //                 </Form.Field>
    //               </Grid.Column>
    //             </Grid.Row>
    //           </Grid>
    //           <Grid columns={1}>
    //             <Grid.Row>
    //               <Grid.Column>
    //                 {/* <Form.Field> */}
    //                   {/* <label>Members</label> */}
    //                   <MembersIndex members={[]} parentMembersSelect={onMembers} />
    //                   {errors?.membersError && !members.length ? <span className="error-message">{errors.membersError}</span> : null}
    //                 {/* </Form.Field> */}
    //               </Grid.Column>
    //             </Grid.Row>
    //           </Grid>
    //           <div className="followers-label-area">
    //             <Form.Field>
    //               <div className="event top-event follower-listing-labels">
    //                 {members?.map((p, id) => {
    //                   const name = p.userName.split(" ").map((n) => n[0]).join("");
    //                   return (
    //                     <div className="label-light-purple-circle label-spacer" key={id}>
    //                       <span className="white-text">{name}</span>
    //                     </div>
    //                   )
    //                 })
    //                 }
    //               </div>
    //             </Form.Field>
    //           </div>

    //           {/* <Grid columns={5}>
    //             <Grid.Row>
    //               <Grid.Column>
    //                 <Form.Field>
    //                   <div className="below_area">
    //                     <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_1.png`} className="avatar" />
    //                     <span className="span_name">Barthelemy Chalvet</span>
    //                     <i
    //                       className="ms-Icon ms-Icon--CalculatorMultiply right_float"
    //                       aria-hidden="true"
    //                     ></i>
    //                   </div>
    //                 </Form.Field>
    //               </Grid.Column>

    //               <Grid.Column>
    //                 <Form.Field>
    //                   <div className="below_area">
    //                     <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_2.png`} className="avatar" />
    //                     <span className="span_name">Barthelemy Chalvet</span>
    //                     <i
    //                       className="ms-Icon ms-Icon--CalculatorMultiply right_float"
    //                       aria-hidden="true"
    //                     ></i>
    //                   </div>
    //                 </Form.Field>
    //               </Grid.Column>
    //               <Grid.Column>
    //                 <Form.Field>
    //                   <div className="below_area">
    //                     <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_3.png`} className="avatar" />
    //                     <span className="span_name">Barthelemy Chalvet</span>
    //                     <i
    //                       className="ms-Icon ms-Icon--CalculatorMultiply right_float"
    //                       aria-hidden="true"
    //                     ></i>
    //                   </div>
    //                 </Form.Field>
    //               </Grid.Column>
    //             </Grid.Row>
    //           </Grid> */}

    //           <Grid columns={1}>
    //             <Grid.Row>
    //               <Grid.Column>
    //                 <Form.Field>
    //                   <label>Invite Guests</label>
    //                   {/* <Select options={countryOptions} placeholder='Select Company' className="small" /> */}
    //                   <Input
    //                     placeholder="Enter the email to add more... "
    //                     size="small"
    //                     className="full-width"
    //                     type="text"
    //                     value={inviteGuests}
    //                     onChange={(e) => setInviteGuests(e.target.value)}
    //                   />
    //                 </Form.Field>
    //               </Grid.Column>
    //             </Grid.Row>
    //           </Grid>
    //           <Grid columns={1}>
    //             <Grid.Row>
    //               <Grid.Column>
    //                 <Form.Field>
    //                   <label>Description</label>
    //                   {/* <TextArea placeholder="Tell us more" /> */}
    //                   <ReactQuill
    //                     value={meetingDescription}
    //                     modules={{
    //                       toolbar: {
    //                         container: [
    //                           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    //                           ['bold', 'italic', 'underline'],
    //                           [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //                           [{ 'align': [] }],
    //                           ['link', 'image'],
    //                           ['clean'],
    //                           [{ 'color': [] }]
    //                         ]
    //                       }
    //                     }}
    //                     placeholder="Tell us more"
    //                     onChange={(content, delta, source, editor) => onDescription(content)}
    //                     // onKeyDown={onKeyPresDescription}
    //                     id="txtDescription"
    //                   />
    //                 </Form.Field>
    //               </Grid.Column>
    //             </Grid.Row>
    //           </Grid>
    //           <Grid columns={1}>
    //             <Grid.Row>
    //               <Grid.Column>
    //                 <Form.Field className="add-files-dropdown-area">
    //                   <label>Add Files</label>

    //                   <div className="dashed_area md_upload">
    //                     <div className="file-upload-message">
    //                       <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/upload.png`} className="mr-10 " />
    //                       <p className="file-upload-default-message">
    //                         Drag & drop or click here to upload file
    //                       </p>
    //                     </div>
    //                     {/* <Input type="file" className="file-upload-input" /> */}
    //                   </div>
    //                 </Form.Field>
    //               </Grid.Column>
    //             </Grid.Row>
    //           </Grid>
    //           {/* <Grid columns={1}>
    //             <Grid.Row>
    //               <Grid.Column>
    //                 <Form.Field>
    //                   <label>Select protocols</label>
    //                   <Select options={countryOptions} placeholder='Select Company' className="small" />
    //                 </Form.Field>
    //               </Grid.Column>
    //             </Grid.Row>
    //           </Grid> */}
    //         </Form>
    //       </div>
    //     </Modal.Content>
    //     <Modal.Actions>
    //       <Button
    //         content="Submit"
    //         onClick={createInvitation}
    //         positive
    //         size="small"
    //         className="primary"
    //       />
    //       <Button
    //         size="small"
    //         className="icon-border"
    //         // onClick={() => setOpen(false)}
    //         onClick={cancel}
    //       >
    //         <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply ms-fontColor-themePrimary"></i> Cancel
    //       </Button>
    //     </Modal.Actions>
    //   </Modal>
    // </div>
    // #endregion
  );
}

export default ModalEditInvitation;
