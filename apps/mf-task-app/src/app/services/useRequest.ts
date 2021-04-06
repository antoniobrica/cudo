import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { ITodos, TaskMutation, ITask, ITasks, TaskUpdateMutation } from "../interfaces/task";

export function useTaskQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<ITasks>(gqlQuery);
  return { loading, error, data };
}


export function useTaskMutation(gqlQuery: DocumentNode){
  const [addTask] = useMutation<TaskMutation>(gqlQuery);
  return [addTask];
}
export function useTaskUpdateMutation(gqlQuery: DocumentNode){
  const [updateTask] = useMutation<TaskUpdateMutation>(gqlQuery);
  return [updateTask];
}