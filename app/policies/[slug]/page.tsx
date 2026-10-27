import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { POLICIES, getPolicy } from "@/app/data/policies"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
    return POLICIES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const policy = getPolicy((await params).slug)
    if (!policy) return {}
    return { title: policy.title, description: policy.description, alternates: { canonical: `/policies/${policy.slug}` } }
}

export default async function PolicyPage({ params }: Params) {
    const policy = getPolicy((await params).slug)
    if (!policy) notFound()

    return (
        <article className="container-x max-w-3xl py-8 md:py-14">
            <Breadcrumbs items={[{ name: policy.title, href: `/policies/${policy.slug}` }]} />
            <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">{policy.title}</h1>
            <p className="mt-3 text-sm font-semibold text-ink-faint">
                Last updated {new Date(policy.updated).toLocaleDateString("en-AE", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <div className="prose-guide mt-8">
                {policy.sections.map((s) => (
                    <section key={s.heading}>
                        <h2>{s.heading}</h2>
                        <p>{s.text}</p>
                    </section>
                ))}
            </div>
            <nav className="mt-12 flex flex-wrap gap-2 border-t border-line pt-6">
                {POLICIES.filter((p) => p.slug !== policy.slug).map((p) => (
                    <Link key={p.slug} href={`/policies/${p.slug}`} className="chip">
                        {p.title}
                    </Link>
                ))}
                <Link href="/delivery" className="chip">Delivery</Link>
            </nav>
        </article>
    )
}
