import type { MetadataRoute } from "next";

/**
 * Web app manifest. Not a PWA — there is no service worker and no offline
 * story, and a marketing site does not need one. This exists so the browser
 * has a real name, colours and icon when someone adds the site to a home
 * screen, instead of guessing from the URL.
 *
 * Colours are the design tokens from globals.css: canvas #FAF9F6, accent
 * #0F766E. Keep them in step if the tokens change.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Corewell Systems",
    short_name: "Corewell",
    description:
      "Custom operational software for clinics, hotels, schools and shops.",
    start_url: "/",
    display: "browser",
    background_color: "#FAF9F6",
    theme_color: "#FAF9F6",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "256x256", type: "image/png" },
    ],
  };
}
