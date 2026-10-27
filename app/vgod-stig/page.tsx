import type { Metadata } from "next"
import CollectionView from "@/app/components/collection/CollectionView"
import { getCollection } from "@/app/data/collections"
import { collectionMetadata } from "@/app/lib/seo"

const collection = getCollection("vgod-stig")!

export const metadata: Metadata = collectionMetadata(collection)

export default function StigPage() {
    return <CollectionView collection={collection} />
}
