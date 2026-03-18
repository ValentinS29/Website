const CURRENCY_PRECISION = 100;

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
  Math.round((value + Number.EPSILON) * CURRENCY_PRECISION) / CURRENCY_PRECISION;

const clonePlainObject = (value) => {
  if (value === null || value === undefined) {
    return {};
  }

  if (typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("customizations must be a plain object");
  }

  return JSON.parse(JSON.stringify(value));
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

const createLineItemKey = (productId, customizations = {}) =>
  productId + "::" + JSON.stringify(sortObjectKeys(customizations));

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

  if (!product.imageUrl || typeof product.imageUrl !== "string") {
    throw new TypeError("product.imageUrl is required");
  }

  return normalizePrice(product.price);
};

const matchesTargetItem = (item, productId, customizations) => {
  if (item.productId !== productId) {
    return false;
  }

  if (customizations === undefined) {
    return true;
  }

  return item.lineItemKey === createLineItemKey(productId, customizations);
};

export const addToCart = (cartItems, product, quantity = 1, customizations = {}) => {
  assertCart(cartItems);

  const unitPrice = validateProduct(product);
  const normalizedQuantity = normalizeQuantity(quantity);

  if (normalizedQuantity <= 0) {
    return [...cartItems];
  }

  const safeCustomizations = clonePlainObject(customizations);
  const lineItemKey = createLineItemKey(product.id, safeCustomizations);

  const existingIndex = cartItems.findIndex((item) => item.lineItemKey === lineItemKey);

  if (existingIndex === -1) {
    const newItem = {
      lineItemKey,
      productId: product.id,
      name: product.name,
      category: product.category,
      material: product.material,
      imageUrl: product.imageUrl,
      price: unitPrice,
      quantity: normalizedQuantity,
      customizations: safeCustomizations,
    };

    return [...cartItems, newItem];
  }

  return cartItems.map((item, index) => {
    if (index !== existingIndex) {
      return item;
    }

    return {
      ...item,
      quantity: item.quantity + normalizedQuantity,
    };
  });
};

export const removeFromCart = (cartItems, productId, customizations) => {
  assertCart(cartItems);

  if (!productId) {
    return [...cartItems];
  }

  return cartItems.filter(
    (item) => !matchesTargetItem(item, productId, customizations),
  );
};

export const updateQuantity = (cartItems, productId, quantity, customizations) => {
  assertCart(cartItems);

  if (!productId) {
    return [...cartItems];
  }

  const normalizedQuantity = normalizeQuantity(quantity);

  if (normalizedQuantity <= 0) {
    return removeFromCart(cartItems, productId, customizations);
  }

  return cartItems.map((item) => {
    if (!matchesTargetItem(item, productId, customizations)) {
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

    if (!Number.isFinite(unitPrice) || !Number.isFinite(quantity) || quantity <= 0) {
      return sum;
    }

    return sum + unitPrice * quantity;
  }, 0);

  return toMoney(total);
};
