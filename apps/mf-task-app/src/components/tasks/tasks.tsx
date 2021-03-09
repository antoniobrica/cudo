import React from 'react';
import CreateTask from '../../app/components/create-task/create-task';

import { GET_TASKS } from '../../app/graphql/graphql';
import { useTaskQuery } from "../../app/services/useRequest";
import './tasks.module.scss';
import ListExampleFloated from 'libs/shared-components/src/lib/components/task/taskarea';
import {MfAccountAppLib} from '@cudo/mf-account-app-lib';

/* eslint-disable-next-line */
export interface TasksProps {}

export function Tasks(props: TasksProps) {
  const { loading, error, data } = useTaskQuery(GET_TASKS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong!</h1>;
  if(data){
    console.log('tasks=>', data.tasks)
  }
  return (
    <div>
      <div style={{marginLeft:900}} >
      <CreateTask />
      </div>
    
      {/* <MfAccountAppLib/> */}
      <br/> 
      <div className="TaskApp-container">
      <h3 style={{color:"black"}}>All Tasks</h3>
        {data.tasks.map((task, id)=>{
          return(
            <div key={id}>
             <ListExampleFloated task={task}></ListExampleFloated>
            </div>
          )
        })}
      </div>
      {/* <button className="ui large button btn-dashed  btn-large"><i className="ms-Icon ms-Icon--AddTo" aria-hidden="true"></i> Add new task    </button> */}
    </div>
  );
}

export default Tasks;
