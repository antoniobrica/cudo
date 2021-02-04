import React from 'react';

import './add-project.module.scss';
import { ADD_TODO, GET_TODOS , ADD_PROJECT,GET_PROJECTS} from "../../graphql/graphql";
import { ITodo, ITodoMutation, ITodos,IProject, IProjects, ProjectMutation } from "../../interfaces/project";
import { useTodoMutation , useProjectMutation} from '../../services/useRequest';
import { ApolloCache, FetchResult } from '@apollo/client';
/* eslint-disable-next-line */
export interface AddProjectProps {
  close
}

export function AddProject(props: AddProjectProps) {
  const [formData, setFormData] = React.useState<IProject | {}>();
  // const [addTodo] = useTodoMutation(ADD_TODO);
  const [addProject] = useProjectMutation(ADD_PROJECT);
  
  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value
    });
  };

  const handleSaveTodo = (
    e: React.FormEvent,
    { projectName, projectNum,client }: IProject | any
  ) => {
    e.preventDefault();
    props.close();
    console.log('projectCreated==>',projectName, projectNum, client)
    addProject({
      variables: {projectName, projectNum, client },
      update: (
        cache: ApolloCache<ProjectMutation>,
        { data: { addProject } }: FetchResult<ProjectMutation>
      ) => {
        console.log('projectCreated successfully');
        const cacheData = cache.readQuery({ query: GET_PROJECTS }) as IProjects;
        cache.writeQuery({
          query: GET_PROJECTS,
          data: {
            getProjects: [...cacheData.getProjects, addProject]
          }
        });
      }
    });
  };
  return (
    <form className="Form" onSubmit={(e) => handleSaveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor="name">projectName</label>
          <input onChange={handleForm} type="text" id="projectName" />
        </div>
        <div>
          <label htmlFor="projectNum">projectNum</label>
          <input onChange={handleForm} type="number" id="projectNum" />
        </div>
        <div>
          <label htmlFor="client">client</label>
          <input onChange={handleForm} type="text" id="client" />
        </div>
      </div>
      <button>Add Project</button>
    </form>
  );
}

export default AddProject;
