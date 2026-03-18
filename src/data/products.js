export const PRODUCT_CATEGORIES = Object.freeze({
  KIDS: "kids",
  SOUVENIRS: "souvenirs",
  CUSTOM: "custom",
});

const createTextOption = ({
  key = "customText",
  label,
  placeholder = "",
  required = false,
  maxLength = 40,
  defaultValue = "",
}) => ({
  type: "text",
  key,
  label,
  placeholder,
  required,
  maxLength,
  values: [],
  defaultValue,
});

const createSelectOption = ({ key, label, values, defaultValue }) => ({
  type: "select",
  key,
  label,
  placeholder: "",
  required: true,
  maxLength: null,
  values: [...values],
  defaultValue: defaultValue ?? values[0] ?? "",
});

const createProduct = ({
  id,
  name,
  price,
  category,
  material,
  image,
  customizable = false,
  options = [],
}) => ({
  id,
  name,
  price,
  category,
  material,
  image,
  customizable,
  options,
});

const productsData = [
  createProduct({
    id: "clk-dino-blast",
    name: "Dino Blast Kids Wall Clock",
    price: 39.99,
    category: PRODUCT_CATEGORIES.KIDS,
    material: "Laser-cut birch plywood with UV print",
    image: "https://picsum.photos/seed/clk-dino-blast/1200/1200",
    customizable: true,
    options: [
      createTextOption({
        label: "Child Name",
        placeholder: "Enter name",
        maxLength: 12,
      }),
      createSelectOption({
        key: "size",
        label: "Size",
        values: ["20 cm", "25 cm", "30 cm"],
        defaultValue: "25 cm",
      }),
      createSelectOption({
        key: "handColor",
        label: "Clock Hand Color",
        values: ["Black", "White", "Gold"],
        defaultValue: "Black",
      }),
    ],
  }),
  createProduct({
    id: "clk-princess-castle",
    name: "Princess Castle Kids Clock",
    price: 42.5,
    category: PRODUCT_CATEGORIES.KIDS,
    material: "Laser-cut MDF with UV color finish",
    image: "https://picsum.photos/seed/clk-princess-castle/1200/1200",
    customizable: true,
    options: [
      createTextOption({
        label: "Child Name",
        placeholder: "Enter name",
        maxLength: 14,
      }),
      createSelectOption({
        key: "themeTone",
        label: "Theme Tone",
        values: ["Pink", "Lavender", "Mint"],
        defaultValue: "Pink",
      }),
      createSelectOption({
        key: "numbersStyle",
        label: "Numbers Style",
        values: ["Classic", "Stars", "Hearts"],
        defaultValue: "Classic",
      }),
    ],
  }),
  createProduct({
    id: "clk-space-orbit",
    name: "Space Orbit Kids Clock",
    price: 44,
    category: PRODUCT_CATEGORIES.KIDS,
    material: "Birch plywood with UV-printed acrylic accents",
    image: "https://picsum.photos/seed/clk-space-orbit/1200/1200",
    customizable: true,
    options: [
      createTextOption({
        label: "Child Name",
        placeholder: "Enter name",
        maxLength: 12,
      }),
      createSelectOption({
        key: "planetStyle",
        label: "Planet Style",
        values: ["Solar", "Galaxy", "Nebula"],
        defaultValue: "Solar",
      }),
      createSelectOption({
        key: "glowRing",
        label: "Glow Ring",
        values: ["None", "Blue", "Green"],
        defaultValue: "None",
      }),
    ],
  }),
  createProduct({
    id: "clk-safari-trail",
    name: "Safari Trail Kids Clock",
    price: 37.75,
    category: PRODUCT_CATEGORIES.KIDS,
    material: "Laser-cut poplar wood with UV matte print",
    image: "https://picsum.photos/seed/clk-safari-trail/1200/1200",
    customizable: true,
    options: [
      createTextOption({
        label: "Child Name",
        placeholder: "Enter name",
        maxLength: 12,
      }),
      createSelectOption({
        key: "animalSet",
        label: "Animal Set",
        values: ["Jungle", "Savannah", "Forest"],
        defaultValue: "Jungle",
      }),
      createSelectOption({
        key: "frameColor",
        label: "Frame Color",
        values: ["Natural", "Walnut", "White"],
        defaultValue: "Natural",
      }),
    ],
  }),
  createProduct({
    id: "souvenir-city-magnet",
    name: "City Skyline Wooden Magnet",
    price: 9.9,
    category: PRODUCT_CATEGORIES.SOUVENIRS,
    material: "Walnut veneer over birch base",
    image: "https://picsum.photos/seed/souvenir-city-magnet/1200/1200",
    customizable: true,
    options: [
      createTextOption({
        label: "City Name",
        placeholder: "Enter city",
        required: true,
        maxLength: 20,
      }),
      createSelectOption({
        key: "shape",
        label: "Shape",
        values: ["Rectangle", "Circle", "House"],
        defaultValue: "Rectangle",
      }),
      createSelectOption({
        key: "finish",
        label: "Finish",
        values: ["Natural", "Dark Oak", "Vintage"],
        defaultValue: "Natural",
      }),
    ],
  }),
  createProduct({
    id: "souvenir-wood-postcard",
    name: "Laser-Etched Wooden Postcard",
    price: 12.5,
    category: PRODUCT_CATEGORIES.SOUVENIRS,
    material: "3mm birch plywood",
    image: "https://picsum.photos/seed/souvenir-wood-postcard/1200/1200",
    customizable: true,
    options: [
      createTextOption({
        label: "Short Message",
        placeholder: "Write a short message",
        maxLength: 60,
      }),
      createSelectOption({
        key: "size",
        label: "Size",
        values: ["A6", "A5"],
        defaultValue: "A6",
      }),
      createSelectOption({
        key: "engravingStyle",
        label: "Engraving Style",
        values: ["Outline", "Filled", "Vintage"],
        defaultValue: "Outline",
      }),
    ],
  }),
  createProduct({
    id: "souvenir-travel-keychain",
    name: "Travel Icon Wooden Keychain",
    price: 8.4,
    category: PRODUCT_CATEGORIES.SOUVENIRS,
    material: "Beech wood with stainless steel ring",
    image: "https://picsum.photos/seed/souvenir-travel-keychain/1200/1200",
    customizable: true,
    options: [
      createTextOption({
        label: "Initials",
        placeholder: "Up to 4 letters",
        maxLength: 4,
      }),
      createSelectOption({
        key: "icon",
        label: "Icon",
        values: ["Plane", "Mountain", "Compass"],
        defaultValue: "Plane",
      }),
      createSelectOption({
        key: "woodTone",
        label: "Wood Tone",
        values: ["Natural", "Honey", "Espresso"],
        defaultValue: "Natural",
      }),
    ],
  }),
  createProduct({
    id: "engraved-cutting-board",
    name: "Custom Engraved Cutting Board",
    price: 58,
    category: PRODUCT_CATEGORIES.CUSTOM,
    material: "Solid bamboo",
    image: "https://picsum.photos/seed/engraved-cutting-board/1200/1200",
    customizable: true,
    options: [
      createTextOption({
        label: "Engraving Text",
        placeholder: "Family name or message",
        required: true,
        maxLength: 36,
      }),
      createSelectOption({
        key: "boardSize",
        label: "Board Size",
        values: ["Medium", "Large", "XL"],
        defaultValue: "Large",
      }),
      createSelectOption({
        key: "fontStyle",
        label: "Font Style",
        values: ["Script", "Serif", "Sans"],
        defaultValue: "Script",
      }),
    ],
  }),
  createProduct({
    id: "engraved-nameplate-acrylic",
    name: "UV Printed Acrylic Nameplate",
    price: 27.3,
    category: PRODUCT_CATEGORIES.CUSTOM,
    material: "5mm clear acrylic",
    image: "https://picsum.photos/seed/engraved-nameplate-acrylic/1200/1200",
    customizable: true,
    options: [
      createTextOption({
        label: "Name / Title",
        placeholder: "Enter text",
        required: true,
        maxLength: 28,
      }),
      createSelectOption({
        key: "baseColor",
        label: "Base Color",
        values: ["Black", "White", "Rose Gold"],
        defaultValue: "Black",
      }),
      createSelectOption({
        key: "mountType",
        label: "Mount Type",
        values: ["Desk Stand", "Wall Mount"],
        defaultValue: "Desk Stand",
      }),
    ],
  }),
  createProduct({
    id: "engraved-gift-box",
    name: "Personalized Wooden Gift Box",
    price: 34.95,
    category: PRODUCT_CATEGORIES.CUSTOM,
    material: "Pine wood with laser-engraved lid",
    image: "https://picsum.photos/seed/engraved-gift-box/1200/1200",
    customizable: true,
    options: [
      createTextOption({
        label: "Lid Message",
        placeholder: "Add your message",
        maxLength: 40,
      }),
      createSelectOption({
        key: "boxSize",
        label: "Box Size",
        values: ["Small", "Medium", "Large"],
        defaultValue: "Medium",
      }),
      createSelectOption({
        key: "insertType",
        label: "Insert Type",
        values: ["None", "Foam", "Velvet"],
        defaultValue: "None",
      }),
    ],
  }),
];

const freezeOption = (option) =>
  Object.freeze({
    ...option,
    values: Object.freeze([...option.values]),
  });

const freezeProduct = (product) =>
  Object.freeze({
    ...product,
    options: Object.freeze(product.options.map(freezeOption)),
  });

export const products = Object.freeze(productsData.map(freezeProduct));

const productById = Object.fromEntries(
  products.map((product) => [product.id, product]),
);

export const getProductById = (id) => productById[id] ?? null;

export const getProductsByCategory = (category) =>
  products.filter((product) => product.category === category);
