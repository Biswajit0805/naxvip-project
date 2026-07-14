// content.js
// Central place for every piece of *editable* site content:
// announcement bar text, hero copy, category cards, product cards,
// banners, club/newsletter copy and footer details.
//
// Categories & products carry their own `image` (base64 data URL or a
// regular URL) so the Admin Panel can manage them together with their
// name/price/label — no more juggling a separate images file for these.

import {
  IMG_CAT_MEN,
  IMG_CAT_WOMEN,
  IMG_CAT_KIDS,
  IMG_CAT_ACC,
  IMG_PROD_0,
  IMG_PROD_1,
  IMG_PROD_2,
  IMG_PROD_3,
  IMG_PROD_4,
  IMG_PROD_5,
} from "./images";

export const DEFAULT_CONTENT = {
  brand: {
    name: "NAX VIP",
  },

  // Top announcement strip — array so items can be added/removed.
  announcements: [
    { id: "ann-1", text: "FREE DELIVERY ON ORDERS ABOVE ₹999" },
    { id: "ann-2", text: "100% SECURE PAYMENTS" },
    { id: "ann-3", text: "7 DAYS EASY RETURNS" },
    { id: "ann-4", text: "5,00,000+ HAPPY CUSTOMERS" },
    { id: "ann-5", text: "HELPLINE: 9332822366" },
  ],

  hero: {
    eyebrow: "STYLE THAT SPEAKS",
    titleLine1: "TIMELESS.",
    titleLine2: "CONFIDENT.",
    titleScript: "You.",
    subtitle: "Premium fashion for those who choose quality over everything.",
    ctaText: "EXPLORE COLLECTION",
  },

  categories: [
    { id: "cat-men", label: "MEN'S WEAR", image: IMG_CAT_MEN },
    { id: "cat-women", label: "WOMEN'S WEAR", image: IMG_CAT_WOMEN },
    { id: "cat-kids", label: "KIDS' WEAR", image: IMG_CAT_KIDS },
    { id: "cat-acc", label: "ACCESSORIES", image: IMG_CAT_ACC },
  ],

  summerBanner: {
    eyebrow: "New Collection",
    title: "SUMMER EDIT '24",
    subtitle: "Fresh Styles. Effortless You.",
    ctaText: "SHOP COLLECTION",
  },

  products: [
    { id: "prod-0", name: "NV Solid Shirt", price: "₹999", image: IMG_PROD_0 },
    { id: "prod-1", name: "NV Polo T-Shirt", price: "₹799", image: IMG_PROD_1 },
    { id: "prod-2", name: "NV Casual Shirt", price: "₹1,199", image: IMG_PROD_2 },
    { id: "prod-3", name: "NV Kids Jacket", price: "₹1,299", image: IMG_PROD_3 },
    { id: "prod-4", name: "NV Premium Sneakers", price: "₹2,299", image: IMG_PROD_4 },
    { id: "prod-5", name: "NV Black Edition Watch", price: "₹1,999", image: IMG_PROD_5 },
  ],

  craftedBanner: {
    titleLine1: "CRAFTED FOR THOSE",
    titleLine2: "WHO EXPECT MORE",
  },

  club: {
    eyebrow: "JOIN THE",
    title: "NAX VIP CLUB",
    description: "Unlock exclusive rewards, early access and special privileges.",
  },

  newsletter: {
    eyebrow: "STAY UPDATED",
    subtitle: "Subscribe to get special offers, new arrivals & more.",
  },

  footer: {
    description:
      "NAX VIP is more than fashion. It's a lifestyle of confidence, quality and timeless style.",
    address:
      "Samsi Hospital Road, Opposite Sita Devi Balika Vidyamandir, Samsi, West Bengal, India",
    phone: "9332822366",
    email: "support@naxvip.com",
    copyright: "© 2024 NAX VIP. All Rights Reserved.",
  },
};

// Labels used by the Admin Panel's text-editing form (keeps labels out of JSX)
export const FIELD_LABELS = {
  brand: { name: "Brand Name" },
  hero: {
    eyebrow: "Eyebrow Text",
    titleLine1: "Title — Line 1",
    titleLine2: "Title — Line 2",
    titleScript: "Title — Script Word",
    subtitle: "Subtitle",
    ctaText: "Button Text",
  },
  summerBanner: {
    eyebrow: "Eyebrow Text",
    title: "Title",
    subtitle: "Subtitle",
    ctaText: "Button Text",
  },
  craftedBanner: {
    titleLine1: "Title — Line 1",
    titleLine2: "Title — Line 2",
  },
  club: {
    eyebrow: "Eyebrow Text",
    title: "Club Name",
    description: "Description",
  },
  newsletter: {
    eyebrow: "Eyebrow Text",
    subtitle: "Subtitle",
  },
  footer: {
    description: "Footer Description",
    address: "Store Address",
    phone: "Phone Number",
    email: "Email Address",
    copyright: "Copyright Line",
  },
};
