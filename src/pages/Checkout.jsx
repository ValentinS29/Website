import { useMemo, useState } from "react";
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

function Checkout() {
  const { cart, clearCart, getTotal } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getTotal();
  const total = subtotal;

  const itemCount = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [cart],
  );

  const handleFieldChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0 || orderPlaced) {
      return;
    }

    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <Container className="py-12">
        <div className="mx-auto max-w-2xl rounded-2xl border border-green-200 bg-green-50 p-6 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Order Confirmed
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Thank you, {formData.name || "Customer"}.
          </h1>
          <p className="mt-3 text-slate-700">
            Your order has been placed successfully. We sent confirmation
            details to {formData.email || "your email"}.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Continue Shopping
          </Link>
        </div>
      </Container>
    );
  }

  if (cart.length === 0) {
    return (
      <Container className="space-y-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
        <p className="text-slate-600">Your cart is empty.</p>
        <Link
          to="/shop"
          className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Browse Products
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
          <p className="text-sm text-slate-600">
            Complete your details to place the order.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <form
            onSubmit={handlePlaceOrder}
            className="space-y-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">
                Your Details
              </h2>
              <p className="text-sm text-slate-600">
                Please provide shipping and contact information.
              </p>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Name</span>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(event) =>
                  handleFieldChange("name", event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none ring-brand-500 transition focus:ring"
                placeholder="Your full name"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(event) =>
                  handleFieldChange("email", event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none ring-brand-500 transition focus:ring"
                placeholder="you@example.com"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Address
              </span>
              <textarea
                required
                value={formData.address}
                onChange={(event) =>
                  handleFieldChange("address", event.target.value)
                }
                rows={4}
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none ring-brand-500 transition focus:ring"
                placeholder="Street, city, postal code"
              />
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-brand-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-700/30 transition duration-200 hover:scale-[1.01] hover:bg-brand-600 active:scale-[0.99]"
            >
              Place Order
            </button>
          </form>

          <aside className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Cart Summary
              </p>
              <p className="text-sm text-slate-600">{itemCount} item(s)</p>
            </div>

            <div className="space-y-3">
              {cart.map((item) => {
                const customizations = getCustomizationEntries(
                  item.customizationData,
                );

                return (
                  <article
                    key={item.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <span className="text-sm font-semibold text-slate-700">
                        x{item.quantity}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-600">
                      {formatMoney(item.price)} each
                    </p>

                    {customizations.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-slate-600">
                        {customizations.map(([key, value]) => (
                          <li key={key}>
                            {formatCustomizationLabel(key)}: {String(value)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>

            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
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
            </div>

            <Link
              to="/cart"
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to Cart
            </Link>
          </aside>
        </div>
      </div>
    </Container>
  );
}

export default Checkout;
