import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { ICountries, ICountry, } from "../interfaces/task";

export function useCountrykQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<ICountries>(gqlQuery);
  return { loading, error, data };
}

