import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { IMileStoneModel, IMileStones, MilestoneMutation, TaskUpdateMutation } from "../interfaces/task";

export function useMilestonesQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IMileStones>(gqlQuery);
  return { loading, error, data };
}

export function useMilestoneMutation(gqlQuery: DocumentNode) {
  const [addFile] = useMutation<MilestoneMutation>(gqlQuery);
  return [addFile];
}
export function useIMileStoneQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<IMileStoneModel>(gqlQuery, variable);
  return { loading, error, data };
}

export function useMilestoneDeleteMutation(gqlQuery: DocumentNode, variable) {
  const [updateTask] = useMutation<MilestoneMutation>(gqlQuery, variable);
  return [updateTask];
}
export function useMilestoneUpdateMutation(gqlQuery: DocumentNode, variable) {
  const [updateMileStone] = useMutation<MilestoneMutation>(gqlQuery, variable);
  return [updateMileStone];
}

export function useTaskUpdateMutation(gqlQuery: DocumentNode, variable) {
  const [updateTask] = useMutation<TaskUpdateMutation>(gqlQuery, variable);
  return [updateTask];
}
export function useTaskDeleteMutation(gqlQuery: DocumentNode, variable) {
  const [updateTask] = useMutation<TaskUpdateMutation>(gqlQuery, variable);
  return [updateTask];
}