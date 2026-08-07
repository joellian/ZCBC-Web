/**
 * Shown in the Leadership section until real leaders exist in the CMS.
 * Shaped like a Strapi `leader` so it can render through <LeaderCard />.
 */
export const placeholderLeaders = [
  {
    name: 'Pastor',
    title: 'Senior Pastor',
    bio: "Leading our congregation with wisdom and dedication to God's Word.",
  },
  {
    name: 'Deacons',
    title: 'Church Deacons',
    bio: 'Serving our church family with care and compassion.',
  },
];

export const defaultContent = {
  whoWeAre: {
    title: 'Who We Are',
    subtitle: 'A Christ-Centered Community',
    content:
      'Zion Chin Baptist Church is a vibrant, faith-filled community of believers united by our love for Jesus Christ and our commitment to serving one another. We are a diverse congregation of families, individuals, and children who have come together to worship, grow, and share the Gospel.',
    values: [
      {
        title: 'Faith',
        description:
          'We believe in the authority of Scripture and the transforming power of faith in Jesus Christ.',
      },
      {
        title: 'Community',
        description:
          'We are committed to building authentic relationships and supporting one another in love.',
      },
      {
        title: 'Service',
        description:
          'We serve our neighbors and our world with compassion, reflecting the heart of Christ.',
      },
      {
        title: 'Growth',
        description:
          'We pursue spiritual maturity through prayer, Bible study, and discipleship.',
      },
    ],
  },
  ourStory: {
    title: 'Our Story',
    subtitle: 'A Journey of Faith',
    content:
      'Zion Chin Baptist Church was founded by a small group of Chin immigrants who came to the United States seeking religious freedom and a better life for their families. What began as a small prayer group meeting in homes has grown into a thriving congregation.',
    timeline: [
      {
        year: '2010',
        event: 'First gathering of Chin families for worship in Florence, Kentucky',
      },
      {
        year: '2012',
        event: 'Officially established as Zion Chin Baptist Church',
      },
      {
        year: '2015',
        event: 'Moved to our current location at 213 Main Street',
      },
      {
        year: '2020',
        event: 'Launched online services to reach our extended community',
      },
      {
        year: 'Present',
        event: 'Continuing to grow and serve our community in Florence',
      },
    ],
  },
  whatWeDo: {
    title: 'What We Do',
    subtitle: 'Serving God and Community',
    ministries: [
      {
        name: 'Sunday Worship',
        description:
          'Join us every Sunday for powerful worship, prayer, and biblical teaching that will strengthen your faith.',
        icon: '\u{1F64F}',
      },
      {
        name: 'Sunday School',
        description:
          "Bible study classes for all ages, helping everyone grow deeper in their understanding of God's Word.",
        icon: '\u{1F4D6}',
      },
      {
        name: 'Youth Ministry',
        description:
          'Engaging programs for teens to build friendships, explore faith, and develop as young leaders.',
        icon: '\u{1F465}',
      },
      {
        name: "Children's Ministry",
        description:
          'Age-appropriate activities and lessons that help children learn about Jesus in fun and meaningful ways.',
        icon: '\u{1F476}',
      },
      {
        name: 'Prayer Ministry',
        description:
          'Weekly prayer meetings where we intercede for our church, community, and world.',
        icon: '\u271D\uFE0F',
      },
      {
        name: 'Community Outreach',
        description:
          'Serving our neighbors through food drives, community events, and acts of kindness.',
        icon: '\u2764\uFE0F',
      },
    ],
  },
  beliefs: {
    title: 'What We Believe',
    items: [
      'The Bible is the inspired, infallible Word of God',
      'There is one God, eternally existing in three persons: Father, Son, and Holy Spirit',
      'Jesus Christ is the Son of God, born of a virgin, lived a sinless life, died for our sins, and rose again',
      'Salvation is by grace through faith in Jesus Christ alone',
      'The Church is the body of Christ, called to worship, fellowship, and witness',
      'Jesus Christ will return to establish His kingdom and judge the living and the dead',
    ],
  },
};
