const CURRENCY_PRECISION = 100;

const isPlainObject = (value) =>
  Object.prototype.toString.call(value) === "[object Object]";

const assertCart = (cartItems) => {
  if (!Array.isArray(cartItems)) {
    throw new TypeError("cartItems must be an array");
  }
};

const normalizeQuantity = (quantity) => {
  const parsedQuantity = Number(quantity);

  if (!Number.isFinite(parsedQuantity)) {
    throw new TypeError("quantity must be a finite number");
  }

  return Math.floor(parsedQuantity);
};

const normalizePrice = (price) => {
  const parsedPrice = Number(price);

  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
    throw new TypeError("product.price must be a non-negative number");
  }

  return parsedPrice;
};

const toMoney = (value) =>
  Math.round((value + Number.EPSILON) * CURRENCY_PRECISION) /
  CURRENCY_PRECISION;

const cloneCustomizationData = (customizationData) => {
  if (customizationData === null || customizationData === undefined) {
    return {};
  }

  if (!isPlainObject(customizationData)) {
    throw new TypeError("customizationData must be a plain object");
  }

  return JSON.parse(JSON.stringify(customizationData));
};

const sortObjectKeys = (value) => {
  if (Array.isArray(value)) {
    return value.map(sortObjectKeys);
  }

  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((accumulator, key) => {
        accumulator[key] = sortObjectKeys(value[key]);
        return accumulator;
      }, {});
  }

  return value;
};

export const createCartItemId = (productId, customizationData = {}) =>
  productId + "::" + JSON.stringify(sortObjectKeys(customizationData));

const validateProduct = (product) => {
  if (!product || typeof product !== "object") {
    throw new TypeError("product must be an object");
  }

  if (!product.id) {
    throw new TypeError("product.id is required");
  }

  if (!product.name || typeof product.name !== "string") {
    throw new TypeError("product.name is required");
  }

  if (!product.image || typeof product.image !== "string") {
    throw new TypeError("product.image is required");
  }

  return {
    id: product.id,
    name: product.name,
    price: normalizePrice(product.price),
    category: product.category ?? "",
    material: product.material ?? "",
    image: product.image,
  };
};

export const addToCart = (cartItems, product, customizationData = {}) => {
  assertCart(cartItems);

  const safeProduct = validateProduct(product);
  const safeCustomizationData = cloneCustomizationData(customizationData);
  const cartItemId = createCartItemId(safeProduct.id, safeCustomizationData);

  const existingIndex = cartItems.findIndex((item) => item.id === cartItemId);

  if (existingIndex === -1) {
    const newItem = {
      id: cartItemId,
      productId: safeProduct.id,
      name: safeProduct.name,
      category: safeProduct.category,
      material: safeProduct.material,
      image: safeProduct.image,
      price: safeProduct.price,
      quantity: 1,
      customizationData: safeCustomizationData,
    };

    return [...cartItems, newItem];
  }

  return cartItems.map((item, index) => {
    if (index !== existingIndex) {
      return item;
    }

    return {
      ...item,
      quantity: item.quantity + 1,
    };
  });
};

export const removeFromCart = (cartItems, id) => {
  assertCart(cartItems);

  if (!id) {
    return [...cartItems];
  }

  return cartItems.filter((item) => item.id !== id);
};

export const updateQuantity = (cartItems, id, quantity) => {
  assertCart(cartItems);

  if (!id) {
    return [...cartItems];
  }

  const normalizedQuantity = normalizeQuantity(quantity);

  if (normalizedQuantity <= 0) {
    return removeFromCart(cartItems, id);
  }

  return cartItems.map((item) => {
    if (item.id !== id) {
      return item;
    }

    return {
      ...item,
      quantity: normalizedQuantity,
    };
  });
};

export const getTotal = (cartItems) => {
  assertCart(cartItems);

  const total = cartItems.reduce((sum, item) => {
    const unitPrice = Number(item.price);
    const quantity = Number(item.quantity);

    if (
      !Number.isFinite(unitPrice) ||
      !Number.isFinite(quantity) ||
      quantity <= 0
    ) {
      return sum;
    }

    return sum + unitPrice * quantity;
  }, 0);

  return toMoney(total);
};
