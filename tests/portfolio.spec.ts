import { expect, test } from "@playwright/test";

const projectRoutes = [
  "/projects/ruang-usaha-kita",
  "/projects/online-bus-ticketing-database",
  "/projects/focusflow-productivity-app",
];

test("homepage exposes recruiter-critical content and working copy action", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("thoughtful digital experiences");
  await expect(page.locator("#work article")).toHaveCount(3);
  await expect(page.getByRole("link", { name: /View case study/i })).toHaveCount(3);
  await expect(page.getByRole("link", { name: /Live project/i })).toHaveCount(0);
  await page.getByRole("button", { name: /Copy indra.portfolio/i }).click();
  await expect(page.getByText("Email address copied to clipboard.")).toBeAttached();
});

for (const route of projectRoutes) {
  test(`${route} renders a complete case study`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What exists today" })).toBeVisible();
    await expect(page.getByText("Next case study")).toBeVisible();
  });
}

test("resume and custom 404 render", async ({ page }) => {
  await page.goto("/resume");
  await expect(page.getByRole("heading", { name: "Indra Surya Adinata" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Print / Save as PDF" })).toBeVisible();
  await page.goto("/projects/not-a-real-project");
  await expect(page.getByRole("heading", { name: "This route is outside the map." })).toBeVisible();
});

test("mobile menu is keyboard-dismissible and pages do not overflow", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasOverflow).toBe(false);
});

test("supports reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".reveal").first()).toHaveCSS("opacity", "1");
});

for (const viewport of [
  { width: 360, height: 800 },
  { width: 768, height: 900 },
  { width: 1024, height: 900 },
  { width: 1440, height: 1000 },
]) {
  test(`homepage visual surface at ${viewport.width}px`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(async () => { await document.fonts.ready; });
    const overflow = await page.evaluate(() => ({
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      offenders: Array.from(document.querySelectorAll("body *"))
        .filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
        .slice(0, 8)
        .map((element) => `${element.tagName.toLowerCase()}.${element.className}`),
    }));
    expect(overflow, JSON.stringify(overflow.offenders)).toMatchObject({ hasOverflow: false });
    expect(errors).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`homepage-${viewport.width}.png`), fullPage: true });
  });
}

test("case study and resume visual surfaces", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects/ruang-usaha-kita");
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.screenshot({ path: testInfo.outputPath("case-study.png"), fullPage: true });
  await page.goto("/resume");
  await page.screenshot({ path: testInfo.outputPath("resume.png"), fullPage: true });
  await page.emulateMedia({ media: "print" });
  await expect(page.getByRole("button", { name: "Print / Save as PDF" })).toBeHidden();
  await page.pdf({ path: testInfo.outputPath("resume-a4.pdf"), format: "A4", printBackground: true });
});
