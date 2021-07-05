import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { SessionMutation, ISession, ISessions } from "../interfaces/meeting";

export function useSessionQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<ISessions>(gqlQuery, variable);
  return { loading, error, data };
}

export function useSessionMutation(gqlQuery: DocumentNode, variable) {
  const [addSession] = useMutation<SessionMutation>(gqlQuery, variable);
  return [addSession];
}

