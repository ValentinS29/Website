import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product, onAddToCart, className = "" }) {
  const { addToCart } = useCart();

  if (!product) {
    return null;
  }

  const title = product.title ?? product.name ?? "Product";
  const image =
    product.image ??
    "https://picsum.photos/seed/craftcommerce-placeholder/1200/1200";
  const price = Number(product.price ?? 0);
  const productPath =
    product.slug || product.id
      ? `/product/${product.slug ?? product.id}`
      : null;

  const handleAddToCart = () => {
    if (typeof onAddToCart === "function") {
      onAddToCart(product);
      return;
    }

    addToCart(product, {});
  };

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      {productPath ? (
        <Link to={productPath} className="block overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
      ) : (
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-56 w-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-4">
        {product.customizable && (
          <span className="w-fit rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 ring-1 ring-brand-200">
            Customizable
          </span>
        )}

        <h3 className="text-lg font-semibold leading-tight text-slate-900">
          {productPath ? <Link to={productPath}>{title}</Link> : title}
        </h3>

        <div className="mt-auto space-y-3">
          <p className="text-xl font-bold text-slate-900">
            ${price.toFixed(2)}
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex w-full items-center justify-center rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
