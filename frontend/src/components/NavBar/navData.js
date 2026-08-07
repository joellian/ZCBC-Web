import { church } from '../../config/church';

/**
 * Navigation configuration — one entry per top-level nav item, in display order.
 *
 * An entry with `items` renders an expandable mega-menu; one without is a
 * plain link. That single distinction replaces the special-cased JSX NavBar
 * used to carry so it could slot Contact Us between Visit Us and Giving.
 *
 * Sub-item hrefs point at anchors that already exist on each page
 * (`id="who-we-are"` and friends), so a mega-menu link jumps to its section
 * instead of sending all four links to the same page top.
 */
export const menuConfig = [
  {
    key: 'home',
    label: 'Home',
    path: '/',
  },
  {
    key: 'about',
    label: 'About Us',
    path: '/about-us',
    headerTitle: 'Learn About Our Church',
    headerDescription:
      'Discover our mission, meet our leadership, and explore what makes our community special',
    headerIcon: '✝️',
    ctaLabel: 'Visit Complete About Us Page',
    ctaArrowLabel: 'Explore',
    footerText: 'Join us in worship and fellowship as we grow together in faith',
    items: [
      {
        label: 'Leadership',
        href: '/about-us#leadership',
        description:
          'Meet our dedicated pastors and church leaders who guide our community with wisdom and faith.',
        icon: '\u{1F465}',
      },
      {
        label: 'Who We Are',
        href: '/about-us#who-we-are',
        description:
          'Discover our mission, values, and what makes our church community unique in faith.',
        icon: '✝️',
      },
      {
        label: 'Our Story',
        href: '/about-us#our-story',
        description:
          'Learn about our church history and the journey that brought us to where we are today.',
        icon: '\u{1F4D6}',
      },
      {
        label: 'What We Do',
        href: '/about-us#what-we-do',
        description:
          "Explore our ministries, services, and how we serve our community and spread God's love.",
        icon: '\u{1F64F}',
      },
    ],
  },
  {
    key: 'sermons',
    label: 'Sermons',
    path: '/sermons',
    headerTitle: 'Explore Our Sermons',
    headerDescription:
      'Watch, listen, and grow in faith through our messages and teachings',
    headerIcon: '\u{1F399}️',
    ctaLabel: 'View All Sermons',
    ctaArrowLabel: 'Explore',
    footerText: "Grow spiritually through God's word and biblical teaching",
    items: [
      {
        label: 'Recent Messages',
        href: '/sermons',
        description:
          'Listen to our latest sermon messages and teachings from Sunday services.',
        icon: '\u{1F399}️',
      },
      {
        label: 'Sermon Series',
        href: '/sermons',
        description:
          'Explore our ongoing and past sermon series covering various biblical topics.',
        icon: '\u{1F4DA}',
      },
      {
        label: 'Watch Live',
        href: '/sermons',
        description: 'Join us live for Sunday worship services and special events.',
        icon: '\u{1F4FA}',
      },
      {
        label: 'By Topic',
        href: '/sermons',
        description: 'Browse sermons organized by biblical topics and themes.',
        icon: '\u{1F50D}',
      },
    ],
  },
  {
    key: 'visit',
    label: 'Visit Us',
    path: '/visit-us',
    headerTitle: 'Plan Your Visit',
    headerDescription:
      "We'd love to welcome you! Find everything you need to know about visiting our church",
    headerIcon: '\u{1F44B}',
    ctaLabel: 'Visit Us Page',
    ctaArrowLabel: 'Learn More',
    footerText: `Come as you are - everyone is welcome at ${church.name}`,
    items: [
      {
        label: 'Service Times',
        href: '/visit-us',
        description: 'Find our Sunday worship times and weekly service schedule.',
        icon: '⏰',
      },
      {
        label: 'Location & Directions',
        href: '/visit-us',
        description: 'Get directions to our church and information about parking.',
        icon: '\u{1F4CD}',
      },
      {
        label: 'What to Expect',
        href: '/visit-us',
        description: 'Learn what to expect when visiting us for the first time.',
        icon: '\u{1F44B}',
      },
      {
        label: 'Plan Your Visit',
        href: '/visit-us',
        description: 'Prepare for your first visit with helpful information and tips.',
        icon: '\u{1F4DD}',
      },
    ],
  },
  {
    key: 'contact',
    label: 'Contact Us',
    path: '/contact-us',
  },
  {
    key: 'giving',
    label: 'Giving',
    path: '/giving',
    headerTitle: 'Generosity & Giving',
    headerDescription:
      'Support our mission and ministry through your generous contributions',
    headerIcon: '\u{1F49D}',
    ctaLabel: 'Give Now',
    ctaArrowLabel: 'Learn More',
    footerText: 'Each one must give as he has decided in his heart - 2 Corinthians 9:7',
    items: [
      {
        label: 'Why We Give',
        href: '/giving',
        description: 'Understand the biblical foundation and importance of giving.',
        icon: '\u{1F49D}',
      },
      {
        label: 'Ways to Give',
        href: '/giving',
        description: 'Discover the various methods available for giving to the church.',
        icon: '\u{1F4B3}',
      },
      {
        label: 'Online Giving',
        href: '/giving',
        description: 'Make a secure online donation quickly and conveniently.',
        icon: '\u{1F4BB}',
      },
      {
        label: 'Recurring Donations',
        href: '/giving',
        description: 'Set up automatic recurring donations to support our ministry.',
        icon: '\u{1F504}',
      },
    ],
  },
];
