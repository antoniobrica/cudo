import { DocumentNode, useQuery, useMutation, } from "@apollo/react-hooks";
import { ICompanyWorkTypes } from "../interfaces/project";

export function useCompanyWorkTypeQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<ICompanyWorkTypes>(gqlQuery, variable);
  return { loading, error, data };
}
