import ProductCard from "../ProductCard"
import type { Product } from "@/app/types"

// Swipeable row on mobile, regular grid from md up.
export default function ProductRail({ products, columns = 4 }: { products: Product[]; columns?: 4 | 5 }) {
    return (
        <div
            className={`no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:gap-4 md:overflow-visible md:px-0 md:pb-0 ${
                columns === 5 ? "md:grid-cols-3 lg:grid-cols-5" : "md:grid-cols-3 lg:grid-cols-4"
            }`}
        >
            {products.map((p) => (
                <div key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] md:w-auto">
                    <ProductCard product={p} />
                </div>
            ))}
        </div>
    )
}
