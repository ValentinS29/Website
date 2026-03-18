import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, {});
  };

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-300 hover:scale-105"
          loading="lazy"
        />
      </Link>

      <div className="space-y-3 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {product.category}
        </p>

        <h3 className="text-lg font-semibold text-slate-900">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="text-sm text-slate-600">{product.material}</p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-base font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
