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

const formatMoney = (value) => `$${Number(value).toFixed(2)}`;

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } =
    useCart();
  const subtotal = getTotal();
  const total = subtotal;

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
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
            <p className="mt-1 text-sm text-slate-600">
              Review your items and finalize your order.
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
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

                    <div className="space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
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

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex items-center rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
                        >
                          Remove
                        </button>
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

                      <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Quantity
                          </p>
                          <div className="mt-2 inline-flex items-center rounded-lg border border-slate-300 bg-white">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1),
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="h-10 w-10 rounded-l-lg text-lg font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              -
                            </button>

                            <span className="inline-flex h-10 min-w-10 items-center justify-center border-x border-slate-300 px-3 text-sm font-semibold text-slate-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="h-10 w-10 rounded-r-lg text-lg font-semibold text-slate-700 transition hover:bg-slate-100"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <p className="text-sm text-slate-600">
                          {formatMoney(item.price)} per item
                        </p>

                        <div className="sm:text-right">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Item Total
                          </p>
                          <p className="text-xl font-bold text-slate-900">
                            {formatMoney(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Order Summary
            </p>

            <div className="mt-4 space-y-3 rounded-lg bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-700">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">
                  {formatMoney(subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="text-base font-bold text-slate-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-slate-900">
                  {formatMoney(total)}
                </span>
              </div>

              <p className="text-xs text-slate-500">
                Taxes and shipping are calculated at checkout.
              </p>
            </div>

            <Link
              to="/checkout"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-700 px-5 py-4 text-base font-bold text-white shadow-lg shadow-brand-700/30 transition duration-200 hover:scale-[1.01] hover:bg-brand-600 active:scale-[0.99]"
            >
              Checkout
            </Link>

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
