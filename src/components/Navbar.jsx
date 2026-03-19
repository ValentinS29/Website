import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { navLinks } from "../data/navigation";
import Container from "./common/Container";

const linkClassName = ({ isActive }) =>
  `group relative px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "text-brand-700" : "text-slate-600 hover:text-slate-900"
  }`;

const linkIndicatorClassName = ({ isActive }) =>
  `pointer-events-none absolute inset-x-3 bottom-1 h-0.5 origin-center rounded-full bg-brand-600 transition-transform duration-300 ${
    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
  }`;

const mobileLinkClassName = ({ isActive }) =>
  `block rounded-lg px-6 py-4 text-base font-medium transition-colors ${
    isActive
      ? "bg-brand-50 text-brand-700"
      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
  }`;

function Navbar({ brandName = "CraftCommerce" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { cart } = useCart();

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <NavLink
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-xl font-semibold tracking-tight text-slate-900"
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
              <span
                className={linkIndicatorClassName({
                  isActive: pathname === link.to,
                })}
              />
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
          aria-controls="mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors duration-300 hover:bg-slate-100 md:hidden"
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

      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      >
        <Container className="pt-20">
          <div
            id="mobile-navigation"
            className={`rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-300 ${
              isMobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <nav
              className="flex flex-col gap-1 p-2"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, index) => (
                <div
                  key={link.to}
                  className={
                    index < navLinks.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }
                >
                  <NavLink
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
                </div>
              ))}
            </nav>
          </div>
        </Container>
      </div>
    </header>
  );
}

export default Navbar;
