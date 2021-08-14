import React, { useState } from 'react';
import moment from 'moment'
import './../../../assets/style/index.scss'
import { Tab, Dropdown, Button, Icon, Modal, Grid, Form } from 'semantic-ui-react';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface InvitationTabProps {
  sessionId?
  invitations?
  addInvitationClick?
  sessionDetail?
  selectedInvitationId?
  viewInvitation?
  editInvitation?
  deleteInvitation?
  addProtocolClick?
  protocols?
}

export function InvitationTab(props: InvitationTabProps) {

  const { t } = useTranslation()

  const onClickAddInvitation = () => {
    props.addInvitationClick(true)
  }
  const onClickAddProtocol = () => {
    props.addProtocolClick()
  }
  const onClickViewInvitation = (meetingId) => {
    props.viewInvitation(meetingId)
  }

  const onClickEditInvitation = (meetingId) => {
    props.editInvitation(meetingId)
  }

  const onClickDeleteInvitation = (meetingId) => {
    props.deleteInvitation(meetingId)
  }

  const panes = [
    {
      menuItem: {
        key: 'Invitations',
        icon: 'calendar check outline',
        content: t("project_tab_menu.meeting.invitations"),
      },
      render: () => (
        <Tab.Pane attached={false}>
          <Button size="small" className="primary tabs-button-right" onClick={onClickAddInvitation}>
            <i className="ms-Icon ms-font-xl ms-Icon--Add"></i> {t("project_tab_menu.meeting.add_invitation")}
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
                                  <Dropdown.Item icon="eye" text={t("common.view_details")} onClick={() => onClickViewInvitation(meetingId)} />
                                  <Dropdown.Item icon="pencil" text={t("common.edit")} onClick={() => onClickEditInvitation(meetingId)} />
                                  <Dropdown.Item icon="trash alternate outline" text={t("common.delete")} onClick={() => onClickDeleteInvitation(meetingId)} />
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

          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'Protocols',
        icon: 'newspaper outline',
        content: t("project_tab_menu.meeting.protocols"),
      },
      
      render: () => (
        

         props.protocols.length ? (
        <Tab.Pane attached={false}>
          <Button
            size="small"
            className="primary tabs-button-right"
            onClick={onClickAddProtocol}
          >
            <i className="ms-Icon ms-font-xl ms-Icon--Add"></i> {t("project_tab_menu.meeting.add_protocol")}
          </Button>
          <div className="ui-tabs">
            {props?.protocols?.map((item) => {
              const { protocolId, protocolTitle, protocolDate, protocolStartTime, protocolEndTime, protocolDuration, protocolFiles } = item

              const formattedProtocolDate = moment(protocolDate).format('DD MMM, YYYY')
              const formattedProtocolStartTime = moment(protocolStartTime).format('hh:mm A')
              const formattedProtocolEndTime = moment(protocolEndTime).format('hh:mm A')

              return (
                <div className="card1 card-custom gutter-b">
                  <div
                    className="card-body d-flex align-items-center justify-content-between flex-wrap invitation-list-card">
                    <div className="d-flex align-items-center invitaiton-info-left">
                      <Icon name="newspaper outline" />
                      <div className="invitation-date-time">
                        <div className="timing-details">
                          <span className="invitation-date-time">
                            {/* 10 Aug, 2020 */}
                            {formattedProtocolDate}
                            <span className="draft-label">Draft</span>
                          </span>
                          <span className="invitaiton-time-left">
                            <i className="ms-Icon ms-Icon--Clock" aria-hidden="true"></i>
                            {/* 11:00 AM - 11:45 AM */}
                            {`${formattedProtocolStartTime} - ${formattedProtocolEndTime}`}
                          </span>
                          <span className="invitation-minutes">
                            {/* 45 min */}
                            {protocolDuration}
                          </span>
                          <a href="" className="protocol-text">
                            {' '}
                            <i className="ms-Icon ms-Icon--Link" aria-hidden="true"></i>
                            Meetings here
                          </a>
                        </div>
                        <div className="invitation-title">
                          {/* This is Invitation title */}
                          {protocolTitle}
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
                                  <Dropdown.Item icon="eye" text={t("common.view_details")} />
                                  <Dropdown.Item icon="pencil" text={t("common.edit")} />
                                  <Dropdown.Item
                                    icon="trash alternate outline"
                                    text={t("common.delete")}
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
            })}
          </div>
        </Tab.Pane>) : (
        <div className="no-data-found-info">
                      {/* <img src={img8} className="image_center"></img> */}
                      <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default_area.png`} />

                      <h3>{t("common.data_not_found")}</h3>
                      <p>{t("project_tab_menu.meeting.no_protocol_data_found_desc")}</p>
                      <Button size="small" className="primary" onClick={onClickAddProtocol} >
                          + {t("project_tab_menu.meeting.add_new_protocol")}
                      </Button>
                      </div>
      )
      ),
    },
  ];

  return (
    <div>
      <div className="tabs-main-info-container invitation-tab">
        <div className="invitation-header">
          <i className="ms-Icon ms-Icon--Back" aria-hidden="true"></i>{' '}
          <span className="">{t("project_tab_menu.meeting.invitations")}</span> /{' '}
          <span className="preliminary-font">{t("project_tab_menu.meeting.protocols")}</span>
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
