import React, { useEffect } from 'react';

import  './project-info.module.scss';
import { GET_TODOS, GET_PROJECTS } from "../../graphql/graphql";
import { useTodoQuery, useProjectQuery } from "../../services/useRequest";
import AddProject from "../add-project/add-project";
import Project from "../project/project";
import { ITodo, IProject } from "../../interfaces/project"; 
import { Button, Header, Segment, Icon } from 'semantic-ui-react';
import Modal from 'react-modal';



/* eslint-disable-next-line */
export interface ProjectInfoProps {}

export function ProjectInfo(props: ProjectInfoProps) {
  const customStyles = {
    content : {
      //top                   : '50%',
      left                  : '50%',
      right                 : 0,
      bottom                : 'auto',
    //  marginRight           : '-50%',
      //transform             : 'translate(-50%, -50%)'
    }
  };
  
  
  // const { loading, error, data } = useTodoQuery(GET_TODOS);
  const { loading, error, data } = useProjectQuery(GET_PROJECTS);
  const [openForm, setopenForm] = React.useState(false);
  const [modalIsOpen,setIsOpen] = React.useState(false);


  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong!</h1>;

  const addProject =()=>{
    console.log('add=project')
    setopenForm(!openForm);
  }
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  // Modal.setAppElement('#yourAppElement')
  const reload=()=>window.location.reload();
  function closeModal(){
    console.log('close-modal-called')
    setIsOpen(false);
    reload();
  }
   return (
    <div className="App">
    <h1>Projects</h1>
    {/* <button onClick={addProject}>Add Project</button> */}
    <div>
    <Button size='mini' className="grey-btn" onClick={openModal}>Add Project</Button>
        {/* <button onClick={openModal}>Open Modal</button> */}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
          <button onClick={closeModal}>close</button>
          <div>
           Add new Project
          </div>
          <AddProject close={closeModal} />
        </Modal>
      </div>

    {/* {openForm?<AddProject />:null} */}
    
    <div style={{flexDirection:'row',display: 'flex'}}>
    {data.getProjects.map((todo: IProject) => (
      <Project key={todo.projectId} todo={todo} />
    ))}
     </div>
  </div>
  );
}

export default ProjectInfo;
