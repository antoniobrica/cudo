import React from 'react';

import './project-info.module.scss';
import { GET_TODOS } from "../../graphql/graphql";
import { useTodoQuery } from "../../services/useRequest";
import AddProject from "../add-project/add-project";
import Project from "../project/project";
import { ITodo } from "../../interfaces/project"

/* eslint-disable-next-line */
export interface ProjectInfoProps {}

export function ProjectInfo(props: ProjectInfoProps) {
  const { loading, error, data } = useTodoQuery(GET_TODOS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong!</h1>;


  return (
    <div className="App">
    <h1>Projects</h1>
    <AddProject />
    {data.getTodos.map((todo: ITodo) => (
      <Project key={todo.id} todo={todo} />
    ))}
  </div>
  );
}

export default ProjectInfo;
