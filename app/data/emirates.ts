// Location landing pages for local searches ("IQOS Abu Dhabi", "TEREA Sharjah").
// Each one carries real, emirate-specific delivery details — not just a swapped name.
export interface EmirateInfo {
    slug: string
    name: string
    speed: string
    areas: string[]
    note: string
}

export const EMIRATE_PAGES: EmirateInfo[] = [
    {
        slug: "dubai",
        name: "Dubai",
        speed: "Same-day delivery when you order before 12PM; next day after that.",
        areas: ["Dubai Marina", "JLT", "JBR", "Downtown Dubai", "Business Bay", "Deira", "Bur Dubai", "Al Barsha", "Jumeirah", "Dubai Silicon Oasis", "International City", "Mirdif", "Al Quoz", "Dubai Hills", "Arabian Ranches", "Discovery Gardens"],
        note: "Dubai is our home base, so it gets our fastest delivery — same day when you order before 12PM.",
    },
    {
        slug: "abu-dhabi",
        name: "Abu Dhabi",
        speed: "Next-day delivery across Abu Dhabi city and its islands.",
        areas: ["Al Reem Island", "Khalifa City", "Al Raha", "Yas Island", "Saadiyat Island", "Mussafah", "Al Khalidiyah", "Corniche", "Mohammed Bin Zayed City", "Al Mushrif", "Tourist Club Area"],
        note: "We regularly deliver TEREA and ILUMA to the capital — spend over AED 400 and delivery is free.",
    },
    {
        slug: "sharjah",
        name: "Sharjah",
        speed: "Next-day delivery across Sharjah.",
        areas: ["Al Nahda", "Al Majaz", "Al Taawun", "Al Khan", "Muwaileh", "Al Qasimia", "University City", "Aljada", "Al Nabba"],
        note: "Sharjah is right next door to Dubai, so orders usually travel quickly. Free delivery on orders over AED 400.",
    },
    {
        slug: "ajman",
        name: "Ajman",
        speed: "Next-day delivery across Ajman.",
        areas: ["Al Nuaimiya", "Al Rashidiya", "Ajman Corniche", "Al Jurf", "Al Rawda", "Emirates City", "Al Mowaihat"],
        note: "Order TEREA, ILUMA or STIG to your door in Ajman — orders over AED 400 ship free.",
    },
    {
        slug: "ras-al-khaimah",
        name: "Ras Al Khaimah",
        speed: "Next-day delivery across Ras Al Khaimah.",
        areas: ["Al Nakheel", "Al Hamra Village", "Mina Al Arab", "Al Dhait", "Khuzam", "Julphar", "Al Marjan Island"],
        note: "We deliver all the way north to RAK. Spend over AED 400 and the delivery is on us.",
    },
    {
        slug: "fujairah",
        name: "Fujairah",
        speed: "Next-day delivery across Fujairah.",
        areas: ["Fujairah City", "Dibba", "Al Faseel", "Merashid", "Sakamkam", "Kalba"],
        note: "East coast customers get the same prices as Dubai — and free delivery on orders over AED 400.",
    },
    {
        slug: "umm-al-quwain",
        name: "Umm Al Quwain",
        speed: "Next-day delivery across Umm Al Quwain.",
        areas: ["Al Salamah", "Al Raas", "Al Humrah", "Al Ramlah", "UAQ Marina"],
        note: "Order online and we'll bring it to your door in UAQ. Free delivery on orders over AED 400.",
    },
    {
        slug: "al-ain",
        name: "Al Ain",
        speed: "Next-day delivery across Al Ain.",
        areas: ["Al Jimi", "Al Muwaiji", "Hili", "Al Towayya", "Al Mutawaa", "Zakher", "Al Khabisi"],
        note: "Al Ain customers can order the full range online — orders over AED 400 ship free.",
    },
]

export function getEmirate(slug: string) {
    return EMIRATE_PAGES.find((e) => e.slug === slug)
}
