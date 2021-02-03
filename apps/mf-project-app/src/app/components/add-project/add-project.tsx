import React from 'react';

import './add-project.module.scss';
import { ADD_TODO, GET_TODOS } from "../../graphql/graphql";
import { ITodo, ITodoMutation, ITodos } from "../../interfaces/project";
import { useTodoMutation } from '../../services/useRequest';
import { ApolloCache, FetchResult } from '@apollo/client';
/* eslint-disable-next-line */
export interface AddProjectProps {}

export function AddProject(props: AddProjectProps) {
  const [formData, setFormData] = React.useState<ITodo | {}>();
  const [addTodo] = useTodoMutation(ADD_TODO);
  
  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value
    });
  };

  const handleSaveTodo = (
    e: React.FormEvent,
    { title, description }: ITodo | any
  ) => {
    e.preventDefault();
    addTodo({
      variables: { title, description },
      update: (
        cache: ApolloCache<ITodoMutation>,
        { data: { addTodo } }: FetchResult<ITodoMutation>
      ) => {
        const cacheData = cache.readQuery({ query: GET_TODOS }) as ITodos;
        cache.writeQuery({
          query: GET_TODOS,
          data: {
            getTodos: [...cacheData.getTodos, addTodo]
          }
        });
      }
    });
  };
  return (
    <form className="Form" onSubmit={(e) => handleSaveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor="name">Title</label>
          <input onChange={handleForm} type="text" id="title" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input onChange={handleForm} type="text" id="description" />
        </div>
      </div>
      <button>Add Project</button>
    </form>
  );
}

export default AddProject;
