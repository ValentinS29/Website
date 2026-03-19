import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { navLinks } from "../data/navigation";
import Container from "./common/Container";

const MOBILE_MENU_PATHS = [
  "/",
  "/shop",
  "/custom-order",
  "/b2b",
  "/contact",
  "/cart",
];

const linkClassName = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-brand-50 text-brand-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

const mobileLinkClassName = ({ isActive }) =>
  `block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
    isActive
      ? "bg-brand-50 text-brand-700"
      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
  }`;

function Navbar({ brandName = "CraftCommerce" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const mobileLinks = useMemo(
    () =>
      MOBILE_MENU_PATHS.map((path) =>
        navLinks.find((link) => link.to === path),
      ).filter(Boolean),
    [],
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <NavLink
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-lg font-semibold tracking-tight text-slate-900"
        >
          {brandName}
        </NavLink>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClassName}>
              {link.label}
              {link.to === "/cart" && cartCount > 0 && (
                <span className="ml-2 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          <span className="sr-only">Open navigation menu</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </Container>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <Container>
            <nav
              className="flex flex-col gap-2 py-4"
              aria-label="Mobile navigation"
            >
              {mobileLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileLinkClassName}
                >
                  {link.label}
                  {link.to === "/cart" && cartCount > 0 && (
                    <span className="ml-2 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}

export default Navbar;
