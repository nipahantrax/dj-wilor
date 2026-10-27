import { expect, test } from "@playwright/test";

test.describe("Portafolio público de WILOR", () => {
  test("presenta identidad, trabajo, sello, redes y contacto verificado", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/WILOR/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Desde el Trópico");
    await expect(page.getByRole("heading", { name: /Un recorrido en canciones/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Ver La Cita en YouTube/i })).toHaveAttribute("href", "https://www.youtube.com/watch?v=-vFXHU1r0WM");
    await expect(page.getByRole("heading", { name: /El sonido también/i })).toBeVisible();
    await expect(page.getByText(/LANZAMIENTOS CON CRÉDITO SELVA MUSIC GROUP/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Spotify/i }).first()).toHaveAttribute("href", /open\.spotify\.com/);
    await expect(page.getByRole("link", { name: /Escribir por email/i })).toHaveAttribute("href", /miguelangelmedinacali@gmail\.com/);
    await expect(page.getByRole("link", { name: /Llamar · \+591 695 28962/i })).toHaveAttribute("href", "tel:+59169528962");
  });

  test("expone los créditos de WILOR y enlaza las fuentes originales", async ({ page }) => {
    await page.goto("/#portafolio");
    await expect(page.getByRole("heading", { name: "Vuelve Vuelve" })).toBeVisible();
    await expect(page.getByText("WILOR · LESLY CH · JOSÉ PUYAL", { exact: true }).last()).toBeVisible();
    await expect(page.getByRole("link", { name: /Visitar página del sello/i })).toHaveAttribute("href", "https://www.facebook.com/61591489856517/");
  });

  test("carga el video oficial solo cuando se solicita la reproducción", async ({ page }) => {
    await page.goto("/#portafolio");
    const playButton = page.getByRole("button", { name: "Reproducir video oficial de Vuelve Vuelve" });
    await expect(playButton).toBeVisible();
    await playButton.click();
    await expect(page.locator('iframe[src*="TlTuiVFTb0g"]')).toHaveAttribute("src", /autoplay=1/);
  });

  test("muestra el retrato público de WILOR al abrir la trayectoria", async ({ page }) => {
    await page.goto("/#trayectoria");
    const portrait = page.locator("#trayectoria img");
    await portrait.scrollIntoViewIfNeeded();
    await expect(portrait).toHaveJSProperty("naturalWidth", 639);
  });

  test("abre y cierra la navegación móvil por enlaces acessíveis", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Abrir navegación" });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.getByRole("button", { name: "Cerrar navegación" })).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Trayectoria" }).click();
    await expect(page).toHaveURL(/#trayectoria$/);
    await expect(page.getByRole("button", { name: "Abrir navegación" })).toHaveAttribute("aria-expanded", "false");
  });
});
