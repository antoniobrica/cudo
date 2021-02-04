import React from 'react';

import  './project-info.module.scss';
import { GET_TODOS } from "../../graphql/graphql";
import { useTodoQuery } from "../../services/useRequest";
import AddProject from "../add-project/add-project";
import Project from "../project/project";
import { ITodo } from "../../interfaces/project"; 
import { Button, Header, Segment, Icon } from 'semantic-ui-react';

/* eslint-disable-next-line */
export interface ProjectInfoProps {}

export function ProjectInfo(props: ProjectInfoProps) {
  const { loading, error, data } = useTodoQuery(GET_TODOS);
  const [openForm, setopenForm] = React.useState(false);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong!</h1>;

  const addProject =()=>{
    console.log('add=project')
    setopenForm(!openForm);
  }

  return (
    <div className="App">
    <h1>Projects</h1>
    <Button size='mini' className="grey-btn"onClick={addProject}>Add Project</Button>
    {/* <button onClick={addProject}>Add Project</button> */}
    {openForm?<AddProject />:null}
    
    <div style={{flexDirection:'row',display: 'flex'}}>
    {data.getTodos.map((todo: ITodo) => (
      <Project key={todo.id} todo={todo} />
    ))}
     </div>
  </div>
  );
}

export default ProjectInfo;
