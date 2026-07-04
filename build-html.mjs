// Generates a single self-contained ./html-review/index.html from src/data/site.ts
// Usage: node /tmp/make_data.mjs && node build-html.mjs
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import * as D from "/tmp/_data.mjs";

// Inline the portrait as a base64 data-URI so the HTML is fully self-contained
// (renders with zero external requests — works in sandboxed previews & offline).
let HERO_DATA_URI = "assets/hero-portrait.png";
try {
  const b64 = readFileSync("/tmp/hero-opt.jpg").toString("base64");
  HERO_DATA_URI = "data:image/jpeg;base64," + b64;
} catch (e) {
  console.warn("Portrait not inlined, falling back to file path:", e.message);
}

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const nl2br = (s = "") => esc(s).replace(/\n/g, "<br>");

// ---- Inline SVG icons (Lucide-style, 24x24, currentColor) ----
const I = {
  Sparkles: '<path d="M9.94 14.06 12 20l2.06-5.94L20 12l-5.94-2.06L12 4l-2.06 5.94L4 12z"/>',
  ArrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  ArrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  ArrowUp: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  Play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  Star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  Check: '<path d="M20 6 9 17l-5-5"/>',
  CheckCircle2: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  Copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16V4a2 2 0 0 1 2-2h10"/>',
  FileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  Quote: '<path d="M3 21c3 0 7-1 7-8V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M14 21c3 0 7-1 7-8V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>',
  Target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  Gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  ShieldCheck: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  Clapperboard: '<path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 4"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
  UserRound: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  BookOpen: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  Magnet: '<path d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"/><path d="m5 8 4 4"/><path d="m12 15 4 4"/>',
  Lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  Rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  Mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  MessageCircle: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  Instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  Languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  Globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  AlertCircle: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  Clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  Send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
  Menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  X: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
};
const icon = (name, cls = "") =>
  `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || ""}</svg>`;

const stars = (n = 5) =>
  Array.from({ length: n })
    .map(() => `<svg class="ic star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${I.Star}</svg>`)
    .join("");

const initials = (name) =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const isKn = (s) => (s === "Kannada" ? " kn" : "");

// ---------- Build sections ----------
const navLinks = D.nav
  .filter((n) => n.id !== "home" && n.id !== "contact")
  .map((n) => `<a href="#${n.id}" data-nav="${n.id}">${esc(n.label)}</a>`)
  .join("");

const navMobile = D.nav
  .filter((n) => n.id !== "home")
  .map((n) => `<a href="#${n.id}" data-nav="${n.id}" class="m-link">${esc(n.label)}</a>`)
  .join("");

const statsHTML = D.stats
  .map(
    (s, i) => `
    <div class="stat${i ? " divl" : ""}">
      <p class="stat-num"><span class="counter" data-to="${s.value}" data-suffix="${esc(s.suffix)}">0${esc(s.suffix)}</span></p>
      <p class="stat-label">${esc(s.label)}</p>
    </div>`
  )
  .join("");

const proofHTML = D.proofPoints
  .map((p) => `<div class="proof"><span class="ck">${icon("CheckCircle2")}</span><span>${esc(p)}</span></div>`)
  .join("");

const aboutCards = D.aboutHighlights
  .map(
    (h) => `
    <div class="hl-card">
      <span class="chip-ic">${icon(h.icon)}</span>
      <div><h3>${esc(h.title)}</h3><p>${esc(h.body)}</p></div>
    </div>`
  )
  .join("");

const beliefHTML = D.philosophy.beliefs
  .map(
    (b, i) => `
    <div class="belief">
      <span class="b-num">0${i + 1}</span>
      <h3>${esc(b.title)}</h3>
      <p>${esc(b.body)}</p>
    </div>`
  )
  .join("");

const servicesHTML = D.services
  .map(
    (s) => `
    <div class="svc">
      <span class="chip-ic lg">${icon(s.icon)}</span>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.body)}</p>
      <ul>${s.points.map((p) => `<li><span class="tick">${icon("Check")}</span>${esc(p)}</li>`).join("")}</ul>
      <a href="#contact" class="link-arrow">Start a project ${icon("ArrowUpRight")}</a>
    </div>`
  )
  .join("");

const frameworkHTML = D.framework
  .map(
    (f) => `
    <div class="stage">
      <span class="stage-ic">${icon(f.icon)}</span>
      <div class="stage-card">
        <div class="stage-top"><span class="stage-step">${esc(f.step)}</span><span class="stage-rule"></span></div>
        <h3>${esc(f.title)}</h3>
        <p>${esc(f.body)}</p>
      </div>
    </div>`
  )
  .join("");

// Languages + categories for filters
const allCats = ["All", ...Array.from(new Set(D.scripts.flatMap((s) => s.categories)))];
const langChips = ["All", "English", "Kannada"]
  .map((l, i) => `<button class="chip lang-chip${i === 0 ? " active" : ""}" data-lang="${l}">${l}</button>`)
  .join("");
const catChips = allCats
  .map((c, i) => `<button class="chip cat-chip${i === 0 ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`)
  .join("");

const scriptCards = D.scripts
  .map((s) => {
    const tags = s.categories.map((c) => `<span class="tag">${esc(c)}</span>`).join("");
    return `
    <article class="card script" data-lang="${s.language}" data-cats="${esc(s.categories.join("|"))}" data-slug="${s.slug}">
      <div class="badges">
        <span class="lang-badge ${s.language === "Kannada" ? "kn-badge" : ""}">${esc(s.language)}</span>
        ${tags}
      </div>
      <h3>${esc(s.title)}</h3>
      <div class="hook-box">
        <p class="hook-label">Hook</p>
        <p class="hook-text${isKn(s.language)}">${esc(s.snippet)}</p>
      </div>
      <div class="card-actions">
        <button class="link-arrow open-modal" data-slug="${s.slug}">${icon("FileText")} View Script Breakdown</button>
        <div class="btn-row">
          <button class="btn btn-copy" data-slug="${s.slug}">${icon("Copy")} <span>Copy Annotated Script</span></button>
          <a href="#contact" class="btn btn-primary sm">Hire for this ${icon("ArrowRight")}</a>
        </div>
      </div>
    </article>`;
  })
  .join("");

// Plain-text for copy + modal data
const scriptData = {};
D.scripts.forEach((s) => {
  const header = `${s.title}  |  ${s.category}\n${"-".repeat(40)}\n\n`;
  const body = s.breakdown.map((b) => `[${b.label.toUpperCase()}]\n${b.text}`).join("\n\n");
  scriptData[s.slug] = {
    title: s.title,
    language: s.language,
    categories: s.categories,
    breakdown: s.breakdown,
    plain: header + body + "\n\n— Written by Kirankumar K.",
  };
});

const caseHTML = D.caseStudies
  .map((c) => {
    const steps = [
      ["AlertCircle", "Challenge", c.challenge],
      ["Lightbulb", "Solution", c.solution],
      ["Target", "Results", c.results],
    ]
      .map(
        ([ic, label, text]) => `
        <div class="cs-step"><span class="chip-ic sm2">${icon(ic)}</span>
          <div><p class="cs-label">${label}</p><p class="cs-text">${esc(text)}</p></div></div>`
      )
      .join("");
    const metrics = c.metrics
      .map((m) => `<div class="metric"><p class="m-val">${esc(m.value)}</p><p class="m-lab">${esc(m.label)}</p></div>`)
      .join("");
    return `
    <article class="cs-card">
      <div class="cs-head"><span class="cs-tag">${esc(c.tag)}</span><h3>${esc(c.title)}</h3></div>
      <div class="cs-body">${steps}</div>
      <div class="cs-metrics">${metrics}</div>
    </article>`;
  })
  .join("");

const testiHTML = D.testimonials
  .map(
    (t) => `
    <figure class="testi">
      <div class="stars">${stars(t.rating)}</div>
      <blockquote>&ldquo;${esc(t.quote)}&rdquo;</blockquote>
      <figcaption>
        <span class="avatar">${esc(initials(t.name))}</span>
        <div><p class="t-name">${esc(t.name)}</p><p class="t-role">${esc(t.role)}${t.company ? " · " + esc(t.company) : ""}</p></div>
      </figcaption>
    </figure>`
  )
  .join("");

const insightGrad = ["g1", "g2", "g3"];
const insightHTML = D.insights
  .map(
    (p, i) => `
    <a href="#contact" class="blog">
      <div class="blog-thumb ${insightGrad[i % 3]}">
        <span class="blog-cat">${esc(p.category)}</span>
        <span class="blog-arrow">${icon("ArrowUpRight")}</span>
      </div>
      <div class="blog-body">
        <span class="blog-time">${icon("Clock")} ${esc(p.readTime)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.body)}</p>
        <span class="link-arrow">Read more ${icon("ArrowUpRight")}</span>
      </div>
    </a>`
  )
  .join("");

const langBlocks = D.languages
  .map(
    (l) => `
    <div class="lang-row">
      <span class="lang-code kn">${esc(l.code)}</span>
      <div><h3>${esc(l.name)}</h3><p>${esc(l.body)}</p></div>
    </div>`
  )
  .join("");

const isEmailCard = (c) => c.label === "Email Address";
const contactCardsHTML = D.contactCards
  .map((c) => {
    const inner = `<span class="chip-ic">${icon(c.icon)}</span>
      <div><p class="cc-label">${esc(c.label)}</p><p class="cc-val">${esc(c.value)}</p></div>`;
    if (isEmailCard(c)) {
      return `
    <div class="contact-card email-card" id="emailCard" role="button" tabindex="0">
      ${inner}
      <span class="cc-copy" id="emailCopy">Copy</span>
    </div>`;
    }
    return `
    <a class="contact-card" href="${esc(c.href)}" target="_blank" rel="noopener">
      ${inner}
    </a>`;
  })
  .join("");

const nicheBtns = D.projectNiches
  .map((n) => `<button type="button" class="pill niche-pill" data-val="${esc(n)}">+ ${esc(n)}</button>`)
  .join("");
const budgetBtns = D.budgets
  .map((b) => `<button type="button" class="pill budget-pill" data-val="${esc(b)}">${esc(b)}</button>`)
  .join("");

const footerNav = D.nav
  .filter((n) => n.id !== "home")
  .map((n) => `<a href="#${n.id}">${esc(n.label)}</a>`)
  .join("");

const year = new Date().getFullYear();

// ---------- Full HTML ----------
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(D.brand.name)} — ${esc(D.brand.role)}</title>
<meta name="description" content="High-retention short-form video scripts and personal-brand content in English & Kannada. Built on audience psychology.">
<meta property="og:title" content="${esc(D.brand.name)} — ${esc(D.brand.role)}">
<meta property="og:description" content="High-retention short-form video scripts and personal-brand content in English & Kannada.">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Kannada:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%230EA5C6'/%3E%3Ctext x='50%25' y='54%25' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='28' font-weight='700' fill='white'%3EKK%3C/text%3E%3C/svg%3E">
<style>
:root{
  --primary:#0EA5C6;--primary-700:#106A86;--secondary:#111827;--surface:#F8FAFC;
  --line:#E5E7EB;--ink:#111827;--muted:#6B7280;--success:#10B981;
  --shadow-soft:0 2px 8px rgba(17,24,39,.04),0 8px 24px rgba(17,24,39,.06);
  --shadow-card:0 1px 2px rgba(17,24,39,.04),0 12px 32px rgba(17,24,39,.08);
  --shadow-lift:0 18px 48px rgba(17,24,39,.12);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:88px}
body{font-family:'Plus Jakarta Sans',system-ui,sans-serif;color:var(--ink);background:#fff;line-height:1.5;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.kn{font-family:'Noto Sans Kannada','Plus Jakarta Sans',sans-serif}
a{color:inherit;text-decoration:none}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
.ic{width:20px;height:20px;flex:none}
.section{padding:96px 0}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.18em;color:var(--primary)}
.eyebrow .dot{width:6px;height:6px;border-radius:99px;background:var(--primary)}
.h-lg{font-size:clamp(28px,4vw,44px);font-weight:700;line-height:1.1;letter-spacing:-.02em;margin-top:16px}
.head-center{max-width:640px;margin:0 auto;text-align:center}
.lead{font-size:18px;color:var(--muted);margin-top:16px;line-height:1.6}
.grad-text{background:linear-gradient(90deg,var(--primary),var(--primary-700));-webkit-background-clip:text;background-clip:text;color:transparent}
/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;padding:12px 22px;font-size:14px;font-weight:600;cursor:pointer;border:1px solid transparent;transition:.25s;font-family:inherit}
.btn .ic{width:16px;height:16px}
.btn-primary{background:var(--primary);color:#fff;box-shadow:0 8px 24px rgba(14,165,198,.35)}
.btn-primary:hover{background:var(--primary-700);transform:translateY(-2px)}
.btn-primary.sm{padding:10px 16px;flex:1}
.btn-secondary{background:#fff;color:var(--ink);border-color:var(--line)}
.btn-secondary:hover{border-color:rgba(14,165,198,.4);color:var(--primary);transform:translateY(-2px)}
.btn-copy{background:#fff;color:var(--ink);border:1px solid var(--line);flex:1}
.btn-copy:hover{border-color:rgba(14,165,198,.4);color:var(--primary)}
.btn-copy.copied{border-color:var(--success);background:rgba(16,185,129,.1);color:var(--success)}
.link-arrow{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:600;color:var(--primary);cursor:pointer;background:none;border:none;font-family:inherit}
.link-arrow:hover{color:var(--primary-700)}
.link-arrow .ic{width:16px;height:16px}
.chip-ic{display:flex;width:48px;height:48px;align-items:center;justify-content:center;border-radius:16px;background:rgba(14,165,198,.1);color:var(--primary);flex:none}
.chip-ic.lg{width:56px;height:56px}
.chip-ic.sm2{width:36px;height:36px;border-radius:12px}
.chip-ic .ic{width:22px;height:22px}
/* nav */
header{position:fixed;inset:0 0 auto;z-index:50;transition:.3s;border-bottom:1px solid transparent}
header.scrolled{background:rgba(255,255,255,.8);backdrop-filter:blur(16px);border-bottom-color:var(--line)}
.nav{height:68px;display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:15px}
.logo{width:36px;height:36px;border-radius:12px;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;box-shadow:0 6px 16px rgba(14,165,198,.35)}
.nav-links{display:flex;gap:4px}
.nav-links a{padding:8px 14px;border-radius:999px;font-size:14px;font-weight:500;color:var(--muted)}
.nav-links a:hover{color:var(--ink)}
.nav-links a.active{color:var(--primary)}
.nav-cta{display:flex;gap:12px}
.burger{display:none;width:40px;height:40px;border:1px solid var(--line);border-radius:12px;background:#fff;align-items:center;justify-content:center;cursor:pointer}
.drawer{display:none;border-top:1px solid var(--line);background:rgba(255,255,255,.97);backdrop-filter:blur(16px)}
.drawer.open{display:block}
.drawer .m-link{display:block;padding:12px 16px;border-radius:12px;font-weight:500;font-size:15px}
.drawer .m-link:hover{background:var(--surface)}
.drawer .container{padding-top:16px;padding-bottom:16px;display:flex;flex-direction:column;gap:4px}
/* hero */
.hero{position:relative;padding-top:128px;overflow:hidden}
.hero-bg{position:absolute;inset:0;z-index:-1}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(17,24,39,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(17,24,39,.045) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 0%,#000,transparent);mask-image:radial-gradient(ellipse 70% 60% at 50% 0%,#000,transparent)}
.glow{position:absolute;border-radius:50%;filter:blur(120px)}
.glow.g-top{top:-130px;left:50%;transform:translateX(-50%);width:720px;height:420px;background:rgba(14,165,198,.15)}
.hero-grid-wrap{display:grid;grid-template-columns:1.05fr .95fr;gap:32px;align-items:center;padding-bottom:96px}
.hero-badge{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--line);background:var(--surface);padding:6px 16px;border-radius:999px;font-size:12px;font-weight:600;color:var(--muted)}
.hero-badge .ic{width:14px;height:14px;color:var(--primary)}
.hero h1{font-size:clamp(34px,5vw,60px);font-weight:700;line-height:1.05;letter-spacing:-.02em;margin-top:20px}
.hero p.intro{font-size:18px;color:var(--muted);margin-top:20px;max-width:520px;line-height:1.6}
.hero-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
.social-proof{display:flex;flex-wrap:wrap;align-items:center;gap:12px 24px;margin-top:36px}
.stars{display:flex;gap:2px;color:#fbbf24}
.star{width:16px;height:16px}
.social-proof p{font-size:14px;color:var(--muted)}
.social-proof b{color:var(--ink)}
.hero-visual{position:relative;max-width:440px;margin:0 auto;width:100%}
.hero-photo{position:relative;border-radius:28px;border:1px solid var(--line);background:var(--surface);box-shadow:var(--shadow-card);overflow:hidden;aspect-ratio:4/5;display:flex;align-items:flex-end;justify-content:center}
.hero-photo img{width:100%;height:100%;object-fit:cover}
.float-card{position:absolute;border-radius:16px;border:1px solid var(--line);background:rgba(255,255,255,.92);backdrop-filter:blur(8px);box-shadow:var(--shadow-lift);padding:12px 16px}
.float-top{left:-24px;top:36px;display:flex;align-items:center;gap:12px;animation:fl 6s ease-in-out infinite}
.float-bottom{right:-12px;bottom:48px;animation:fl2 7s ease-in-out infinite}
.float-top .mini-ic{width:40px;height:40px;border-radius:12px;background:rgba(14,165,198,.1);color:var(--primary);display:flex;align-items:center;justify-content:center}
.float-top b{font-size:18px;display:block;line-height:1}.float-top small{font-size:12px;color:var(--muted)}
.float-bottom small{font-size:12px;color:var(--muted)}.float-bottom b{font-size:14px}
@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes fl2{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}
/* stats */
.stats-wrap{margin-top:-40px}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;border:1px solid var(--line);background:#fff;border-radius:24px;padding:32px;box-shadow:var(--shadow-card)}
.stat{position:relative;text-align:center}
.stat.divl::before{content:"";position:absolute;left:-12px;top:50%;transform:translateY(-50%);width:1px;height:40px;background:var(--line)}
.stat-num{font-size:clamp(28px,3vw,36px);font-weight:800;letter-spacing:-.02em}
.stat-num .counter{background:linear-gradient(90deg,var(--primary),var(--primary-700));-webkit-background-clip:text;background-clip:text;color:transparent}
.stat-label{font-size:14px;color:var(--muted);margin-top:6px}
/* about */
.about-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:24px;margin-top:56px;align-items:start}
.feature-card{position:relative;overflow:hidden;border-radius:24px;border:1px solid var(--line);background:linear-gradient(135deg,var(--surface),#fff);padding:40px;box-shadow:var(--shadow-soft)}
.feature-card .q{color:var(--primary);width:36px;height:36px}
.feature-card .big{font-size:clamp(20px,2.2vw,24px);font-weight:500;line-height:1.4;margin-top:20px}
.feature-card .sub{font-size:14px;color:var(--muted);margin-top:16px}
.proof-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:32px}
.proof{display:flex;gap:10px;align-items:flex-start;font-size:14px;font-weight:500}
.proof .ck{color:var(--success);flex:none}.proof .ic{width:20px;height:20px}
.hl-grid{display:grid;gap:16px}
.hl-card{display:flex;gap:16px;border:1px solid var(--line);background:#fff;border-radius:24px;padding:24px;box-shadow:var(--shadow-soft);transition:.3s}
.hl-card:hover{transform:translateY(-4px);border-color:rgba(14,165,198,.3);box-shadow:var(--shadow-lift)}
.hl-card h3{font-size:16px;font-weight:700}.hl-card p{font-size:14px;color:var(--muted);margin-top:4px}
/* philosophy dark */
.dark{background:var(--secondary);color:#fff;position:relative;overflow:hidden}
.dark-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(ellipse 60% 60% at 50% 40%,#000,transparent);mask-image:radial-gradient(ellipse 60% 60% at 50% 40%,#000,transparent)}
.dark .glow.dg1{top:0;left:-80px;width:320px;height:320px;background:rgba(14,165,198,.25)}
.dark .glow.dg2{bottom:0;right:-40px;width:320px;height:320px;background:rgba(14,165,198,.15)}
.phil-quote{max-width:768px;margin:0 auto;text-align:center;position:relative}
.phil-quote .q{color:var(--primary);width:40px;height:40px;margin:24px auto 0}
.phil-quote .quote{font-size:clamp(22px,3vw,34px);font-weight:600;line-height:1.25;margin-top:24px}
.beliefs{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px;position:relative}
.belief{border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);border-radius:24px;padding:28px;transition:.3s}
.belief:hover{transform:translateY(-6px);border-color:rgba(14,165,198,.4)}
.b-num{display:flex;width:44px;height:44px;align-items:center;justify-content:center;border-radius:16px;background:rgba(14,165,198,.2);color:#67DDF7;font-weight:700}
.belief h3{margin-top:20px;font-size:18px}.belief p{margin-top:8px;font-size:14px;color:rgba(255,255,255,.7)}
/* services */
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px}
.svc{display:flex;flex-direction:column;border:1px solid var(--line);background:#fff;border-radius:24px;padding:32px;box-shadow:var(--shadow-soft);transition:.3s}
.svc:hover{transform:translateY(-6px);border-color:rgba(14,165,198,.3);box-shadow:var(--shadow-lift)}
.svc h3{margin-top:24px;font-size:20px}.svc p{margin-top:8px;font-size:15px;color:var(--muted)}
.svc ul{list-style:none;margin-top:24px;border-top:1px solid var(--line);padding-top:24px;display:flex;flex-direction:column;gap:10px}
.svc li{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:500}
.tick{display:flex;width:20px;height:20px;border-radius:99px;background:rgba(16,185,129,.1);color:var(--success);align-items:center;justify-content:center}
.tick .ic{width:12px;height:12px}
.svc .link-arrow{margin-top:28px}
/* framework */
.framework{position:relative}
.stages{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:64px;position:relative}
.fw-line{position:absolute;left:7%;right:7%;top:28px;height:1px;background:linear-gradient(90deg,var(--primary),#A5ECFB)}
.stage{position:relative}
.stage-ic{display:flex;width:56px;height:56px;border-radius:16px;border:1px solid var(--line);background:#fff;color:var(--primary);align-items:center;justify-content:center;box-shadow:var(--shadow-soft);position:relative;z-index:1;transition:.3s}
.stage:hover .stage-ic{background:var(--primary);color:#fff;transform:translateY(-4px)}
.stage .ic{width:22px;height:22px}
.stage-card{margin-top:20px;border:1px solid var(--line);background:#fff;border-radius:24px;padding:24px;box-shadow:var(--shadow-soft);transition:.3s}
.stage:hover .stage-card{transform:translateY(-4px);box-shadow:var(--shadow-lift)}
.stage-top{display:flex;align-items:center;gap:8px}
.stage-step{color:var(--primary);font-weight:700;font-size:14px}
.stage-rule{flex:1;height:1px;background:var(--line)}
.stage-card h3{margin-top:12px;font-size:18px}.stage-card p{margin-top:8px;font-size:14px;color:var(--muted)}
/* portfolio */
.filters{margin-top:40px;display:flex;flex-direction:column;gap:16px}
.filter-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.filter-row .flabel{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin-right:4px;display:inline-flex;align-items:center;gap:6px}
.filter-row .flabel .ic{width:14px;height:14px}
.chip{border:1px solid var(--line);background:#fff;border-radius:999px;padding:8px 16px;font-size:14px;font-weight:500;color:var(--muted);cursor:pointer;transition:.2s;font-family:inherit}
.chip:hover{border-color:rgba(14,165,198,.4);color:var(--ink)}
.chip.active{border-color:var(--primary);background:var(--primary);color:#fff;box-shadow:0 6px 16px rgba(14,165,198,.35)}
.cards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px}
.card.script{display:flex;flex-direction:column;border:1px solid var(--line);background:#fff;border-radius:24px;padding:24px;box-shadow:var(--shadow-soft);transition:.3s}
.card.script:hover{transform:translateY(-6px);border-color:rgba(14,165,198,.3);box-shadow:var(--shadow-lift)}
.card.script.hide{display:none}
.badges{display:flex;flex-wrap:wrap;gap:8px}
.lang-badge{border-radius:999px;padding:4px 10px;font-size:11px;font-weight:700;background:rgba(17,24,39,.08);color:var(--secondary)}
.lang-badge.kn-badge{background:rgba(14,165,198,.1);color:var(--primary-700)}
.tag{border-radius:999px;padding:4px 10px;font-size:11px;font-weight:500;border:1px solid var(--line);color:var(--muted)}
.card.script h3{margin-top:16px;font-size:18px;line-height:1.3}
.hook-box{margin-top:12px;border:1px dashed var(--line);background:var(--surface);border-radius:16px;padding:12px 16px}
.hook-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:var(--primary)}
.hook-text{margin-top:4px;font-size:14px;line-height:1.5;color:rgba(17,24,39,.8);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.card-actions{margin-top:auto;padding-top:24px;display:flex;flex-direction:column;gap:12px}
.btn-row{display:flex;flex-wrap:wrap;gap:8px}
.btn-row .btn{font-size:13px}
.empty{margin-top:40px;text-align:center;color:var(--muted)}
/* case studies */
.cs-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:56px}
.cs-card{display:flex;flex-direction:column;border:1px solid var(--line);background:#fff;border-radius:24px;overflow:hidden;box-shadow:var(--shadow-soft);transition:.3s}
.cs-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lift)}
.cs-head{border-bottom:1px solid var(--line);background:linear-gradient(135deg,var(--surface),#fff);padding:24px 28px}
.cs-tag{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:var(--primary)}
.cs-head h3{margin-top:8px;font-size:20px}
.cs-body{padding:24px 28px;display:flex;flex-direction:column;gap:20px;flex:1}
.cs-step{display:flex;gap:14px}
.cs-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--primary)}
.cs-text{margin-top:4px;font-size:14px;color:var(--muted);line-height:1.5}
.cs-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border-top:1px solid var(--line)}
.metric{background:#fff;padding:20px 16px;text-align:center}
.m-val{font-size:clamp(15px,1.6vw,18px);font-weight:800;color:var(--primary);line-height:1.2}
.m-lab{margin-top:4px;font-size:11px;color:var(--muted);line-height:1.2}
/* testimonials */
.testi-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:56px}
.testi{display:flex;flex-direction:column;border:1px solid var(--line);background:#fff;border-radius:24px;padding:32px;box-shadow:var(--shadow-soft);transition:.3s}
.testi:hover{transform:translateY(-4px);border-color:rgba(14,165,198,.3);box-shadow:var(--shadow-lift)}
.testi blockquote{margin-top:16px;font-size:15px;line-height:1.6;color:rgba(17,24,39,.85);flex:1}
.testi figcaption{display:flex;align-items:center;gap:12px;margin-top:24px;border-top:1px solid var(--line);padding-top:20px}
.avatar{display:flex;width:44px;height:44px;border-radius:999px;background:linear-gradient(135deg,var(--primary),var(--primary-700));color:#fff;align-items:center;justify-content:center;font-weight:700;font-size:14px}
.t-name{font-size:14px;font-weight:700}.t-role{font-size:12px;color:var(--muted)}
/* insights */
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px}
.blog{display:flex;flex-direction:column;border:1px solid var(--line);background:#fff;border-radius:24px;overflow:hidden;box-shadow:var(--shadow-soft);transition:.3s}
.blog:hover{transform:translateY(-6px);border-color:rgba(14,165,198,.3);box-shadow:var(--shadow-lift)}
.blog-thumb{position:relative;aspect-ratio:16/9;overflow:hidden}
.blog-thumb.g1{background:linear-gradient(135deg,rgba(14,165,198,.2),rgba(14,165,198,.05))}
.blog-thumb.g2{background:linear-gradient(135deg,rgba(17,24,39,.15),rgba(17,24,39,.05))}
.blog-thumb.g3{background:linear-gradient(135deg,rgba(16,185,129,.15),rgba(16,185,129,.05))}
.blog-cat{position:absolute;left:16px;top:16px;background:rgba(255,255,255,.9);padding:4px 12px;border-radius:999px;font-size:11px;font-weight:700;color:var(--primary);backdrop-filter:blur(6px)}
.blog-arrow{position:absolute;right:16px;bottom:16px;width:40px;height:40px;border-radius:999px;background:#fff;color:var(--primary);display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-soft);transition:.3s}
.blog:hover .blog-arrow{transform:rotate(45deg)}
.blog-body{padding:24px;display:flex;flex-direction:column;flex:1}
.blog-time{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--muted)}
.blog-time .ic{width:14px;height:14px}
.blog-body h3{margin-top:8px;font-size:18px;line-height:1.3}
.blog-body p{margin-top:8px;font-size:14px;color:var(--muted);flex:1}
.blog-body .link-arrow{margin-top:20px}
/* languages */
.lang-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.lang-rows{margin-top:32px;display:flex;flex-direction:column;gap:16px}
.lang-row{display:flex;gap:16px;border:1px solid var(--line);background:#fff;border-radius:20px;padding:20px;box-shadow:var(--shadow-soft)}
.lang-code{display:flex;width:48px;height:48px;border-radius:16px;background:rgba(14,165,198,.1);color:var(--primary);align-items:center;justify-content:center;font-size:18px;font-weight:700;flex:none}
.lang-row h3{font-size:16px}.lang-row p{margin-top:4px;font-size:14px;color:var(--muted);line-height:1.5}
.lang-visual{position:relative;border:1px solid var(--line);background:linear-gradient(135deg,var(--surface),#fff);border-radius:24px;padding:48px 32px;box-shadow:var(--shadow-card);text-align:center}
.lang-visual .big-letters{font-size:72px;font-weight:800;line-height:1;display:flex;gap:16px;justify-content:center;align-items:center}
.lang-visual .en{color:var(--secondary)}.lang-visual .amp{color:var(--primary);font-size:48px}.lang-visual .kn{color:var(--primary)}
.lang-visual p{margin-top:20px;color:var(--muted);font-size:15px}
/* contact */
.contact-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:48px}
.contact-card{display:flex;align-items:center;gap:16px;border:1px solid var(--line);background:#fff;border-radius:20px;padding:20px;box-shadow:var(--shadow-soft);transition:.3s}
.contact-card:hover{transform:translateY(-4px);border-color:rgba(14,165,198,.3);box-shadow:var(--shadow-lift)}
.cc-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}
.cc-val{font-size:14px;font-weight:700;word-break:break-word}
.form{margin-top:24px;border:1px solid var(--line);background:#fff;border-radius:24px;padding:40px;box-shadow:var(--shadow-card)}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.field{margin-top:0}
.field+.field-block,.form-grid+.field-block{margin-top:24px}
.field-block{margin-top:24px}
label{display:block;font-size:14px;font-weight:600;margin-bottom:8px}
input,textarea{width:100%;border:1px solid var(--line);background:var(--surface);border-radius:16px;padding:12px 16px;font-size:15px;font-family:inherit;color:var(--ink);outline:none;transition:.2s}
input:focus,textarea:focus{border-color:var(--primary);background:#fff;box-shadow:0 0 0 3px rgba(14,165,198,.2)}
input.err,textarea.err{border-color:#f87171;box-shadow:0 0 0 3px rgba(248,113,113,.2)}
textarea{resize:vertical;line-height:2}
.err-msg{margin-top:6px;font-size:14px;color:#ef4444;display:none}
.err-msg.show{display:block}
.pills{display:flex;flex-wrap:wrap;gap:8px}
.pill{border:1px solid var(--line);background:#fff;border-radius:999px;padding:8px 16px;font-size:14px;font-weight:500;color:var(--muted);cursor:pointer;transition:.2s;font-family:inherit}
.pill:hover{border-color:rgba(14,165,198,.4);color:var(--ink)}
.niche-pill.active{border-color:var(--primary);background:var(--primary);color:#fff;box-shadow:0 6px 16px rgba(14,165,198,.35)}
.budget-pill.active{border-color:var(--primary);background:rgba(14,165,198,.1);color:var(--primary-700)}
.form-foot{margin-top:32px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.form-success{font-size:14px;font-weight:500;color:var(--success);display:none;align-items:center;gap:8px}
.form-success.show{display:inline-flex}
.form-success .ic{width:16px;height:16px}
/* footer */
footer.dark{padding:0}
.foot-cta{display:grid;grid-template-columns:1.4fr 1fr;gap:24px;align-items:center;border-bottom:1px solid rgba(255,255,255,.1);padding:56px 0}
.foot-cta h2{font-size:clamp(24px,3vw,30px);font-weight:700}
.foot-cta p{margin-top:12px;color:rgba(255,255,255,.7);max-width:520px}
.foot-cta-btns{display:flex;flex-wrap:wrap;gap:12px;justify-content:flex-end}
.btn-ghost{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff}
.btn-ghost:hover{background:rgba(255,255,255,.1)}
.foot-main{display:grid;grid-template-columns:1.4fr 1fr;gap:40px;padding:56px 0}
.foot-brand p{margin-top:16px;font-size:14px;color:rgba(255,255,255,.6);max-width:300px;line-height:1.6}
.foot-soc{display:flex;gap:12px;margin-top:20px}
.foot-soc a{display:flex;width:40px;height:40px;border-radius:12px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:rgba(255,255,255,.8);align-items:center;justify-content:center;transition:.2s}
.foot-soc a:hover{border-color:rgba(14,165,198,.4);background:rgba(14,165,198,.15);color:#fff}
.foot-col h3{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:rgba(255,255,255,.5)}
.foot-nav{margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:10px}
.foot-nav a{font-size:14px;color:rgba(255,255,255,.7)}.foot-nav a:hover{color:#fff}
.foot-contact{margin-top:16px;display:flex;flex-direction:column;gap:12px}
.foot-contact a{font-size:14px;color:rgba(255,255,255,.7);word-break:break-all}.foot-contact a:hover{color:#fff}
.foot-bottom{display:flex;align-items:center;justify-content:space-between;gap:16px;border-top:1px solid rgba(255,255,255,.1);padding:28px 0;font-size:14px;color:rgba(255,255,255,.5)}
.top-btn{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);border-radius:999px;padding:8px 16px;color:rgba(255,255,255,.7);cursor:pointer;font-family:inherit;font-size:14px}
.top-btn:hover{border-color:rgba(14,165,198,.4);color:#fff}
/* back to top */
.bt{position:fixed;bottom:24px;right:24px;z-index:40;width:48px;height:48px;border-radius:999px;background:var(--primary);color:#fff;border:none;cursor:pointer;display:none;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(14,165,198,.45);transition:.2s}
.bt.show{display:flex}.bt:hover{transform:translateY(-4px)}
/* modal */
.modal{position:fixed;inset:0;z-index:60;display:none;align-items:center;justify-content:center;background:rgba(17,24,39,.5);backdrop-filter:blur(4px);padding:24px}
.modal.open{display:flex}
.modal-box{background:#fff;border-radius:24px;max-width:640px;width:100%;max-height:88vh;display:flex;flex-direction:column;overflow:hidden;animation:pop .3s ease}
@keyframes pop{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;border-bottom:1px solid var(--line);background:var(--surface);padding:20px 24px}
.modal-head h3{margin-top:8px;font-size:20px}
.modal-close{width:36px;height:36px;border-radius:12px;border:1px solid var(--line);background:#fff;color:var(--muted);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none}
.modal-body{padding:24px;overflow-y:auto;display:flex;flex-direction:column;gap:20px}
.mb-step{position:relative;padding-left:20px}
.mb-step::before{content:"";position:absolute;left:0;top:6px;bottom:6px;width:2px;border-radius:99px;background:rgba(14,165,198,.3)}
.mb-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--primary)}
.mb-text{margin-top:6px;font-size:15px;line-height:1.6;color:rgba(17,24,39,.85);white-space:pre-line}
.modal-foot{display:flex;flex-wrap:wrap;gap:12px;border-top:1px solid var(--line);background:var(--surface);padding:16px 24px}
.modal-foot .btn{flex:1}
/* reveal */
.reveal{opacity:0;transform:translateY(24px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
.reveal.in{opacity:1;transform:none}
/* responsive */
@media(max-width:980px){
  .hero-grid-wrap,.about-grid,.cs-grid,.testi-grid,.lang-grid{grid-template-columns:1fr}
  .svc-grid,.blog-grid,.cards-grid,.stages,.beliefs{grid-template-columns:1fr 1fr}
  .stats{grid-template-columns:1fr 1fr;gap:16px}
  .stat.divl::before{display:none}
  .nav-links,.nav-cta{display:none}
  .burger{display:flex}
  .hero-visual{margin-top:8px}
  .float-top{left:0}.float-bottom{right:0}
  .foot-cta,.foot-main{grid-template-columns:1fr}
  .foot-cta-btns{justify-content:flex-start}
  .fw-line{display:none}
}
@media(max-width:640px){
  .section{padding:64px 0}
  .svc-grid,.blog-grid,.cards-grid,.stages,.beliefs,.form-grid,.contact-cards,.cs-metrics,.proof-grid{grid-template-columns:1fr}
  .cs-metrics{grid-template-columns:repeat(3,1fr)}
  .feature-card,.form{padding:24px}
  .float-card{display:none}
}

.foot-email{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.fe-text{break-all;cursor:pointer}.fe-text:hover{color:#fff}.fe-copy{margin-left:auto;font-size:11px;font-weight:700;color:#0EA5C6;border:1px solid rgba(14,165,198,.35);border-radius:999px;padding:2px 9px;background:none;cursor:pointer;transition:all .2s}.fe-copy.ok{color:#10B981;border-color:rgba(16,185,129,.45)}
.email-card{cursor:pointer}.cc-copy{margin-left:auto;font-size:11px;font-weight:700;letter-spacing:.02em;color:#0EA5C6;border:1px solid rgba(14,165,198,.35);border-radius:999px;padding:4px 11px;white-space:nowrap;transition:all .2s}.cc-copy.ok{color:#10B981;border-color:rgba(16,185,129,.45)}
.foot-mail{display:flex;width:40px;height:40px;border-radius:12px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:rgba(255,255,255,.8);align-items:center;justify-content:center;transition:.2s;cursor:pointer;padding:0}.foot-mail:hover{border-color:rgba(14,165,198,.4);background:rgba(14,165,198,.15);color:#fff}.foot-mail.ok{color:#10B981;border-color:rgba(16,185,129,.5);background:rgba(16,185,129,.15)}.foot-mail svg{width:18px;height:18px}
</style>
</head>
<body>

<header id="hdr">
  <div class="container nav">
    <a href="#home" class="brand"><span class="logo">${esc(D.brand.initials)}</span><span>${esc(D.brand.name)}</span></a>
    <nav class="nav-links">${navLinks}</nav>
    <div class="nav-cta"><a href="#contact" class="btn btn-primary">Let's Talk ${icon("ArrowRight")}</a></div>
    <button class="burger" id="burger" aria-label="Open menu">${icon("Menu")}</button>
  </div>
  <div class="drawer" id="drawer"><div class="container">${navMobile}<a href="#contact" class="btn btn-primary" style="margin-top:8px">Let's Talk ${icon("ArrowRight")}</a></div></div>
</header>

<main>
<!-- HERO -->
<section id="home" class="hero">
  <div class="hero-bg"><div class="hero-grid"></div><div class="glow g-top"></div></div>
  <div class="container hero-grid-wrap">
    <div>
      <span class="hero-badge">${icon("Sparkles")} ${esc(D.brand.tagline)}</span>
      <h1>Scripts that hold attention &amp; <span class="grad-text">build trust.</span></h1>
      <p class="intro">${esc(D.brand.intro)}</p>
      <div class="hero-cta">
        <a href="#contact" class="btn btn-primary">Connect with me ${icon("ArrowRight")}</a>
        <a href="#portfolio" class="btn btn-secondary">${icon("Play")} View Sample Scripts</a>
      </div>
      <div class="social-proof">
        <div class="stars">${stars(5)}</div>
        <p><b>35+ brands &amp; creators</b> trust Kirankumar's scripts</p>
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-photo"><img src="${HERO_DATA_URI}" alt="${esc(D.brand.name)}, ${esc(D.brand.role)}"></div>
      <div class="float-card float-top"><span class="mini-ic">${icon("Sparkles")}</span><div><b>${D.stats[0].value}${esc(D.stats[0].suffix)}</b><small>Scripts written</small></div></div>
      <div class="float-card float-bottom"><small style="display:block;margin-bottom:2px">Languages</small><b>English <span style="color:var(--primary)">&amp;</span> Kannada</b></div>
    </div>
  </div>
</section>

<!-- STATS -->
<div class="container stats-wrap"><div class="stats reveal">${statsHTML}</div></div>

<!-- ABOUT -->
<section id="about" class="section">
  <div class="container">
    <div class="head-center reveal"><span class="eyebrow"><span class="dot"></span>About</span><h2 class="h-lg">Strategy-led scriptwriting, not just words on a page</h2><p class="lead">I help creators and brands turn ideas into content that people actually finish watching — and act on.</p></div>
    <div class="about-grid">
      <div class="feature-card reveal">
        <span class="q">${icon("Quote")}</span>
        <p class="big">${esc(D.brand.shortName)} understands audience psychology, not just scriptwriting — every script is structured, easy to execute, and matched to your brand voice.</p>
        <p class="sub">That's the foundation behind 100+ high-retention scripts across 7+ industries, in both English &amp; Kannada.</p>
        <div class="proof-grid">${proofHTML}</div>
      </div>
      <div class="hl-grid reveal">${aboutCards}</div>
    </div>
  </div>
</section>

<!-- PHILOSOPHY -->
<section id="philosophy" class="section dark">
  <div class="dark-grid"></div><div class="glow dg1"></div><div class="glow dg2"></div>
  <div class="container" style="position:relative">
    <div class="phil-quote reveal">
      <span class="eyebrow"><span class="dot"></span>My Perspective</span>
      <span class="q">${icon("Quote")}</span>
      <p class="quote">&ldquo;${esc(D.philosophy.quote)}&rdquo;</p>
    </div>
    <div class="beliefs">${beliefHTML}</div>
  </div>
</section>

<!-- SERVICES -->
<section id="services" class="section" style="background:var(--surface)">
  <div class="container">
    <div class="head-center reveal"><span class="eyebrow"><span class="dot"></span>Expertise</span><h2 class="h-lg">What I write for you</h2><p class="lead">Three focused services — each engineered around hooks, pacing, and clear outcomes.</p></div>
    <div class="svc-grid reveal">${servicesHTML}</div>
  </div>
</section>

<!-- FRAMEWORK -->
<section id="framework" class="section framework">
  <div class="container">
    <div class="head-center reveal"><span class="eyebrow"><span class="dot"></span>Framework</span><h2 class="h-lg">The 4-stage script formula</h2><p class="lead">Why this matters: a repeatable structure that takes viewers from the first second all the way to action.</p></div>
    <div class="stages reveal"><div class="fw-line"></div>${frameworkHTML}</div>
  </div>
</section>

<!-- PORTFOLIO -->
<section id="portfolio" class="section" style="background:var(--surface)">
  <div class="container">
    <div class="head-center reveal"><span class="eyebrow"><span class="dot"></span>Featured Scripts</span><h2 class="h-lg">Selected work &amp; proof of quality</h2><p class="lead">Real scripts, broken down stage by stage. Filter by language or category, then read the full annotated breakdown.</p></div>
    <div class="filters reveal">
      <div class="filter-row"><span class="flabel">${icon("Languages")} Language</span>${langChips}</div>
      <div class="filter-row"><span class="flabel">${icon("Globe")} Category</span>${catChips}</div>
    </div>
    <div class="cards-grid" id="cards">${scriptCards}</div>
    <p class="empty" id="empty" style="display:none">No scripts match this combination yet. Try another filter.</p>
  </div>
</section>

<!-- CASE STUDIES -->
<section id="case-studies" class="section">
  <div class="container">
    <div class="head-center reveal"><span class="eyebrow"><span class="dot"></span>Case Studies</span><h2 class="h-lg">How the right story changes outcomes</h2><p class="lead">From challenge to measurable impact — the thinking behind two standout scripts.</p></div>
    <div class="cs-grid reveal">${caseHTML}</div>
    <div class="reveal" style="text-align:center;margin-top:40px"><a href="#contact" class="btn btn-secondary">Want results like these? ${icon("ArrowRight")}</a></div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section id="testimonials" class="section" style="background:var(--surface)">
  <div class="container">
    <div class="head-center reveal"><span class="eyebrow"><span class="dot"></span>Client Reviews</span><h2 class="h-lg">Trusted by creators &amp; brands</h2><p class="lead">What clients say after working with Kirankumar on their content.</p></div>
    <div class="testi-grid reveal">${testiHTML}</div>
  </div>
</section>

<!-- INSIGHTS -->
<section id="insights" class="section">
  <div class="container">
    <div class="head-center reveal"><span class="eyebrow"><span class="dot"></span>Insights</span><h2 class="h-lg">Ideas behind the scripts</h2><p class="lead">Short reads on the psychology, structure, and storytelling that make content convert.</p></div>
    <div class="blog-grid reveal">${insightHTML}</div>
  </div>
</section>

<!-- LANGUAGES -->
<section id="languages" class="section" style="background:var(--surface)">
  <div class="container lang-grid">
    <div class="reveal">
      <span class="eyebrow"><span class="dot"></span>Languages</span>
      <h2 class="h-lg">Bilingual edge: <span class="grad-text">English &amp; Kannada</span></h2>
      <p class="lead">Reach global and regional audiences with scripts written natively in both languages — no awkward translations, just content that lands.</p>
      <div class="lang-rows">${langBlocks}</div>
      <a href="#contact" class="btn btn-primary" style="margin-top:32px">${icon("Languages")} Request Kannada Samples ${icon("ArrowRight")}</a>
    </div>
    <div class="reveal lang-visual">
      <div class="big-letters"><span class="en">EN</span><span class="amp">&amp;</span><span class="kn">ಕ</span></div>
      <p>Native scripts in English &amp; Kannada for global and regional audiences.</p>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" class="section">
  <div class="container">
    <div class="head-center reveal"><span class="eyebrow"><span class="dot"></span>Contact</span><h2 class="h-lg">Send a message / book a project</h2><p class="lead">Tell me what you're building. I'll reply with ideas, timelines, and next steps.</p></div>
    <div class="contact-cards reveal">${contactCardsHTML}</div>
    <form class="form reveal" id="enquiry" novalidate>
      <div class="form-grid">
        <div class="field"><label for="name">Your Name</label><input id="name" type="text" placeholder="e.g. Vishal Sharma"><p class="err-msg" data-for="name">Please enter your name.</p></div>
        <div class="field"><label for="email">Email Address</label><input id="email" type="email" placeholder="you@example.com"><p class="err-msg" data-for="email">Please enter a valid email address.</p></div>
      </div>
      <div class="field-block"><label>Select Project Niche</label><div class="pills" id="niches">${nicheBtns}</div><p class="err-msg" data-for="niche">Select a project niche.</p></div>
      <div class="field-block"><label for="brief">Project Brief</label><textarea id="brief" rows="6" placeholder="What are you creating? Audience, goals, format, deadline…"></textarea><p class="err-msg" data-for="brief">Tell me a little about your project.</p></div>
      <div class="field-block"><label>Estimated Budget Range</label><div class="pills" id="budgets">${budgetBtns}</div></div>
      <div class="form-foot">
        <button type="submit" class="btn btn-primary">${icon("Send")} Send Message ${icon("ArrowRight")}</button>
        <span class="form-success" id="formOk">${icon("CheckCircle2")} Opening your email client… I'll reply soon!</span>
      </div>
    </form>
  </div>
</section>
</main>

<!-- FOOTER -->
<footer class="dark">
  <div class="dark-grid"></div>
  <div class="container" style="position:relative">
    <div class="foot-cta">
      <div><h2>Ready to write scripts that actually convert?</h2><p>Let's turn your next idea into high-retention content — in English or Kannada.</p></div>
      <div class="foot-cta-btns"><a href="#contact" class="btn btn-primary">Start a project ${icon("ArrowRight")}</a><a href="${esc(D.contact.whatsappHref)}" target="_blank" rel="noopener" class="btn btn-ghost">${icon("MessageCircle")} WhatsApp</a></div>
    </div>
    <div class="foot-main">
      <div class="foot-brand">
        <a href="#home" class="brand"><span class="logo">${esc(D.brand.initials)}</span><span style="color:#fff">${esc(D.brand.name)}</span></a>
        <p>${esc(D.brand.role)}. High-retention short-form scripts &amp; personal-brand content in English &amp; Kannada.</p>
        <div class="foot-soc"><button type="button" class="foot-mail" id="footMailBtn" aria-label="Copy email address" title="Copy email">${icon("Mail")}</button><a href="${esc(D.contact.whatsappHref)}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("MessageCircle")}</a><a href="${esc(D.contact.instagramHref)}" target="_blank" rel="noopener" aria-label="Instagram">${icon("Instagram")}</a></div>
      </div>
      <div class="foot-col"><h3>Contact</h3><div class="foot-contact"><span class="foot-email"><span class="fe-text" id="footEmail" title="Tap to copy">${esc(D.contact.email)}</span><button type="button" class="fe-copy" id="footCopyBtn">Copy</button></span><a href="${esc(D.contact.whatsappHref)}" target="_blank" rel="noopener">${esc(D.contact.whatsapp)}</a><a href="${esc(D.contact.instagramHref)}" target="_blank" rel="noopener">${esc(D.contact.instagram)}</a></div></div>
    </div>
    <div class="foot-bottom"><p>© ${year} ${esc(D.brand.name)}. All rights reserved.</p><button class="top-btn" onclick="window.scrollTo({top:0,behavior:'smooth'})">Back to top ${icon("ArrowUp")}</button></div>
  </div>
</footer>

<button class="bt" id="bt" aria-label="Back to top">${icon("ArrowUp")}</button>

<!-- MODAL -->
<div class="modal" id="modal" role="dialog" aria-modal="true">
  <div class="modal-box">
    <div class="modal-head"><div><div class="badges" id="mBadges"></div><h3 id="mTitle"></h3></div><button class="modal-close" id="mClose" aria-label="Close">${icon("X")}</button></div>
    <div class="modal-body" id="mBody"></div>
    <div class="modal-foot"><button class="btn btn-copy" id="mCopy">${icon("Copy")} <span>Copy Annotated Script</span></button><a href="#contact" class="btn btn-primary" id="mHire">Hire Kirankumar for this script ${icon("ArrowRight")}</a></div>
  </div>
</div>

<script>
const SCRIPTS = ${JSON.stringify(scriptData)};
const COPY_SVG = \`${icon("Copy")}\`, CHECK_SVG = \`${icon("Check")}\`;

// nav scroll + active
const hdr=document.getElementById('hdr');
const navIds=${JSON.stringify(D.nav.map((n) => n.id))};
function onScroll(){
  hdr.classList.toggle('scrolled',scrollY>16);
  document.getElementById('bt').classList.toggle('show',scrollY>600);
  let cur=navIds[0];
  for(const id of navIds){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=window.innerHeight*0.45)cur=id;}
  document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.getAttribute('data-nav')===cur));
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
document.getElementById('bt').onclick=()=>scrollTo({top:0,behavior:'smooth'});

// mobile drawer
const drawer=document.getElementById('drawer'),burger=document.getElementById('burger');
burger.onclick=()=>drawer.classList.toggle('open');
drawer.querySelectorAll('a').forEach(a=>a.onclick=()=>drawer.classList.remove('open'));

// reveal on scroll
const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{rootMargin:'-60px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// counters
const cio=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){const el=e.target,to=+el.dataset.to,suf=el.dataset.suffix||'';let s=null;const dur=1500;function tick(t){s=s||t;const p=Math.min((t-s)/dur,1);el.textContent=Math.round((1-Math.pow(1-p,3))*to)+suf;if(p<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);cio.unobserve(el);}}),{rootMargin:'-40px'});
document.querySelectorAll('.counter').forEach(el=>cio.observe(el));

// filters
let fLang='All',fCat='All';
function applyFilters(){
  let shown=0;
  document.querySelectorAll('.card.script').forEach(c=>{
    const okL=fLang==='All'||c.dataset.lang===fLang;
    const okC=fCat==='All'||c.dataset.cats.split('|').includes(fCat);
    const show=okL&&okC;c.classList.toggle('hide',!show);if(show)shown++;
  });
  document.getElementById('empty').style.display=shown?'none':'block';
}
document.querySelectorAll('.lang-chip').forEach(b=>b.onclick=()=>{document.querySelectorAll('.lang-chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');fLang=b.dataset.lang;applyFilters();});
document.querySelectorAll('.cat-chip').forEach(b=>b.onclick=()=>{document.querySelectorAll('.cat-chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');fCat=b.dataset.cat;applyFilters();});

// copy helper
function copyText(txt,btn){
  const done=()=>{const sp=btn.querySelector('span');const orig=sp?sp.textContent:'';btn.classList.add('copied');btn.innerHTML=CHECK_SVG+' <span>Copied!</span>';setTimeout(()=>{btn.classList.remove('copied');btn.innerHTML=COPY_SVG+' <span>'+(orig||'Copy Annotated Script')+'</span>';},1800);};
  if(navigator.clipboard&&location.protocol!=='file:'){navigator.clipboard.writeText(txt).then(done).catch(()=>fallback(txt,done));}
  else fallback(txt,done);
}
function fallback(txt,cb){const ta=document.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(ta);cb();}
document.querySelectorAll('.btn-copy[data-slug]').forEach(b=>b.onclick=()=>copyText(SCRIPTS[b.dataset.slug].plain,b));

// modal
const modal=document.getElementById('modal');let curSlug=null;
function openModal(slug){
  curSlug=slug;const s=SCRIPTS[slug];
  document.getElementById('mTitle').textContent=s.title;
  document.getElementById('mBadges').innerHTML='<span class="lang-badge '+(s.language==='Kannada'?'kn-badge':'')+'">'+s.language+'</span>'+s.categories.map(c=>'<span class="tag">'+c+'</span>').join('');
  document.getElementById('mBody').innerHTML=s.breakdown.map(b=>'<div class="mb-step"><p class="mb-label">'+b.label+'</p><p class="mb-text'+(s.language==='Kannada'?' kn':'')+'">'+b.text.replace(/</g,'&lt;')+'</p></div>').join('');
  modal.classList.add('open');document.body.style.overflow='hidden';
}
function closeModal(){modal.classList.remove('open');document.body.style.overflow='';}
document.querySelectorAll('.open-modal').forEach(b=>b.onclick=()=>openModal(b.dataset.slug));
document.getElementById('mClose').onclick=closeModal;
modal.onclick=e=>{if(e.target===modal)closeModal();};
addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
document.getElementById('mCopy').onclick=()=>copyText(SCRIPTS[curSlug].plain,document.getElementById('mCopy'));
document.getElementById('mHire').onclick=closeModal;

// niche + budget pills
let niche='',budget='';
document.querySelectorAll('.niche-pill').forEach(p=>p.onclick=()=>{document.querySelectorAll('.niche-pill').forEach(x=>x.classList.remove('active'));p.classList.add('active');niche=p.dataset.val;clearErr('niche');});
document.querySelectorAll('.budget-pill').forEach(p=>p.onclick=()=>{document.querySelectorAll('.budget-pill').forEach(x=>x.classList.remove('active'));p.classList.add('active');budget=p.dataset.val;});

// form validation (only after submit)
let submitted=false;
function clearErr(name){if(!submitted)return;const m=document.querySelector('.err-msg[data-for="'+name+'"]');if(m)m.classList.remove('show');const f=document.getElementById(name);if(f)f.classList.remove('err');}
['name','email','brief'].forEach(id=>document.getElementById(id).addEventListener('input',()=>clearErr(id)));
document.getElementById('enquiry').addEventListener('submit',e=>{
  e.preventDefault();submitted=true;
  const name=document.getElementById('name'),email=document.getElementById('email'),brief=document.getElementById('brief');
  const errs={};
  if(!name.value.trim())errs.name=1;
  if(!email.value.trim()||!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value))errs.email=1;
  if(!niche)errs.niche=1;
  if(!brief.value.trim())errs.brief=1;
  ['name','email','brief'].forEach(id=>{const f=document.getElementById(id);f.classList.toggle('err',!!errs[id]);});
  document.querySelectorAll('.err-msg').forEach(m=>m.classList.toggle('show',!!errs[m.dataset.for]));
  if(Object.keys(errs).length===0){
    const subj=encodeURIComponent('New project enquiry — '+(niche||'Content')+' ('+name.value+')');
    const body=encodeURIComponent('Name: '+name.value+'\\nEmail: '+email.value+'\\nProject Niche: '+niche+'\\nEstimated Budget: '+(budget||'Not specified')+'\\n\\nProject Brief:\\n'+brief.value);
    window.location.href='mailto:${D.contact.email}?subject='+subj+'&body='+body;
    const ok=document.getElementById('formOk');ok.classList.add('show');setTimeout(()=>ok.classList.remove('show'),6000);
  }
});

// Email shown as plain, readable text + copy (stops mobile browsers masking the mailto: link as "protected")
const EMAIL = "kirankumarkulagod727@outlook.com";
function copyEmail(btn){
  const done = () => {
    if(!btn) return;
    const hasText = btn.textContent && btn.textContent.trim().length > 0;
    if(hasText){
      const orig = btn.textContent;
      btn.textContent = "Copied!";
      btn.classList.add("ok");
      setTimeout(function(){ btn.textContent = orig; btn.classList.remove("ok"); }, 1600);
    } else {
      btn.classList.add("ok");
      setTimeout(function(){ btn.classList.remove("ok"); }, 1600);
    }
  };
  if(navigator.clipboard && location.protocol !== "file:"){
    navigator.clipboard.writeText(EMAIL).then(done).catch(function(){ fallback(EMAIL, done); });
  } else {
    fallback(EMAIL, done);
  }
}
const emailCard = document.getElementById("emailCard");
if(emailCard){
  const fire = function(){ copyEmail(document.getElementById("emailCopy")); };
  emailCard.addEventListener("click", fire);
  emailCard.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); fire(); } });
}
const footCopyBtn = document.getElementById("footCopyBtn");
if(footCopyBtn) footCopyBtn.addEventListener("click", function(){ copyEmail(footCopyBtn); });
const footEmail = document.getElementById("footEmail");
if(footEmail) footEmail.addEventListener("click", function(){ copyEmail(footCopyBtn); });
const footMailBtn = document.getElementById("footMailBtn");
if(footMailBtn) footMailBtn.addEventListener("click", function(){ copyEmail(footMailBtn); });

</script>
</body>
</html>`;

mkdirSync("html-review", { recursive: true });
mkdirSync("html-review/assets", { recursive: true });
writeFileSync("html-review/index.html", html);
console.log("Wrote html-review/index.html —", html.length, "bytes");
