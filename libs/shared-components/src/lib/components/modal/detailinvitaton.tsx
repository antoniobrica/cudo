import React, { useState, useEffect } from 'react';

import { MS_SERVICE_URL } from '@cudo/mf-core';
// import './../../../assets/style/index.scss' // added for edit modal
import {
  Button,
  Modal,
  Form,
  Grid,
  Dropdown
} from 'semantic-ui-react';

import moment from 'moment'
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';

export interface DetailInvitationProps {
  meetingDetail?
  sessionDetail?
  openDetailInvitation?
  cancel?
}

export function ModalDetailInvitation(props: DetailInvitationProps) {

  const { t } = useTranslation();

  const [openViewModal, setOpenViewModal] = useState(false)
  // const [meetingDetail, setMeetingDetail] = useState(null)

  useEffect(() => {
    if (props?.openDetailInvitation) {
      setOpenViewModal(true);
    }
    // if (props?.meetingDetail) {
    //   setMeetingDetail(props.meetingDetail)
    // }

  }, [
    props?.openDetailInvitation,
    // props?.meetingDetail
  ])

  const openInvitationViewDetailPopup = () => {
    setOpenViewModal(true)
    props.openDetailInvitation(true)
  }
  const cancel = () => {
    setOpenViewModal(false)
    props.cancel(true)
  }

  console.log('---detail component---meetingDetail--', props?.meetingDetail)

  const { meetingTitle, meetingDate, meetingStartTime, meetingEndTime, members, meetingDescription, inviteGuests } = props?.meetingDetail
  const formattedMeetingDate = moment(meetingDate).format('DD MMM, YYYY')
  const formattedMeetingStartTime = moment(meetingStartTime).format('hh:mm A')
  const formattedMeetingEndTime = moment(meetingEndTime).format('hh:mm A')
  const { meetingCategoryTitle, sessionTitle } = props?.sessionDetail?.SessionByID

  return (
    <div>
      <Modal className="modal_media right-side--fixed-modal view-detail-invitation-modal"
        closeIcon
        onClose={cancel}
        onOpen={openInvitationViewDetailPopup}
        open={openViewModal}
        closeOnDimmerClick={false}
      // trigger={
      //   <Button size="mini" className="grey-btn">
      //     View Details
      //   </Button>
      // }
      >
        <Modal.Header>
          <h3 className="header-w-icon d-flex">Invitation detail
            <span className="invitation-created">Created on: 20 Aug, 2020 <span>Created by: Zhenya Rynzhuk</span></span>
            <div className="symbol symbol-30 d-flex">
              <span className="dropdown-action">
                <Dropdown icon='ellipsis horizontal' floating labeled>
                  <Dropdown.Menu className="dropdowncomplete">
                    <Dropdown.Item
                      icon="print"
                      text="Print" />
                    <Dropdown.Item
                      icon="download"
                      text="Export" />
                    <Dropdown.Item
                      icon="pencil"
                      text="Edit" />
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            </div>
          </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Title</label>
                      <span>{meetingTitle}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Category</label>
                      <span>{meetingCategoryTitle}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Session</label>
                      <span>{sessionTitle}</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Date</label>
                      <span>{formattedMeetingDate}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Start time</label>
                      <span>{formattedMeetingStartTime}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>End time</label>
                      <span>{formattedMeetingEndTime}</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Members</label>
                      <div className="members-listing">
                        {/* <label><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/No2.png`} /> Barthelemy Chalvet</label>
                        <label><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/No2.png`} /> Barthelemy Chalvet</label>
                        <label><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/No2.png`} /> Barthelemy Chalvet</label>
                        <label><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/No2.png`} /> Barthelemy Chalvet</label> */}
                        {members.map(({ memberID, memberName, image }) => {
                          return (<label><img key={memberID} src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/No2.png`} />{memberName}</label>)
                        })
                        }
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Invited Guest</label>
                      <div className="members-listing">
                        {/* <label>user@gmail.com</label>
                        <label>user@gmail.com</label> */}
                        {inviteGuests.split(',').map((item) => {
                          return (<label>{item}</label>)
                        })}
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Description</label>
                      <span><ReactQuill id="txtDescription" readOnly={true} value={meetingDescription} modules={{ toolbar: null }} /></span>
                      {/* <span>{meetingDescription}</span> */}
                      {/* <span>The building utilizes wrapped glass facades on the east, north, and west both for aesthetics and to reduce the amount of reflective surface area on the south facade, which also features brushed Jura limestone.</span> */}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              {/* <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Files</label>
                      <div className="members-listing">
                        <label><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/No2.png`} /> this_is_filename.png</label>
                        <label><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/powerpoint.png`} /> this_is_filename.docx</label>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Associated protocols</label>
                      <div className="invitation-listing">
                        <div className="ui segment">

                          <div className="ui-tabs">
                            <div className="card1 card-custom gutter-b">
                              <div className="card-body d-flex align-items-center justify-content-between flex-wrap invitation-list-card">
                                <div className="d-flex align-items-center invitaiton-info-left">
                                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/calendar.png`} />
                                  <div className="invitation-date-time">
                                    <div className="timing-details">
                                      <span className="invitation-date-time">
                                        10 Aug, 2020
                                        <span className="draft-label">Draft</span>
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
                                    <span className="session-attachements">
                                      <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>
                                      3
                                    </span>
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
             */}

            </Form>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default ModalDetailInvitation;
