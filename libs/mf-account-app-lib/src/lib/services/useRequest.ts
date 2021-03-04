import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { ICountries, ICountry, IUsers, } from "../interfaces/task";

export function useCountrykQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<ICountries>(gqlQuery);
  return { loading, error, data };
}


export function useUsersQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IUsers>(gqlQuery);
  return { loading, error, data };
}


