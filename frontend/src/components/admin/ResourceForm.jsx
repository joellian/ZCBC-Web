import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Admin.css';
import { extractText } from '../../utils/text';
import { resources } from './resourceConfig';

/**
 * Strapi `blocks` fields expect a rich-text document, not a string. The admin
 * form edits plain text, so we convert at the boundary in both directions.
 */
const textToBlocks = (text) =>
  text?.trim() ? [{ type: 'paragraph', children: [{ type: 'text', text }] }] : null;

/** Build the form's initial values from an existing entry (or blanks). */
function toFormValues(fields, entry) {
  return Object.fromEntries(
    fields.map((field) => {
      const raw = entry?.[field.name];
      if (field.type === 'blocks') return [field.name, extractText(raw)];
      return [field.name, raw ?? ''];
    })
  );
}

/** Convert form values back into the payload Strapi expects. */
function toPayload(fields, values) {
  return Object.fromEntries(
    fields.map((field) => {
      const value = values[field.name];
      if (field.type === 'blocks') return [field.name, textToBlocks(value)];
      if (field.type === 'number')
        return [field.name, value === '' ? null : Number(value)];
      return [field.name, value === '' ? null : value];
    })
  );
}

const ResourceForm = () => {
  const { resource: resourceKey, documentId } = useParams();
  const resource = resources[resourceKey];

  if (!resource) return <div className="error">Unknown section: {resourceKey}</div>;
  // Remount when switching between entries so state resets cleanly.
  return (
    <ResourceFormView
      key={`${resource.key}:${documentId ?? 'new'}`}
      resource={resource}
      documentId={documentId}
    />
  );
};

const ResourceFormView = ({ resource, documentId }) => {
  const isEdit = Boolean(documentId);
  const navigate = useNavigate();

  const { data: entry, isPending: isLoadingEntry } = resource.useOne(documentId);
  const create = resource.useCreate();
  const update = resource.useUpdate();
  const save = isEdit ? update : create;

  const [values, setValues] = useState(() => toFormValues(resource.fields, null));

  // Populate once the existing entry arrives.
  useEffect(() => {
    if (entry) setValues(toFormValues(resource.fields, entry));
  }, [entry, resource.fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = toPayload(resource.fields, values);
    const options = { onSuccess: () => navigate(resource.basePath) };

    if (isEdit) update.mutate({ documentId, data }, options);
    else create.mutate(data, options);
  };

  if (isEdit && isLoadingEntry) return <div className="loading">Loading…</div>;

  return (
    <>
      <div className="admin-page-head">
        <h1>
          {isEdit ? 'Edit' : 'New'} {resource.singular}
        </h1>
        <Link to={resource.basePath} className="admin-btn admin-btn-ghost">
          Back to {resource.label}
        </Link>
      </div>

      {save.isError && (
        <div className="admin-alert admin-alert-error" role="alert">
          Could not save: {save.error.message}
        </div>
      )}

      <form className="admin-card admin-form" onSubmit={handleSubmit}>
        {resource.fields.map((field) => (
          <div className="admin-field" key={field.name}>
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span aria-hidden="true"> *</span>}
            </label>

            {field.type === 'blocks' || field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                rows={5}
                value={values[field.name] ?? ''}
                onChange={handleChange}
                required={field.required}
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={values[field.name] ?? ''}
                onChange={handleChange}
                required={field.required}
              />
            )}

            {field.hint && <small className="admin-muted">{field.hint}</small>}
          </div>
        ))}

        <div className="admin-form-actions">
          <Link to={resource.basePath} className="admin-btn admin-btn-ghost">
            Cancel
          </Link>
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={save.isPending}
          >
            {save.isPending ? 'Saving…' : `Save ${resource.singular}`}
          </button>
        </div>

        <p className="admin-muted admin-form-note">
          Images are managed in the Strapi admin panel — this form covers text fields
          only.
        </p>
      </form>
    </>
  );
};

export default ResourceForm;
