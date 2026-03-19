import { NavLink } from "react-router-dom";
import { navLinks } from "../data/navigation";
import Container from "./common/Container";

function Footer({ brandName = "CraftCommerce" }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              {brandName}
            </h2>
            <p className="max-w-xs text-sm text-slate-600">
              Laser-cut creations, UV-printed gifts, and custom pieces crafted
              for every occasion.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Navigation
            </h3>
            <nav aria-label="Footer navigation" className="mt-4 grid gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-sm text-slate-600 transition-colors hover:text-brand-700"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Contact
            </h3>
            <p className="text-sm text-slate-600">support@craftcommerce.com</p>
            <p className="text-sm text-slate-600">+1 (555) 218-4400</p>
            <p className="text-sm text-slate-600">
              Mon-Fri, 9:00 AM to 6:00 PM
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © {year} {brandName}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
