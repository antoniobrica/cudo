import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { IMileStones, MilestoneMutation } from "../interfaces/task";

export function useMilestonesQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IMileStones>(gqlQuery);
  return { loading, error, data };
}

export function useMilestoneMutation(gqlQuery: DocumentNode){
  const [addFile] = useMutation<MilestoneMutation>(gqlQuery);
  return [addFile];
}