import { DocumentNode, useQuery, useMutation } from '@apollo/client';
import { ITodos, TaskMutation, ITask, ITasks, TaskUpdateMutation } from '../interfaces/task';

export function useTaskQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<ITasks>(gqlQuery, variable);
  return { loading, error, data };
}

export function useTaskMutation(gqlQuery: DocumentNode, variable) {
  const [addTask] = useMutation<TaskMutation>(gqlQuery, variable);
  return [addTask];
}
export function useTaskUpdateMutation(gqlQuery: DocumentNode, variable) {
  const [updateTask] = useMutation<TaskUpdateMutation>(gqlQuery, variable);
  return [updateTask];
}
export function useTaskDeleteMutation(gqlQuery: DocumentNode, variable) {
  const [updateTask] = useMutation<TaskUpdateMutation>(gqlQuery, variable);
  return [updateTask];
}
