// Real customer reviews, added by hand after the customer sends them (WhatsApp, Google, etc.).
// Only add reviews customers actually wrote. Fixing spelling is fine; never change what they said or make it sound better.
//
// - Leave `productId` out for reviews about the store or service in general.
// - Set `productId` (the product's id, e.g. "terea-amber-kazakhstan") when the review is about that product.
// - Set `rating` (1–5) only when the customer gave stars. Product reviews with a rating feed the
//   product's star rating in Google; reviews without one are shown but not counted.
export interface Review {
    name: string // as the customer gave it, ideally first name only
    text: string
    rating?: 1 | 2 | 3 | 4 | 5
    productId?: string
    date?: string // YYYY-MM-DD, when known
}

export const REVIEWS: Review[] = [
    { name: "Saltvana", text: "Received good product", rating: 5 },
    { name: "Alobaidy", text: "Great services, received what I ordered", rating: 5 },
]

export const storeReviews = REVIEWS.filter((r) => !r.productId)

export function productReviews(productId: string) {
    return REVIEWS.filter((r) => r.productId === productId)
}

// Product schema fields — only from product-specific reviews that carry a star rating, so the
// aggregate always matches reviews shown on the page.
export function reviewSchema(productId: string) {
    const rated = productReviews(productId).filter((r): r is Review & { rating: number } => r.rating !== undefined)
    if (!rated.length) return {}
    const average = rated.reduce((sum, r) => sum + r.rating, 0) / rated.length
    return {
        aggregateRating: { "@type": "AggregateRating", ratingValue: Number(average.toFixed(1)), reviewCount: rated.length, bestRating: 5, worstRating: 1 },
        review: rated.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            reviewBody: r.text,
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
            ...(r.date ? { datePublished: r.date } : {}),
        })),
    }
}
