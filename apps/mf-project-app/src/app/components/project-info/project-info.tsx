import React, { useEffect } from 'react';

import './project-info.module.scss';
import { GET_TODOS, GET_PROJECTS } from "../../graphql/graphql";
import { useTodoQuery, useProjectQuery } from "../../services/useRequest";
import { ITodo, IProject } from "../../interfaces/project";
import Modal from 'react-modal';
import { Card, Icon, Form, Grid } from 'semantic-ui-react'
import { useHistory } from "react-router";
import '../../../../../../libs/shared-components/src/style/index.scss';
import { LoaderPage } from "@cudo/shared-components"

//import ModalExampleModal from 'libs/shared-components/src/lib/components/modal/modal';

import ModalExampleModal from '../modal/modal'

/* eslint-disable-next-line */
export interface ProjectInfoProps { }

export function ProjectInfo(props: ProjectInfoProps) {
  const { loading, error, data } = useProjectQuery(GET_PROJECTS);
  const [openForm, setopenForm] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const history = useHistory();
  if (loading) return <LoaderPage />;
  if (error) return <h1>Something went wrong!</h1>;

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
  const refresh =(data)=>{
    console.log('refresh is called', data); 

    
  }
  return (
    <div>
      {/* <h1>Projects</h1> */}
      <div>
        <ModalExampleModal onSuccess={refresh}></ModalExampleModal>
      </div>

      <div className="app-content-body body_cards_area">
        <div>
          <h2 className="project">All Projects</h2>
          <span className="total">Total {data.projects.length} project added</span>
        </div>

        <Form>
          <Grid columns={4}>

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

                        {/* <div className="data-built">Level of building
            <span className="summary">3rd
                
                </span>
            </div> */}

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

          </Grid>

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
