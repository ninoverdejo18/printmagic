/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RouteConfig {
  pageId: string;
  hash: string;
  title: string;
  aliases?: string[];
  serviceCategory?: string;
  serviceQuote?: string;
}

export const ROUTE_MAP: RouteConfig[] = [
  {
    pageId: "home",
    hash: "/#home",
    title: "Home",
    aliases: ["/#", "#home", "#/", "#", ""],
  },
  {
    pageId: "about",
    hash: "/#about",
    title: "About Us",
    aliases: ["#about", "/#about-section", "/#about-flow"],
  },
  {
    pageId: "tarpaulin-printing",
    hash: "/#services/tarpaulin-printing",
    title: "Tarpaulin Printing",
    aliases: ["/services/tarpaulin-printing", "tarpaulin-printing", "#services/tarpaulin-printing"],
    serviceCategory: "large-format",
    serviceQuote: "Tarpaulin",
  },
  {
    pageId: "layout-design",
    hash: "/#services/layout-graphic-design",
    title: "Layout & Graphic Design",
    aliases: [
      "/services/layout-graphic-design",
      "layout-graphic-design",
      "graphic-design",
      "layout-design",
      "#services/layout-graphic-design"
    ],
    serviceCategory: "",
    serviceQuote: "Layout and Design",
  },
  {
    pageId: "souvenirs-giveaways",
    hash: "/#services/souvenirs-giveaways",
    title: "Souvenirs & Corporate Giveaways",
    aliases: ["/services/souvenirs-giveaways", "souvenirs-giveaways", "#services/souvenirs-giveaways"],
    serviceCategory: "promotional-items",
    serviceQuote: "Custom Giveaways",
  },
  {
    pageId: "document-scanning-printing",
    hash: "/#Document Scanning and Printing",
    title: "Document Scanning & Printing",
    aliases: [
      "/Document Scanning and Printing",
      "/Document%20Scanning%20and%20Printing",
      "/services/document-scanning-printing",
      "document-scanning-printing",
      "#Document Scanning and Printing",
      "#Document%20Scanning%20and%20Printing"
    ],
    serviceCategory: "",
    serviceQuote: "Document Scanning and Printing",
  },
  {
    pageId: "rush-id",
    hash: "/#Rush ID",
    title: "Rush ID",
    aliases: [
      "/Rush ID",
      "/Rush%20ID",
      "/services/rush-id",
      "rush-id",
      "#Rush ID",
      "#Rush%20ID"
    ],
    serviceCategory: "promotional-items",
    serviceQuote: "PVC IDs",
  },
  {
    pageId: "business-cards",
    hash: "/#services/business-cards",
    title: "Business Cards",
    aliases: ["/services/business-cards", "business-cards", "business-card", "#services/business-cards"],
    serviceCategory: "business-printing",
    serviceQuote: "Calling Cards / Business Cards",
  },
  {
    pageId: "tshirt-printing",
    hash: "/#services/t-shirt-printing",
    title: "T-Shirt Printing",
    aliases: ["/services/t-shirt-printing", "t-shirt-printing", "tshirt-printing", "#services/t-shirt-printing"],
    serviceCategory: "apparel-printing",
    serviceQuote: "T-Shirt Printing",
  },
  {
    pageId: "pvc-id-lace",
    hash: "/#services/pvc-id-id-lace",
    title: "PVC ID & ID Lace",
    aliases: ["/services/pvc-id-id-lace", "pvc-id-id-lace", "pvc-id-lace", "#services/pvc-id-id-lace"],
    serviceCategory: "promotional-items",
    serviceQuote: "PVC IDs & ID Lace",
  },
  {
    pageId: "id-application-links",
    hash: "/#services/id-application-links",
    title: "ID Application Links",
    aliases: ["/services/id-application-links", "id-application-links", "#services/id-application-links"],
    serviceCategory: "credentials",
    serviceQuote: "Online ID Application",
  },
  {
    pageId: "nameplates",
    hash: "/#services/nameplates-signage",
    title: "Nameplates & Signage",
    aliases: ["/services/nameplates-signage", "nameplates-signage", "nameplates", "nameplate", "#services/nameplates-signage"],
    serviceCategory: "large-format",
    serviceQuote: "Sintra Board / Nameplates",
  },
  {
    pageId: "stickers",
    hash: "/#services/custom-stickers-decals",
    title: "Custom Stickers & Decals",
    aliases: ["/services/custom-stickers-decals", "custom-stickers-decals", "stickers", "#services/custom-stickers-decals"],
    serviceCategory: "large-format",
    serviceQuote: "Stickers & Decals",
  },
  {
    pageId: "contact",
    hash: "/#contact",
    title: "Contact Us",
    aliases: ["#contact", "/#contact-us", "contact"],
  },
];

/**
 * Normalizes input hash or page key string for robust matching.
 */
function normalizeHashString(input: string): string {
  let cleaned = input.trim();
  try {
    cleaned = decodeURIComponent(cleaned);
  } catch (e) {
    // ignore decode error
  }
  // Strip leading slash or hash variations
  if (cleaned.startsWith("/#")) cleaned = cleaned.slice(2);
  else if (cleaned.startsWith("#/")) cleaned = cleaned.slice(2);
  else if (cleaned.startsWith("#")) cleaned = cleaned.slice(1);
  else if (cleaned.startsWith("/")) cleaned = cleaned.slice(1);

  return cleaned.toLowerCase();
}

/**
 * Finds the matching RouteConfig for a given hash or route identifier.
 */
export function getRouteByHash(hashInput: string): RouteConfig {
  const normalized = normalizeHashString(hashInput);

  if (!normalized) {
    return ROUTE_MAP[0]; // Default Home
  }

  for (const route of ROUTE_MAP) {
    const routeNormalized = normalizeHashString(route.hash);
    if (routeNormalized === normalized) {
      return route;
    }
    if (route.pageId.toLowerCase() === normalized) {
      return route;
    }
    if (route.aliases) {
      for (const alias of route.aliases) {
        if (normalizeHashString(alias) === normalized) {
          return route;
        }
      }
    }
  }

  return ROUTE_MAP[0];
}

/**
 * Finds the RouteConfig by pageId.
 */
export function getRouteByPageId(pageId: string): RouteConfig {
  const matched = ROUTE_MAP.find(r => r.pageId === pageId);
  return matched || ROUTE_MAP[0];
}

/**
 * Updates the browser location hash quietly without triggering page reload or unexpected scroll jump.
 */
export function updateHashSilently(hash: string) {
  if (window.location.hash !== hash && `#${window.location.hash}` !== hash) {
    window.history.replaceState(null, "", hash);
  }
}
