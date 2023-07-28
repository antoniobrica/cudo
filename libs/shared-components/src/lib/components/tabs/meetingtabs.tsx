import React from 'react';

import './../../../assets/style/index.scss'
import { Segment, Dropdown, Input, Grid, Form } from 'semantic-ui-react';
import img from 'libs/shared-components/src/user.png';
import img6 from 'libs/shared-components/src/yellow_calendar.png';
import img1 from 'libs/shared-components/src/blue_file.png';
import img3 from 'libs/shared-components/src/pink.png';
import img2 from 'libs/shared-components/src/star_img.png';
import img5 from 'libs/shared-components/src/green.png';

/* eslint-disable-next-line */
export interface MeetingTab { }

export function MeetingTab(props: MeetingTab) {
  const description = [
    <Segment>Pellentesque habitant morbi tristique senectus.</Segment>,
  ];
  return (
    <div className="app-content-body ">
      <div style={{ background: '#FFF9F1', padding: '10px' }}>
        <span className="preliminary-font">
          <img src={img6} className="  mr-10 " />
          <div
            style={{
              marginTop: '-33px',
              marginLeft: '41px',
              marginBottom: '22px',
            }}
          >
            {' '}
            Upcoming meetings{' '}
          </div>{' '}
        </span>

        <div className="card1 card-custom gutter-b">
          <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
            <div className="d-flex align-items-center py-2">
              <span className="textt  mb-0 mr-10">Today</span>
              <span className="font-weight-bold mb-0 mr-10">10 Sep,2020</span>
              <div className="d-flex mr-3">
                <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                  <div className="navi-item mr-2">
                    <a href=" " className="navi-link active">
                      <span className="navi-text">
                        {' '}
                        <i
                          className="ms-Icon ms-Icon--Clock"
                          aria-hidden="true"
                        ></i>{' '}
                        11:00 AM-11:45 AM
                      </span>
                    </a>
                  </div>

                  <div className="navi-item mr-2">
                    <a className="navi-link">
                      <span className="navi-text"> 45 min </span>
                    </a>
                  </div>

                  <div className="navi-item mr-2">
                    <a href="" className="navi-link">
                      <span className="navi-text"> (Electrical Work) </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="symbol-group symbol-hover py-2">
              <div className="symbol symbol-30">
                <img src={img} />
                <span className="font-weight-bold mb-0 mr-10">
                  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>
                  3
                </span>
                <span className="mr-2">
                  <Dropdown text="...">
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

        <div className="card1 card-custom gutter-b">
          <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
            <div className="d-flex align-items-center py-2">
              <span className="textt  mb-0 mr-10">Tomorrow</span>
              <span className="font-weight-bold mb-0 mr-10">10 Sep,2020</span>
              <div className="d-flex mr-3">
                <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                  <div className="navi-item mr-2">
                    <a href=" " className="navi-link active">
                      <span className="navi-text">
                        {' '}
                        <i
                          className="ms-Icon ms-Icon--Clock"
                          aria-hidden="true"
                        ></i>{' '}
                        11:00 AM-11:45 AM
                      </span>
                    </a>
                  </div>

                  <div className="navi-item mr-2">
                    <a className="navi-link">
                      <span className="navi-text"> 45 min </span>
                    </a>
                  </div>

                  <div className="navi-item mr-2">
                    <a href="" className="navi-link">
                      <span className="navi-text"> (HVAC Work) </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="symbol-group symbol-hover py-2">
              <div className="symbol symbol-30">
                <img src={img} />
                <span className="font-weight-bold mb-0 mr-10">
                  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>
                  2
                </span>
                <span className="mr-2">
                  <Dropdown text="...">
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
      <br />
      <div style={{ padding: '10px' }}>
        <span className="preliminary-font">
          <img src={img1} className="  mr-10 " />
          <div
            style={{
              marginTop: '-33px',
              marginLeft: '41px',
              marginBottom: '22px',
            }}
          >

            Bulider meetings <span className="sessiontext">(2 sessions)</span>
          </div>
        </span>
        <div className="card1 card-custom gutter-b">
          <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
            <div className="d-flex align-items-center py-2">
              <span className="textt  mb-0 mr-10">#251</span>
              <span className="font-weight-bold mb-0 mr-10">Project Begining Session</span>
              <div className="d-flex mr-3">
                <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                  <div className="navi-item mr-2">
                    <a href=" " className="navi-link active">
                      <span className="navi-text">

                        3 invitation - 1 protocol
                      </span>
                    </a>
                  </div>

                  <div className="navi-item mr-2">
                    <a className="navi-link">
                      <span className="navi-text"> - Electrical Work </span>
                    </a>
                  </div>

                </div>
              </div>
            </div>

            <div className="symbol-group symbol-hover py-2">
              <div className="symbol symbol-30">
                <img src={img} />
                <img src={img2} />

                <span className="mr-2">
                  <Dropdown text="...">
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
      <br />
      <div style={{ padding: '10px' }}>
        <span className="preliminary-font">
          <img src={img3} className="  mr-10 " />
          <div
            style={{
              marginTop: '-33px',
              marginLeft: '41px',
              marginBottom: '22px',
            }}
          >

            Official meetings <span className="sessiontext">(1 sessions)</span>
          </div>
        </span>
        <div className="card1 card-custom gutter-b">
          <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
            <div className="d-flex align-items-center py-2">
              <span className="textt  mb-0 mr-10">#251</span>
              <span className="font-weight-bold mb-0 mr-10">Project Begining Session</span>
              <div className="d-flex mr-3">
                <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                  <div className="navi-item mr-2">
                    <a href=" " className="navi-link active">
                      <span className="navi-text">

                        3 invitation - 1 protocol
                      </span>
                    </a>
                  </div>

                  <div className="navi-item mr-2">
                    <a className="navi-link">
                      <span className="navi-text"> - Electrical Work </span>
                    </a>
                  </div>

                </div>
              </div>
            </div>

            <div className="symbol-group symbol-hover py-2">
              <div className="symbol symbol-30">
                <img src={img} />
                <img src={img2} />

                <span className="mr-2">
                  <Dropdown text="...">
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
      <br />
      <div style={{ padding: '10px' }}>
        <span className="preliminary-font">
          <img src={img5} className="  mr-10 " />
          <div
            style={{
              marginTop: '-33px',
              marginLeft: '41px',
              marginBottom: '22px',
            }}
          >

            Official meetings <span className="sessiontext">(1 sessions)</span>
          </div>
        </span>
        <div className="card1 card-custom gutter-b">
          <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
            <div className="d-flex align-items-center py-2">
              <span className="textt  mb-0 mr-10">#251</span>
              <span className="font-weight-bold mb-0 mr-10">Project Begining Session</span>
              <div className="d-flex mr-3">
                <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                  <div className="navi-item mr-2">
                    <a href=" " className="navi-link active">
                      <span className="navi-text">

                        3 invitation - 1 protocol
                      </span>
                    </a>
                  </div>

                  <div className="navi-item mr-2">
                    <a className="navi-link">
                      <span className="navi-text"> - Electrical Work </span>
                    </a>
                  </div>

                </div>
              </div>
            </div>

            <div className="symbol-group symbol-hover py-2">
              <div className="symbol symbol-30">
                <img src={img} />
                <img src={img2} />

                <span className="mr-2">
                  <Dropdown text="...">
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
  );
}

export default MeetingTab;
