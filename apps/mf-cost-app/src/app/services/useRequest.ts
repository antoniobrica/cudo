import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { ICosts } from "../interfaces/cost";


export function useCostQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<ICosts>(gqlQuery);
  return { loading, error, data };
}

