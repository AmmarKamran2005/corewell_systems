import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

/**
 * Live-product status comes from docs/spec.md Section 3 (the clinical platform, the therapy platform,
 * the hospitality platform are listed as live). Do not add products here without confirming
 * status — see the ethical content rules in spec Section 7.
 */
const products = [
  {
    slug: "clinical-platform",
    name: "the clinical platform",
    category: "Electronic Health Records",
    description:
      "[PLACEHOLDER: one-line outcome-focused description of the clinical platform.]",
  },
  {
    slug: "therapy-platform",
    name: "the therapy platform",
    category: "[PLACEHOLDER: product category]",
    description:
      "[PLACEHOLDER: one-line outcome-focused description of the therapy platform.]",
  },
  {
    slug: "hospitality-platform",
    name: "the hospitality platform",
    category: "[PLACEHOLDER: product category]",
    description:
      "[PLACEHOLDER: one-line outcome-focused description of the hospitality platform.]",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Products running in the real world
            </h2>
            <p className="mt-4 text-base leading-relaxed text-soft">
              [PLACEHOLDER: short intro framing products as evidence, not a
              gallery.]
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-accent hover:text-accent-strong"
          >
            All products →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Card interactive className="h-full">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <Badge variant="live">Live Product</Badge>
                </div>
                <p className="mt-1 text-sm text-faint">{product.category}</p>
                <p className="mt-3 text-sm leading-relaxed text-soft">
                  {product.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
