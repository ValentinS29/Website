import { Outlet } from "react-router-dom";
import Container from "../common/Container";
import Navbar from "../Navbar";
import useScrollToTop from "../../hooks/useScrollToTop";

function MainLayout() {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

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
