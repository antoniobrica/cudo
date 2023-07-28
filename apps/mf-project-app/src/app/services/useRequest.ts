import { DocumentNode, useQuery, useMutation } from "@apollo/client";
import { ITodos, ITodoMutation, ProjectMutation, IProject, IProjects, IWorkType, IWorkTypes, ICompanies, IBuildingTypes } from "../interfaces/project";

export function useTodoQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<ITodos>(gqlQuery);
  return { loading, error, data };
}
export function useProjectQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IProjects>(gqlQuery);
  return { loading, error, data };
}
export function useProjectByIdQuery(gqlQuery: DocumentNode) {
  const {loading, error, data } = useQuery<IProject>(gqlQuery);
  return { loading, error, data }; 
}
export function useWorkTypesQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IWorkTypes>(gqlQuery);
  return { loading, error, data };
}

export function useCompanyQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<ICompanies>(gqlQuery);
  return { loading, error, data };
}

export function useBuildingTypesQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IBuildingTypes>(gqlQuery);
  return { loading, error, data };
}


// export function useTodoMutation(gqlQuery: DocumentNode) {
//   const [addTodo] = useMutation<ITodoMutation>(gqlQuery);
//   return [addTodo];
// }

export function useProjectMutation(gqlQuery: DocumentNode) {
  const [addProject] = useMutation<ProjectMutation>(gqlQuery);
  return [addProject];
}