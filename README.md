# Kirankumar K. — Personal Branding Website

A production-ready, premium personal-branding website for **Kirankumar K.**, Content Strategist & Scriptwriter. Built to feel like a modern SaaS product (Linear / Framer / Stripe quality) while positioning the user as a credible content strategist.

## ✨ Highlights

- **Sticky blur navigation** with active-section highlighting, smooth scrolling & mobile drawer
- **Hero** with masked portrait, floating stat cards, gradient + grid backdrop
- **Animated counters**, fade-up reveals, hover lift, card glow micro-interactions
- **Featured Scripts** with language + category **filters**, **copy-to-clipboard**, and a full **annotated breakdown modal**
- **Case Studies** (Challenge → Solution → Results → Metrics), kept separate from **Testimonials**
- **Insights**, **Languages (English & Kannada)**, and a validated **enquiry form**
  - Validation messages appear **only after an invalid submission** — never on load
- Dark premium **footer** with CTA, navigation, contact & **back-to-top**
- SEO: title/meta/Open Graph, JSON-LD `Person` schema, semantic HTML, accessibility

## 🧱 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (icons)
- Plus Jakarta Sans (via `next/font`)

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
kirankumar-portfolio/
├── public/
│   └── assets/                # portrait + illustration images
├── src/
│   ├── app/
│   │   ├── globals.css        # design tokens + component classes
│   │   ├── layout.tsx         # fonts, SEO metadata, JSON-LD
│   │   └── page.tsx           # section composition
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── BackToTop.tsx
│   │   ├── sections/          # Hero, Stats, About, Philosophy, Services,
│   │   │                      # Framework, Portfolio, CaseStudies,
│   │   │                      # Testimonials, Insights, LanguagesSection,
│   │   │                      # Contact, Footer
│   │   └── ui/                # Reveal, SectionHeading, Counter, CopyButton
│   ├── data/
│   │   └── site.ts            # SINGLE SOURCE OF TRUTH for all content
│   ├── hooks/                 # useActiveSection, useScrolled
│   └── lib/                   # utils (cn, scrollToId)
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

## ✏️ Editing Content

All copy, scripts, testimonials, stats, and contact details live in **`src/data/site.ts`**.
Update that one file and the whole site updates — no component edits needed.

## 🎨 Design System

| Token        | Value     |
| ------------ | --------- |
| Primary      | `#0EA5C6` |
| Secondary    | `#111827` |
| Background   | `#FFFFFF` |
| Surface      | `#F8FAFC` |
| Border       | `#E5E7EB` |
| Text         | `#111827` |
| Muted text   | `#6B7280` |
| Success      | `#10B981` |

Radius 18–24px · soft/lift shadows · 1200px container · 80–120px section padding.

## 📨 Contact Form

The enquiry form has no backend dependency: on valid submit it opens the visitor's
email client with a prefilled message to `kirankumarkulagod727@outlook.com`.
To wire it to an API/service (e.g. Formspree, Resend), replace the `mailto:` handler
in `src/components/sections/Contact.tsx`.

---

© Kirankumar K. — Content Strategist & Scriptwriter
