import React from 'react';

import './../../../assets/style/index.scss'
import { Tab, Grid, Accordion, Table, Form } from 'semantic-ui-react'

import { MS_SERVICE_URL } from '@cudo/mf-core';

// import img4 from 'libs/shared-components/src/Burj-Khalifa.png';
const img4 = `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/Burj-Khalifa.png`;

// import img5 from 'libs/shared-components/src/edit.png';
const img5 = `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/edit.png`;

// import img1 from 'libs/shared-components/src/green_people.png';
const img1 = `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/green_people.png`;

// import img2 from 'libs/shared-components/src/online4.png';
const img2 = `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/online4.png`;

// import img3 from 'libs/shared-components/src/online3.png';
const img3 = `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/online3.png`;

// import img6 from 'libs/shared-components/src/online2.png';
const img6 = `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/online2.png`;

// import img7 from 'libs/shared-components/src/online1.png';
const img7 = `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/online1.png`;

// import img8 from 'libs/shared-components/src/Ellipse.png';
const img8 = `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/Ellipse.png`;

// import img9 from 'libs/shared-components/src/task_file.png';
const img9 = `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/task_file.png`;



/* eslint-disable-next-line */
export interface TabsProps { }

export function ProjectSetting(props: TabsProps) {

  const level1Panels = [
    { key: 'panel-1a', title: '1st floor', content: 'Create & edit tasks' },

  ]

  const Level1Content = (
    <div>
      <Accordion.Accordion panels={level1Panels} />
    </div>
  )



  const rootPanels = [
    { key: 'panel-1', title: 'General', content: { content: <a href=''>+ Add item</a> }, },
    { key: 'panel-2', title: 'Freehold Two Solar LLC', content: { content: <a href=''>+ Add item</a> } },
  ]
  const panes = [
    {
      menuItem: { key: 'Overview', icon: 'file alternate outline', content: 'Project Information' },
      render: () => <Tab.Pane attached={false}>

        <div className="ui-tabs">
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column >


                <div className="ui card" style={{ width: '100%' }}>
                  <div className="content">

                    <div className="description">



                      <Form>

                        <Grid columns={3}>
                          <Grid.Row>
                            <Grid.Column>
                              <Form.Field>
                                <img src={img4} />
                              </Form.Field>
                            </Grid.Column>

                            <Grid.Column>
                              <Form.Field className="field_left">
                                <span><strong>Burj Khalifa  </strong></span> <span><br />John & Co.</span> <span style={{ color: '#2D62ED' }}><br /> Estimate Cost: $5,000.00 - Total Cost: $5,000.00 </span>

                              </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                              <Form.Field>
                                <span className="summary"><button className="ui mini button edit_btn">  <img src={img5} /> Edit</button>
                                </span> </Form.Field>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Form>

                    </div>

                  </div>
                  <div>
                    <Table celled className="default_table">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Internal Project Number</Table.HeaderCell>
                          <Table.HeaderCell>Type of Building</Table.HeaderCell>
                          <Table.HeaderCell>Printing Company</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        <Table.Row>
                          <Table.Cell >Bern</Table.Cell>
                          <Table.Cell>8090</Table.Cell>
                          <Table.Cell>Switzerland</Table.Cell>
                        </Table.Row>


                      </Table.Body>
                    </Table>
                  </div>
                  <div>

                    <Table celled className="default_table">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>City</Table.HeaderCell>
                          <Table.HeaderCell>State Pin</Table.HeaderCell>
                          <Table.HeaderCell>Country</Table.HeaderCell>
                          <Table.HeaderCell>Address</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        <Table.Row>
                          <Table.Cell >Bern</Table.Cell>
                          <Table.Cell>8090</Table.Cell>
                          <Table.Cell>Switzerland</Table.Cell>
                          <Table.Cell> Müller Ltd, Mr R. Bürki Zollikerstrasse 788
8008 Zurich</Table.Cell>

                        </Table.Row>


                      </Table.Body>
                    </Table>

                  </div>
                  <div className="content" style={{ borderTop: 'none' }}>
                    <div className="data-built">

                      <p> The building utilizes wrapped glass facades on the east, north, and west both for aesthetics and to reduce the amount of reflective surface area on the south facade, which also features brushed Jura limestone. </p>
                    </div>
                    <div>
                      <br />
                      <p style={{ color: '#000' }}>Work Type</p>
                      <button className="ui mini button btn_work_type  ">Electrical Work</button>
                      <button className="ui mini button  btn_work_type">HVAC Work</button>

                    </div>
                  </div>

                </div>




              </Grid.Column>
              <Grid.Column>

                <div className="ui card" style={{ height: '426px', display: 'table-cell' }}>
                  <div className="content">

                    <div className="description"> <img src={img1} /> People (4)

                </div>


                  </div>
                  <div className="content">
                    <img src={img2} />
                    <img src={img3} />
                    <img src={img6} />
                    <img src={img7} />

                  </div>

                </div>



              </Grid.Column>

            </Grid.Row>
          </Grid>
        </div>


      </Tab.Pane>,
    },
    {
      menuItem: { key: 'Task', icon: 'tasks', content: 'Project Structure' },
      render: () => <Tab.Pane attached={false}>

        <div className="ui-tabs">



          <div className="ui card " style={{ width: '80%' }}>

            <Accordion className="widtharea" defaultActiveIndex={0} panels={rootPanels} styled  >


            </Accordion>



          </div>
          <div className="ui card " style={{ width: '80%' }}>

            <Accordion className="widtharea" defaultActiveIndex={0} panels={rootPanels} styled  >


            </Accordion>



          </div>

          <button style={{ width: '80%' }} className="ui large button btn-dashed  btn-large"><i className="ms-Icon ms-Icon--AddTo" aria-hidden="true"></i> Add Top Level  </button>
        </div>



      </Tab.Pane>,
    },
    {

      menuItem: { key: 'File Naming Structure', icon: 'file alternate outline', content: 'File Naming Structure' },
      render: () => <Tab.Pane attached={false}>


        <div className="ui-tabs">

          <h5 className="colorfile">File Name Structure</h5>



          <div className="ui card " style={{ width: '80%' }}>


            <div className="content">

              <Table>


                <Table.Body>
                  <Table.Row>
                    <Table.Cell >Position</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>2</Table.Cell>
                    <Table.Cell> 3</Table.Cell>
                    <Table.Cell> 4</Table.Cell>
                    <Table.Cell> 5</Table.Cell>
                    <Table.Cell> 6</Table.Cell>
                    <Table.Cell> 7</Table.Cell>
                    <Table.Cell> 8</Table.Cell>
                    <Table.Cell> 9</Table.Cell>
                    <Table.Cell> 10</Table.Cell>
                    <Table.Cell> 11</Table.Cell>
                    <Table.Cell> 12</Table.Cell>

                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="position">Position</Table.Cell>
                    <Table.Cell className="table_background">1</Table.Cell>
                    <Table.Cell className="table_background">3</Table.Cell>
                    <Table.Cell className="table_background"> 2</Table.Cell>
                    <Table.Cell className="table_background"> 0</Table.Cell>
                    <Table.Cell> .</Table.Cell>
                    <Table.Cell className="table_background"> 3</Table.Cell>
                    <Table.Cell className="table_background"> 1</Table.Cell>
                    <Table.Cell className="table_background"> 3</Table.Cell>
                    <Table.Cell> .</Table.Cell>
                    <Table.Cell className="table_background"> 3</Table.Cell>
                    <Table.Cell className="table_background"> 2</Table.Cell>
                    <Table.Cell className="table_background"> A</Table.Cell>

                  </Table.Row>

                </Table.Body>
              </Table>

            </div>

            <div className="content" style={{ borderTop: 'none' }}>
              <div className="data-built">

                <p><span className="mr-10 "> <img src={img8} /></span> <span className="mr-10 ">Pos.1 </span> <span className="mr-10 ">Internal Project Number</span>  </p>

                <p><span className="mr-10 "> <img src={img8} /></span> <span className="mr-10 ">Pos.6</span> <span className="mr-10 ">Phase Number</span>  </p>

                <p><span className="mr-10 "> <img src={img8} /></span> <span className="mr-10 ">Pos.7</span> <span className="mr-10 ">Type of Building </span>  </p>

                <p><span className="mr-10 "> <img src={img8} /></span> <span className="mr-10 ">Pos.8</span> <span className="mr-10 ">Sub-project Number</span>  </p>

                <p><span className="mr-10 "> <img src={img8} /></span> <span className="mr-10 ">Pos.10</span> <span className="mr-10 ">Level of the building</span>  </p>

                <p><span className="mr-10 "> <img src={img8} /></span> <span className="mr-10 ">Pos.11</span> <span className="mr-10 ">Document Type</span>  </p>

                <p><span className="mr-10 "> <img src={img8} /></span> <span className="mr-10 ">Pos.12 </span> <span className="mr-10 ">Increment value for the Document</span>  </p>

              </div>

            </div>

          </div>


        </div>




      </Tab.Pane>,
    },

  ]

  return (
    <div className="app-content-body-dash navbar-collapse bg-white-only" style={{ background: '#e6e6e6' }}>
      <div className="main-page-heading">
        <span className="preliminary-font">Project Setting</span>
      </div>

      <Tab className="ui-tabs" menu={{ secondary: true, pointing: true }} panes={panes} />

    </div>







  );
}

export default ProjectSetting;
