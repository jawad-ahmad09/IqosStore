import type { Metadata } from "next"
import { notFound } from "next/navigation"
import CollectionView from "@/app/components/collection/CollectionView"
import { COLLECTIONS, getCollection } from "@/app/data/collections"
import { collectionMetadata } from "@/app/lib/seo"

type Params = { params: Promise<{ region: string }> }

export const dynamicParams = false

export function generateStaticParams() {
    return COLLECTIONS.filter((c) => c.region).map((c) => ({ region: c.slug.split("/")[1] }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const collection = getCollection(`terea/${(await params).region}`)
    return collection ? collectionMetadata(collection) : {}
}

export default async function TereaRegionPage({ params }: Params) {
    const collection = getCollection(`terea/${(await params).region}`)
    if (!collection) notFound()
    return <CollectionView collection={collection} />
}
