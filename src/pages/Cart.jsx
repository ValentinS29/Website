import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import { useCart } from "../context/CartContext";

const formatCustomizationLabel = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^./, (char) => char.toUpperCase());

const getCustomizationEntries = (customizationData) =>
  Object.entries(customizationData ?? {}).filter(
    ([, value]) => value !== "" && value !== null && value !== undefined,
  );

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } =
    useCart();
  const total = getTotal();

  if (cart.length === 0) {
    return (
      <Container className="space-y-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
        <p className="text-slate-600">Your cart is currently empty.</p>
        <Link
          to="/shop"
          className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Continue Shopping
        </Link>
      </Container>
    );
  }

  return (
    <Container className="space-y-8 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
        <button
          type="button"
          onClick={clearCart}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cart.map((item) => {
          const customizations = getCustomizationEntries(
            item.customizationData,
          );

          return (
            <article
              key={item.id}
              className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-[100px_1fr_auto] md:items-center"
            >
              <Link to={`/product/${item.productId}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
              </Link>

              <div className="space-y-2">
                <Link
                  to={`/product/${item.productId}`}
                  className="text-lg font-semibold text-slate-900"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-slate-600">{item.material}</p>

                {customizations.length > 0 && (
                  <ul className="space-y-1 text-xs text-slate-500">
                    {customizations.map(([key, value]) => (
                      <li key={key}>
                        {formatCustomizationLabel(key)}: {String(value)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-2 md:text-right">
                <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Quantity
                </label>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.id, event.target.value)
                  }
                  className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-sm text-slate-900 outline-none ring-brand-500 transition focus:ring md:ml-auto"
                />

                <p className="text-base font-semibold text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center">
        <p className="text-xl font-bold text-slate-900">
          Total: ${total.toFixed(2)}
        </p>

        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Continue Shopping
          </Link>

          <button
            type="button"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
