/**
 * SINGLE SOURCE OF TRUTH — all website content lives here.
 * Content extracted from the provided brief for Kirankumar K.
 * Copy was refined for clarity/hierarchy only; no new claims invented.
 */

import type { LucideIcon } from "lucide-react";
import {
  Clapperboard,
  UserRound,
  BookOpen,
  Magnet,
  Sparkles,
  Lightbulb,
  Rocket,
  Mail,
  MessageCircle,
  Instagram,
  Languages,
  Target,
  Gauge,
  ShieldCheck,
} from "lucide-react";

export const brand = {
  name: "Kirankumar K.",
  shortName: "Kirankumar",
  initials: "KK",
  role: "Content Strategist & Scriptwriter",
  tagline: "Personal Branding & Content Strategy",
  /** Two-line description derived from the brief, no new claims. */
  intro:
    "I write high-retention scripts that turn ideas into watch-time, trust, and conversions. Bilingual content strategy in English and Kannada — built on audience psychology, not guesswork.",
};

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "philosophy", label: "Perspective" },
  { id: "services", label: "Expertise" },
  { id: "framework", label: "Framework" },
  { id: "portfolio", label: "Scripts" },
  { id: "case-studies", label: "Case Studies" },
  { id: "testimonials", label: "Reviews" },
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
];

export const contact = {
  email: "kirankumarkulagod727@outlook.com",
  whatsapp: "+91 8088283372",
  whatsappHref: "https://wa.me/918088283372",
  instagram: "@kirannotes",
  instagramHref: "https://instagram.com/kirannotes",
};

/** Stats — numbers come directly from the "Proof of Quality" list in the brief. */
export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 100, suffix: "+", label: "High-Retention Scripts" },
  { value: 35, suffix: "+", label: "Brands & Creators Assisted" },
  { value: 7, suffix: "+", label: "Industries Served" },
  { value: 2, suffix: "", label: "Languages — English & Kannada" },
];

/** Proof of quality bullet list — verbatim from brief. */
export const proofPoints: string[] = [
  "100+ High-Retention Scripts Written",
  "7+ Industries Served",
  "English & Kannada Expertise",
  "Fast Turnaround & Structured Delivery",
  "35+ Brands & Creators Assisted",
];

export const aboutHighlights: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Target,
    title: "Audience Psychology First",
    body: "Every script is engineered around how people actually watch, feel, and decide — not just clever wording.",
  },
  {
    icon: Gauge,
    title: "Built for Retention",
    body: "Hooks, pacing, and payoffs structured to hold attention from the first second to the call-to-action.",
  },
  {
    icon: ShieldCheck,
    title: "Structured Delivery",
    body: "Fast turnaround with clear, ready-to-shoot scripts that match your brand voice and require few revisions.",
  },
];

/** Philosophy / "My Perspective" — derived from the framework + proof, no new claims. */
export const philosophy = {
  quote:
    "People don't buy because your product is better. They buy because they believe everyone else already has. Great content doesn't shout louder — it earns attention.",
  beliefs: [
    {
      title: "Attention is earned, not bought",
      body: "A strong hook respects the viewer's time and rewards their curiosity within seconds.",
    },
    {
      title: "Structure beats spectacle",
      body: "Hook → Curiosity → Insight → Impact. A repeatable framework outperforms one-off creativity.",
    },
    {
      title: "Clarity converts",
      body: "Clear, well-researched messaging that's easy to execute is what actually moves audiences to act.",
    },
  ],
};

export const services: { icon: LucideIcon; title: string; body: string; points: string[] }[] = [
  {
    icon: Clapperboard,
    title: "Short-Form Video Scripts",
    body: "Scroll-stopping reels and shorts built around tight hooks and high retention.",
    points: ["Hook-first structure", "Optimised pacing", "Ready-to-shoot format"],
  },
  {
    icon: UserRound,
    title: "Personal Brand Content",
    body: "Content that builds authority and trust for founders, creators, and experts.",
    points: ["Authentic brand voice", "Authority positioning", "Consistent narrative"],
  },
  {
    icon: BookOpen,
    title: "Story-Driven Content",
    body: "Narrative-led scripts that turn products and ideas into memorable stories.",
    points: ["Emotional storytelling", "Clear takeaways", "Strong calls-to-action"],
  },
];

export const framework: { icon: LucideIcon; step: string; title: string; body: string }[] = [
  {
    icon: Magnet,
    step: "01",
    title: "Hook",
    body: "Open with a line that stops the scroll and makes ignoring the video impossible.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Curiosity",
    body: "Open a loop. Pose the question the audience now needs answered.",
  },
  {
    icon: Lightbulb,
    step: "03",
    title: "Insight",
    body: "Deliver the payoff — the idea, lesson, or proof that makes it worth the watch.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Impact",
    body: "Close with a clear takeaway and call-to-action that drives the next step.",
  },
];

export type Script = {
  slug: string;
  title: string;
  category: string;
  categories: string[];
  language: "English" | "Kannada";
  snippet: string;
  /** Full annotated breakdown, section by section. */
  breakdown: { label: string; text: string }[];
};

export const scripts: Script[] = [
  {
    slug: "red-bull-marketing-strategy",
    title: "Red Bull Marketing Strategy",
    category: "Digital Marketing",
    categories: ["Digital Marketing"],
    language: "English",
    snippet:
      "If your product isn't selling… maybe it's time to throw it in the trash.",
    breakdown: [
      {
        label: "Hook",
        text: "\"If your product isn't selling… maybe it's time to throw it in the trash.\"",
      },
      {
        label: "Curiosity",
        text: "Sounds ridiculous, right? That's exactly what Red Bull wanted people to think.\n\nWhen Red Bull entered London in the 1990s, hardly anyone knew the brand. They didn't have massive advertising budgets or celebrity endorsements. Instead, they did something that looked completely insane.\n\nEvery night, their team filled trash bins outside clubs, universities, and gyms with empty Red Bull cans. Not to create waste — but to create curiosity.",
      },
      {
        label: "Insight",
        text: "The next morning, people kept seeing the same thing everywhere. \"Why is everyone drinking Red Bull?\" That single question changed everything.\n\nWithout saying a word, Red Bull made people believe the drink was already popular. It tapped into one of the strongest psychological triggers in marketing: social proof. When we think everyone else is choosing something, we're far more likely to choose it ourselves.\n\nThey didn't market the product. They marketed the perception that everyone else had already bought it.",
      },
      {
        label: "Impact",
        text: "Red Bull eventually became one of the world's most recognizable beverage brands.\n\nSometimes, people don't buy because your product is better. They buy because they believe everyone else already has.",
      },
    ],
  },
  {
    slug: "sunscreen-silent-aging",
    title: "Sunscreen: The Silent Aging Fast-Forward",
    category: "Skincare",
    categories: ["Skincare"],
    language: "English",
    snippet:
      "If you only use sunscreen when the sun is out... you're fast-forwarding your skin's aging by ten years.",
    breakdown: [
      {
        label: "Hook",
        text: "If you are only using sunscreen when the sun is out... you are basically fast-forwarding your skin's aging process by ten years.",
      },
      {
        label: "Curiosity",
        text: "Here is the mistake 90% of people make: They think clouds block UV rays. But actually, up to 80% of UV radiation penetrates cloud cover, causing silent, irreversible collagen breakdown every single day.",
      },
      {
        label: "Insight",
        text: "Here is the simple dermatological rule: The 'Two-Finger Method'. Apply two strips of sunscreen on your index and middle finger, and apply it every single day — rain or shine, indoors or outdoors. Look for SPF 50 and PA+++ rating to block both UVB and UVA rays.",
      },
      {
        label: "Impact",
        text: "Save your skin now. Share this with a friend who still thinks sunscreen is only for the beach, and hit follow for more daily skincare truth bombs!",
      },
    ],
  },
  {
    slug: "why-this-house-finally-sold",
    title: "Why This House Finally Sold",
    category: "Digital Marketing",
    categories: ["Digital Marketing"],
    language: "English",
    snippet:
      "This house sat on the market for 147 days. Then we changed ONE thing.",
    breakdown: [
      {
        label: "Hook",
        text: "\"This house sat on the market for 147 days. Then we changed ONE thing.\"",
      },
      {
        label: "Curiosity",
        text: "Most agents list a home, throw up some photos, and pray. But here's what actually sells homes in 2025 — storytelling.\n\nThis 4-bedroom in [City] had everything. Great neighborhood. Updated kitchen. Massive backyard. But the listing? It read like a robot wrote it.",
      },
      {
        label: "Insight",
        text: "So here's what we did. We stopped selling the house. We started selling the LIFE inside it. The Sunday mornings with coffee on that patio. The birthday parties in that backyard. The way the golden hour light hits the living room at 6 PM.\n\nWe rewrote the listing. Reshot the content. Created a 60-second cinematic tour. And within 11 days — multiple offers. Sold over asking. The house didn't change. The story did.",
      },
      {
        label: "Impact",
        text: "\"If you're an agent or developer who wants content that actually sells — DM me 'SOLD' and let's talk about your next listing.\"",
      },
    ],
  },
  {
    slug: "kohinoor-diamond",
    title: "Kohinoor Diamond",
    category: "Educational",
    categories: ["Educational", "Gold & Diamonds"],
    language: "Kannada",
    snippet:
      "ನೀವೇನಾದರೂ ನಂಬ್ತೀರಾ 105 carat ಇರೋ ಈ diamond ಗೆ body count ಇದೆ?",
    breakdown: [
      {
        label: "Hook",
        text: "ನೀವೇನಾದರೂ ನಂಬ್ತೀರಾ 105 carat ಇರೋ ಈ diamond ಗೆ body count ಇದೆ. ಏನು — diamond ಗೆ body count ಆ..?",
      },
      {
        label: "Body",
        text: "Yes..! Meet the Koh-i-Noor, 'Mountain of Light' ಅಂತ ಕೂಡ ಕರೆಯಿಸಿಕೊಳ್ಳುವ ಈ diamond 700 years ಹಿಂದೆ India ನಲ್ಲಿ ಸಿಕ್ಕಿರುತ್ತೆ. ಇಲ್ಲಿಯವರೆಗೂ ಇದನ್ನ ಯಾವತ್ತೂ buy ಮಾಡಿಲ್ಲ, ಬರೀ ದೋಚಿಕೊಂಡೆ ಹೋಗಿರೋದು. ಇದನ್ನು own ಮಾಡ್ಕೊಂಡಿರೋ ಪ್ರತಿಯೊಬ್ಬ ruler (ರಾಜ), ಒಂದು road ಗೆ ಬರುತ್ತಾನೆ ಅಥವಾ ಸಾಯುತ್ತಾನೆ.\n\nNader Shah (ನಾದಿರ್ ಶಾ) ~ ಹತನಾಗುತ್ತಾನೆ. Shah Shuja (ಶಾಹ್ ಶೂಜಾ) ~ ಕಣ್ಣು ಕಳೆದುಕೊಂಡು, ದೇಶ ಬಿಡ್ತಾನೆ. 10 years old Maharaja Duleep Singh ~ ಅವನ ಹತ್ತಿರ Force ಮಾಡಿ diamond ವಶಪಡಿಸಿಕೊಳ್ತಾರೆ. But ಪ್ಯಾರಿಸ್‌ನಲ್ಲಿ ಕೆಟ್ಟ ಸ್ಥಿತಿಯಲ್ಲಿ ಸಾವನ್ನಪ್ಪುತ್ತಾರೆ.\n\n1306ರ ಒಂದು Hindu ಗ್ರಂಥದಲ್ಲಿ warning ಇದೆ: 'ಈ diamond own ಮಾಡಿದವರು ಇಡೀ ಜಗತ್ತನ್ನೇ ಗೆಲ್ತಾರೆ, but ದೇವತೆಗಳು ಅಥವಾ ಮಹಿಳೆಯರು ಮಾತ್ರ ಇದನ್ನ ಸುರಕ್ಷಿತವಾಗಿ ಧರಿಸುವುದಕ್ಕೆ ಸಾಧ್ಯ.'\n\n1849-ಲ್ಲಿ British government ಇದನ್ನ ವಶಪಡಿಸಿಕೊಳ್ತಾರೆ. After that? Only queen consorts ಇದನ್ನ wear ಮಾಡುತ್ತಾರೆ. Never a king. Literally ಇದನ್ನು 42% cut ಮಾಡಿ ಅದರ ಶಕ್ತಿಯನ್ನ control ಮಾಡುವದಕ್ಕೆ try ಮಾಡಿದರು.\n\nಇಂದು India, Pakistan, Afghanistan, Iran ~ ಈ four countries ಇದನ್ನು back ಕೇಳ್ತಿವೆ, but UK ಮಾತ್ರ straight ಆಗಿ 'no' ಅಂತ ಹೇಳ್ತಿದೆ… After all this, curse ಇನ್ನೂ ಕೂಡ break ಆಗಿಲ್ಲ.",
      },
      {
        label: "CTA",
        text: "ಇಷ್ಟೆಲ್ಲಾ ಅವಾಂತರ ಆಗಿ, half size cut ಆದ್ಮೇಲೂ, Koh-i-Noor 'world's most expensive' ಅನ್ಸ್ಕೊಳುತ್ತೆ — literally priceless! ಇದಕ್ಕೆ reason ಆದರೂ ಏನು? Full story Part-2 ಅಲ್ಲಿ ಬರುತ್ತೆ. So stay tuned and follow now!",
      },
    ],
  },
  {
    slug: "gym-burnout-intensity-trap",
    title: "Gym Burnout & The Intensity Trap",
    category: "Fitness",
    categories: ["Fitness"],
    language: "English",
    snippet:
      "The reason you quit the gym after three weeks isn't a lack of motivation. It's the 'Intensity Trap'.",
    breakdown: [
      {
        label: "Hook",
        text: "The reason you are quitting the gym after three weeks isn't because you lack motivation. It's because you fell for the 'Intensity Trap'.",
      },
      {
        label: "Curiosity",
        text: "Most beginners go from zero workouts to trying to train six days a week like an elite athlete. Your muscles don't fail first — your central nervous system does, leading to massive cortisol spikes and physical burnout.",
      },
      {
        label: "Insight",
        text: "Instead of seeking extreme intensity, master 'Progressive Action'. Start with just three days a week. Keep your sessions under 45 minutes. Focus on just three basic compound movements. Consistency beats intensity every single time.",
      },
      {
        label: "Impact",
        text: "Stop waiting for January 1st or next Monday. Start today with a simple 20-minute workout. Save this video to remind yourself when you feel like quitting, and follow for realistic fitness advice!",
      },
    ],
  },
  {
    slug: "kannada-personal-finance",
    title: "Personal Finance (Kannada Script)",
    category: "Personal Finance",
    categories: ["Personal Finance"],
    language: "Kannada",
    snippet:
      "ನೀವು ದಿನಕ್ಕೆ 8 ಗಂಟೆ ಕಷ್ಟಪಟ್ಟು ಕೆಲಸ ಮಾಡ್ತೀರಾ, ಆದ್ರೂ ತಿಂಗಳ ಕೊನೆಯಲ್ಲಿ ಒಂದು ರೂಪಾಯಿನೂ ಉಳಿತಾ ಇಲ್ವಾ?",
    breakdown: [
      {
        label: "Hook",
        text: "ನೀವು ದಿನಕ್ಕೆ 8 ಗಂಟೆ ಕಷ್ಟಪಟ್ಟು ಕೆಲಸ ಮಾಡ್ತೀರಾ, ಆದ್ರೂ ತಿಂಗಳ ಕೊನೆಯಲ್ಲಿ ನಿಮ್ಮ ಜೇಬಿನಲ್ಲಿ ಒಂದು ರೂಪಾಯಿನೂ ಉಳಿತಾ ಇಲ್ವಾ? ಹಾಗಾದ್ರೆ ನೀವು ಈ ಒಂದು ದೊಡ್ಡ ತಪ್ಪು ಮಾಡ್ತಿದ್ದೀರಾ!",
      },
      {
        label: "Curiosity",
        text: "ನೋಡಿ, ಪ್ರತಿಯೊಬ್ಬರೂ ದುಡ್ಡು ಗಳಿಸೋದನ್ನ ಹೇಗೋ ಕಲಿತುಕೊಳ್ತಾರೆ. ಆದ್ರೆ ಗಳಿಸಿದ ಹಣವನ್ನ ಉಳಿಸಿ, ಅದನ್ನ ಬೆಳೆಸೋದು ಹೇಗೆ ಅಂತ ಯಾರೂ ಹೇಳಿಕೊಡಲ್ಲ. ನೆನಪಿಡಿ, ಶ್ರೀಮಂತರು ಹಣಕ್ಕಾಗಿ ಕೆಲಸ ಮಾಡಲ್ಲ; ಹಣವನ್ನ ಅವರಿಗಾಗಿ ದುಡೀತಾರೆ!",
      },
      {
        label: "Insight",
        text: "ಇದಕ್ಕೆ ಪರಿಹಾರವೇ '50-30-20 ರೂಲ್'. ನಿಮ್ಮ ಒಟ್ಟು ಗಳಿಕೆಯಲ್ಲಿ 50% ಹಣವನ್ನು ಅಗತ್ಯಗಳಿಗಾಗಿ (Food, Rent), 30% ಹಣವನ್ನು ನಿಮ್ಮ ಆಸೆಗಳಿಗಾಗಿ ಬಳಸಿ. ಉಳಿದ ಕನಿಷ್ಠ 20% ಹಣವನ್ನು ಕಡ್ಡಾಯವಾಗಿ ಮ್ಯೂಚುವಲ್ ಫಂಡ್ ಅಥವಾ ಈಕ್ವಿಟಿಗಳಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಿ. ಇದೇ ನಿಮ್ಮ ಆರ್ಥಿಕ ಸ್ವಾತಂತ್ರ್ಯದ ಮೊದಲ ಹೆಜ್ಜೆ.",
      },
      {
        label: "Impact",
        text: "ಇಂದಿನಿಂದಲೇ ನಿಮ್ಮ ಫೈನಾನ್ಷಿಯಲ್ ಜರ್ನಿ ಆರಂಭಿಸಿ. ಈ ಮಾಹಿತಿ ಉಪಯುಕ್ತ ಅನಿಸಿದರೆ ನಿಮ್ಮ ಆತ್ಮೀಯರಿಗೆ ಶೇರ್ ಮಾಡಿ ಮತ್ತು ಇಂತಹದ್ದೇ ಅದ್ಭುತ ವಿಡಿಯೋಗಳಿಗಾಗಿ ಈಗಲೇ ಫಾಲೋ ಬಟನ್ ಪ್ರೆಸ್ ಮಾಡಿ!",
      },
    ],
  },
];

/** Case studies — derived strictly from the script outcomes in the brief. */
export const caseStudies = [
  {
    title: "Why This House Finally Sold",
    tag: "Real Estate · Digital Marketing",
    challenge:
      "A 4-bedroom listing with great features sat on the market for 147 days. The copy read like a robot wrote it — no emotion, no story.",
    solution:
      "Stopped selling the house, started selling the life inside it. Rewrote the listing, reshot the content, and created a 60-second cinematic tour focused on real moments.",
    results:
      "Within 11 days the listing attracted multiple offers and sold over asking. The house didn't change — the story did.",
    metrics: [
      { value: "147 → 11", label: "Days to multiple offers" },
      { value: "Multiple", label: "Offers received" },
      { value: "Over ask", label: "Final sale price" },
    ],
  },
  {
    title: "Red Bull Marketing Strategy",
    tag: "Brand Strategy · Digital Marketing",
    challenge:
      "Entering London in the 1990s, Red Bull was nearly unknown — with no big ad budgets and no celebrity endorsements to lean on.",
    solution:
      "A breakdown of how Red Bull manufactured social proof: filling trash bins outside clubs, gyms, and universities with empty cans to create the perception that everyone was already drinking it.",
    results:
      "The script reframes a famous growth story into a repeatable lesson on perception and social proof — turning a counter-intuitive idea into a memorable, shareable narrative.",
    metrics: [
      { value: "Social Proof", label: "Core psychological trigger" },
      { value: "Perception", label: "Marketed over product" },
      { value: "Global", label: "Brand recognition outcome" },
    ],
  },
];

export const testimonials = [
  {
    name: "Vishal",
    role: "Creator",
    company: "",
    rating: 5,
    quote:
      "Kirankumar understands audience psychology, not just scriptwriting. Every script was well-structured, easy to execute, and matched our brand voice perfectly. Communication was smooth, and the delivery was always professional.",
  },
  {
    name: "Praveen B",
    role: "Content Creator",
    company: "",
    rating: 5,
    quote:
      "Working with Kirankumar made our content process much easier. The scripts were clear, engaging, and required very few revisions. His research and attention to detail really stood out.",
  },
  {
    name: "SERU Team",
    role: "Brand Launch",
    company: "SERU",
    rating: 5,
    quote:
      "We needed content that could explain our platform clearly while keeping viewers engaged. Kirankumar delivered scripts that were strategic, easy to understand, and aligned perfectly with our launch goals. The messaging felt natural and professional throughout the launch.",
  },
  {
    name: "Amit Raj",
    role: "Creator & Business Owner",
    company: "",
    rating: 5,
    quote:
      "Kirankumar consistently delivers high-quality scripts backed by research. He quickly understands the objective and writes content that feels authentic, engaging, and ready to publish. Highly recommended for creators and businesses.",
  },
];

/** Insights — drawn from the themes/ideas already present in the scripts. */
export const insights = [
  {
    category: "Marketing Psychology",
    readTime: "4 min read",
    title: "Social Proof: Why People Buy What Others Already Have",
    body: "How Red Bull marketed perception instead of product — and the psychological trigger you can use in any script.",
  },
  {
    category: "Scriptwriting",
    readTime: "5 min read",
    title: "The Hook → Curiosity → Insight → Impact Framework",
    body: "A repeatable four-stage structure for writing short-form scripts that actually hold attention to the CTA.",
  },
  {
    category: "Storytelling",
    readTime: "3 min read",
    title: "Stop Selling the Product. Start Selling the Life.",
    body: "The storytelling shift that turned a 147-day listing into multiple offers in 11 days.",
  },
];

export const languages = [
  {
    code: "EN",
    name: "English",
    body: "Scroll-stopping short-form scripts and brand storytelling for global creators and businesses.",
  },
  {
    code: "ಕ",
    name: "Kannada",
    body: "High-quality Kannada scripts for regional creators and brands targeting Kannada audiences. Contact to explore Kannada content options and samples.",
  },
];

export const projectNiches = [
  "Short-Form Reel",
  "Skincare Hook",
  "Fitness Script",
  "Kannada YouTube Video",
  "Brand Storytelling",
];

export const budgets = [
  "Under ₹5,000",
  "₹5,000 - ₹15,000",
  "₹15,000 - ₹30,000",
  "₹30,000+",
];

export const contactCards = [
  {
    icon: Mail,
    label: "Email Address",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Chat",
    value: contact.whatsapp,
    href: contact.whatsappHref,
  },
  {
    icon: Instagram,
    label: "Instagram Profile",
    value: contact.instagram,
    href: contact.instagramHref,
  },
];

export const languagesMeta = { icon: Languages };
