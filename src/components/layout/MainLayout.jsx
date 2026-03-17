import { NavLink, Outlet } from "react-router-dom";
import Container from "../common/Container";
import { navLinks } from "../../data/navigation";
import useScrollToTop from "../../hooks/useScrollToTop";

function MainLayout() {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <Container className="flex h-16 items-center justify-between">
          <NavLink
            to="/"
            className="text-lg font-semibold tracking-tight text-slate-900"
          >
            CraftCommerce
          </NavLink>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 md:flex"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? "text-brand-600" : "text-slate-600 hover:text-slate-900"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </Container>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <Container className="py-6 text-sm text-slate-500">
          © {new Date().getFullYear()} CraftCommerce
        </Container>
      </footer>
    </div>
  );
}

export default MainLayout;
