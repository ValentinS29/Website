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
    <Container className="py-12">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
          <button
            type="button"
            onClick={clearCart}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <section className="space-y-6">
            {cart.map((item) => {
              const customizations = getCustomizationEntries(
                item.customizationData,
              );

              return (
                <article
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="grid gap-4 sm:grid-cols-[100px_1fr]">
                    <Link to={`/product/${item.productId}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                    </Link>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-lg font-semibold text-slate-900"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-slate-600">
                          {item.material}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                          Customization
                        </p>

                        {customizations.length > 0 ? (
                          <ul className="mt-2 space-y-1 text-sm text-slate-700">
                            {customizations.map(([key, value]) => (
                              <li key={key}>
                                {formatCustomizationLabel(key)}: {String(value)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-sm text-slate-500">
                            No customization selected.
                          </p>
                        )}
                      </div>

                      <div className="grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-end">
                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                          Quantity
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(event) =>
                              updateQuantity(item.id, event.target.value)
                            }
                            className="mt-1 block w-24 rounded-lg border border-slate-300 px-2 py-1.5 text-sm text-slate-900 outline-none ring-brand-500 transition focus:ring"
                          />
                        </label>

                        <p className="text-sm text-slate-600">
                          ${item.price.toFixed(2)} each
                        </p>

                        <div className="sm:text-right">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Price
                          </p>
                          <p className="text-lg font-bold text-slate-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex w-fit text-sm font-semibold text-red-600 transition hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Order Summary
            </p>

            <div className="mt-4 space-y-2 border-y border-slate-200 py-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                TOTAL
              </p>
              <p className="text-3xl font-bold text-slate-900">
                ${total.toFixed(2)}
              </p>
            </div>

            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-700 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-700/25 transition hover:bg-brand-600"
            >
              Checkout
            </button>

            <Link
              to="/shop"
              className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
