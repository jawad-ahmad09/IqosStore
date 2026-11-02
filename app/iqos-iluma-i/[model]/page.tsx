import type { Metadata } from "next"
import { notFound } from "next/navigation"
import CollectionView from "@/app/components/collection/CollectionView"
import { COLLECTIONS, getCollection } from "@/app/data/collections"
import { collectionMetadata } from "@/app/lib/seo"

type Params = { params: Promise<{ model: string }> }

export const dynamicParams = false

export function generateStaticParams() {
    return COLLECTIONS.filter((c) => c.slug.startsWith("iqos-iluma-i/")).map((c) => ({ model: c.slug.split("/")[1] }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const collection = getCollection(`iqos-iluma-i/${(await params).model}`)
    return collection ? collectionMetadata(collection) : {}
}

export default async function IlumaIModelPage({ params }: Params) {
    const collection = getCollection(`iqos-iluma-i/${(await params).model}`)
    if (!collection) notFound()
    return <CollectionView collection={collection} />
}
