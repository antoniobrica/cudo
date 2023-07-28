import { DocumentNode, useQuery, useMutation, } from "@apollo/react-hooks";
import { IBkps, ICatagories, ICountries, ICountry, IFileStructures, IFileTypes, IFolderMutation, IFolders, IInvitations, Iphases, IProtocols, IStructures, IUsers, } from "../interfaces/task";

export function useCountrykQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<ICountries>(gqlQuery);
  return { loading, error, data };
}


export function useUsersQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IUsers>(gqlQuery);
  return { loading, error, data };
}

export function useBkpQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IBkps>(gqlQuery);
  return { loading, error, data };
}

export function useFolderQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IFolders>(gqlQuery);
  return { loading, error, data };
}

export function usePhaseQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<Iphases>(gqlQuery);
  return { loading, error, data };
}


export function useFileTypeQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IFileTypes>(gqlQuery);
  return { loading, error, data };
}

export function useMeetingCatagoriesQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<ICatagories>(gqlQuery);
  return { loading, error, data };
}

export function useProtocolQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IProtocols>(gqlQuery);
  return { loading, error, data };
}
export function useInvitationQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IInvitations>(gqlQuery);
  return { loading, error, data };
}
export function useFileStructureQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IFileStructures>(gqlQuery);
  return { loading, error, data };
}

export function useStructureQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IStructures>(gqlQuery);
  return { loading, error, data };
}

export function useAddFolderMutation(gqlQuery: DocumentNode) {
  const [addFolder] = useMutation<IFolderMutation>(gqlQuery);
  return [addFolder];
}
