import { DELIVERY } from "@/app/lib/pricing"

// Location landing pages for local searches ("IQOS Abu Dhabi", "TEREA Sharjah").
// Each one carries real, emirate-specific delivery details — not just a swapped name.
export interface EmirateInfo {
    slug: string
    name: string
    singleItemFee: number
    speed: string
    areas: string[]
    note: string
}

export const EMIRATE_PAGES: EmirateInfo[] = [
    {
        slug: "dubai",
        name: "Dubai",
        singleItemFee: DELIVERY.dubai,
        speed: "Same-day delivery when you order before 12PM; next day after that.",
        areas: ["Dubai Marina", "JLT", "JBR", "Downtown Dubai", "Business Bay", "Deira", "Bur Dubai", "Al Barsha", "Jumeirah", "Dubai Silicon Oasis", "International City", "Mirdif", "Al Quoz", "Dubai Hills", "Arabian Ranches", "Discovery Gardens"],
        note: "Dubai is our home base, so it gets our fastest delivery and the lowest single-item fee.",
    },
    {
        slug: "abu-dhabi",
        name: "Abu Dhabi",
        singleItemFee: DELIVERY.otherEmirates,
        speed: "Next-day delivery across Abu Dhabi city and its islands.",
        areas: ["Al Reem Island", "Khalifa City", "Al Raha", "Yas Island", "Saadiyat Island", "Mussafah", "Al Khalidiyah", "Corniche", "Mohammed Bin Zayed City", "Al Mushrif", "Tourist Club Area"],
        note: "We regularly deliver TEREA and ILUMA to the capital — order 2 or more items and delivery is free.",
    },
    {
        slug: "sharjah",
        name: "Sharjah",
        singleItemFee: DELIVERY.otherEmirates,
        speed: "Next-day delivery across Sharjah.",
        areas: ["Al Nahda", "Al Majaz", "Al Taawun", "Al Khan", "Muwaileh", "Al Qasimia", "University City", "Aljada", "Al Nabba"],
        note: "Sharjah is right next door to Dubai, so orders usually travel quickly. Free delivery on 2+ items.",
    },
    {
        slug: "ajman",
        name: "Ajman",
        singleItemFee: DELIVERY.otherEmirates,
        speed: "Next-day delivery across Ajman.",
        areas: ["Al Nuaimiya", "Al Rashidiya", "Ajman Corniche", "Al Jurf", "Al Rawda", "Emirates City", "Al Mowaihat"],
        note: "Order TEREA, ILUMA or STIG to your door in Ajman — 2 or more items ship free.",
    },
    {
        slug: "ras-al-khaimah",
        name: "Ras Al Khaimah",
        singleItemFee: DELIVERY.otherEmirates,
        speed: "Next-day delivery across Ras Al Khaimah.",
        areas: ["Al Nakheel", "Al Hamra Village", "Mina Al Arab", "Al Dhait", "Khuzam", "Julphar", "Al Marjan Island"],
        note: "We deliver all the way north to RAK. Bundle 2 or more items and the delivery is on us.",
    },
    {
        slug: "fujairah",
        name: "Fujairah",
        singleItemFee: DELIVERY.otherEmirates,
        speed: "Next-day delivery across Fujairah.",
        areas: ["Fujairah City", "Dibba", "Al Faseel", "Merashid", "Sakamkam", "Kalba"],
        note: "East coast customers get the same prices as Dubai — and free delivery on 2+ items.",
    },
    {
        slug: "umm-al-quwain",
        name: "Umm Al Quwain",
        singleItemFee: DELIVERY.otherEmirates,
        speed: "Next-day delivery across Umm Al Quwain.",
        areas: ["Al Salamah", "Al Raas", "Al Humrah", "Al Ramlah", "UAQ Marina"],
        note: "Order online and we'll bring it to your door in UAQ. Free delivery on 2 or more items.",
    },
    {
        slug: "al-ain",
        name: "Al Ain",
        singleItemFee: DELIVERY.otherEmirates,
        speed: "Next-day delivery across Al Ain.",
        areas: ["Al Jimi", "Al Muwaiji", "Hili", "Al Towayya", "Al Mutawaa", "Zakher", "Al Khabisi"],
        note: "Al Ain customers can order the full range online — 2+ items ship free.",
    },
]

export function getEmirate(slug: string) {
    return EMIRATE_PAGES.find((e) => e.slug === slug)
}
