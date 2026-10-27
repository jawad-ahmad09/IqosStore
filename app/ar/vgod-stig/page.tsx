import type { Metadata } from "next"
import ArCollectionView from "@/app/components/ar/ArCollectionView"
import { getArCollection } from "@/app/data/ar"
import { arabicMetadata } from "@/app/lib/seo"

const collection = getArCollection("vgod-stig")!

export const metadata: Metadata = arabicMetadata("/vgod-stig", collection.metaTitle, collection.metaDescription)

export default function ArStigPage() {
    return <ArCollectionView collection={collection} />
}
