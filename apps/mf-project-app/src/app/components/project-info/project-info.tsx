import React, { useEffect } from 'react';

import './project-info.module.scss';
import { GET_TODOS, GET_PROJECTS } from "../../graphql/graphql";
import { useTodoQuery, useProjectQuery } from "../../services/useRequest";
import { ITodo, IProject } from "../../interfaces/project";
import Modal from 'react-modal';
import { Card, Icon, Form, Grid, Button, Dropdown, Label } from 'semantic-ui-react'
import { useHistory } from "react-router";
import { LoaderPage } from "@cudo/shared-components"
import ReactQuill, { Quill } from 'react-quill';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//import ModalExampleModal from 'libs/shared-components/src/lib/components/modal/modal';

import ModalExampleModal from '../modal/modal'
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
export interface ProjectInfoProps { }

export function ProjectInfo(props: ProjectInfoProps) {
  const notify = () => toast("This is Warning Message");
  const { loading, error, data } = useProjectQuery(GET_PROJECTS);
  const [openForm, setopenForm] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const history = useHistory();
  if (loading) return <LoaderPage />;

  const addProject = () => {
    setopenForm(!openForm);
  }

  const openTask = (project) => {
    console.log('task open==>', history)
    history.push(`/home/project/${project.projectId}`);
  }
  function openModal() {
    setIsOpen(true);
  }
  const refresh = (data) => {
    console.log('refresh is called', data);


  }

  if (error) return (
    <div style={{ marginLeft: 900 }} >
      <ModalExampleModal onSuccess={refresh}></ModalExampleModal>
    </div>
  );
  return (
    <div>
      {/* <h1>Projects</h1> */}
      {/* <div>
        <ModalExampleModal onSuccess={refresh}></ModalExampleModal>
      </div> */}

      <div className="app-content-body body_cards_area project-listing-page">
        <div className="dashboard-header">
          <h3>All Projects <span className="total">Total {data.projects.length} project added</span></h3>
          
          <div>
              <button onClick={notify}>Warning Notify!</button>
              <ToastContainer className="success" position="top-right" autoClose={90000} hideProgressBar={false} closeOnClick pauseOnFocusLoss pauseOnHover />
          </div>
          {/* <div className="add-project-area"> */}
          {/* <Button size='small' className="primary"><i className="ms-Icon ms-font-xl ms-Icon--Add ms-fontColor-themePrimary"></i> Add New</Button> */}
          <ModalExampleModal onSuccess={refresh}></ModalExampleModal>
          {/* </div> */}
        </div>

        <Form>
          {/* <Grid>

            <Grid.Row>
              {data.projects.map((project: IProject, i) => (
                <Grid.Column className="card-margin" key={i} onClick={() => openTask(project)}>
                  <Card>
                    <div className="ui card">
                      <div className="content">
                        <div className="description"><img src="" alt="Logo"></img>
                          <span className="summary"><span className="dot">...</span>
                          </span>
                        </div>
                        {project.projectName ? <div className="header font-header">
                          {project.projectName}</div> : <div className="header font-header">
                          NA</div>}

                        {project.client ? <div className="description">{project.client}</div> :
                          <div className="description">NA</div>}

                        <div className="data-built">Type of building
            <span className="summary">{project.buildingType}

                          </span>
                        </div>

                         <div className="data-built">Level of building
            <span className="summary">3rd
                
                </span>
            </div> 

                      </div>
                      <div className="content">
                        <div className="data-built">
                          {project.description ?
                            <p>{project.description}
                            </p> :
                            <p>NA</p>}

                        </div>
                        <div className="event">
                          <div className="label-green label-spacer">
                            <span className="white-text">AB</span>
                          </div>
                          <div className="label-purple label-spacer">
                            <span className="white-text ">RJ</span>
                          </div>
                          <div className="label-blue label-spacer">
                            <span className="white-text">JB</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </Card>

                </Grid.Column>
              ))}
            </Grid.Row>

          </Grid> */}


          <div className="project-listing-cards">
            <ul>
              {data?.projects?.map((project: IProject, i) => {
                const { projectName, client, buildingType, description } = project
                // const shortDescription = description.length > 94 ? description.substring(0, 94) + '...' : description
                return (
                  <li key={i} >
                    <div className="project-logo-action">
                      <div className="project-logo">
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default-logo.png`} alt="Logo" />
                      </div>

                      <div className="project-action">
                        <div className="symbol symbol-30 d-flex">
                          <span className="dropdown-action">
                            <Dropdown icon='ellipsis horizontal' floating labeled>
                              <Dropdown.Menu className="dropdowncomplete">
                                <Dropdown.Item icon='setting' text='Manage project' />
                                <Dropdown.Item icon='tasks' text='View activity' />
                                <Dropdown.Item icon='archive' text='Archive' />
                                <Dropdown.Item icon='trash alternate outline' text='Delete' />
                              </Dropdown.Menu>
                            </Dropdown>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="project-name">
                      <h4 onClick={() => openTask(project)}>{projectName ? projectName : 'NA'} <span>{client ? client : 'NA'}</span></h4>
                    </div>

                    <div className="project-info">
                      <p>Type of building <span>{buildingType}</span></p>
                      {/* <p>Level of building <span>3rd</span></p> */}
                    </div>

                    <div className="project-description">
                      {/* <p>{shortDescription ? shortDescription : 'NA'}</p> */}
                      <p><ReactQuill id="txtDescription" readOnly={true} value={description} modules={{ toolbar: null }} /></p>
                      {/* <div className="project-members">
                        <Label circular color="orange">AK</Label>
                        <Label circular color="violet">AM</Label>
                        <Label circular color="brown">VN</Label>
                      </div> */}
                    </div>
                  </li>
                )
              }
              )}
              {/* <li>
                <div className="project-logo-action">
                  <div className="project-logo">
                    <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default-logo.png`} alt="Logo" />
                  </div>

                  <div className="project-action">
                    <Dropdown icon='ellipsis horizontal' pointing='right'>
                      <Dropdown.Menu className="dropdowncomplete">
                        <Dropdown.Item icon='setting' text='Manage project' />
                        <Dropdown.Item icon='tasks' text='View activity' />
                        <Dropdown.Item icon='archive' text='Archive' />
                        <Dropdown.Item icon='trash alternate outline' text='Delete' />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                <div className="project-name">
                  <h4>Burj Khalifa <span>John & co.</span></h4>
                </div>

                <div className="project-info">
                  <p>Type of building <span>Residential Buildings</span></p>
                  <p>Level of building <span>3rd</span></p>
                </div>

                <div className="project-description">
                  <p>This is description will be show sunt in culpa qui officia deserunt mollit anim id est laborum...</p>
                  <div className="project-members">
                    <Label circular color="orange">AK</Label>
                    <Label circular color="violet">AM</Label>
                    <Label circular color="brown">VN</Label>
                  </div>
                </div>
              </li>

              <li>
                <div className="project-logo-action">
                  <div className="project-logo">
                    <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default-logo.png`} alt="Logo" />
                  </div>

                  <div className="project-action">
                    <Dropdown icon='ellipsis horizontal' pointing='right'>
                      <Dropdown.Menu className="dropdowncomplete">
                        <Dropdown.Item icon='setting' text='Manage project' />
                        <Dropdown.Item icon='tasks' text='View activity' />
                        <Dropdown.Item icon='archive' text='Archive' />
                        <Dropdown.Item icon='trash alternate outline' text='Delete' />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                <div className="project-name">
                  <h4>Burj Khalifa <span>John & co.</span></h4>
                </div>

                <div className="project-info">
                  <p>Type of building <span>Residential Buildings</span></p>
                  <p>Level of building <span>3rd</span></p>
                </div>

                <div className="project-description">
                  <p>This is description will be show sunt in culpa qui officia deserunt mollit anim id est laborum...</p>
                  <div className="project-members">
                    <Label circular color="orange">AK</Label>
                    <Label circular color="violet">AM</Label>
                    <Label circular color="brown">VN</Label>
                  </div>
                </div>
              </li> */}
            </ul>
          </div>

        </Form>

      </div>


      <div style={{ flexDirection: 'row', display: 'flex', flexWrap: "wrap" }}>
        {/* {data.getProjects.map((project: IProject) => (
      <Project key={project.projectId} project={project} />
    ))} */}
      </div>
    </div>
  );
}

export default ProjectInfo;
