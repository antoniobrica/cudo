import React, { useState, useEffect } from 'react';

import './../../../assets/style/index.scss'
import { Tab, Dropdown, Button } from 'semantic-ui-react';
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
export interface ViewInvitationProps {
  sessionId?
}

export function InvitationTab(props: ViewInvitationProps) {



  const panes = [
    {
      menuItem: {
        key: 'Invitations',
        icon: 'calendar check outline',
        content: 'Invitations',
      },
      render: () => (
        <Tab.Pane attached={false}>
          <Button size="small" className="primary tabs-button-right">
            <i className="ms-Icon ms-font-xl ms-Icon--Add"></i> Add Invitation
          </Button>
          <div className="ui-tabs">
            <div className="card1 card-custom gutter-b">
              <div
                className="card-body d-flex align-items-center justify-content-between flex-wrap invitation-list-card">
                <div className="d-flex align-items-center invitaiton-info-left">
                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/calendar.png`} />
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
            </div>

            <div className="card1 card-custom gutter-b">
              <div
                className="card-body d-flex align-items-center justify-content-between flex-wrap invitation-list-card">
                <div className="d-flex align-items-center invitaiton-info-left">
                  {/* <Icon name="calendar check outline" /> */}
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
            </div>

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
                  {/* <Icon name="newspaper outline" /> */}
                   {/* <img src={img3} /> */}
                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/calendar.png`} style={{ width: '30px' }} />
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
                  {/* <Icon name="newspaper outline" /> */}
                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/calendar.png`} style={{ width: '30px' }} />
                  
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
    <div className="tabs-main-info-container invitation-tab">
      <div className="invitation-header">
        <i className="ms-Icon ms-Icon--Back" aria-hidden="true"></i>{' '}
        <span className="">Invitation</span> /{' '}
        <span className="preliminary-font">Protocol</span>
        <br />{' '}
        <span className="invitation-sub-heading">
          <strong>Bulider Meeting -</strong>Project begining sessions
        </span>

        
      </div>

      <Tab
        className="ui-tabs work-tabs invitation-listing"
        menu={{ secondary: true, pointing: true }}
        panes={panes}
      />
    </div>
  );
}

export default InvitationTab;
