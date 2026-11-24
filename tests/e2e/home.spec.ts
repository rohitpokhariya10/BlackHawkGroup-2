import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const sections = ["home", "about", "values", "options", "owners", "properties", "communities", "office", "team", "connections", "buyers", "sellers", "contact"];

test("complete homepage, approved copy, valid anchors and private metadata", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Blackhawk Realty Group/);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveText("Property Decisions,Made Personal");
  for (const id of sections) await expect(page.locator(`#${id}`)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Basil & Betty Sullivan" })).toBeVisible();
  await expect(page.locator("#owners")).toContainText("Basil Sullivan and Betty Sullivan are the owners of Blackhawk Realty Group.");
  const unresolved = await page.locator('a[href^="#"]').evaluateAll(links => links.map(a => a.getAttribute("href")!).filter(href => !document.getElementById(href.slice(1))));
  expect(unresolved).toEqual([]);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect((await page.request.get("/")).headers()["x-robots-tag"]).toContain("noindex");
  expect(await (await page.request.get("/robots.txt")).text()).toContain("Disallow: /");
  await expect(page.locator('#office a[href="tel:+14704559103"]')).toHaveText("470-455-9103");
  await expect(page.locator('#office a[href^="mailto:"]')).toHaveText("Contact@blackhawkrealtygroup.com");
  expect(errors).toEqual([]);
});

test("every brand mark, logo link name and favicon uses the BRG monogram", async ({ page }) => {
  await page.goto("/");
  const marks = page.locator("svg.brand__monogram, svg.watermark");
  expect(await marks.count()).toBeGreaterThan(0);
  expect(await marks.evaluateAll(svgs => [...new Set(svgs.map(svg => svg.textContent))])).toEqual(["BRG"]);
  expect(await marks.evaluateAll(svgs => svgs.every(svg => svg.getAttribute("aria-hidden") === "true"))).toBe(true);
  await expect(page.getByRole("link", { name: "BRG Blackhawk Realty Group home", exact: true })).toHaveCount(2);
  const icon = await page.request.get((await page.locator('link[rel~="icon"]').first().getAttribute("href"))!);
  expect(await icon.text()).toContain(">BRG</text>");
});

for (const width of [1920, 1440, 1280, 1024, 768, 430, 390, 375, 320]) {
  test(`responsive layout has no overflow and all imagery loads at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    for (const id of sections) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `horizontal overflow at #${id}`).toBe(true);
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator("main img").evaluateAll(images => images.filter(img => !(img as HTMLImageElement).complete || (img as HTMLImageElement).naturalWidth === 0).map(img => img.getAttribute("src")))).toEqual([]);
    const headings = await page.locator("main h1, main h2, main h3").evaluateAll(es => es.filter(e => e.scrollWidth > e.clientWidth + 2).map(e => e.textContent));
    expect(headings).toEqual([]);
  });
}

test("desktop dropdown, anchored navigation, values and back-to-top", async ({ page }) => {
  await page.goto("/");
  const about = page.getByRole("navigation", { name: "Main navigation" }).getByRole("button", { name: "About", exact: true });
  await about.click();
  await expect(about).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "Our Core Values", exact: true }).click();
  await expect(page).toHaveURL(/#values$/);
  const care = page.getByRole("button", { name: /Care — Read our value/ });
  await care.click();
  await expect(care).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#value-Care")).toHaveCSS("opacity", "1");
  await page.getByRole("link", { name: "Back to top" }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await expect(page.locator(".site-header")).not.toHaveClass(/scrolled/);
});

test("mobile menu traps focus, closes on Escape and follows section links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation menu" });
  await toggle.click();
  const menu = page.getByRole("dialog", { name: "Navigation menu" });
  await expect(menu).toBeVisible();
  for (let i = 0; i < 22; i++) { await page.keyboard.press("Tab"); expect(await menu.evaluate(el => el.contains(document.activeElement))).toBe(true); }
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await menu.getByRole("link", { name: "Sell", exact: true }).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#sellers$/);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("inquiry validates locally and never claims delivery", async ({ page }) => {
  const submissions: string[] = [];
  page.on("request", request => { if (request.method() === "POST") submissions.push(request.url()); });
  await page.goto("/");
  await page.getByRole("button", { name: "Get in Touch", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Preview Inquiry" }).click();
  await expect(dialog.getByLabel("First name")).toBeFocused();
  await dialog.getByLabel("First name").fill("Demo");
  await dialog.getByLabel("Last name").fill("Visitor");
  await dialog.getByLabel("Email", { exact: true }).fill("demo@example.com");
  await dialog.getByLabel("Your message").fill("This is a local demonstration inquiry.");
  await dialog.getByRole("button", { name: "Preview Inquiry" }).click();
  await expect(dialog.getByRole("status")).toContainText("Nothing has been sent");
  expect(submissions).toEqual([]);
  await dialog.getByRole("button", { name: "Return to Homepage" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Get in Touch", exact: true })).toBeFocused();
});

test("preferences, listing and blog previews are honest and functional", async ({ page }) => {
  await page.goto("/");
  await page.locator('select[name="intent"]').selectOption("Leasing");
  await page.getByLabel("Preferred city or ZIP").fill("Decatur");
  await page.getByRole("button", { name: "Explore Options", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("combobox")).toHaveValue("Leasing");
  await expect(dialog.getByLabel("Your message")).toHaveValue(/Decatur/);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "View Listings", exact: true }).click();
  await expect(dialog).toContainText("The property photographs on this page are illustrative");
  await page.keyboard.press("Escape");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("button", { name: "Blog", exact: true }).click();
  await expect(dialog).toContainText("not published articles");
});

test("page and inquiry meet WCAG A/AA automated checks", async ({ page }) => {
  await page.goto("/");
  const pageAudit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(pageAudit.violations).toEqual([]);
  await page.getByRole("button", { name: "Get in Touch", exact: true }).click();
  const modalAudit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(modalAudit.violations).toEqual([]);
});

test("mobile menu meets automated accessibility checks", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
});

test("content remains readable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole("heading", { name: "A Different Search for Every Client" })).toBeVisible();
  await expect(page.locator("#owners .body-copy")).toBeVisible();
  await expect.poll(() => page.locator("[data-reveal]").evaluateAll(es => es.filter(e => getComputedStyle(e).opacity === "0").length)).toBe(0);
  await context.close();
});

test("motion reveals once and respects live reduced-motion changes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const heading = page.locator("#values .section-heading");
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveCSS("opacity", "1", { timeout: 7000 });
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await expect(heading).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  // GSAP reverts hidden reveal states from an asynchronous media-query change event.
  await expect.poll(() => page.locator("[data-reveal]").evaluateAll(es => es.filter(e => getComputedStyle(e).opacity === "0").length)).toBe(0);
});
