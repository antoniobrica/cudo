import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { SessionMutation, ISession, ISessions } from "../interfaces/session";
import { IInvitationMutation, IInvitation, IInvitations  } from "../interfaces/invitation";

export function useSessionQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<ISessions>(gqlQuery, variable);
  return { loading, error, data };
}

export function useSessionMutation(gqlQuery: DocumentNode, variable) {
  const [addSession] = useMutation<SessionMutation>(gqlQuery, variable);
  return [addSession];
}

export function useInvitationQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<IInvitations>(gqlQuery, variable);
  return { loading, error, data };
}

export function useInvitationMutation(gqlQuery: DocumentNode, variable) {
  const [addInvitation] = useMutation<IInvitationMutation>(gqlQuery, variable);
  return [addInvitation];
}

export function useSessionDetailQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<ISession>(gqlQuery, variable);
  return { loading, error, data };
}