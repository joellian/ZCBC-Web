import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337/api';

/* -------------------------------------------------------------------------
   Token storage
   Kept in localStorage so an admin session survives a refresh. Exported so
   the auth context is the only thing that writes it.
   ------------------------------------------------------------------------- */
const TOKEN_KEY = 'zcbc.jwt';

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

/** Fired when the API rejects our token, so AuthProvider can drop the session. */
export const UNAUTHORIZED_EVENT = 'zcbc:unauthorized';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Strapi errors arrive as { error: { status, name, message, details } }.
 * Flatten them to a normal Error so callers never have to dig through
 * error.response.data.error.message.
 */
function normalizeError(error) {
  const strapiError = error.response?.data?.error;
  const normalized = new Error(
    strapiError?.message || error.message || 'Something went wrong'
  );
  normalized.status = error.response?.status;
  normalized.details = strapiError?.details;
  return normalized;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStorage.clear();
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }
    return Promise.reject(normalizeError(error));
  }
);

/* -------------------------------------------------------------------------
   Resource factories

   These translate Strapi's response envelope ({ data, meta }) into plain
   values, so no component ever has to know about it. Note that Strapi 5
   addresses single entries by `documentId`, not the numeric `id`.
   ------------------------------------------------------------------------- */

/** A Strapi collection type: full CRUD. */
const collection = (name) => ({
  list: (params) =>
    api.get(`/${name}`, { params }).then((res) => ({
      items: res.data?.data ?? [],
      meta: res.data?.meta ?? {},
    })),

  get: (documentId, params) =>
    api.get(`/${name}/${documentId}`, { params }).then((res) => res.data?.data ?? null),

  create: (data) => api.post(`/${name}`, { data }).then((res) => res.data?.data),

  update: (documentId, data) =>
    api.put(`/${name}/${documentId}`, { data }).then((res) => res.data?.data),

  remove: (documentId) => api.delete(`/${name}/${documentId}`).then(() => documentId),
});

/** A Strapi single type: one entry, no id. */
const single = (name) => ({
  get: (params) => api.get(`/${name}`, { params }).then((res) => res.data?.data ?? null),
  update: (data) => api.put(`/${name}`, { data }).then((res) => res.data?.data),
});

export const sermonsApi = collection('sermons');
export const leadersApi = collection('leaders');
export const contactsApi = collection('contacts');
export const aboutUsApi = single('aboutus');

/* -------------------------------------------------------------------------
   Auth (Strapi users-permissions)
   These endpoints return { jwt, user } at the top level — no data envelope.
   ------------------------------------------------------------------------- */
export const authApi = {
  login: (identifier, password) =>
    api.post('/auth/local', { identifier, password }).then((res) => res.data),
  me: () => api.get('/users/me').then((res) => res.data),
};

export default api;
