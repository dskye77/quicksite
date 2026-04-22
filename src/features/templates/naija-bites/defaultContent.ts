// src/features/templates/naija-bites/defaultContent.ts

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  emoji: string;
  category: string;
}

export interface NaijaBitesContent {
  // Hero
  businessName: string;
  tagline: string;
  heroDescription: string;
  whatsappNumber: string; // digits only, no +
  heroEmoji: string;

  // Menu
  menuItems: MenuItem[];

  // About
  aboutText: string;
  foundedYear: string;

  // Contact
  address: string;
  openingHours: string;
  instagramHandle: string;
}

export const defaultNaijaBitesContent: NaijaBitesContent = {
  businessName: "Amaka's Kitchen",
  tagline: "Authentic Nigerian Flavours",
  heroDescription:
    "Home-cooked meals made with love. Jollof rice, egusi soup, pounded yam — delivered fresh to your doorstep in Lagos.",
  whatsappNumber: "2348000000000",
  heroEmoji: "🍲",

  menuItems: [
    {
      id: "1",
      name: "Party Jollof Rice",
      description: "Smoky, firewood-style jollof with grilled chicken & plantain",
      price: "₦2,500",
      emoji: "🍛",
      category: "Mains",
    },
    {
      id: "2",
      name: "Egusi Soup + Eba",
      description: "Rich egusi with assorted meat, stockfish & fresh eba",
      price: "₦2,000",
      emoji: "🫕",
      category: "Mains",
    },
    {
      id: "3",
      name: "Pounded Yam + Oha Soup",
      description: "Smooth pounded yam with fresh oha leaves & goat meat",
      price: "₦2,200",
      emoji: "🍲",
      category: "Mains",
    },
    {
      id: "4",
      name: "Suya Platter",
      description: "Skewered grilled beef with yaji spice, sliced onions & tomatoes",
      price: "₦1,800",
      emoji: "🔥",
      category: "Grills",
    },
    {
      id: "5",
      name: "Peppered Gizzard",
      description: "Tender gizzard in spicy pepper sauce — finger-licking good",
      price: "₦1,500",
      emoji: "🌶️",
      category: "Grills",
    },
    {
      id: "6",
      name: "Zobo Delight",
      description: "Chilled hibiscus drink with fresh ginger & pineapple",
      price: "₦500",
      emoji: "🥤",
      category: "Drinks",
    },
  ],

  aboutText:
    "We started Amaka's Kitchen in 2017 with one mission: to serve the kind of food that makes you close your eyes and smile. Every recipe has been passed down through generations, cooked with the same love and attention our mothers gave us. No shortcuts, no shortcuts — just real Nigerian food.",
  foundedYear: "2017",

  address: "15 Ogunlana Drive, Surulere, Lagos",
  openingHours: "Mon – Sat: 9am – 9pm",
  instagramHandle: "amakaskitchen_ng",
};