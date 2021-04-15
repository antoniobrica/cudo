import React from 'react';
import CreateTask from '../../app/components/create-task/create-task';

import { GET_TASKS, UPDATE_TASK } from '../../app/graphql/graphql';
import { useTaskQuery, useTaskUpdateMutation } from "../../app/services/useRequest";
import './tasks.module.scss';
import { TaskArea } from 'libs/shared-components/src/lib/components/task/taskarea';
import { MfAccountAppLib } from '@cudo/mf-account-app-lib';
import { LoaderPage } from "@cudo/shared-components"

import { ApolloCache, FetchResult } from '@apollo/client';
import { ITask, ITasks, TaskUpdateMutation } from '../../app/interfaces/task';
import { ModalAlert } from '@cudo/shared-components'
/* eslint-disable-next-line */
export interface TasksProps { }

export function Tasks(props: TasksProps) {
  const { loading, error, data } = useTaskQuery(GET_TASKS);
  const [open, setOpen] = React.useState(false);
  const [addTask] = useTaskUpdateMutation(UPDATE_TASK);
  const [taskData, setTaskData] = React.useState();
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [taskStatus, settaskStatus] = React.useState('');


  enum Status {
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
  }
  if (loading) return <h1> <LoaderPage /></h1>;
  if (error) return <h1>Something went wrong!</h1>;
  if (data) {
    console.log('tasks=>', data.tasks)
  }

  const cancel = () => {
    setOpen(false)
  }
  const confirmation = (data, task) => {
    setIsUpdate(data)
    setOpen(false)
    // updateTask(taskData);

    let status;
    if (task.status === 'COMPLETED') {
      status = Status.INPROGRESS
    }
    else {
      status = Status.COMPLETED
    }
    const taskID = task.taskID;
    addTask({
      variables: {
        taskID, status
      },
      update: (
        cache
      ) => {
        const cacheData = cache.readQuery({ query: GET_TASKS }) as ITasks;
        const newTask = cacheData.tasks.map(t => {
          if (t.taskID === taskID) {
            if (t.status === 'INPROGRESS') {
              return { ...t, status: Status.COMPLETED };
            }
            else {
              return { ...t, status: Status.INPROGRESS };
            }
          } else {
            return t;
          }
        });
        //    setOpen(false)
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasks: newTask
          }
        });
      }

    });

  }
  const updateTask = (task) => {
    setTaskData(task)
    setOpen(true)
    if (task.status === 'COMPLETED') {
      settaskStatus('Re-open')
    }
    else {
      settaskStatus('Mark as Complete')
    }

  }
  return (
    <div>
      <div style={{ marginLeft: 900 }} >
        <CreateTask />
      </div>
      {/* <MfAccountAppLib/> */}
      <br />
      {open ?
        <div style={{ marginLeft: 900 }} >
          <ModalAlert openAlertF={open} confirm={confirmation} taskData={taskData} taskStatus={taskStatus} cancel={cancel}></ModalAlert>
        </div>
        : null}
      <div className="TaskApp-container">
        <h3 style={{ color: "black" }}>All Tasks</h3>
        {data.tasks.map((task, id) => {
          return (
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
