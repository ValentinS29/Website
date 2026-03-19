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

const formatCategoryLabel = (value) =>
  String(value ?? "")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getPreviewText = (value) => {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : "Your text will appear here";
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

  const hasCustomizationOptions =
    product.customizable && product.options.length > 0;

  return (
    <Container className="py-12">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                {formatCategoryLabel(product.category)}
              </p>
              {product.customizable && (
                <p className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 ring-1 ring-brand-200">
                  Customizable
                </p>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {product.name}
            </h1>
            <p className="text-slate-600">{product.material}</p>
            <p className="text-3xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </p>
          </section>

          {hasCustomizationOptions && (
            <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-slate-900">
                  Customization Options
                </h2>
                <p className="text-sm text-slate-600">
                  Personalize this product before adding it to your cart.
                </p>
              </div>

              <div className="grid gap-4">
                {product.options.map((option) => (
                  <label key={option.key} className="block space-y-2">
                    <span className="text-sm font-semibold text-slate-800">
                      {option.label}
                    </span>

                    {option.type === "text" ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={customizationData[option.key] ?? ""}
                          onChange={(event) =>
                            handleFieldChange(option.key, event.target.value)
                          }
                          placeholder={option.placeholder}
                          required={option.required}
                          maxLength={option.maxLength ?? undefined}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-brand-500 transition focus:ring"
                        />

                        <div className="rounded-lg border border-dashed border-brand-300 bg-brand-50 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                            Preview
                          </p>
                          <p className="mt-1 min-h-[1.25rem] break-words text-sm font-semibold text-slate-900">
                            {getPreviewText(customizationData[option.key])}
                          </p>
                        </div>
                      </div>
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
                        required={option.required}
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
              </div>
            </section>
          )}

          {!hasCustomizationOptions && product.customizable && (
            <section className="rounded-2xl border border-brand-200 bg-brand-50 p-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Customization
              </h2>
              <p className="mt-1 text-sm text-slate-700">
                This product supports customization.
              </p>
            </section>
          )}

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex w-full items-center justify-center rounded-xl bg-brand-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-700/25 transition hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
            >
              Add to Cart
            </button>

            <Link
              to="/cart"
              className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              View Cart
            </Link>
          </section>
        </div>
      </div>
    </Container>
  );
}

export default Product;
