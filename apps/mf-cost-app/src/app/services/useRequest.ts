import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { ICosts } from "../interfaces/cost";


export function useCostQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<ICosts>(gqlQuery, variable);
  return { loading, error, data };
}

