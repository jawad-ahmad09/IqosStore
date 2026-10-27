import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ArCollectionView from "@/app/components/ar/ArCollectionView"
import { AR_COLLECTIONS, getArCollection } from "@/app/data/ar"
import { arabicMetadata } from "@/app/lib/seo"

type Params = { params: Promise<{ region: string }> }

export const dynamicParams = false

export function generateStaticParams() {
    return AR_COLLECTIONS.filter((c) => c.region).map((c) => ({ region: c.slug.split("/")[1] }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const collection = getArCollection(`terea/${(await params).region}`)
    return collection ? arabicMetadata(`/${collection.slug}`, collection.metaTitle, collection.metaDescription) : {}
}

export default async function ArTereaRegionPage({ params }: Params) {
    const collection = getArCollection(`terea/${(await params).region}`)
    if (!collection) notFound()
    return <ArCollectionView collection={collection} />
}
