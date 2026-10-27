import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { STORE } from "@/app/data/store"

export interface Crumb {
    name: string
    href: string
}

// Visible breadcrumb trail plus the matching BreadcrumbList structured data.
export default function Breadcrumbs({ items, light = false, home = { name: "Home", href: "/" } }: { items: Crumb[]; light?: boolean; home?: Crumb }) {
    const all = [home, ...items]
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${STORE.url}${c.href === "/" ? "" : c.href}`,
        })),
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <nav
                aria-label="Breadcrumb"
                className={`no-scrollbar flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-sm ${light ? "text-white/55" : "text-ink-soft"}`}
            >
                {all.map((c, i) => (
                    <span key={c.href} className="flex items-center gap-1.5">
                        {i > 0 && <ChevronRight size={14} />}
                        {i === all.length - 1 ? (
                            <span className={`font-semibold ${light ? "text-white" : "text-ink"}`}>{c.name}</span>
                        ) : (
                            <Link href={c.href} className={light ? "hover:text-white" : "hover:text-ink"}>
                                {c.name}
                            </Link>
                        )}
                    </span>
                ))}
            </nav>
        </>
    )
}
