import React, { useState, useEffect } from 'react';

import './../../../assets/style/index.scss'
import { Segment, Dropdown, Input, Grid, Form, Button } from 'semantic-ui-react';

// import { InvitationTab, ModalAddInvitation } from '@cudo/shared-components'

import { MS_SERVICE_URL } from '@cudo/mf-core';

// import ModalSession from 'libs/shared-components/src/lib/components/modal/addsession'
//  /add-session/add-session';

/* eslint-disable-next-line */
export interface MeetingTab {
  sessionListData?
  addSession?
  // viewSession?
  selectedSessionId?
}

export function MeetingTab(props: MeetingTab) {

  const [categoryItems, setCategoryItems] = useState([])
  const [sessionList, setSessionList] = useState([])
  // const [openSessionDetail, setOpenSessionDetail] = useState(false)

  useEffect(() => {
    if (props?.sessionListData?.paginatedSession?.results) {
      const resultList = props.sessionListData.paginatedSession.results

      setSessionList(resultList)
      let categories = []
      resultList.forEach(({ meetingCategoryID, meetingCategoryTitle }) => {
        categories.push({ meetingCategoryID, meetingCategoryTitle })
      })

      const filteredCategories = resultList.reduce((acc, current) => {
        const x = acc.find(item => item.meetingCategoryID === current.meetingCategoryID);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setCategoryItems(filteredCategories)
    }

  }, [props.sessionListData])


  const meetingCategoryWiseSessionListRender = (meetingCategoryID) => {

    const renderedCategoryList = sessionList ? sessionList.filter((sessionItem) => {
      return sessionItem.meetingCategoryID === meetingCategoryID
    }).map((item, index) => {
      const meetingOnSessionCount = 0
      const protocolOnSessionCount = 0

      const { sessionID, sessionTitle, worktypeTitle, admins, members } = item

      return (
        <div key={sessionID} className="card1 card-custom" >
          <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center meetings-session-info">
              <span className="textt">#{index + 1}</span>
              <span className="session-date">{sessionTitle}</span>
              <div className="d-flex session-time">
                <div className="d-flex">
                  <div className="navi-item mr-2">
                    <div className="navi-link active">
                      <span className="navi-text">

                        {meetingOnSessionCount} invitation - {protocolOnSessionCount} protocol
                      </span>
                    </div>
                  </div>

                  <div className="navi-item mr-2">
                    <div className="navi-link">
                      <span className="navi-text"> - {worktypeTitle} </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="session-actions-con">
              <div className="session-attach-dropdown tasks-action-area single-search-list">
                {/* <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} />
              <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/star_img.png`} /> */}
                {admins.map(({ adminID, image, adminName }) => {
                  return (<img key={adminID} src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} title={`admin-${adminName}`} alt={image} />)
                })
                }
                {members.map(({ memberID, image, memberName }) => {
                  return (<img key={memberID} src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/star_img.png`} title={`Member-${memberName}`} alt={image} />)
                })
                }

                <div className="symbol-group symbol-hover py-2" >
                  <div className="symbol symbol-30 d-flex">
                    <span className="dropdown-action">
                      <Dropdown icon='ellipsis horizontal' pointing='right'>
                        <Dropdown.Menu>
                          <Dropdown.Item icon="eye" text="View detail" onClick={() => viewSessionDetail(sessionID)} />
                          <Dropdown.Item icon="pencil" text="Edit" onClick={() => editSessionDetail(sessionID)} />
                          <Dropdown.Item
                            icon="trash alternate outline"
                            text="Delete"
                            onClick={() => deleteSessionDetail(sessionID)}
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
    }) : null
    return renderedCategoryList

  }


  let meetingCategoryRender = null
  if (categoryItems && categoryItems.length) {

    meetingCategoryRender = categoryItems.map((item) => {
      const { meetingCategoryID, meetingCategoryTitle } = item

      const categoryWiseSessionCount = sessionList?.filter((sessionItem) => {
        return sessionItem.meetingCategoryID === meetingCategoryID
      }).length

      return (
        <div className="meetings-listing" key={meetingCategoryID}>
          <span className="preliminary-font">
            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/green.png`} className="  mr-10 " />
            <h3>
              {meetingCategoryTitle} <span className="sessiontext">({categoryWiseSessionCount} sessions)</span>
            </h3>
          </span>
          {meetingCategoryWiseSessionListRender(meetingCategoryID)}
        </div>
      )
    }
    )

  }


  const viewSessionDetail = (sessionID) => {
    props.selectedSessionId(sessionID)

  }

  const editSessionDetail = (sessionID) => {

  }

  const deleteSessionDetail = (sessionID) => {

  }

  const clickAddSession = () => {
    props.addSession(true)
  }


  const description = [
    <Segment>Pellentesque habitant morbi tristique senectus.</Segment>,
  ];


  return (
    <div>
      {/* {openSessionDetail ?
        <div>
           <ModalAddInvitation sessionId={sessionId} />
          <InvitationTab sessionId={sessionId} /> 

        </div> : null
      } */}
      <div className="tabs-main-info-container meetings-outer-con">

        <h3>Meetings
          <Button onClick={clickAddSession} size="small" className="primary">
            <i className="ms-Icon ms-font-xl ms-Icon--Add"></i> Add New Session
          </Button>

        </h3>

        {/* //=====Upcoming List for Invitations============== */}
        <div className="meetings-listing upcoming-meeting-con">
          <span className="preliminary-font">
            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/yellow_calendar.png`} />
            <h3>
              {' '}
              Upcoming meetings{' '}
            </h3>{' '}
          </span>

          <div className="card1 card-custom">
            <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex align-items-center meetings-session-info">
                <span className="textt">Today</span>
                <span className="session-date">10 Sep,2020</span>
                <div className="d-flex session-time">
                  <div className="d-flex">
                    <div className="navi-item mr-2">
                      <div className="navi-link active">
                        <span className="navi-text">
                          {' '}
                          <i
                            className="ms-Icon ms-Icon--Clock"
                            aria-hidden="true"
                          ></i>{' '}
                          11:00 AM-11:45 AM
                        </span>
                      </div>
                    </div>

                    <div className="navi-item mr-2">
                      <div className="navi-link">
                        <span className="session-time-left">45 min </span>
                      </div>
                    </div>

                    <div className="navi-item ">
                      <div className="navi-link">
                        <span className="session-job-title">(Electrical Work) </span>
                      </div>
                    </div>
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

          <div className="card1 card-custom">
            <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex align-items-center meetings-session-info">
                <span className="textt">Today</span>
                <span className="session-date">10 Sep,2020</span>
                <div className="d-flex session-time">
                  <div className="d-flex">
                    <div className="navi-item mr-2">
                      <div className="navi-link active">
                        <span className="navi-text">
                          {' '}
                          <i
                            className="ms-Icon ms-Icon--Clock"
                            aria-hidden="true"
                          ></i>{' '}
                          11:00 AM-11:45 AM
                        </span>
                      </div>
                    </div>

                    <div className="navi-item mr-2">
                      <div className="navi-link">
                        <span className="session-time-left">45 min </span>
                      </div>
                    </div>

                    <div className="navi-item ">
                      <div className="navi-link">
                        <span className="session-job-title">(Electrical Work) </span>
                      </div>
                    </div>
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
        <br />


        {/* //===== Modified to meetingCategory and meetingCategoryWiseSessionListRender part ======//
    <div className="app-content-body ">
      <div style={{ background: '#FFF9F1', padding: '10px' }}>
        <span className="preliminary-font">
          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/yellow_calendar.png`} className="  mr-10 " />
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
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} />
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
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} />
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
          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/blue_file.png`} className="  mr-10 " />
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
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} />
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/star_img.png`} />

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
          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/pink.png`} className="  mr-10 " />
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
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} />
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/star_img.png`} />

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
          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/green.png`} className="  mr-10 " />
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
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} />
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/star_img.png`} />

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
      </div> */}



        {meetingCategoryRender}

      </div>

    </div>
  );
}

export default MeetingTab;
