/**
 * Single source of truth for the church's own details.
 *
 * These were previously copy-pasted across HomePage, ContactUs, VisitInfo and
 * Footer — the address alone appeared in five files. Change them here.
 *
 * If the office ever needs to edit these without a deploy, promote this to a
 * Strapi single type and read it through a query; the shape below is what that
 * content type should mirror.
 */
export const church = {
  name: 'Zion Chin Baptist Church',
  shortName: 'ZCBC',
  tagline: 'A place to belong. A place to grow.',

  address: {
    street: '213 Main Street',
    city: 'Florence',
    state: 'KY',
    zip: '41042',
    get cityStateZip() {
      return `${this.city}, ${this.state} ${this.zip}`;
    },
  },

  contact: {
    email: 'info@zcbcflorence.org',
    phone: '(859) 555-0123',
    /** E.164-ish, for tel: links */
    phoneHref: '+18595550123',
    officeHours: 'Sun 11am-5pm',
    responseTime: "We'll respond within 24-48 hours",
  },

  services: [
    {
      name: 'Sunday School',
      time: '12:00 PM - 2:00 PM',
      description: 'Bible study classes for all ages',
    },
    {
      name: 'Church Service',
      time: '2:00 PM - 4:00 PM',
      description: 'Worship, prayer, and message',
    },
  ],

  maps: {
    directionsUrl:
      'https://www.google.com/maps/place/Zion+Chin+Baptist+Church/@39.0034366,-84.6232678,17z',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3089.8234234234!2d-84.6254565!3d39.0034366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8841c7319441753d%3A0xdb4c41b0eadaeb73!2sZion%20Chin%20Baptist%20Church!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus',
  },

  social: {
    facebook: 'https://facebook.com/zcbcky',
    youtube: 'https://youtube.com/@ZCBCKY',
    instagram: 'https://instagram.com/zcbc.youth',
  },
};
