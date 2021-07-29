import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { SessionMutation, ISession, ISessions, ISessionByID } from "../interfaces/session";
import { IInvitationMutation, IInvitation, IInvitations , IGetMeetingById } from "../interfaces/invitation";

// #region Session related
export function useSessionQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<ISessions>(gqlQuery, variable);
  return { loading, error, data };
}

export function useSessionMutation(gqlQuery: DocumentNode, variable) {
  const [addSession] = useMutation<SessionMutation>(gqlQuery, variable);
  return [addSession];
}

export function useSessionDetailQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<ISessionByID>(gqlQuery, variable);
  return { loading, error, data };
}
// #endregion

// #region Invitation
export function useInvitationQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<IInvitations>(gqlQuery, variable);
  return { loading, error, data };
}

export function useInvitationMutation(gqlQuery: DocumentNode, variable) {
  const [addInvitation] = useMutation<IInvitationMutation>(gqlQuery, variable);
  return [addInvitation];
}

export function useInvitationDetailQuery(gqlQuery: DocumentNode, variable) {
  const { loading, error, data } = useQuery<IGetMeetingById>(gqlQuery, variable);
  return { loading, error, data };
}
// #endregion