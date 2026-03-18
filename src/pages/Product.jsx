import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/common/Container";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";

const buildInitialCustomizationData = (product) => {
  if (!product || !product.customizable) {
    return {};
  }

  return product.options.reduce((accumulator, option) => {
    if (option.type === "text") {
      accumulator[option.key] = option.defaultValue ?? "";
      return accumulator;
    }

    accumulator[option.key] = option.defaultValue ?? option.values[0] ?? "";
    return accumulator;
  }, {});
};

function Product() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const product = getProductById(slug);

  const initialCustomizationData = useMemo(
    () => buildInitialCustomizationData(product),
    [product],
  );

  const [customizationData, setCustomizationData] = useState(
    initialCustomizationData,
  );

  useEffect(() => {
    setCustomizationData(initialCustomizationData);
  }, [initialCustomizationData]);

  const handleFieldChange = (fieldKey, value) => {
    setCustomizationData((current) => ({
      ...current,
      [fieldKey]: value,
    }));
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    const payload = product.customizable ? customizationData : {};
    addToCart(product, payload);
  };

  if (!product) {
    return (
      <Container className="space-y-4 py-12">
        <h1 className="text-2xl font-bold text-slate-900">Product Not Found</h1>
        <p className="text-slate-600">
          The product you requested does not exist.
        </p>
        <Link
          to="/shop"
          className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Back to Shop
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
            <p className="text-slate-600">{product.material}</p>
            <p className="text-2xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {product.customizable && product.options.length > 0 && (
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
              <h2 className="text-lg font-semibold text-slate-900">Customize</h2>

              {product.options.map((option) => (
                <label key={option.key} className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    {option.label}
                  </span>

                  {option.type === "text" ? (
                    <input
                      type="text"
                      value={customizationData[option.key] ?? ""}
                      onChange={(event) =>
                        handleFieldChange(option.key, event.target.value)
                      }
                      placeholder={option.placeholder}
                      maxLength={option.maxLength ?? undefined}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-brand-500 transition focus:ring"
                    />
                  ) : (
                    <select
                      value={
                        customizationData[option.key] ??
                        option.defaultValue ??
                        option.values[0] ??
                        ""
                      }
                      onChange={(event) =>
                        handleFieldChange(option.key, event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-brand-500 transition focus:ring"
                    >
                      {option.values.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  )}
                </label>
              ))}
            </section>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Add to Cart
            </button>

            <Link
              to="/cart"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;
