import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Admin.css';
import { formatDate } from '../../utils/text';
import { resources } from './resourceConfig';

/**
 * Generic list screen. Which resource it shows comes from the :resource route
 * param, so /admin/sermons and /admin/leaders share this one component.
 */
const ResourceList = () => {
  const { resource: resourceKey } = useParams();
  const resource = resources[resourceKey];

  if (!resource) return <div className="error">Unknown section: {resourceKey}</div>;
  return <ResourceListView key={resource.key} resource={resource} />;
};

const ResourceListView = ({ resource }) => {
  const { data: items = [], isPending, error } = resource.useList();
  const remove = resource.useDelete();
  const [pendingDelete, setPendingDelete] = useState(null);

  const confirmDelete = () => {
    remove.mutate(pendingDelete.documentId, {
      onSettled: () => setPendingDelete(null),
    });
  };

  if (isPending) return <div className="loading">Loading {resource.label}…</div>;
  if (error) return <div className="error">{error.message}</div>;

  return (
    <>
      <div className="admin-page-head">
        <h1>{resource.label}</h1>
        <Link to={`${resource.basePath}/new`} className="admin-btn admin-btn-primary">
          New {resource.singular}
        </Link>
      </div>

      {remove.isError && (
        <div className="admin-alert admin-alert-error" role="alert">
          Could not delete: {remove.error.message}
        </div>
      )}

      {items.length === 0 ? (
        <div className="admin-card admin-empty">
          <p>No {resource.label.toLowerCase()} yet.</p>
          <Link to={`${resource.basePath}/new`} className="admin-btn admin-btn-primary">
            Add the first one
          </Link>
        </div>
      ) : (
        <div className="admin-card admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {resource.columns.map((column) => (
                  <th key={column.name}>{column.label}</th>
                ))}
                <th className="admin-actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.documentId}>
                  {resource.columns.map((column) => (
                    <td key={column.name}>
                      {column.name === 'date'
                        ? formatDate(item[column.name])
                        : (item[column.name] ?? '—')}
                    </td>
                  ))}
                  <td className="admin-actions-col">
                    <Link
                      to={`${resource.basePath}/${item.documentId}`}
                      className="admin-btn admin-btn-ghost"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      onClick={() => setPendingDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pendingDelete && (
        <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
          <div className="admin-card admin-modal">
            <h2>Delete this {resource.singular.toLowerCase()}?</h2>
            <p>
              <strong>{resource.describe(pendingDelete)}</strong> will be permanently
              removed. This cannot be undone.
            </p>
            <div className="admin-modal-actions">
              <button
                type="button"
                className="admin-btn admin-btn-ghost"
                onClick={() => setPendingDelete(null)}
                disabled={remove.isPending}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={confirmDelete}
                disabled={remove.isPending}
              >
                {remove.isPending ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResourceList;
