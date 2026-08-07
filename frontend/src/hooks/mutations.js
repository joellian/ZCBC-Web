import { useMutation, useQueryClient } from '@tanstack/react-query';
import { contactsApi, leadersApi, sermonsApi } from '../api';
import { queryKeys } from './queries';

/**
 * Build the create/update/delete hooks for a resource. Every mutation
 * invalidates that resource's key, so lists refresh themselves — this is the
 * thing the old useFetch hook could not do.
 */
function crudMutations(resourceApi, keys) {
  const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => resourceApi.create(data),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
    });
  };

  const useUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ documentId, data }) => resourceApi.update(documentId, data),
      onSuccess: (_result, { documentId }) => {
        queryClient.invalidateQueries({ queryKey: keys.all });
        queryClient.invalidateQueries({ queryKey: keys.detail(documentId) });
      },
    });
  };

  const useRemove = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (documentId) => resourceApi.remove(documentId),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
    });
  };

  return { useCreate, useUpdate, useRemove };
}

const sermonMutations = crudMutations(sermonsApi, queryKeys.sermons);
export const useCreateSermon = sermonMutations.useCreate;
export const useUpdateSermon = sermonMutations.useUpdate;
export const useDeleteSermon = sermonMutations.useRemove;

const leaderMutations = crudMutations(leadersApi, queryKeys.leaders);
export const useCreateLeader = leaderMutations.useCreate;
export const useUpdateLeader = leaderMutations.useUpdate;
export const useDeleteLeader = leaderMutations.useRemove;

/** Public contact form. No cache to invalidate — visitors never read contacts. */
export function useSubmitContact() {
  return useMutation({
    mutationFn: (formData) => contactsApi.create(formData),
  });
}
