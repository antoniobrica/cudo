import React from 'react';

import './../../../assets/style/index.scss'
import { Tab, Image, Input, Accordion, Form, Grid, Card, Dropdown } from 'semantic-ui-react';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface TabsProps { }

/* eslint-disable-next-line */
export interface TabsProps {
  parentCallback?
}

export function Tabsbar(props: TabsProps) {

  const handleOpenProject = (item) => {
    // props?.parentCallback(item)
  }
  const {t} = useTranslation()
  const rootPanels = [
    { key: 'panel-1', title: 'Jack W. Elementary School', content: { content: <a href=''>+ Add item</a> }, },
    { key: 'panel-2', title: 'Freehold Two Solar LLC', content: { content: <a href=''>+ Add item</a> } },
  ]
  const panes = [
    {
      menuItem: { key: 'Overview', icon: 'file alternate outline', content: 'Overview' },
      render: () => <Tab.Pane attached={false} onClick={handleOpenProject('overview')}>

        <div className="ui-tabs">
          <div className="text-center ">
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' wrapped />

          </div>
          <div className="text-center margin-top">

            <span className="found">No Data Found</span>
            <p className="project-sub" style={{ color: '#9A9EA1' }}>Hey User, you don't have any active sub project lists on this project. Click the button <br /> below  to create a sub project list.</p>
          </div>
        </div>


      </Tab.Pane>,
    },
    {
      menuItem: { key: 'Task', icon: 'shield alternate', content: 'Task' },
      render: () => <Tab.Pane onClick={handleOpenProject('task')}>All Task</Tab.Pane>,
    },
    {
      menuItem: { key: 'Planning', icon: 'flag outline', content: 'Planning' },
      render: () => (
        <Tab.Pane attached={false} onClick={handleOpenProject('planning')}>
          <div className="ui-tabs">
            <h6 style={{ fontWeight: 'normal' }} className="h5heading">
              {t("project_tab_menu.planning.title")}
            </h6>
            <hr style={{ color: '#707070' }}></hr>
            <h6 style={{ fontWeight: 'normal', marginTop: '12px' }} className="h5heading">
            {t("project_tab_menu.planning.active_milestone")}
            </h6>

            <Form>
              <Grid columns={4}>
                <Grid.Row>
                  <Grid.Column>
                    <Card className="ui_width">
                      <div className="ui card ui_width">
                        <div className="content paddingcontent">
                          <div className="description ">
                            <span className="time">Aug 26, Wednesday</span>
                            <span className="summary">

                              <a href="">

                                <i
                                  className="ms-Icon ms-Icon--Completed mr-10"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </span>
                          </div>
                          <div className="header font-header ">
                            High priority things
                          </div>
                          <div className="description">
                            John & co. +2 others responsible
                          </div>
                        </div>

                        <div className="content noborder">
                          <div className="data-built data_area">
                            <p>

                              This is description will be show sunt in culpa qui
                              officia deserunt mollit anim id est laborum...
                            </p>
                          </div>

                          <div className="data-built data_pad">
                            Project/Work type
                            <span className="summary">Electrical Work</span>
                          </div>
                          <div className="data-built data_field">
                            Phase
                            <span className="summary">Prelimary Studies</span>
                          </div>

                          <div className="description details">
                            <span className="daysarea">26 days away </span>
                            <span className="summary mr-2">
                              <Dropdown text="...">
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    icon="eye"
                                    text="View detail"
                                  />
                                  <Dropdown.Item icon="pencil" text="Edit" />
                                  <Dropdown.Item icon='check circle outline' text='Re-open' />
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
                    </Card>
                  </Grid.Column>
                  <Grid.Column>
                    <Card className="ui_width">
                      <div className="ui card ui_width">
                        <div className="content paddingcontent">
                          <div className="description ">
                            <span className="time">Aug 26, Wednesday</span>
                            <span className="summary">

                              <a href="">

                                <i
                                  className="ms-Icon ms-Icon--Completed mr-10"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </span>
                          </div>
                          <div className="header font-header paddingarea">
                            High priority things
                          </div>
                          <div className="description">
                            John & co. +2 others responsible
                          </div>
                        </div>

                        <div className="content noborder">
                          <div className="data-built data_area">
                            <p>

                              This is description will be show sunt in culpa qui
                              officia deserunt mollit anim id est laborum...
                            </p>
                          </div>

                          <div className="data-built data_pad">
                            Project/Work type
                            <span className="summary">Electrical Work</span>
                          </div>
                          <div className="data-built data_field">
                            Phase
                            <span className="summary">Prelimary Studies</span>
                          </div>

                          <div className="description details">
                            <span className="daysarea">26 days away </span>
                            <span className="summary mr-2">
                              <Dropdown text="...">
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    icon="eye"
                                    text="View detail"
                                  />
                                  <Dropdown.Item icon="pencil" text="Edit" />
                                  <Dropdown.Item icon='check circle outline' text='Re-open' />
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
                    </Card>
                  </Grid.Column>
                  <Grid.Column>
                    <Card className="ui_width">
                      <div className="ui card ui_width">
                        <div className="content paddingcontent">
                          <div className="description">
                            <span className="time2">Aug 1, Saturday</span>
                            <span className="summary">

                              <a href="">

                                <i
                                  className="ms-Icon ms-Icon--Completed mr-10"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </span>
                          </div>
                          <div className="header font-header paddingarea">Checkpoints</div>
                          <div className="description">
                            John & co. +2 others responsible
                          </div>
                        </div>

                        <div className="content noborder">
                          <div className="data-built data_area">
                            <p>

                              This is description will be show sunt in culpa qui
                              officia deserunt mollit anim id est laborum...
                            </p>
                          </div>

                          <div className="data-built data_pad">
                            Project/Work type
                            <span className="summary">Electrical Work</span>
                          </div>
                          <div className="data-built data_field">
                            Phase
                            <span className="summary">Prelimary Studies</span>
                          </div>

                          <div className="description details">
                            <span className="daysarea2">3 days away </span>
                            <span className="summary mr-2">
                              <Dropdown text="...">
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    icon="eye"
                                    text="View detail"
                                  />
                                  <Dropdown.Item icon="pencil" text="Edit" />
                                  <Dropdown.Item icon='check circle outline' text='Re-open' />
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
                    </Card>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'Cost',
        icon: 'money bill alternate outline',
        content: 'Cost',
      },
      render: () => <Tab.Pane attached={false}>

        <div className="ui-tabs">
          <h6 style={{ fontWeight: 'normal' }} className="h5heading">
            Cost managment
          </h6>
          <span className="sessiontext" style={{ display: 'flex' }}>Please manage the cost for Electrical Work

            <div className="symbol-group symbol-hover py-2 marginestimate">
              <div className="symbol symbol-30 d-flex">

                <span className="mr-2" style={{ background: '#fff', padding: '3px' }} >

                  <Dropdown text='...'>
                    <Dropdown.Menu>

                      <Dropdown.Item icon='print' text='Print' />
                      <Dropdown.Item icon='down' text='Download' />
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
              </div>

            </div>
          </span>

          <Form>
            <Grid columns={3} className="pinkbackground">
              <Grid.Row>
                <Grid.Column>
                  <Form.Field className="fillarea" style={{ display: 'flex' }}>
                    <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/money.png`}></img>  <label style={{ marginLeft: '10px' }}>Estimated Cost</label>
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field className="fillarea">

                    <Input placeholder='Enter your text here....' size='small' className="full-width " type="text" />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column style={{ marginTop: '5px' }}>
                  <Form.Field style={{ marginleft: '145px' }}>
                    <button className="greenbutton"><i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i> </button>
                    &nbsp;  <button className="redbutton"><i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i> </button>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </Form>


        </div>
        <div>
          <br />
          <h6 style={{ fontWeight: 'normal' }} className="h5heading">
            Items
          </h6>
          <div className="ui card " style={{ width: '80%' }}>
            <Accordion className="widtharea" defaultActiveIndex={0} panels={rootPanels} styled  >
            </Accordion>
          </div>
        </div>

      </Tab.Pane>,
    },
    {

      menuItem: { key: 'Tender', icon: 'gavel', content: 'Tender' },
      render: () => <Tab.Pane attached={false} onClick={handleOpenProject('tender')}>Tender</Tab.Pane>,
    },
    {

      menuItem: { key: 'Meetings', icon: 'calendar outline', content: 'Meetings' },
      render: () => <Tab.Pane attached={false} onClick={handleOpenProject('meetings')}>Meetings</Tab.Pane>,
    },
    {

      menuItem: { key: 'Files', icon: 'folder open outline', content: 'Files' },
      render: () => <Tab.Pane attached={false} onClick={handleOpenProject('files')}>Files</Tab.Pane>,
    },
    {

      menuItem: { key: 'Questions', icon: 'question circle outline', content: 'Questions' },
      render: () => <Tab.Pane attached={false} onClick={handleOpenProject('questions')}>Questions</Tab.Pane>,
    },
    {

      menuItem: { key: 'People', icon: 'user outline', content: 'People' },
      render: () => <Tab.Pane attached={false} onClick={handleOpenProject('people')}>People</Tab.Pane>,
    },
    {

      menuItem: { key: 'Settings', icon: 'setting', content: 'Settings' },
      render: () => <Tab.Pane attached={false} onClick={handleOpenProject('settings')}>Settings</Tab.Pane>,
    },
    {

      menuItem: { key: 'Messages', icon: 'envelope open outline', content: 'Messages' },
      render: () => <Tab.Pane attached={false} onClick={handleOpenProject('messages')}>Messages</Tab.Pane>,
    },
  ]

  return (
    <div className="app-content-body-dash navbar-collapse">
      <div className="main-page-heading">
        <span className="">Electrical Work</span> |
        <span className="preliminary-font">Preliminary Studies</span>
      </div>

      <Tab
        className="ui-tabs"
        menu={{ secondary: true, pointing: true }}
        panes={panes}
      />
    </div>
  );
}

export default Tabsbar;
