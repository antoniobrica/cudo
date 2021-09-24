import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { IComments } from "../interfaces/comment";
import { FileMutation, IFiles, IToken, IFileVersion } from "../interfaces/document";

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

export function useFileVersionQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<IFileVersion>(gqlQuery, variable);
  return { loading, error, data };
}

export function useCommentQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<IComments>(gqlQuery, variable);
  return { loading, error, data };
}