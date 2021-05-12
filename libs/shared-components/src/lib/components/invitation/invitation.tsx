import React from 'react';

import '../../../style/index.scss';
import { Tab, Dropdown } from 'semantic-ui-react';
import img from 'libs/shared-components/src/user.png';
import img3 from 'libs/shared-components/src/calendar.png';

/* eslint-disable-next-line */
export interface TabsProps {}

export function InvitationTab(props: TabsProps) {
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

                  <span
                    className="font-weight-bold mb-0 mr-10"
                    style={{ marginTop: '-21px' }}
                  >
                    <i
                      className="ms-Icon ms-Icon--Clock"
                      aria-hidden="true"
                    ></i>
                    11:00 AM - 11:45 AM
                  </span>
                  <span className="textt2" style={{ marginTop: '-21px' }}>
                    45 min
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
                            Protocol here{' '}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="symbol-group symbol-hover py-2">
                  <div className="symbol symbol-30">
                    <img src={img} />
                    <span className="font-weight-bold mb-0 mr-10">
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

                  <span
                    className="font-weight-bold mb-0 mr-10"
                    style={{ marginTop: '-21px' }}
                  >
                    <i
                      className="ms-Icon ms-Icon--Clock"
                      aria-hidden="true"
                    ></i>
                    11:00 AM - 11:45 AM
                  </span>
                  <span className="textt2" style={{ marginTop: '-21px' }}>
                    45 min
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
                            Protocol here{' '}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="symbol-group symbol-hover py-2">
                  <div className="symbol symbol-30">
                    <img src={img} />
                    <span className="font-weight-bold mb-0 mr-10">
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
    <div className="app-content-body-dash navbar-collapse box-shadow">
      <div>
        <i className="ms-Icon ms-Icon--Back" aria-hidden="true"></i>{' '}
        <span className="">Invitation</span> /{' '}
        <span className="preliminary-font">Protocol</span>
        <br />{' '}
        <span style={{ fontSize: '10px' }}>
          <strong>Bulider Meeting</strong>- Project begining sessions
        </span>
      </div>

      <Tab
        className="ui-tabs"
        menu={{ secondary: true, pointing: true }}
        panes={panes}
      />
    </div>
  );
}

export default InvitationTab;
