/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PrintingCategory, DigitalServiceItem, PortfolioItem, ReviewItem } from './types';

// ============================================================================
// IMAGE CONVENTIONS NOTE:
// All images below use high-quality Unsplash URLs representing realistic printing
// and design assets. They are marked with comments so they can be easily replaced
// with official PrintMagic assets once available.
// ============================================================================

export const printingCategories: PrintingCategory[] = [
  {
    id: "large-format",
    title: "Large Format Printing",
    description: "High-impact outdoor and indoor advertising materials designed to catch everyone's eye.",
    iconName: "Maximize",
    items: [
      {
        id: "tarpaulin",
        name: "Tarpaulin",
        description: "Durable, weather-resistant tarps for events, announcements, and commercial billboards.",
        // PLACEHOLDER: Replace with actual PrintMagic Tarpaulin photo
        image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "signage",
        name: "Signage",
        description: "Professional shop signage in various materials to give your storefront a premium look.",
        // PLACEHOLDER: Replace with actual PrintMagic Signage photo
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "sintra-board",
        name: "Sintra Board",
        description: "Lightweight and rigid PVC boards, perfect for indoor displays, exhibits, and menu boards.",
        // PLACEHOLDER: Replace with actual PrintMagic Sintra Board photo
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "acrylic",
        name: "Acrylic Signs",
        description: "Elegant, glass-like premium signage, perfect for corporate lobbies and executive offices.",
        // PLACEHOLDER: Replace with actual PrintMagic Acrylic photo
        image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "stickers",
        name: "Stickers & Decals",
        description: "Vinyl stickers for products, promotions, or vehicles. Waterproof and scratch-resistant.",
        // PLACEHOLDER: Replace with actual PrintMagic Stickers photo
        image: "https://images.unsplash.com/photo-1572375995501-4b0894dbe0d1?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "roll-up-banner",
        name: "Roll-up Banner",
        description: "Retractable banners that are highly portable, perfect for trade shows, seminars, and store entrance promotions.",
        // PLACEHOLDER: Replace with actual PrintMagic Roll-up Banner photo
        image: "https://images.unsplash.com/photo-1596701062351-df1f8d368a85?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "backlit",
        name: "Backlit Film",
        description: "Translucent film prints that glow brilliantly when placed inside lightboxes.",
        // PLACEHOLDER: Replace with actual PrintMagic Backlit photo
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "business-printing",
    title: "Business Printing",
    description: "Essential physical marketing collaterals to keep your brand looking sharp in business environments.",
    iconName: "Briefcase",
    items: [
      {
        id: "calling-cards",
        name: "Calling Cards / Business Cards",
        description: "Premium weight business cards with matte, glossy, or laminated finishes to make a strong first impression.",
        // PLACEHOLDER: Replace with actual PrintMagic Calling Cards photo
        image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "flyers",
        name: "Flyers",
        description: "High-quality, vibrant hand-out flyers for wide distribution campaigns and local reach.",
        // PLACEHOLDER: Replace with actual PrintMagic Flyers photo
        image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "brochures",
        name: "Brochures",
        description: "Tri-fold, bi-fold or z-fold brochures presenting your detailed business services and menus professionally.",
        // PLACEHOLDER: Replace with actual PrintMagic Brochures photo
        image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "leaflets",
        name: "Leaflets",
        description: "Single-sheet lightweight paper hand-outs, excellent for fast promotions and announcements.",
        // PLACEHOLDER: Replace with actual PrintMagic Leaflets photo
        image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "posters",
        name: "Posters",
        description: "Vibrant custom poster printing in various sizes (A4, A3, up to large custom sizes) with rich color depth.",
        // PLACEHOLDER: Replace with actual PrintMagic Posters photo
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "catalog",
        name: "Catalogues",
        description: "Multi-page stitched product catalogues to detail your inventory, prices, and special offerings.",
        // PLACEHOLDER: Replace with actual PrintMagic Catalog photo
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "menu",
        name: "Menus",
        description: "Laminated, sintra board, or premium booklet menus for restaurants, cafes, and food stalls.",
        // PLACEHOLDER: Replace with actual PrintMagic Menu photo
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "marketing-materials",
    title: "Marketing Materials",
    description: "Eye-catching custom materials for event staging, announcements, and celebratory occasions.",
    iconName: "Megaphone",
    items: [
      {
        id: "banners",
        name: "Banners",
        description: "Custom banner printing for grand openings, sales, or school and community programs.",
        // PLACEHOLDER: Replace with actual PrintMagic Banners photo
        image: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "streamers",
        name: "Streamers",
        description: "Long horizontal and vertical banners, perfect for street promotions and festive hangings.",
        // PLACEHOLDER: Replace with actual PrintMagic Streamers photo
        image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "invitations",
        name: "Invitations",
        description: "Custom invitations with premium finishes for weddings, birthdays, baptisms, and corporate events.",
        // PLACEHOLDER: Replace with actual PrintMagic Invitations photo
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "certificates",
        name: "Certificates",
        description: "Elegant certificates on high-grade textured paper with vibrant, smudge-free custom print details.",
        // PLACEHOLDER: Replace with actual PrintMagic Certificates photo
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "packaging",
    title: "Packaging & Labels",
    description: "Elevate your products with beautiful, custom-branded boxes, bags, and adhesive labels.",
    iconName: "Package",
    items: [
      {
        id: "labels",
        name: "Product Labels",
        description: "Die-cut adhesive labels on glossy, matte, or transparent vinyl. Perfect for jars, bottles, and boxes.",
        // PLACEHOLDER: Replace with actual PrintMagic Labels photo
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "boxes",
        name: "Custom Boxes",
        description: "Fully customized paperboard and corrugated boxes for product packaging and gift hampers.",
        // PLACEHOLDER: Replace with actual PrintMagic Boxes photo
        image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "paper-bags",
        name: "Paper Bags",
        description: "Elegant, customized paper shopping bags with twisted paper or rope handles for retail businesses.",
        // PLACEHOLDER: Replace with actual PrintMagic Paper Bags photo
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "apparel-printing",
    title: "Apparel Printing",
    description: "Premium custom apparel printing for uniforms, sports groups, promotions, and personalized gifts.",
    iconName: "Shirt",
    items: [
      {
        id: "tshirt",
        name: "T-Shirt Printing",
        description: "Comfortable high-grade shirts printed using sublimation, vinyl transfer, or screen-printing.",
        // PLACEHOLDER: Replace with actual PrintMagic T-Shirt photo
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "jersey",
        name: "Jerseys",
        description: "Fully sublimated customized sportswear jerseys for basketball, volleyball, fun runs, and other athletic events.",
        // PLACEHOLDER: Replace with actual PrintMagic Jersey photo
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "hoodie",
        name: "Hoodies & Jackets",
        description: "Warm, cozy outerwear with custom printed logos on front, back, or sleeves.",
        // PLACEHOLDER: Replace with actual PrintMagic Hoodie photo
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "cap",
        name: "Caps & Hats",
        description: "Custom printed baseball caps, trucker caps, or bucket hats for corporate events or casual style.",
        // PLACEHOLDER: Replace with actual PrintMagic Cap photo
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "promotional-items",
    title: "Promotional Items",
    description: "Highly customized merchandise items, perfect for giveaways, corporate client gifting, or souvenirs.",
    iconName: "Gift",
    items: [
      {
        id: "mug",
        name: "Custom Mugs",
        description: "Ceramic mugs printed with sharp, durable graphic colors. Ideal for office giveaways or birthday souvenirs.",
        // PLACEHOLDER: Replace with actual PrintMagic Mug photo
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "lanyard",
        name: "Lanyards",
        description: "Sublimated full-color ID lanyards, perfect for schools, corporate employees, and events.",
        // PLACEHOLDER: Replace with actual PrintMagic Lanyard photo
        image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "id",
        name: "PVC IDs",
        description: "High-quality, durable plastic PVC cards for student IDs, company badges, and membership cards.",
        // PLACEHOLDER: Replace with actual PrintMagic PVC ID photo
        image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "keychain",
        name: "Keychains",
        description: "Custom printed acrylic or rubber keychains, tailored to your custom logo and shape.",
        // PLACEHOLDER: Replace with actual PrintMagic Keychain photo
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "tote-bag",
        name: "Tote Bags",
        description: "Eco-friendly, reusable canvas tote bags customized with high-contrast, trendy digital design prints.",
        // PLACEHOLDER: Replace with actual PrintMagic Tote Bag photo
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
      }
    ]
  }
];

export const digitalServices: DigitalServiceItem[] = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Stunning, high-quality, professional illustrations and custom designs tailored for web, print, and branding.",
    // PLACEHOLDER: Replace with actual PrintMagic Graphic Design photo
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    details: [
      "Custom layout and artwork creation",
      "High-resolution vector files",
      "Print-ready template designs",
      "Event and marketing collaterals"
    ]
  },
  {
    id: "logo-design",
    title: "Logo Design",
    description: "Crafting modern, memorable, and unique brand marks that perfectly capture your business's core identity.",
    // PLACEHOLDER: Replace with actual PrintMagic Logo Design photo
    image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&w=800&q=80",
    details: [
      "Multiple initial design concepts",
      "Revision rounds for concept approval",
      "Full ownership & source files (.AI, .EPS, .PNG, .SVG)",
      "Style sheet with color codes"
    ]
  },
  {
    id: "branding",
    title: "Branding & Identity",
    description: "Creating unified visual guidelines including color theories, typography guides, and layout systems.",
    // PLACEHOLDER: Replace with actual PrintMagic Branding photo
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    details: [
      "Comprehensive Brand Style Guides",
      "Typography pairing & layout rules",
      "Business cards & letterhead designs",
      "Brand voice and tone visual alignment"
    ]
  },
  {
    id: "social-media-design",
    title: "Social Media Design",
    description: "Highly engaging custom banners, post templates, and feed grids that drive customer interactions.",
    // PLACEHOLDER: Replace with actual PrintMagic Social Media photo
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    details: [
      "Optimized sizes for Facebook, Instagram, TikTok",
      "Cohesive campaign post templates",
      "Cover banners & profile frame graphics",
      "High-converting promotional designs"
    ]
  },
  {
    id: "product-mockups",
    title: "Product Mockups",
    description: "Visualizing your logo and branding on apparel, packaging, boxes, and items before printing starts.",
    // PLACEHOLDER: Replace with actual PrintMagic Product Mockups photo
    image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80",
    details: [
      "Photorealistic 3D rendering representation",
      "Apparel and promotional item mockups",
      "Packaging and label container previews",
      "Allows quick layout check before final print run"
    ]
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "port-1",
    title: "Local Café Brand Identity",
    category: "branding",
    categoryLabel: "Branding & Identity",
    // PLACEHOLDER: Replace with actual PrintMagic Local Café Brand Identity photo
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80",
    description: "Complete visual identity, logo design, packaging, and menu boards for an artisanal local cafe.",
    client: "The Daily Grind Cafe",
    year: "2024"
  },
  {
    id: "port-2",
    title: "Corporate Outdoor Tarpaulin Billboard",
    category: "printing",
    categoryLabel: "Printing",
    // PLACEHOLDER: Replace with actual PrintMagic Corporate Outdoor Billboard photo
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    description: "Giant outdoor heavy-duty tarpaulin printing for seasonal corporate promotion with rich weather-resistant ink.",
    client: "Batangas Logistics Inc.",
    year: "2025"
  },
  {
    id: "port-3",
    title: "Minimalist Geometry Logo",
    category: "logo",
    categoryLabel: "Logo Design",
    // PLACEHOLDER: Replace with actual PrintMagic Minimalist Geometry Logo photo
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    description: "A high-concept geometrical emblem designed to fit seamlessly on dark and light branding surfaces.",
    client: "Apex Tech Labs",
    year: "2024"
  },
  {
    id: "port-4",
    title: "Premium Acrylic Main Shop Signage",
    category: "storefront",
    categoryLabel: "Storefront Graphics",
    // PLACEHOLDER: Replace with actual PrintMagic Premium Acrylic Signage photo
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    description: "Laser-cut custom acrylic letters mounted on Sintra board frame with LED backlit features for local boutique.",
    client: "Glow & Co. Boutique",
    year: "2024"
  },
  {
    id: "port-5",
    title: "Delivery Vehicle Custom Full Wrap",
    category: "vehicle-wrap",
    categoryLabel: "Vehicle Wrap",
    // PLACEHOLDER: Replace with actual PrintMagic Delivery Vehicle Custom Full Wrap photo
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
    description: "Highly visible corporate transit branding. Scratch-resistant outdoor laminated vinyl stickers tailored for delivery fleet.",
    client: "FreshMart Express",
    year: "2025"
  },
  {
    id: "port-6",
    title: "Creative Social Media Post Series",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    // PLACEHOLDER: Replace with actual PrintMagic Creative Social Media Post photo
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    description: "Custom social media marketing banners, illustrations, and campaign announcements tailored for modern mobile feeds.",
    client: "NutriFit Supplements",
    year: "2024"
  },
  {
    id: "port-7",
    title: "High-Contrast Window Storefront Graphics",
    category: "storefront",
    categoryLabel: "Storefront Graphics",
    // PLACEHOLDER: Replace with actual PrintMagic Storefront Window Graphics photo
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    description: "Frosted vinyl decals and vibrant colored stickers applied on a primary store window pane to attract pedestrian foot traffic.",
    client: "Urban Threads Batangas",
    year: "2024"
  },
  {
    id: "port-8",
    title: "Sublimated Championship Sports Jerseys",
    category: "printing",
    categoryLabel: "Printing",
    // PLACEHOLDER: Replace with actual PrintMagic Sublimated Sports Jerseys photo
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description: "Dynamic customized championship jerseys with deep-dyed sublimation, keeping prints bright and flexible under sweat.",
    client: "Batangas Knights Athletic Club",
    year: "2025"
  },
  {
    id: "port-9",
    title: "Eco-Friendly Crafted Product Boxes & Labels",
    category: "branding",
    categoryLabel: "Branding",
    // PLACEHOLDER: Replace with actual PrintMagic Eco-Friendly Product Boxes photo
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80",
    description: "Clean organic packaging system comprising bio-kraft carton boxes, printed paper bags, and matching paper stickers.",
    client: "Scented Oasis Candles",
    year: "2024"
  }
];

export const reviews: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Janice De Leon",
    role: "Local Business Owner",
    rating: 5,
    text: "PrintMagic printed our restaurant menus on Sintra Board, and we absolutely love them! The colors are incredibly vibrant, and the material is sturdy and spill-proof. Sulit na sulit! Personal ba? PrintMagic na talaga!",
    date: "June 14, 2026",
    initials: "JL"
  },
  {
    id: "rev-2",
    name: "Marc Alcaraz",
    role: "Event Organizer",
    rating: 5,
    text: "Ordered a massive 12ft x 8ft Tarpaulin on extremely short notice for a corporate conference. They delivered it on time, and the print was perfectly clean without any pixelation. Best customer service in Batangas!",
    date: "May 20, 2026",
    initials: "MA"
  },
  {
    id: "rev-3",
    name: "Theresa Santos",
    role: "E-Commerce Manager",
    rating: 5,
    text: "We requested a full product mockup and packaging box designs for our local cosmetics brand. Their design team is extremely creative and attentive to details. The final printed boxes exceeded our expectations!",
    date: "April 07, 2026",
    initials: "TS"
  },
  {
    id: "rev-4",
    name: "Enzo Gonzales",
    role: "Athletic Team Captain",
    rating: 5,
    text: "The customized sublimation basketball jerseys we ordered for our inter-barangay tournament are incredibly high-quality. Print is deeply embedded and comfortable to wear. Will definitely order caps next!",
    date: "March 22, 2026",
    initials: "EG"
  }
];
