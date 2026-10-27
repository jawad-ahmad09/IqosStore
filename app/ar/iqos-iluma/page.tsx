import type { Metadata } from "next"
import ArCollectionView from "@/app/components/ar/ArCollectionView"
import { getArCollection } from "@/app/data/ar"
import { arabicMetadata } from "@/app/lib/seo"

const collection = getArCollection("iqos-iluma")!

export const metadata: Metadata = arabicMetadata("/iqos-iluma", collection.metaTitle, collection.metaDescription)

export default function ArIlumaPage() {
    return <ArCollectionView collection={collection} />
}
