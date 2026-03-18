import Container from "../components/common/Container";
import ProductCard from "../components/common/ProductCard";
import { PRODUCT_CATEGORIES, getProductsByCategory } from "../data/products";

const categorySections = [
  { key: PRODUCT_CATEGORIES.KIDS, title: "Kids Clocks" },
  { key: PRODUCT_CATEGORIES.SOUVENIRS, title: "Souvenirs" },
  { key: PRODUCT_CATEGORIES.CUSTOM, title: "Custom Engraved" },
];

function Shop() {
  return (
    <Container className="space-y-12 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Shop Collections</h1>
        <p className="text-slate-600">
          Browse laser-cut products, UV-printed gifts, and custom engraved
          items.
        </p>
      </header>

      {categorySections.map((section) => {
        const categoryProducts = getProductsByCategory(section.key);

        return (
          <section key={section.key} className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              {section.title}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}
    </Container>
  );
}

export default Shop;
