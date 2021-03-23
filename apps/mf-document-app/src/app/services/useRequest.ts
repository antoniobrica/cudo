import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { IToken } from "../interfaces/document";

export function useTokenQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IToken>(gqlQuery);
  return { loading, error, data };
}


// export function useTaskMutation(gqlQuery: DocumentNode){
//   const [addTask] = useMutation<TaskMutation>(gqlQuery);
//   return [addTask];
// }