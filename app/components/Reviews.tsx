import { Quote, Star } from "lucide-react"
import type { Review } from "@/app/data/reviews"

function Stars({ rating }: { rating: number }) {
    return (
        <span className="flex gap-0.5 text-gold" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={15} fill={i < rating ? "currentColor" : "none"} />
            ))}
        </span>
    )
}

// Customer review cards. Stars appear only on reviews where the customer gave a rating.
export default function Reviews({ reviews, title, id }: { reviews: Review[]; title: string; id?: string }) {
    if (!reviews.length) return null
    return (
        <section id={id}>
            <h2 className="text-2xl font-extrabold md:text-4xl">{title}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
                {reviews.map((r) => (
                    <li key={`${r.name}-${r.text}`} className="flex flex-col rounded-[1.5rem] border border-line bg-paper p-5 md:p-6">
                        <Quote size={22} className="text-ember" aria-hidden="true" />
                        {r.rating && (
                            <div className="mt-3">
                                <Stars rating={r.rating} />
                            </div>
                        )}
                        <blockquote className="mt-3 flex-1 text-lg font-semibold leading-snug">&ldquo;{r.text}&rdquo;</blockquote>
                        <p className="mt-4 text-sm text-ink-soft">
                            <span className="font-bold text-ink">{r.name}</span> · Verified customer
                            {r.date && ` · ${new Date(r.date).toLocaleDateString("en-AE", { month: "short", year: "numeric" })}`}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
