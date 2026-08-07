import { useQuery } from '@tanstack/react-query';
import { aboutUsApi, leadersApi, sermonsApi } from '../api';

/**
 * Query keys live in one place so mutations can invalidate precisely.
 * Keys are hierarchical: invalidating ['sermons'] refetches every sermon
 * query, while ['sermons', 'detail', id] targets a single entry.
 */
export const queryKeys = {
  sermons: {
    all: ['sermons'],
    list: () => ['sermons', 'list'],
    detail: (documentId) => ['sermons', 'detail', documentId],
  },
  leaders: {
    all: ['leaders'],
    list: () => ['leaders', 'list'],
    detail: (documentId) => ['leaders', 'detail', documentId],
  },
  aboutUs: ['about-us'],
};

/** All sermons, newest first. Sorting happens in Strapi, not the browser. */
export function useSermons() {
  return useQuery({
    queryKey: queryKeys.sermons.list(),
    queryFn: () => sermonsApi.list({ populate: '*', sort: 'date:desc' }),
    select: (result) => result.items,
  });
}

/** The single most recent sermon, for the home page. */
export function useLatestSermon() {
  return useQuery({
    queryKey: [...queryKeys.sermons.list(), { limit: 1 }],
    queryFn: () =>
      sermonsApi.list({
        populate: '*',
        sort: 'date:desc',
        'pagination[limit]': 1,
      }),
    select: (result) => result.items[0] ?? null,
  });
}

export function useSermon(documentId) {
  return useQuery({
    queryKey: queryKeys.sermons.detail(documentId),
    queryFn: () => sermonsApi.get(documentId, { populate: '*' }),
    enabled: Boolean(documentId),
  });
}

/** Leaders ordered by their `order` field, falling back to name. */
export function useLeaders() {
  return useQuery({
    queryKey: queryKeys.leaders.list(),
    queryFn: () => leadersApi.list({ populate: '*', sort: ['order:asc', 'name:asc'] }),
    select: (result) => result.items,
  });
}

export function useLeader(documentId) {
  return useQuery({
    queryKey: queryKeys.leaders.detail(documentId),
    queryFn: () => leadersApi.get(documentId, { populate: '*' }),
    enabled: Boolean(documentId),
  });
}

export function useAboutUs() {
  return useQuery({
    queryKey: queryKeys.aboutUs,
    queryFn: () => aboutUsApi.get({ populate: '*' }),
  });
}
