import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { FileMutation, IFiles, IToken } from "../interfaces/document";

export function useTokenQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IToken>(gqlQuery);
  return { loading, error, data };
}

export function useFileQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<IFiles>(gqlQuery, variable);
  return { loading, error, data };
}

export function useFileMutation(gqlQuery: DocumentNode){
  const [addFile] = useMutation<FileMutation>(gqlQuery);
  return [addFile];
}