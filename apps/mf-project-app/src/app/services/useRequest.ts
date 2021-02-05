import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { ITodos, ITodoMutation, ProjectMutation, IProject, IProjects } from "../interfaces/project";

export function useTodoQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<ITodos>(gqlQuery);
  return { loading, error, data };
}
export function useProjectQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IProjects>(gqlQuery);
  return { loading, error, data };
}

// export function useTodoMutation(gqlQuery: DocumentNode) {
//   const [addTodo] = useMutation<ITodoMutation>(gqlQuery);
//   return [addTodo];
// }

export function useProjectMutation(gqlQuery: DocumentNode){
  const [addProject] = useMutation<ProjectMutation>(gqlQuery);
  console.log('query==>',gqlQuery);
  return [addProject];
}