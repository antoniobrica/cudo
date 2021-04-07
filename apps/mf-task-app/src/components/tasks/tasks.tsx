import React from 'react';
import CreateTask from '../../app/components/create-task/create-task';

import { GET_TASKS, UPDATE_TASK } from '../../app/graphql/graphql';
import { useTaskQuery, useTaskUpdateMutation } from "../../app/services/useRequest";
import './tasks.module.scss';
import {TaskArea} from 'libs/shared-components/src/lib/components/task/taskarea';
import {MfAccountAppLib} from '@cudo/mf-account-app-lib';
import { LoaderPage } from "@cudo/shared-components"

  import { ApolloCache, FetchResult } from '@apollo/client';
import { ITask, ITasks, TaskUpdateMutation } from '../../app/interfaces/task';
/* eslint-disable-next-line */
export interface TasksProps {}

export function Tasks(props: TasksProps) {
  const { loading, error, data } = useTaskQuery(GET_TASKS);
  const [addTask] = useTaskUpdateMutation(UPDATE_TASK);
  const [taskData, setTaskData] = React.useState<ITasks>()

  enum Status {
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
}
  if (loading) return <h1> <LoaderPage /></h1>;
  if (error) return <h1>Something went wrong!</h1>;
  if(data){
    console.log('tasks=>', data.tasks)
  }
  // React.useEffect(() => {
  //   if (data) {
  //     setTaskData(data);
  //   }
  // }, [data]);
  // const [addTask] = useTaskUpdateMutation(UPDATE_TASK);

  const updateTask = (task, id)=>{
    let status ;
    if(task.status === 'COMPLETED'){
       status = Status.INPROGRESS
    }
else {
  status = Status.COMPLETED
}
    console.log('task-update--',status)
    const taskID= task.taskID;
    addTask({
      variables: {
        taskID, status
      },
      update: (
        cache,
        { data: { addTask } }: FetchResult<TaskUpdateMutation>
      ) => {
        const cacheData = cache.readQuery({ query: GET_TASKS}) as ITasks;
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            getTasks: [...cacheData.tasks, addTask]
          }
        });
      }
    });
  
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
             <TaskArea task={task} id={id} updateTask={updateTask}></TaskArea>
            </div>
          )
        })}
      </div>
      {/* <button className="ui large button btn-dashed  btn-large"><i className="ms-Icon ms-Icon--AddTo" aria-hidden="true"></i> Add new task    </button> */}
    </div>
  );
}

export default Tasks;
