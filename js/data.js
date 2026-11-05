const STRIDE_PRODUCTS = [
  {
    id: "MD-001", name: "Studio", category: "Everyday", type: "Casual",
    season: "Spring / Summer", badge: "Popular",
    originalPrice: 31800, discount: 9, price: 28938,
    description: "Minimal everyday barefoot shoe with a wide toe box.",
    variants: [
      { color: "Grey", image: "images/catalogue/studio-grey.webp" },
      { color: "Black", image: "images/catalogue/studio-black.webp" },
      { color: "Olive", image: "images/catalogue/studio-olive.webp" }
    ]
  },
  {
    id: "MD-002", name: "Move", category: "Everyday", type: "Casual",
    season: "Spring / Autumn", badge: "",
    originalPrice: 37600, discount: 18, price: 30832,
    description: "Relaxed low-top everyday shoe for casual outfits.",
    variants: [
      { color: "White", image: "images/catalogue/move-white.webp" },
      { color: "Blue", image: "images/catalogue/move-blue.webp" },
      { color: "Black", image: "images/catalogue/move-black.webp" }
    ]
  },
  {
    id: "MD-003", name: "Coast", category: "Everyday", type: "Casual",
    season: "Spring / Summer", badge: "",
    originalPrice: 34700, discount: 12, price: 30536,
    description: "Light daily barefoot shoe in calm natural colours.",
    variants: [
      { color: "Sand", image: "images/catalogue/coast-sand.webp" },
      { color: "Brown", image: "images/catalogue/coast-brown.webp" },
      { color: "Olive", image: "images/catalogue/coast-olive.webp" }
    ]
  },
  {
    id: "MD-004", name: "Hoops", category: "Sport", type: "Basketball",
    season: "Spring / Autumn", badge: "",
    originalPrice: 34700, discount: 12, price: 30536,
    description: "Basketball-inspired barefoot-style trainer with a spacious toe box.",
    variants: [
      { color: "White", image: "images/catalogue/hoops-white.webp" },
      { color: "Black", image: "images/catalogue/hoops-black.webp" },
      { color: "Red", image: "images/catalogue/hoops-red.webp" }
    ]
  },
  {
    id: "MD-005", name: "Flow", category: "Sport", type: "Running",
    season: "Spring / Summer", badge: "Popular",
    originalPrice: 31800, discount: 7, price: 29574,
    description: "Soft-feel runner with breathable upper and wide front.",
    variants: [
      { color: "Blue", image: "images/catalogue/flow-blue.webp" },
      { color: "White", image: "images/catalogue/flow-white.webp" },
      { color: "Black", image: "images/catalogue/flow-black.webp" }
    ]
  },
  {
    id: "MD-006", name: "Sprint", category: "Sport", type: "Running",
    season: "Summer", badge: "New",
    originalPrice: 37600, discount: 15, price: 31960,
    description: "Performance-style barefoot runner for light training.",
    variants: [
      { color: "Black / Orange", image: "images/catalogue/sprint-black-orange.webp" },
      { color: "Grey", image: "images/catalogue/sprint-grey.webp" },
      { color: "White", image: "images/catalogue/sprint-white.webp" }
    ]
  },
  {
    id: "MD-007", name: "Nova", category: "Sport", type: "Active",
    season: "All Season", badge: "",
    originalPrice: 40500, discount: 11, price: 36045,
    description: "Chunkier active shoe concept with wide-toe room.",
    variants: [
      { color: "Beige", image: "images/catalogue/nova-beige.webp" },
      { color: "Black", image: "images/catalogue/nova-black.webp" },
      { color: "Olive", image: "images/catalogue/nova-olive.webp" }
    ]
  },
  {
    id: "MD-008", name: "Rain", category: "Boots", type: "Outdoor",
    season: "Autumn / Winter", badge: "Weather",
    originalPrice: 40500, discount: 10, price: 36450,
    description: "Boot concept for cold weather styling; water resistance is not tested.",
    variants: [
      { color: "Black", image: "images/catalogue/rain-black.webp" },
      { color: "Brown", image: "images/catalogue/rain-brown.webp" },
      { color: "Olive", image: "images/catalogue/rain-olive.webp" }
    ]
  }
];

// Small helpers used by both the catalogue and selection list.
function getProduct(id) {
    for (let i = 0; i < STRIDE_PRODUCTS.length; i++) {
        if (STRIDE_PRODUCTS[i].id === id) return STRIDE_PRODUCTS[i];
    }
    return null;
}

function formatPrice(price) {
    return Number(price).toLocaleString('en-US') + ' ₸';
}

function getPrimaryImage(product) {
    return product.variants[0].image;
}

function getColorList(product) {
    const colors = [];
    for (let i = 0; i < product.variants.length; i++) {
        colors.push(product.variants[i].color);
    }
    return colors.join(', ');
}
