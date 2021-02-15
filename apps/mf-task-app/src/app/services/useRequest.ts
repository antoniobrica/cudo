import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { ITodos, ITodoMutation, ProjectMutation, IProject, IProjects } from "../interfaces/project";

export function useProjectQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IProjects>(gqlQuery);
  return { loading, error, data };
}


export function useProjectMutation(gqlQuery: DocumentNode){
  const [addProject] = useMutation<ProjectMutation>(gqlQuery);
  return [addProject];
}