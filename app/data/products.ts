import type { Product } from "@/app/types"

export const products: Product[] = [
    { id: 1, name: "Terea Heets Yellow Selection", description: "Smooth and balanced Terea stick with subtle toasted notes.", price: 15.99, image: "/ProductImage.png" },
    { id: 2, name: "Terea Heets Turquoise Selection", description: "Refreshing menthol profile with a crisp finish.", price: 15.99, image: "/ProductImage.png" },
    { id: 3, name: "Terea Heets Amber Selection", description: "Rich, roasted character for a fuller taste.", price: 15.99, image: "/ProductImage.png" },
    { id: 4, name: "Terea Heets Bronze Selection", description: "Intense and deep flavor with aromatic notes.", price: 15.99, image: "/ProductImage.png" },
    { id: 5, name: "Terea Heets Sienna Selection", description: "Balanced and rounded with a smooth aftertaste.", price: 15.99, image: "/ProductImage.png" },
    { id: 6, name: "Terea Heets Teak Selection", description: "Warm notes with a mellow, satisfying profile.", price: 15.99, image: "/ProductImage.png" },
]

export function getProductById(id: number) {
    return products.find((p) => p.id === id)
}


