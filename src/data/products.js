export const PRODUCT_CATEGORIES = Object.freeze({
  KIDS_CLOCKS: "kids-clocks",
  WOODEN_SOUVENIRS: "wooden-souvenirs",
  CUSTOM_ENGRAVED_ITEMS: "custom-engraved-items",
});

const productsData = [
  {
    id: "clk-dino-blast",
    name: "Dino Blast Kids Wall Clock",
    price: 39.99,
    category: PRODUCT_CATEGORIES.KIDS_CLOCKS,
    material: "Laser-cut birch plywood with UV print",
    imageUrl: "https://picsum.photos/seed/clk-dino-blast/1200/1200",
    customizableFields: {
      textInput: {
        key: "nameText",
        label: "Child Name",
        placeholder: "Enter name",
        maxLength: 12,
        required: false,
      },
      options: [
        {
          key: "size",
          label: "Size",
          values: ["20 cm", "25 cm", "30 cm"],
          defaultValue: "25 cm",
        },
        {
          key: "handColor",
          label: "Clock Hand Color",
          values: ["Black", "White", "Gold"],
          defaultValue: "Black",
        },
      ],
    },
  },
  {
    id: "clk-princess-castle",
    name: "Princess Castle Kids Clock",
    price: 42.5,
    category: PRODUCT_CATEGORIES.KIDS_CLOCKS,
    material: "Laser-cut MDF with UV color finish",
    imageUrl: "https://picsum.photos/seed/clk-princess-castle/1200/1200",
    customizableFields: {
      textInput: {
        key: "nameText",
        label: "Child Name",
        placeholder: "Enter name",
        maxLength: 14,
        required: false,
      },
      options: [
        {
          key: "themeTone",
          label: "Theme Tone",
          values: ["Pink", "Lavender", "Mint"],
          defaultValue: "Pink",
        },
        {
          key: "numbersStyle",
          label: "Numbers Style",
          values: ["Classic", "Stars", "Hearts"],
          defaultValue: "Classic",
        },
      ],
    },
  },
  {
    id: "clk-space-orbit",
    name: "Space Orbit Kids Clock",
    price: 44.0,
    category: PRODUCT_CATEGORIES.KIDS_CLOCKS,
    material: "Birch plywood with UV-printed acrylic accents",
    imageUrl: "https://picsum.photos/seed/clk-space-orbit/1200/1200",
    customizableFields: {
      textInput: {
        key: "nameText",
        label: "Child Name",
        placeholder: "Enter name",
        maxLength: 12,
        required: false,
      },
      options: [
        {
          key: "planetStyle",
          label: "Planet Style",
          values: ["Solar", "Galaxy", "Nebula"],
          defaultValue: "Solar",
        },
        {
          key: "glowRing",
          label: "Glow Ring",
          values: ["None", "Blue", "Green"],
          defaultValue: "None",
        },
      ],
    },
  },
  {
    id: "clk-safari-trail",
    name: "Safari Trail Kids Clock",
    price: 37.75,
    category: PRODUCT_CATEGORIES.KIDS_CLOCKS,
    material: "Laser-cut poplar wood with UV matte print",
    imageUrl: "https://picsum.photos/seed/clk-safari-trail/1200/1200",
    customizableFields: {
      textInput: {
        key: "nameText",
        label: "Child Name",
        placeholder: "Enter name",
        maxLength: 12,
        required: false,
      },
      options: [
        {
          key: "animalSet",
          label: "Animal Set",
          values: ["Jungle", "Savannah", "Forest"],
          defaultValue: "Jungle",
        },
        {
          key: "frameColor",
          label: "Frame Color",
          values: ["Natural", "Walnut", "White"],
          defaultValue: "Natural",
        },
      ],
    },
  },
  {
    id: "souvenir-city-magnet",
    name: "City Skyline Wooden Magnet",
    price: 9.9,
    category: PRODUCT_CATEGORIES.WOODEN_SOUVENIRS,
    material: "Walnut veneer over birch base",
    imageUrl: "https://picsum.photos/seed/souvenir-city-magnet/1200/1200",
    customizableFields: {
      textInput: {
        key: "cityText",
        label: "City Name",
        placeholder: "Enter city",
        maxLength: 20,
        required: true,
      },
      options: [
        {
          key: "shape",
          label: "Shape",
          values: ["Rectangle", "Circle", "House"],
          defaultValue: "Rectangle",
        },
        {
          key: "finish",
          label: "Finish",
          values: ["Natural", "Dark Oak", "Vintage"],
          defaultValue: "Natural",
        },
      ],
    },
  },
  {
    id: "souvenir-wood-postcard",
    name: "Laser-Etched Wooden Postcard",
    price: 12.5,
    category: PRODUCT_CATEGORIES.WOODEN_SOUVENIRS,
    material: "3mm birch plywood",
    imageUrl: "https://picsum.photos/seed/souvenir-wood-postcard/1200/1200",
    customizableFields: {
      textInput: {
        key: "messageText",
        label: "Short Message",
        placeholder: "Write a short message",
        maxLength: 60,
        required: false,
      },
      options: [
        {
          key: "postcardSize",
          label: "Size",
          values: ["A6", "A5"],
          defaultValue: "A6",
        },
        {
          key: "engravingStyle",
          label: "Engraving Style",
          values: ["Outline", "Filled", "Vintage"],
          defaultValue: "Outline",
        },
      ],
    },
  },
  {
    id: "souvenir-travel-keychain",
    name: "Travel Icon Wooden Keychain",
    price: 8.4,
    category: PRODUCT_CATEGORIES.WOODEN_SOUVENIRS,
    material: "Beech wood with stainless steel ring",
    imageUrl: "https://picsum.photos/seed/souvenir-travel-keychain/1200/1200",
    customizableFields: {
      textInput: {
        key: "initials",
        label: "Initials",
        placeholder: "Up to 4 letters",
        maxLength: 4,
        required: false,
      },
      options: [
        {
          key: "icon",
          label: "Icon",
          values: ["Plane", "Mountain", "Compass"],
          defaultValue: "Plane",
        },
        {
          key: "woodTone",
          label: "Wood Tone",
          values: ["Natural", "Honey", "Espresso"],
          defaultValue: "Natural",
        },
      ],
    },
  },
  {
    id: "engraved-cutting-board",
    name: "Custom Engraved Cutting Board",
    price: 58.0,
    category: PRODUCT_CATEGORIES.CUSTOM_ENGRAVED_ITEMS,
    material: "Solid bamboo",
    imageUrl: "https://picsum.photos/seed/engraved-cutting-board/1200/1200",
    customizableFields: {
      textInput: {
        key: "engravingText",
        label: "Engraving Text",
        placeholder: "Family name or message",
        maxLength: 36,
        required: true,
      },
      options: [
        {
          key: "boardSize",
          label: "Board Size",
          values: ["Medium", "Large", "XL"],
          defaultValue: "Large",
        },
        {
          key: "fontStyle",
          label: "Font Style",
          values: ["Script", "Serif", "Sans"],
          defaultValue: "Script",
        },
      ],
    },
  },
  {
    id: "engraved-nameplate-acrylic",
    name: "UV Printed Acrylic Nameplate",
    price: 27.3,
    category: PRODUCT_CATEGORIES.CUSTOM_ENGRAVED_ITEMS,
    material: "5mm clear acrylic",
    imageUrl: "https://picsum.photos/seed/engraved-nameplate-acrylic/1200/1200",
    customizableFields: {
      textInput: {
        key: "nameText",
        label: "Name / Title",
        placeholder: "Enter text",
        maxLength: 28,
        required: true,
      },
      options: [
        {
          key: "baseColor",
          label: "Base Color",
          values: ["Black", "White", "Rose Gold"],
          defaultValue: "Black",
        },
        {
          key: "mountType",
          label: "Mount Type",
          values: ["Desk Stand", "Wall Mount"],
          defaultValue: "Desk Stand",
        },
      ],
    },
  },
  {
    id: "engraved-gift-box",
    name: "Personalized Wooden Gift Box",
    price: 34.95,
    category: PRODUCT_CATEGORIES.CUSTOM_ENGRAVED_ITEMS,
    material: "Pine wood with laser-engraved lid",
    imageUrl: "https://picsum.photos/seed/engraved-gift-box/1200/1200",
    customizableFields: {
      textInput: {
        key: "lidMessage",
        label: "Lid Message",
        placeholder: "Add your message",
        maxLength: 40,
        required: false,
      },
      options: [
        {
          key: "boxSize",
          label: "Box Size",
          values: ["Small", "Medium", "Large"],
          defaultValue: "Medium",
        },
        {
          key: "insertType",
          label: "Insert Type",
          values: ["None", "Foam", "Velvet"],
          defaultValue: "None",
        },
      ],
    },
  },
];

const freezeProduct = (product) =>
  Object.freeze({
    ...product,
    customizableFields: Object.freeze({
      textInput: Object.freeze({ ...product.customizableFields.textInput }),
      options: Object.freeze(
        product.customizableFields.options.map((option) =>
          Object.freeze({
            ...option,
            values: Object.freeze([...option.values]),
          }),
        ),
      ),
    }),
  });

export const products = Object.freeze(productsData.map(freezeProduct));

const productById = Object.fromEntries(products.map((product) => [product.id, product]));

export const getProductById = (id) => productById[id] ?? null;

export const getProductsByCategory = (category) =>
  products.filter((product) => product.category === category);
