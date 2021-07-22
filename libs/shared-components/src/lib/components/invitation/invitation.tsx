import React, { useState, useEffect } from 'react';
import moment from 'moment'
import './../../../assets/style/index.scss'
import { Tab, Dropdown, Button, Icon, Modal, Grid, Form, Input, TextArea } from 'semantic-ui-react';
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
export interface ViewInvitationProps {
  sessionId?
  invitations?
  addInvitationClick?
  sessionDetail?
}

export function InvitationTab(props: ViewInvitationProps) {

  const [open, setOpen] = React.useState(false)

  const onClickAddInvitation = () => {
    props.addInvitationClick(true)
  }

  const panes = [
    {
      menuItem: {
        key: 'Invitations',
        icon: 'calendar check outline',
        content: 'Invitations',
      },
      render: () => (
        <Tab.Pane attached={false}>
          <Button size="small" className="primary tabs-button-right" onClick={onClickAddInvitation}>
            <i className="ms-Icon ms-font-xl ms-Icon--Add"></i> Add Invitation
          </Button>
          <div className="ui-tabs">
            {props?.invitations?.map((item) => {
              const { meetingId, meetingTitle, meetingDate, meetingStartTime, meetingEndTime, meetingDuration, members, meetingFiles } = item
              const formattedMeetingDate = moment(meetingDate).format('DD MMM, YYYY')
              const formattedMeetingStartTime = moment(meetingStartTime).format('hh:mm A')
              const formattedMeetingEndTime = moment(meetingEndTime).format('hh:mm A')

              return (
                <div id={meetingId} className="card1 card-custom gutter-b">
                  <div
                    className="card-body d-flex align-items-center justify-content-between flex-wrap invitation-list-card">
                    <div className="d-flex align-items-center invitaiton-info-left">
                      <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/calendar.png`} />
                      <div className="invitation-date-time">
                        <div className="timing-details">
                          <span className="invitation-date-time">
                            {/* 10 Aug, 2020 */}
                            {formattedMeetingDate}
                          </span>
                          <span className="invitaiton-time-left">
                            <i className="ms-Icon ms-Icon--Clock" aria-hidden="true"></i>
                            {/* 11:00 AM - 11:45 AM */}
                            {`${formattedMeetingStartTime} - ${formattedMeetingEndTime}`}
                          </span>
                          <span className="invitation-minutes">
                            {meetingDuration}
                          </span>
                          <a href="" className="protocol-text">
                            {' '}
                            <i className="ms-Icon ms-Icon--Link" aria-hidden="true"></i>
                            Protocol here{' '}
                          </a>
                        </div>
                        <div className="invitation-title">
                          {meetingTitle}
                        </div>
                      </div>
                    </div>

                    <div className="session-actions-con">
                      <div className="session-attach-dropdown tasks-action-area">
                        {/* <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} /> */}
                        {members.map(({ memberID, image, memberName }) => {
                          return (<img key={memberID} src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} title={`Member-${memberName}`} alt={image} />)
                        })
                        }
                        <span className="session-attachements">
                          <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>
                          {meetingFiles?.length}
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
              )
            })
            }
            {/* <div className="card1 card-custom gutter-b">
              <div
                className="card-body d-flex align-items-center justify-content-between flex-wrap invitation-list-card">
                <div className="d-flex align-items-center invitaiton-info-left">
                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/calendar.png`}  />
                  <div className="invitation-date-time">
                    <div className="timing-details">
                      <span className="invitation-date-time">
                        10 Aug, 2020
                      </span>
                      <span className="invitaiton-time-left">
                        <i className="ms-Icon ms-Icon--Clock" aria-hidden="true"></i>
                        11:00 AM - 11:45 AM
                      </span>
                      <span className="invitation-minutes">
                        45 min
                      </span>
                      <a href="" className="protocol-text">
                        {' '}
                        <i className="ms-Icon ms-Icon--Link" aria-hidden="true"></i>
                        Protocol here{' '}
                      </a>
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
            </div> */}

          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'Protocols',
        icon: 'newspaper outline',
        content: 'Protocols',
      },
      render: () => (
        <Tab.Pane attached={false}>
          <Button size="small" className="primary tabs-button-right">
            <i className="ms-Icon ms-font-xl ms-Icon--Add"></i> Add Protocol
          </Button>
          <div className="ui-tabs">
            <div className="card1 card-custom gutter-b">
              <div
                className="card-body d-flex align-items-center justify-content-between flex-wrap invitation-list-card">
                <div className="d-flex align-items-center invitaiton-info-left">
                  <Icon name="newspaper outline" />
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
                      <span className="invitation-minutes">
                        45 min
                      </span>
                      <a href="" className="protocol-text">
                        {' '}
                        <i className="ms-Icon ms-Icon--Link" aria-hidden="true"></i>
                        Protocol here{' '}
                      </a>
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

            <div className="card1 card-custom gutter-b">
              <div
                className="card-body d-flex align-items-center justify-content-between flex-wrap invitation-list-card">
                <div className="d-flex align-items-center invitaiton-info-left">
                  <Icon name="newspaper outline" />
                  <div className="invitation-date-time">
                    <div className="timing-details">
                      <span className="invitation-date-time">
                        10 Aug, 2020
                        <span className="published-label">Published</span>
                      </span>
                      <span className="invitaiton-time-left">
                        <i className="ms-Icon ms-Icon--Clock" aria-hidden="true"></i>
                        11:00 AM - 11:45 AM
                      </span>
                      <span className="invitation-minutes">
                        45 min
                      </span>
                      <a href="" className="protocol-text">
                        {' '}
                        <i className="ms-Icon ms-Icon--Link" aria-hidden="true"></i>
                        Protocol here{' '}
                      </a>
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
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div>

      <Modal className="modal_media right-side--fixed-modal view-detail-invitation-modal"
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeOnDimmerClick={false}
        trigger={
          <Button size="mini" className="grey-btn">
            View Details
          </Button>
        }
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
                      <span>Switchboard fitting</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Category</label>
                      <span>Builder meetings</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Session</label>
                      <span>Project Beginning session</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Date</label>
                      <span>10 Sep, 2020</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Start time</label>
                      <span>11:00 AM</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>End time</label>
                      <span>11:45 AM</span>
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
                        <label><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/No2.png`} /> Barthelemy Chalvet</label>
                        <label><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/No2.png`} /> Barthelemy Chalvet</label>
                        <label><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/No2.png`} /> Barthelemy Chalvet</label>
                        <label><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/No2.png`} /> Barthelemy Chalvet</label>
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
                      <label>Description</label>
                      <span>The building utilizes wrapped glass facades on the east, north, and west both for aesthetics and to reduce the amount of reflective surface area on the south facade, which also features brushed Jura limestone.</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>Files</label>
                      <div className="members-listing">
                        <label>user@gmail.com</label>
                        <label>user@gmail.com</label>
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
                                  {/* <Icon name="newspaper outline" /> */}
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
            </Form>
          </div>
        </Modal.Content>
      </Modal>

      <Modal className="modal_media right-side--fixed-modal add-new-invitation-modal"
        closeIcon
        onClose={() => setOpen(false)}
        // onOpen={openEditInvitationPopup}
        // onOpen={() => setOpen(true)}
        open={open}
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
            // onClick={() => setOpen(false)}
            // onClick={cancel}
          >
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply ms-fontColor-themePrimary"></i> Cancel
          </Button>
        </Modal.Actions>
      </Modal>

      <div className="tabs-main-info-container invitation-tab">
        <div className="invitation-header">
          <i className="ms-Icon ms-Icon--Back" aria-hidden="true"></i>{' '}
          <span className="">Invitation</span> /{' '}
          <span className="preliminary-font">Protocol</span>
          <br />{' '}
          <span className="invitation-sub-heading">
            {/* <strong>Bulider Meeting -</strong>Project begining sessions */}
            <strong>{props?.sessionDetail?.SessionByID?.meetingCategoryTitle} - </strong>{props?.sessionDetail?.SessionByID?.sessionTitle}
          </span>
        </div>

        <Tab
          className="ui-tabs work-tabs invitation-listing"
          menu={{ secondary: true, pointing: true }}
          panes={panes}
        />
      </div>
    </div>
  );
}

export default InvitationTab;
