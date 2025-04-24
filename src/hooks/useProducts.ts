
import { useState, useEffect } from 'react';
import { ProductType } from '@/types/product';

// Mock products data
const mockProducts: ProductType[] = [
  // Shoes
  {
    id: 1,
    name: "Urban Runner Pro Shoes",
    brand: "RunFlex",
    category: "shoes",
    price: 3499,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1584735175315-9d5df23be701?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Lightweight and responsive running shoes designed for urban runners. These shoes feature breathable mesh uppers and cushioned soles for maximum comfort during your daily runs.",
    features: [
      "Breathable mesh upper",
      "Responsive cushioning",
      "Durable rubber outsole",
      "Reflective details for visibility",
      "Lightweight design"
    ],
    specifications: {
      "Weight": "280g",
      "Drop": "8mm",
      "Upper Material": "Engineered Mesh",
      "Outsole": "Rubber",
      "Closure": "Lace-up"
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 128
  },
  {
    id: 2,
    name: "Classic Leather Formal Shoes",
    brand: "ElegantStep",
    category: "shoes",
    price: 2799,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1614252235316-8c857f398faf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857f398faf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1613987876445-fc1f9d4e42de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Timeless leather formal shoes perfect for office wear and special occasions. Crafted with genuine leather uppers and comfortable insoles for all-day wear.",
    features: [
      "Genuine leather upper",
      "Cushioned insole",
      "Leather lining",
      "Stacked heel",
      "Classic design"
    ],
    specifications: {
      "Material": "Genuine Leather",
      "Sole": "Leather with rubber grip",
      "Closure": "Lace-up",
      "Heel Height": "2.5cm"
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 85
  },
  {
    id: 3,
    name: "StreetStyle Canvas Sneakers",
    brand: "UrbanKicks",
    category: "shoes",
    price: 1299,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Casual canvas sneakers with a contemporary design for everyday wear. Comfortable, versatile, and stylish to match any casual outfit.",
    features: [
      "Canvas upper",
      "Rubber outsole",
      "Cushioned footbed",
      "Reinforced toe cap",
      "Cotton laces"
    ],
    specifications: {
      "Upper Material": "Canvas",
      "Outsole": "Vulcanized Rubber",
      "Closure": "Lace-up",
      "Style": "Low-top"
    },
    inStock: true,
    rating: 4.3,
    reviewCount: 210
  },
  {
    id: 4,
    name: "Performance Basketball Shoes",
    brand: "CourtDominator",
    category: "shoes",
    price: 6999,
    originalPrice: 8499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "High-performance basketball shoes designed for serious players. Features advanced cushioning technology and superior ankle support for explosive moves on the court.",
    features: [
      "High-top design for ankle support",
      "Responsive cushioning",
      "Herringbone traction pattern",
      "Breathable mesh panels",
      "Reinforced toe cap"
    ],
    specifications: {
      "Weight": "380g",
      "Upper": "Synthetic leather & mesh",
      "Cushioning": "Air-cushion technology",
      "Traction": "Rubber with herringbone pattern",
      "Support": "High"
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: 5,
    name: "Trekking Hiking Boots",
    brand: "TrailMaster",
    category: "shoes",
    price: 4299,
    originalPrice: 5299,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1553904355-3d7b085075bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Rugged hiking boots built for challenging terrains and adverse weather conditions. Waterproof construction with excellent grip and ankle support.",
    features: [
      "Waterproof leather upper",
      "Breathable membrane",
      "Aggressive lugged outsole",
      "Padded collar and tongue",
      "Protective toe cap"
    ],
    specifications: {
      "Upper": "Waterproof leather",
      "Lining": "Gore-Tex",
      "Outsole": "Vibram rubber",
      "Closure": "Traditional lacing",
      "Height": "Mid-cut"
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 72
  },
  {
    id: 6,
    name: "Casual Slip-On Loafers",
    brand: "ComfortStep",
    category: "shoes",
    price: 1999,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1631541911232-aaf11d6e3f9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1631541911232-aaf11d6e3f9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Comfortable slip-on loafers perfect for casual and semi-formal occasions. Made with soft materials and flexible soles for easy all-day wear.",
    features: [
      "Slip-on design",
      "Memory foam insole",
      "Flexible outsole",
      "Breathable lining",
      "Elastic goring for easy on/off"
    ],
    specifications: {
      "Upper Material": "Synthetic leather",
      "Insole": "Memory foam",
      "Outsole": "TPR (Thermoplastic Rubber)",
      "Style": "Casual loafer"
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 195
  },
  {
    id: 7,
    name: "Minimalist Running Shoes",
    brand: "NaturalStride",
    category: "shoes",
    price: 5299,
    originalPrice: 6499,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1604163546180-039a1781c0d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Minimalist running shoes designed to promote natural foot movement. Ultra-lightweight with thin, flexible soles for a natural running experience.",
    features: [
      "Zero drop design",
      "Wide toe box",
      "Ultra-lightweight construction",
      "Minimal cushioning",
      "Flexible sole"
    ],
    specifications: {
      "Weight": "180g",
      "Stack Height": "8mm",
      "Drop": "0mm",
      "Upper": "Breathable mesh",
      "Closure": "Quick-lace system"
    },
    inStock: true,
    rating: 4.4,
    reviewCount: 68
  },
  {
    id: 8,
    name: "Designer Party Heels",
    brand: "GlamSteps",
    category: "shoes",
    price: 3799,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1596703263926-eb0762ee18e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Elegant high heels perfect for parties and special occasions. Featuring stylish design with comfortable padding for dancing the night away.",
    features: [
      "Stiletto heel",
      "Cushioned insole",
      "Ankle strap",
      "Decorative embellishments",
      "Non-slip outsole"
    ],
    specifications: {
      "Heel Height": "10cm",
      "Upper": "Synthetic suede",
      "Closure": "Ankle buckle",
      "Platform Height": "1cm"
    },
    inStock: true,
    rating: 4.2,
    reviewCount: 104
  },
  
  // Watches
  {
    id: 9,
    name: "Classic Analog Watch",
    brand: "TimeStyle",
    category: "watches",
    price: 4999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Elegant analog watch with a timeless design. Features a genuine leather strap and premium stainless steel case that complements both casual and formal attire.",
    features: [
      "Japanese quartz movement",
      "Genuine leather strap",
      "Scratch-resistant mineral glass",
      "30m water resistance",
      "Date function"
    ],
    specifications: {
      "Case Diameter": "40mm",
      "Case Material": "Stainless Steel",
      "Band Material": "Genuine Leather",
      "Movement": "Japanese Quartz",
      "Water Resistance": "30m"
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 132
  },
  {
    id: 10,
    name: "Smart Fitness Watch",
    brand: "TechFit",
    category: "watches",
    price: 8999,
    originalPrice: 10999,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Advanced fitness tracking watch with comprehensive health monitoring features. Tracks heart rate, sleep quality, steps, and over 20 different workout modes.",
    features: [
      "Heart rate monitoring",
      "Sleep tracking",
      "Built-in GPS",
      "Smartphone notifications",
      "Water resistant design"
    ],
    specifications: {
      "Display": "1.3\" AMOLED",
      "Battery Life": "Up to 14 days",
      "Water Resistance": "5 ATM",
      "Sensors": "Accelerometer, Heart Rate, SpO2",
      "Compatibility": "Android 5.0+ / iOS 10.0+"
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 245
  },
  {
    id: 11,
    name: "Luxury Chronograph Watch",
    brand: "EliteTime",
    category: "watches",
    price: 18999,
    originalPrice: 22999,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Premium chronograph watch with sophisticated design and precision movement. Features a multi-function chronograph and premium materials for the discerning gentleman.",
    features: [
      "Swiss chronograph movement",
      "Sapphire crystal glass",
      "Stainless steel bracelet",
      "100m water resistance",
      "Luminous hands and markers"
    ],
    specifications: {
      "Case Diameter": "42mm",
      "Case Material": "316L Stainless Steel",
      "Band Material": "Stainless Steel",
      "Movement": "Swiss Chronograph",
      "Water Resistance": "100m"
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 87
  },
  {
    id: 12,
    name: "Minimalist Digital Watch",
    brand: "SimpleTime",
    category: "watches",
    price: 2499,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Clean, minimalist digital watch with essential features. Simple to use with a sleek design that suits everyday wear.",
    features: [
      "LED display",
      "Time and date functions",
      "Alarm function",
      "Lightweight design",
      "Adjustable strap"
    ],
    specifications: {
      "Case Diameter": "38mm",
      "Case Material": "ABS Plastic",
      "Band Material": "Silicone",
      "Water Resistance": "3 ATM",
      "Battery Life": "2 years"
    },
    inStock: true,
    rating: 4.1,
    reviewCount: 163
  },
  {
    id: 13,
    name: "Women's Rose Gold Watch",
    brand: "EleganceTime",
    category: "watches",
    price: 5499,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Elegant women's watch featuring a beautiful rose gold finish. Combines sophistication with modern design for a timeless accessory.",
    features: [
      "Precision quartz movement",
      "Rose gold-plated case and band",
      "Crystal accents",
      "Mother of pearl dial",
      "Fold-over clasp"
    ],
    specifications: {
      "Case Diameter": "32mm",
      "Case Material": "Rose Gold-Plated Steel",
      "Band Material": "Rose Gold-Plated Steel",
      "Movement": "Japanese Quartz",
      "Water Resistance": "30m"
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: 14,
    name: "Sports Diver Watch",
    brand: "DeepWater",
    category: "watches",
    price: 7999,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1595923533867-ff8a1e486900?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1595923533867-ff8a1e486900?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1580287486968-7192cdb11f22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Professional diving watch designed for underwater adventures. Features exceptional water resistance and rotating bezel for tracking dive time.",
    features: [
      "Automatic movement",
      "Unidirectional rotating bezel",
      "Screw-down crown",
      "Super-luminous hands and markers",
      "Helium escape valve"
    ],
    specifications: {
      "Case Diameter": "44mm",
      "Case Material": "Stainless Steel",
      "Band Material": "Rubber",
      "Water Resistance": "300m / 1000ft",
      "Movement": "Automatic"
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 96
  },
  {
    id: 15,
    name: "Classic Wooden Watch",
    brand: "NaturalTime",
    category: "watches",
    price: 6499,
    originalPrice: 7499,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1594576722512-582bcd46fba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Unique wooden watch handcrafted from sustainable materials. Combines natural aesthetics with modern timekeeping for an eco-friendly accessory.",
    features: [
      "Sustainable hardwood construction",
      "Japanese quartz movement",
      "Lightweight design",
      "Hypoallergenic properties",
      "Individual wood grain pattern"
    ],
    specifications: {
      "Case Diameter": "40mm",
      "Case Material": "Natural Walnut Wood",
      "Band Material": "Natural Walnut Wood",
      "Movement": "Japanese Quartz",
      "Water Resistance": "3 ATM (splash resistant)"
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 108
  },
  {
    id: 16,
    name: "Pilot Aviator Watch",
    brand: "SkyMaster",
    category: "watches",
    price: 12999,
    originalPrice: 15999,
    image: "https://images.unsplash.com/photo-1627983705767-8c5deb5566ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1627983705767-8c5deb5566ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Aviation-inspired watch with features derived from pilot instruments. Large, readable dial with chronograph functions for precise timekeeping.",
    features: [
      "Chronograph functionality",
      "Large luminous numerals",
      "Slide rule bezel",
      "Genuine leather pilot strap",
      "Date window"
    ],
    specifications: {
      "Case Diameter": "46mm",
      "Case Material": "Stainless Steel",
      "Band Material": "Genuine Leather",
      "Movement": "Swiss Quartz Chronograph",
      "Water Resistance": "100m"
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 76
  },
  
  // Headphones
  {
    id: 17,
    name: "Premium Noise Cancelling Headphones",
    brand: "SonicWave",
    category: "headphones",
    price: 19999,
    originalPrice: 24999,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Industry-leading noise cancelling headphones with premium sound quality. Features adaptive noise cancelling technology and comfort designed for long listening sessions.",
    features: [
      "Active noise cancellation",
      "40mm dynamic drivers",
      "30-hour battery life",
      "Touch controls",
      "Voice assistant support"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "4Hz-40,000Hz",
      "Battery Life": "30 hours",
      "Charging Time": "3 hours",
      "Bluetooth Version": "5.0"
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 326
  },
  {
    id: 18,
    name: "Studio Professional Headphones",
    brand: "AudioPro",
    category: "headphones",
    price: 14999,
    originalPrice: 17999,
    image: "https://images.unsplash.com/photo-1567452839976-c437f901b7bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1567452839976-c437f901b7bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Reference-quality studio headphones designed for professional audio production. Delivers flat frequency response and exceptional clarity for accurate mixing and mastering.",
    features: [
      "Reference-quality sound",
      "Closed-back design",
      "Detachable cable",
      "Foldable design",
      "Premium ear cushions"
    ],
    specifications: {
      "Driver Size": "45mm",
      "Frequency Response": "5Hz-30,000Hz",
      "Impedance": "32 Ohms",
      "Sensitivity": "102 dB/mW",
      "Cable Length": "3m coiled / 1.2m straight"
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 185
  },
  {
    id: 19,
    name: "Gaming Headset with Mic",
    brand: "GameAudio",
    category: "headphones",
    price: 5999,
    originalPrice: 7499,
    image: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1612444530582-fc66183b16f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600086827875-a63b01f1335c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Immersive gaming headset with surround sound and detachable microphone. Designed for extended gaming sessions with comfortable ear cups and customizable RGB lighting.",
    features: [
      "7.1 virtual surround sound",
      "Detachable noise-cancelling microphone",
      "RGB lighting",
      "Memory foam ear cushions",
      "Compatible with PC, Console, and Mobile"
    ],
    specifications: {
      "Driver Size": "50mm",
      "Frequency Response": "20Hz-20,000Hz",
      "Mic Sensitivity": "-42dB ± 3dB",
      "Cable Length": "2.2m",
      "Weight": "320g"
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 278
  },
  {
    id: 20,
    name: "Sports Wireless Headphones",
    brand: "FitSound",
    category: "headphones",
    price: 4299,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1624006389438-c03488175975?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Wireless headphones designed specifically for sports and active lifestyles. Sweat and water resistant with secure-fit design to stay in place during intense workouts.",
    features: [
      "Sweat and water resistant (IPX4)",
      "Secure-fit ear hooks",
      "15-hour battery life",
      "Quick charge (5min = 1hr playback)",
      "Built-in controls"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz-20,000Hz",
      "Battery Life": "15 hours",
      "Charging Time": "2 hours",
      "Bluetooth Version": "5.0"
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 213
  },
  {
    id: 21,
    name: "Classic Wired Headphones",
    brand: "RetroSound",
    category: "headphones",
    price: 2999,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Classic wired headphones with vintage-inspired design and modern sound. Perfect for audiophiles who prefer the reliability of wired connections.",
    features: [
      "High-fidelity sound",
      "Classic over-ear design",
      "Comfortable padding",
      "Durable construction",
      "Universal 3.5mm connector"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "18Hz-22,000Hz",
      "Impedance": "32 Ohms",
      "Sensitivity": "110dB",
      "Cable Length": "1.5m"
    },
    inStock: true,
    rating: 4.4,
    reviewCount: 167
  },
  {
    id: 22,
    name: "DJ Professional Headphones",
    brand: "BeatMix",
    category: "headphones",
    price: 8999,
    originalPrice: 10999,
    image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600086827875-a63b01f1335c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1559336197-ded8aaa244bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Professional DJ headphones built for club environments. Features swiveling ear cups, high sound isolation, and durable construction to withstand demanding performance conditions.",
    features: [
      "Rotating ear cups",
      "High sound isolation",
      "Replaceable ear pads",
      "Reinforced headband",
      "Coiled and straight cables included"
    ],
    specifications: {
      "Driver Size": "50mm",
      "Frequency Response": "5Hz-30,000Hz",
      "Impedance": "32 Ohms",
      "Maximum Power": "3500mW",
      "Cable Length": "1.2m straight / 3m coiled"
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 138
  },
  {
    id: 23,
    name: "Kids Headphones with Volume Limit",
    brand: "KidSound",
    category: "headphones",
    price: 1499,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1612099197070-4af8a5976608?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Safe headphones designed specifically for children with volume limiting technology. Colorful, durable design with comfortable fit for smaller heads.",
    features: [
      "85dB volume limit for hearing protection",
      "Adjustable headband",
      "Foldable design",
      "Tangle-free cable",
      "Fun colors and patterns"
    ],
    specifications: {
      "Driver Size": "30mm",
      "Frequency Response": "20Hz-20,000Hz",
      "Maximum Volume": "85dB",
      "Cable Length": "1.2m",
      "Weight": "175g"
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 192
  },
  {
    id: 24,
    name: "Hi-Fi Audiophile Headphones",
    brand: "SoundPurity",
    category: "headphones",
    price: 29999,
    originalPrice: 34999,
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Premium audiophile headphones engineered for exceptional sound reproduction. Open-back design creates a spacious soundstage with incredible detail and clarity.",
    features: [
      "Open-back acoustic design",
      "Premium materials throughout",
      "Handcrafted construction",
      "Detachable cables",
      "Replaceable ear pads"
    ],
    specifications: {
      "Driver Type": "Planar Magnetic",
      "Frequency Response": "4Hz-50,000Hz",
      "Impedance": "300 Ohms",
      "Sensitivity": "103dB/mW",
      "Weight": "380g"
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 86
  },
  
  // Earbuds
  {
    id: 25,
    name: "True Wireless Earbuds",
    brand: "SoundFree",
    category: "earbuds",
    price: 9999,
    originalPrice: 12999,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5e268?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Premium true wireless earbuds with active noise cancellation and immersive sound. Features touch controls, long battery life, and comfortable design for all-day wear.",
    features: [
      "Active noise cancellation",
      "Touch controls",
      "7-hour battery life (28 with case)",
      "IPX4 water resistance",
      "Voice assistant support"
    ],
    specifications: {
      "Driver Size": "8mm",
      "Frequency Response": "20Hz-20,000Hz",
      "Battery Life": "7 hours (earbuds) / 28 hours (with case)",
      "Charging Time": "2 hours",
      "Bluetooth Version": "5.2"
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 342
  },
  {
    id: 26,
    name: "Sports Wireless Earbuds",
    brand: "FitTone",
    category: "earbuds",
    price: 3999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1606471191009-63994c53433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Wireless earbuds designed for active lifestyles with secure-fit ear hooks and sweat-proof construction. Perfect for workouts and running with bass-enhanced sound.",
    features: [
      "Secure-fit ear hooks",
      "IPX7 waterproof",
      "10-hour battery life",
      "Quick charge",
      "Built-in microphone"
    ],
    specifications: {
      "Driver Size": "10mm",
      "Frequency Response": "20Hz-20,000Hz",
      "Battery Life": "10 hours",
      "Charging Time": "1.5 hours",
      "Bluetooth Range": "10m"
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 287
  },
  {
    id: 27,
    name: "Noise Cancelling Wireless Earbuds",
    brand: "QuietSound",
    category: "earbuds",
    price: 14999,
    originalPrice: 17999,
    image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5e268?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Premium wireless earbuds with advanced noise cancellation technology. Delivers crisp, detailed sound while effectively blocking ambient noise for immersive listening experience.",
    features: [
      "Active noise cancellation",
      "Transparency mode",
      "Premium sound drivers",
      "Wireless charging case",
      "Customizable EQ via app"
    ],
    specifications: {
      "Driver": "Custom 12mm",
      "Noise Reduction": "Up to 35dB",
      "Battery Life": "8 hours (30 with case)",
      "Water Resistance": "IPX4",
      "Bluetooth Version": "5.2"
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 176
  },
  {
    id: 28,
    name: "Gaming Earbuds with Mic",
    brand: "GameAudio",
    category: "earbuds",
    price: 6999,
    originalPrice: 8499,
    image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5e268?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5e268?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Gaming earbuds designed for immersive gameplay with low-latency connection and detachable boom microphone. Ideal for mobile gaming and competitive play.",
    features: [
      "Ultra-low latency connection",
      "Detachable boom microphone",
      "RGB lighting",
      "Gaming mode",
      "Included carry case"
    ],
    specifications: {
      "Driver Size": "10mm",
      "Frequency Response": "20Hz-20,000Hz",
      "Latency": "<60ms",
      "Battery Life": "10 hours",
      "Microphone Type": "Noise-cancelling directional"
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 154
  },
  {
    id: 29,
    name: "Budget Wireless Earbuds",
    brand: "ValueSound",
    category: "earbuds",
    price: 1499,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1606471191009-63994c53433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Affordable wireless earbuds with impressive sound quality for the price. Simple, reliable design with the essential features for everyday listening.",
    features: [
      "Touch controls",
      "5-hour battery life (20 with case)",
      "IPX4 splash resistance",
      "Built-in microphone",
      "Auto-pairing"
    ],
    specifications: {
      "Driver Size": "8mm",
      "Frequency Response": "20Hz-20,000Hz",
      "Battery Life": "5 hours (20 with case)",
      "Charging Time": "1.5 hours",
      "Bluetooth Version": "5.0"
    },
    inStock: true,
    rating: 4.2,
    reviewCount: 427
  },
  {
    id: 30,
    name: "Sleep Earbuds",
    brand: "DreamSound",
    category: "earbuds",
    price: 7499,
    originalPrice: 8999,
    image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5e268?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5e268?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Specially designed earbuds for comfortable sleep with noise masking technology. Ultra-small profile doesn't protrude from ears, making them perfect for side sleepers.",
    features: [
      "Ultra-small design",
      "Noise masking technology",
      "Relaxing soundscapes library",
      "Alarm function",
      "Comfortable silicone tips"
    ],
    specifications: {
      "Size": "Ultra-small for sleep comfort",
      "Battery Life": "8 hours",
      "Noise Masking": "Yes",
      "Charging Case": "3 additional charges",
      "App Control": "iOS and Android compatible"
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 113
  },
  {
    id: 31,
    name: "Professional Studio Earbuds",
    brand: "StudioSound",
    category: "earbuds",
    price: 17999,
    originalPrice: 19999,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5e268?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Reference-quality in-ear monitors for professional musicians and audiophiles. Features custom-tuned drivers for perfect sound reproduction with exceptional detail.",
    features: [
      "Dual balanced armature drivers",
      "Detachable MMCX cables",
      "Custom-molded ear tips",
      "Premium carrying case",
      "Reference sound signature"
    ],
    specifications: {
      "Drivers": "Dual balanced armature",
      "Frequency Response": "10Hz-40,000Hz",
      "Impedance": "16 Ohms",
      "Sensitivity": "107dB/mW",
      "Cable Length": "1.25m"
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 98
  },
  {
    id: 32,
    name: "Kids Wireless Earbuds",
    brand: "KidSound",
    category: "earbuds",
    price: 2499,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5e268?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    images: [
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5e268?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    description: "Child-friendly wireless earbuds with volume limiting technology for hearing protection. Colorful design with smaller ear tips specifically sized for children.",
    features: [
      "85dB volume limit",
      "Small ear tips for kids",
      "6-hour battery life",
      "Durable design",
      "Fun colors"
    ],
    specifications: {
      "Volume Limit": "85dB for hearing safety",
      "Battery Life": "6 hours",
      "Charging Case": "3 additional charges",
      "Water Resistance": "IPX4",
      "Bluetooth Version": "5.0"
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 157
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>(mockProducts);
  
  return { products };
};

export const useFeaturedProducts = (limit = 8) => {
  const { products } = useProducts();
  // Simply return a subset of products as featured
  return products.slice(0, limit);
};
