import React from 'react';
import CreateTask from '../../app/components/create-task/create-task';

import { GET_TASKS } from '../../app/graphql/graphql';
import { useTaskQuery } from "../../app/services/useRequest";
import './tasks.module.scss';

/* eslint-disable-next-line */
export interface TasksProps {}

export function Tasks(props: TasksProps) {
  const { loading, error, data } = useTaskQuery(GET_TASKS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong!</h1>;
  if(data){
    console.log('tasks=>', data.tasks)
  }
//   React.useEffect(() => {
//     if(data){
//  console.log('tasks', data.tasks)
//     }
//   }, [data]);
  return (
    <div>
      <CreateTask />
      <div>
        {data.tasks.map((task, id)=>{
          return(
            <h2>{task.taskTitle}</h2>
          )
        })}
      </div>
    </div>
  );
}

export default Tasks;
