import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { assertAdmin } from './lib/auth';

// One-time seed: clears the CMS tables and reloads them with the exact content
// currently hardcoded in the site. Run after deploy + setting ADMIN_PASSWORD:
//   npx convex run seed:seedAll '{"adminKey":"<your-password>"}'
const proj = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1280&q=85&fit=crop`;
const gal = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&h=1100&fit=crop&q=85`;

const SITE_CONTENT: Record<string, string> = {
  hero_greeting: "Hi, I'm",
  hero_name: 'Brijesh',
  hero_tagline:
    'a gta-based photographer capturing real moments and timeless stories',
  about_text:
    'I’m a photographer and visual storyteller focused on capturing real emotions, honest moments, and timeless stories. My work blends cinematic lighting, natural emotion, and creative composition to create images that feel powerful, personal, and alive.',
  instagram_username: 'brie_o_graphy',
  instagram_followers: '478',
  instagram_profile_url: 'https://instagram.com/brie_o_graphy',
  contact_email: 'brijesh@example.com',
  contact_intro:
    'Tell me about your shoot — weddings, portraits, events, brands. I’ll get back to you.',
};

const SERVICES = [
  {
    number: '01',
    name: 'Wedding Photography',
    description:
      'Cinematic wedding coverage focused on emotions, details, portraits, and storytelling moments.',
  },
  {
    number: '02',
    name: 'Portrait Photography',
    description:
      'Professional portraits for individuals, artists, creators, professionals, and personal branding.',
  },
  {
    number: '03',
    name: 'Event Photography',
    description:
      'Coverage for private events, parties, corporate gatherings, concerts, and celebrations.',
  },
  {
    number: '04',
    name: 'Fashion / Editorial',
    description:
      'Creative editorial-style photography with strong mood, lighting, and composition.',
  },
  {
    number: '05',
    name: 'Product & Brand',
    description:
      'High-quality visuals for businesses, creators, campaigns, websites, and social media.',
  },
];

const PROJECTS = [
  {
    number: '01',
    category: 'Wedding',
    name: 'Anaya & Rohan',
    col1a: proj('1511285560929-80b456fea0bc'),
    col1b: proj('1606216794074-735e91aa2c92'),
    col2: proj('1519741497674-611481863552'),
  },
  {
    number: '02',
    category: 'Editorial',
    name: 'Vogue Bombay',
    col1a: proj('1483985988355-763728e1935b'),
    col1b: proj('1487412720507-e7ab37603c6f'),
    col2: proj('1469334031218-e382a71b716b'),
  },
  {
    number: '03',
    category: 'Brand',
    name: 'Kismet Coffee Co.',
    col1a: proj('1509042239860-f550ce710b93'),
    col1b: proj('1495474472287-4d71bcdd2085'),
    col2: proj('1497935586351-b67a49e012bf'),
  },
];

const GALLERY = [
  { src: gal('1519741497674-611481863552'), alt: 'Wedding' },
  { src: gal('1494790108377-be9c29b29330'), alt: 'Portrait' },
  { src: gal('1483985988355-763728e1935b'), alt: 'Fashion' },
  { src: gal('1493225457124-a3eb161ffa5f'), alt: 'Event' },
  { src: gal('1606216794074-735e91aa2c92'), alt: 'Bridal' },
  { src: gal('1487412720507-e7ab37603c6f'), alt: 'Editorial' },
  { src: gal('1485827404703-89b55fcc595e'), alt: 'Studio portrait' },
  { src: gal('1429962714451-bb934ecdc4ec'), alt: 'Live event' },
  { src: gal('1488646953014-85cb44e25828'), alt: 'Travel' },
];

export const seedAll = mutation({
  args: { adminKey: v.string() },
  handler: async (ctx, { adminKey }) => {
    assertAdmin(adminKey);

    // Clear existing rows so the seed is idempotent.
    for (const table of [
      'siteContent',
      'services',
      'projects',
      'galleryImages',
    ] as const) {
      const rows = await ctx.db.query(table).collect();
      for (const row of rows) await ctx.db.delete(row._id);
    }

    for (const [key, value] of Object.entries(SITE_CONTENT)) {
      await ctx.db.insert('siteContent', { key, value });
    }
    for (let i = 0; i < SERVICES.length; i++) {
      await ctx.db.insert('services', { ...SERVICES[i], order: i });
    }
    for (let i = 0; i < PROJECTS.length; i++) {
      await ctx.db.insert('projects', { ...PROJECTS[i], order: i });
    }
    for (let i = 0; i < GALLERY.length; i++) {
      await ctx.db.insert('galleryImages', { ...GALLERY[i], order: i });
    }

    return {
      siteContent: Object.keys(SITE_CONTENT).length,
      services: SERVICES.length,
      projects: PROJECTS.length,
      gallery: GALLERY.length,
    };
  },
});
