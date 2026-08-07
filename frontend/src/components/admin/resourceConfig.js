import {
  useCreateLeader,
  useCreateSermon,
  useDeleteLeader,
  useDeleteSermon,
  useUpdateLeader,
  useUpdateSermon,
} from '../../hooks/mutations';
import { useLeader, useLeaders, useSermon, useSermons } from '../../hooks/queries';

/**
 * Describes each editable content type once. The admin list and form screens
 * are generic and read everything they need from here, so adding a third
 * resource means adding an entry below — not another pair of screens.
 *
 * Field types:
 *   text | textarea | date | number | url | email  → plain values
 *   blocks → Strapi rich text; converted to/from plain text on the boundary
 */
export const resources = {
  sermons: {
    key: 'sermons',
    label: 'Sermons',
    singular: 'Sermon',
    basePath: '/admin/sermons',
    useList: useSermons,
    useOne: useSermon,
    useCreate: useCreateSermon,
    useUpdate: useUpdateSermon,
    useDelete: useDeleteSermon,
    /** Columns shown in the list table. */
    columns: [
      { name: 'title', label: 'Title' },
      { name: 'speaker', label: 'Speaker' },
      { name: 'date', label: 'Date' },
      { name: 'series', label: 'Series' },
    ],
    /** How to describe a row in the delete confirmation. */
    describe: (item) => item.title,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'speaker', label: 'Speaker', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'series', label: 'Series', type: 'text' },
      { name: 'scripture', label: 'Scripture', type: 'text' },
      {
        name: 'video_url',
        label: 'Video URL',
        type: 'url',
        hint: 'Link to the YouTube video',
      },
      { name: 'audio_url', label: 'Audio URL', type: 'url' },
      { name: 'description', label: 'Description', type: 'blocks' },
    ],
  },

  leaders: {
    key: 'leaders',
    label: 'Leaders',
    singular: 'Leader',
    basePath: '/admin/leaders',
    useList: useLeaders,
    useOne: useLeader,
    useCreate: useCreateLeader,
    useUpdate: useUpdateLeader,
    useDelete: useDeleteLeader,
    columns: [
      { name: 'name', label: 'Name' },
      { name: 'title', label: 'Title' },
      { name: 'department', label: 'Department' },
      { name: 'order', label: 'Order' },
    ],
    describe: (item) => item.name,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      {
        name: 'department',
        label: 'Department',
        type: 'text',
        required: true,
        hint: 'Leaders are grouped by this on the About Us page',
      },
      {
        name: 'order',
        label: 'Sort order',
        type: 'number',
        hint: 'Lower numbers appear first',
      },
      { name: 'bio', label: 'Bio', type: 'blocks' },
    ],
  },
};

export const resourceList = Object.values(resources);
