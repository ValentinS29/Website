import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, {});
  };

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      <div className="flex h-full flex-col space-y-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {product.category}
          </p>

          {product.customizable && (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 ring-1 ring-brand-200">
              Customizable
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="text-sm text-slate-600">{product.material}</p>

        <div className="mt-auto space-y-3 pt-1">
          <span className="text-base font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>

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
