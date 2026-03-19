import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import ProductCard from "../components/common/ProductCard";
import { PRODUCT_CATEGORIES, getProductsByCategory } from "../data/products";

const categoryHighlights = [
  {
    title: "Kids Clocks",
    description:
      "Playful wall clocks personalized with names, themes, and colors.",
    to: "/shop",
  },
  {
    title: "Custom Gifts",
    description:
      "Engraved gift boxes, boards, and keepsakes made for special moments.",
    to: "/shop",
  },
  {
    title: "Souvenirs",
    description:
      "Memorable magnets, keychains, and postcards crafted from real wood.",
    to: "/shop",
  },
];

const reasonsToChoose = [
  {
    title: "Customizable",
    description:
      "Add names, short messages, and style options to make each piece personal.",
  },
  {
    title: "Made by us",
    description:
      "Every product is designed, laser-cut, printed, and finished by our team.",
  },
  {
    title: "Fast production",
    description:
      "Efficient process and quick turnaround so your order arrives on time.",
  },
];

const featuredProducts = [
  getProductsByCategory(PRODUCT_CATEGORIES.KIDS)[0],
  getProductsByCategory(PRODUCT_CATEGORIES.CUSTOM)[0],
  getProductsByCategory(PRODUCT_CATEGORIES.SOUVENIRS)[0],
].filter(Boolean);

function Home() {
  return (
    <>
      <section className="py-12">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-amber-100 via-white to-brand-50 p-8 shadow-sm md:p-12">
            <div className="max-w-3xl space-y-6">
              <p className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 ring-1 ring-brand-200">
                Personalized Wooden Gifts
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Custom products crafted from wood for meaningful gifts and
                everyday moments.
              </h1>

              <p className="max-w-2xl text-lg text-slate-700">
                Shop laser-cut kids clocks, engraved keepsakes, and handmade
                souvenirs you can personalize in minutes.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-700/25 transition hover:bg-brand-600"
                >
                  Shop Now
                </Link>

                <Link
                  to="/custom-order"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  Start Custom Order
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container className="space-y-6">
          <header className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">
              Shop by Category
            </h2>
            <p className="text-slate-600">
              Start with the collection that matches your occasion.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            {categoryHighlights.map((category) => (
              <article
                key={category.title}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-900">
                  {category.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">
                  {category.description}
                </p>
                <Link
                  to={category.to}
                  className="mt-4 inline-flex w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  Explore
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container className="space-y-6">
          <header className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Popular Picks</h2>
            <p className="text-slate-600">
              Personalized best sellers ready to add to cart.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container className="space-y-6">
          <header className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose Us</h2>
            <p className="text-slate-600">
              Built for quality gifting with personalization at the center.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            {reasonsToChoose.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export default Home;
