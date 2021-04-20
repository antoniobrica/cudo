import React from 'react';

import '../../../style/index.scss';
import { Tab, Image, Form, Grid, Card, Dropdown } from 'semantic-ui-react';

/* eslint-disable-next-line */
export interface TabsProps {}

import img8 from 'libs/shared-components/src/default_area.png';

export function Tabsbar(props: TabsProps) {
  const panes = [
    {
      menuItem: {
        key: 'Overview',
        icon: 'file alternate outline',
        content: 'Overview',
      },
      render: () => (
        <Tab.Pane attached={false}>
          <div className="ui-tabs">
            <div className="text-center ">
              <Image
                src="https://react.semantic-ui.com/images/wireframe/image.png"
                size="small"
                wrapped
              />
            </div>
            <div className="text-center margin-top">
              <span className="found">No Data Found</span>
              <p className="project-sub" style={{ color: '#9A9EA1' }}>
                Hey User, you don't have any active sub project lists on this
                project. Click the button <br /> below to create a sub project
                list.
              </p>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'Task', icon: 'shield alternate', content: 'Task' },
      render: () => <Tab.Pane attached={false}> Task</Tab.Pane>,
    },
    {
      menuItem: { key: 'Planning', icon: 'flag outline', content: 'Planning' },
      render: () => (
        <Tab.Pane attached={false}>
          <div className="ui-tabs">
            <h6 style={{ fontWeight: 'normal' }} className="h5heading">
              Planning
            </h6>
            <hr style={{ color: '#707070' }}></hr>
            <h6 style={{ fontWeight: 'normal' }} className="h5heading">
              Active Milestone{' '}
            </h6>

            <Form>
              <Grid columns={4}>
                <Grid.Row>
                  <Grid.Column>
                    <Card>
                      <div className="ui card">
                        <div className="content">
                          <div className="description">
                            <span className="time">Aug 26, Wednesday</span>
                            <span className="summary">
                              {' '}
                              <a href="">
                                {' '}
                                <i
                                  className="ms-Icon ms-Icon--Completed mr-10"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </span>
                          </div>
                          <div className="header font-header">
                            High priority things
                          </div>
                          <div className="description">
                            John & co. +2 others responsible
                          </div>
                        </div>

                        <div className="content">
                          <div className="data-built">
                            <p>
                              {' '}
                              This is description will be show sunt in culpa qui
                              officia deserunt mollit anim id est laborum...
                            </p>
                          </div>
                          <br /> <br />
                          <div className="data-built">
                            Project/Work type
                            <span className="summary">Electrical Work</span>
                          </div>
                          <div className="data-built">
                            Phase
                            <span className="summary">Prelimary Studies</span>
                          </div>
                          <br />
                          <div className="description">
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
                    <Card>
                      <div className="ui card">
                        <div className="content">
                          <div className="description">
                            <span className="time">Aug 20, Wednesday</span>
                            <span className="summary">
                              {' '}
                              <a href="">
                                {' '}
                                <i
                                  className="ms-Icon ms-Icon--Completed mr-10"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </span>
                          </div>
                          <div className="header font-header">Checkpoints</div>
                          <div className="description">
                            John & co. +2 others responsible
                          </div>
                        </div>

                        <div className="content">
                          <div className="data-built">
                            <p>
                              {' '}
                              This is description will be show sunt in culpa qui
                              officia deserunt mollit anim id est laborum...
                            </p>
                          </div>
                          <br /> <br />
                          <div className="data-built">
                            Project/Work type
                            <span className="summary">Electrical Work</span>
                          </div>
                          <div className="data-built">
                            Phase
                            <span className="summary">Prelimary Studies</span>
                          </div>
                          <br />
                          <div className="description">
                            <span className="daysarea">20 days away </span>
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
                    <Card>
                      <div className="ui card">
                        <div className="content">
                          <div className="description">
                            <span className="time2">Aug 1, Saturday</span>
                            <span className="summary">
                              {' '}
                              <a href="">
                                {' '}
                                <i
                                  className="ms-Icon ms-Icon--Completed mr-10"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </span>
                          </div>
                          <div className="header font-header">Checkpoints</div>
                          <div className="description">
                            John & co. +2 others responsible
                          </div>
                        </div>

                        <div className="content">
                          <div className="data-built">
                            <p>
                              {' '}
                              This is description will be show sunt in culpa qui
                              officia deserunt mollit anim id est laborum...
                            </p>
                          </div>
                          <br /> <br />
                          <div className="data-built">
                            Project/Work type
                            <span className="summary">Electrical Work</span>
                          </div>
                          <div className="data-built">
                            Phase
                            <span className="summary">Prelimary Studies</span>
                          </div>
                          <br />
                          <div className="description">
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
      render: () => <Tab.Pane attached={false}>Cost</Tab.Pane>,
    },
    {
      menuItem: { key: 'Tender', icon: 'gavel', content: 'Tender' },
      render: () => <Tab.Pane attached={false}>Tender</Tab.Pane>,
    },
    {
      menuItem: {
        key: 'Meetings',
        icon: 'calendar outline',
        content: 'Meetings',
      },
      render: () => (
        <Tab.Pane attached={false}>
          <div className="ui-tabs">
            <div>
              <img src={img8} className="image_center"></img>
            </div>
            <div className="text-center margin-top">
              <span className="found">No Data Found</span>
              <p className="project-sub" style={{ color: '#9A9EA1' }}>
                Hey User, you don't have any active sub project lists on this
                project. Click the button <br /> below to create a sub project
                list.
              </p>
              <button className="ui mini button grey-btn">+ Add New Session</button>
            </div>

          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'Files', icon: 'folder open outline', content: 'Files' },
      render: () => <Tab.Pane attached={false}>Files</Tab.Pane>,
    },
    {
      menuItem: {
        key: 'Questions',
        icon: 'question circle outline',
        content: 'Questions',
      },
      render: () => <Tab.Pane attached={false}>Questions</Tab.Pane>,
    },
    {
      menuItem: { key: 'People', icon: 'user outline', content: 'People' },
      render: () => <Tab.Pane attached={false}>People</Tab.Pane>,
    },
    {
      menuItem: { key: 'Settings', icon: 'setting', content: 'Settings' },
      render: () => <Tab.Pane attached={false}>Settings</Tab.Pane>,
    },
    {
      menuItem: {
        key: 'Messages',
        icon: 'envelope open outline',
        content: 'Messages',
      },
      render: () => <Tab.Pane attached={false}>Messages</Tab.Pane>,
    },
  ];

  return (
    <div className="app-content-body-dash navbar-collapse box-shadow bg-white-only">
      <div>
        <span className="">Electrical Work</span> |{' '}
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
