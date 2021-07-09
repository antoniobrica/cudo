import React, {useState, useEffect} from 'react';

import './../../../assets/style/index.scss'
import { Tab, Dropdown, Button } from 'semantic-ui-react';
import img from 'libs/shared-components/src/user.png';
import img3 from 'libs/shared-components/src/calendar.png';

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
          <div className="ui-tabs">
            <div className="card1 card-custom gutter-b">
              <div
                className="card-body d-flex align-items-center justify-content-between flex-wrap invitation-list-card">
                <div className="d-flex align-items-center invitaiton-info-left">
                  <img src={img3} />
                  <div className="invitation-date-time">
                    <div className="timing-details">
                      <span className="invitation-date-time">
                        10 Aug, 2020
                      </span>
                      <span className="invitaiton-time-left">
                        <i className="ms-Icon ms-Icon--Clock" aria-hidden="true"></i>
                        11:00 AM - 11:45 AM
                      </span>
                      <span className="invitaion-minutes">
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

                <div className="symbol-group symbol-hover">
                  <div className="symbol symbol-30">
                    <img src={img} />
                    <span className="font-weight-bold">
                      {' '}
                      <i
                        className="ms-Icon ms-Icon--Attach"
                        aria-hidden="true"
                      ></i>
                      3
                    </span>
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
        icon: 'keyboard outline',
        content: 'Protocols',
      },
      render: () => (
        <Tab.Pane attached={false}>
          <div className="ui-tabs">
            <div className="card1 card-custom gutter-b">
              <div
                className="card-body d-flex align-items-center justify-content-between flex-wrap py-3"
                style={{ width: '80%' }}
              >
                <div className="d-flex align-items-center  py-2">
                  <img src={img3} style={{ width: '30px' }} />
                  <span className="font-weight-bold mb-0 mr-10">
                    &nbsp; 10 Aug, 2020
                    <br />
                    &nbsp; This is invitation title
                  </span>
                  <span className="textt2" style={{ marginTop: '-21px' }}>
                    45 min
                  </span>
                  <span
                    className="font-weight-bold mb-0 mr-10"
                    style={{ marginTop: '-21px' }}
                  >
                    &nbsp;
                    <i
                      className="ms-Icon ms-Icon--Clock"
                      aria-hidden="true"
                    ></i>
                    11:00 AM - 11:45 AM
                  </span>

                  <div className="d-flex mr-3" style={{ marginTop: '-21px' }}>
                    <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                      <div className="navi-item mr-2">
                        <a className="navi-link">
                          <span className="navi-text">
                            {' '}
                            <i
                              className="ms-Icon ms-Icon--Link"
                              aria-hidden="true"
                            ></i>
                            2 invitations{' '}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="symbol-group symbol-hover py-2">
                  <div className="symbol symbol-30">
                    <img src={img} />
                    <span className="mr-2">
                      <Dropdown text="...">
                        <Dropdown.Menu className="dropdowncomplete">
                          <Dropdown.Item icon="eye" text="View detail" />
                          <Dropdown.Item icon="play" text="Publish" />

                          <Dropdown.Item
                            icon="trash alternate outline"
                            text="Delete"
                          />
                          <Dropdown.Item
                            icon="check circle outline"
                            text="Export"
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card1 card-custom gutter-b">
              <div
                className="card-body d-flex align-items-center justify-content-between flex-wrap py-3"
                style={{ width: '80%' }}
              >
                <div className="d-flex align-items-center  py-2">
                  <img src={img3} style={{ width: '30px' }} />
                  <span className="font-weight-bold mb-0 mr-10">
                    &nbsp; 10 Aug, 2020
                    <br />
                    &nbsp; This is invitation title
                  </span>
                  <span className="textt2" style={{ marginTop: '-21px' }}>
                    Published
                  </span>
                  <span
                    className="font-weight-bold mb-0 mr-10"
                    style={{ marginTop: '-21px' }}
                  >
                    <i
                      className="ms-Icon ms-Icon--Clock"
                      aria-hidden="true"
                    ></i>
                    &nbsp; 11:00 AM - 11:45 AM
                  </span>
                </div>

                <div className="symbol-group symbol-hover py-2">
                  <div className="symbol symbol-30">
                    <img src={img} />
                    <span className="mr-2">
                      <Dropdown text="...">
                        <Dropdown.Menu className="dropdowncomplete">
                          <Dropdown.Item icon="eye" text="View detail" />
                          <Dropdown.Item icon="play" text="Publish" />

                          <Dropdown.Item
                            icon="trash alternate outline"
                            text="Delete"
                          />
                          <Dropdown.Item
                            icon="check circle outline"
                            text="Export"
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
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
          <strong>Bulider Meeting</strong>- Project begining sessions
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
