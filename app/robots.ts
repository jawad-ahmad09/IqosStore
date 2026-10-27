import type { MetadataRoute } from "next"
import { STORE } from "@/app/data/store"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/checkout"] }],
        sitemap: `${STORE.url}/sitemap.xml`,
        host: STORE.url,
    }
}
