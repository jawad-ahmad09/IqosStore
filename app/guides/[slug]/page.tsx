import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { GUIDES, getGuide } from "@/app/data/guides"
import { STORE } from "@/app/data/store"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
    return GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const guide = getGuide((await params).slug)
    if (!guide) return {}
    return {
        title: guide.title,
        description: guide.description,
        alternates: { canonical: `/guides/${guide.slug}` },
        openGraph: { title: guide.title, description: guide.description, type: "article", publishedTime: guide.published, modifiedTime: guide.updated },
    }
}

export default async function GuidePage({ params }: Params) {
    const guide = getGuide((await params).slug)
    if (!guide) notFound()
    const Content = guide.content
    const others = GUIDES.filter((g) => g.slug !== guide.slug)

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        datePublished: guide.published,
        dateModified: guide.updated,
        mainEntityOfPage: `${STORE.url}/guides/${guide.slug}`,
        author: { "@type": "Organization", name: STORE.name, url: STORE.url },
        publisher: { "@id": `${STORE.url}/#store` },
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <article className="container-x max-w-3xl py-8 md:py-14">
                <Breadcrumbs items={[{ name: "Guides", href: "/guides" }, { name: guide.title, href: `/guides/${guide.slug}` }]} />
                <h1 className="mt-6 text-3xl font-extrabold leading-tight md:text-5xl">{guide.title}</h1>
                <p className="mt-4 text-sm font-semibold text-ink-faint">
                    {STORE.name} · Updated{" "}
                    {new Date(guide.updated).toLocaleDateString("en-AE", { day: "numeric", month: "long", year: "numeric" })} · {guide.readMinutes} min read
                </p>
                <div className="prose-guide mt-8">
                    <Content />
                </div>
            </article>

            <section className="container-x max-w-3xl pb-16">
                <h2 className="mb-4 text-xl font-extrabold">More guides</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                    {others.map((g) => (
                        <Link key={g.slug} href={`/guides/${g.slug}`} className="group rounded-[1.5rem] border border-line bg-paper p-5 transition hover:shadow-lg">
                            <span className="font-display font-bold leading-snug">{g.title}</span>
                            <span className="mt-3 flex items-center gap-1 text-sm font-bold text-ember">
                                Read <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}
