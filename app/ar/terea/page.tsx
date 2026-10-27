import type { Metadata } from "next"
import ArCollectionView from "@/app/components/ar/ArCollectionView"
import { getArCollection } from "@/app/data/ar"
import { arabicMetadata } from "@/app/lib/seo"

const collection = getArCollection("terea")!

export const metadata: Metadata = arabicMetadata("/terea", collection.metaTitle, collection.metaDescription)

export default function ArTereaPage() {
    return <ArCollectionView collection={collection} />
}
