import puppeteer from "puppeteer";

const BASE = "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});

async function settle(page) {
  // trigger lazy reveals by scrolling through the whole page
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo(0, 0);
  });
  await sleep(700);
}

// ---------- DESKTOP ----------
const desktop = await browser.newPage();
await desktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await desktop.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
await settle(desktop);

// Full page
await desktop.screenshot({ path: "previews/01-desktop-full.png", fullPage: true });

// Hero close-up (top of page)
await desktop.evaluate(() => window.scrollTo(0, 0));
await sleep(500);
await desktop.screenshot({ path: "previews/02-hero.png" });

// Helper: scroll a section into view and screenshot the viewport
async function shotSection(id, file, offset = -80) {
  await desktop.evaluate(
    ({ id, offset }) => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo(0, top);
      }
    },
    { id, offset }
  );
  await sleep(650);
  await desktop.screenshot({ path: `previews/${file}` });
}

await shotSection("about", "03-about.png");
await shotSection("philosophy", "04-philosophy.png");
await shotSection("services", "05-services.png");
await shotSection("framework", "06-framework.png");
await shotSection("portfolio", "07-portfolio.png");

// Portfolio: click a Kannada filter chip then open a breakdown modal
await desktop.evaluate(() => {
  const btns = [...document.querySelectorAll("button")];
  const k = btns.find((b) => b.textContent.trim() === "Kannada");
  if (k) k.click();
});
await sleep(600);
await shotSection("portfolio", "08-portfolio-filtered.png");

// open first "View Script Breakdown" modal
await desktop.evaluate(() => {
  const b = [...document.querySelectorAll("button")].find((x) =>
    x.textContent.includes("View Script Breakdown")
  );
  if (b) b.click();
});
await sleep(800);
await desktop.screenshot({ path: "previews/09-script-modal.png" });
// close modal
await desktop.keyboard.press("Escape").catch(() => {});
await desktop.evaluate(() => {
  const c = [...document.querySelectorAll('button[aria-label="Close"]')][0];
  if (c) c.click();
});
await sleep(400);

await shotSection("case-studies", "10-case-studies.png");
await shotSection("testimonials", "11-testimonials.png");
await shotSection("insights", "12-insights.png");
await shotSection("languages", "13-languages.png");
await shotSection("contact", "14-contact.png");

// footer
await desktop.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await sleep(600);
await desktop.screenshot({ path: "previews/15-footer.png" });

// ---------- MOBILE ----------
const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
await mobile.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
await settle(mobile);
await mobile.evaluate(() => window.scrollTo(0, 0));
await sleep(400);
await mobile.screenshot({ path: "previews/16-mobile-hero.png" });
await mobile.screenshot({ path: "previews/17-mobile-full.png", fullPage: true });

// open mobile drawer
await mobile.evaluate(() => {
  const b = document.querySelector('button[aria-label="Open menu"]');
  if (b) b.click();
});
await sleep(500);
await mobile.screenshot({ path: "previews/18-mobile-menu.png" });

await browser.close();
console.log("DONE");
