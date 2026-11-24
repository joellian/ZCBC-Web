import { createElement } from 'react';
import { church } from '../../config/church';

/**
 * Global header navigation — the single source of truth for the header.
 *
 * Edit labels, order, destinations and descriptions here; NavBar.jsx and
 * NavDropdown.jsx render whatever this file describes and never hard-code a
 * label or link. Add/remove a `children` array to turn an item into (or out
 * of) a mega-menu.
 *
 * Placeholder links: several destinations in the spec don't have pages yet
 * (I'm New, Ministries, Events, and most mega-menu children). Those resolve to
 * '#' so they don't 404, with the intended path noted in a trailing comment —
 * a one-line change once each page ships.
 */

const TODO = '#'; // no route yet — see comment on each line for the intended path

/** Top-level items, in display order. `children` ⇒ mega-menu; otherwise a plain link. */
export const primaryNav = [
  {
    key: 'im-new',
    label: "I'm New",
    href: TODO, // /im-new
    children: [
      {
        label: 'Plan Your Visit',
        href: TODO, // /im-new/plan-your-visit
        description: 'Everything you need to know before your first Sunday with us.',
      },
      {
        label: 'What to Expect',
        href: TODO, // /im-new/what-to-expect
        description: 'A quick walk-through of a typical service, start to finish.',
      },
      {
        label: 'Our Beliefs',
        href: TODO, // /im-new/beliefs
        description: 'The core truths and doctrine that shape our church.',
      },
      {
        label: 'Meet the Pastor',
        href: TODO, // /im-new/pastor
        description: "Get to know the person who'll be teaching each week.",
      },
      {
        label: 'Find Us',
        href: TODO, // /im-new/find-us
        description: 'Directions, parking, and how to reach the building.',
      },
    ],
  },
  {
    key: 'about',
    label: 'About',
    href: '/about-us',
    children: [
      {
        label: 'Our Story',
        href: TODO, // /about-us/story
        description: 'How our congregation began and where we are headed.',
      },
      {
        label: 'What We Believe',
        href: TODO, // /about-us/beliefs
        description: 'Our statement of faith and guiding convictions.',
      },
      {
        label: 'Leadership & Staff',
        href: TODO, // /about-us/leadership
        description: 'The pastors, elders, and team who serve the church.',
      },
      {
        label: 'Membership',
        href: TODO, // /about-us/membership
        description: 'What membership means and how to become one of us.',
      },
      {
        label: 'Careers',
        href: TODO, // /about-us/careers
        description: 'Open staff positions and how to apply to serve.',
      },
    ],
  },
  {
    key: 'ministries',
    label: 'Ministries',
    href: TODO, // /ministries
    children: [
      {
        label: 'Kids',
        href: TODO, // /ministries/kids
        description: 'Safe, fun, Bible-centered ministry for children.',
      },
      {
        label: 'Students',
        href: TODO, // /ministries/students
        description: 'Middle and high schoolers growing in faith together.',
      },
      {
        label: 'Young Adults',
        href: TODO, // /ministries/young-adults
        description: 'Community and discipleship for college and twenties.',
      },
      {
        label: 'Men',
        href: TODO, // /ministries/men
        description: 'Brotherhood, study, and service for the men of our church.',
      },
      {
        label: 'Women',
        href: TODO, // /ministries/women
        description: 'Fellowship and Bible study for women of every season.',
      },
      {
        label: 'Small Groups',
        href: TODO, // /ministries/small-groups
        description: 'Midweek groups to connect, study, and pray.',
      },
      {
        label: 'Missions',
        href: TODO, // /ministries/missions
        description: 'Local and global outreach we support and send.',
      },
      {
        label: 'Care',
        href: TODO, // /ministries/care
        description: 'Support, counseling, and prayer in times of need.',
      },
    ],
  },
  {
    key: 'sermons',
    label: 'Sermons',
    href: '/sermons',
    children: [
      {
        label: 'Latest Message',
        href: '/sermons',
        description: "Watch or listen to this past Sunday's sermon.",
      },
      {
        label: 'Watch Live',
        href: TODO, // /sermons/live
        description: 'Join the service in real time each Sunday.',
      },
      {
        label: 'Series Archive',
        href: '/sermons',
        description: 'Browse past sermon series by topic and book.',
      },
      {
        label: 'Podcast',
        href: TODO, // /sermons/podcast
        description: 'Take the weekly message with you anywhere.',
      },
    ],
  },
  {
    key: 'events',
    label: 'Events',
    href: TODO, // /events — direct link, no dropdown
  },
  {
    key: 'contact',
    label: 'Contact',
    href: '/contact-us', // direct link, no dropdown
  },
];

/** The Give call-to-action. Rendered as a filled button, outside the nav list. */
export const giveLink = {
  label: 'Give',
  href: '/giving',
};

/**
 * Facts shown in the utility bar, derived from the church config so service
 * times, address and phone stay in one place ([[church]]).
 *
 * Order matters for the responsive rule in NavBar.css: the phone is kept last
 * so the address (`:nth-last-child(2)`) can be dropped on small screens while
 * the phone stays. The phone `value` is a real element (a tel: link) rather
 * than a string — NavBar.jsx renders `{fact.value}` as-is, so the anchor has
 * to live here. It's built with createElement because this is a .js file and
 * the React plugin only compiles JSX in .jsx.
 */
export const utilityFacts = [
  ...church.services.map((service) => ({
    label: service.name,
    value: service.time,
  })),
  {
    label: 'Find us',
    value: `${church.address.street}, ${church.address.cityStateZip}`,
  },
  {
    label: 'Call us',
    value: createElement(
      'a',
      { className: 'utility-phone', href: `tel:${church.contact.phoneHref}` },
      church.contact.phone
    ),
  },
];
