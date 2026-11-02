// Neighbourhood landing pages for Dubai ("TEREA delivery Dubai Marina", "IQOS JVC").
// Every area has its own description and real neighbours, so each page is useful
// on its own rather than a copy with the name swapped.
export interface DubaiArea {
    slug: string
    name: string
    blurb: string
    nearby: string[] // slugs
}

export const DUBAI_AREAS: DubaiArea[] = [
    {
        slug: "dubai-marina",
        name: "Dubai Marina",
        blurb: "From the Marina Walk towers to the apartments behind Marina Mall, we deliver straight to your lobby or door — handy when you'd rather not leave the waterfront for a carton of TEREA.",
        nearby: ["jbr", "jlt", "palm-jumeirah", "al-barsha"],
    },
    {
        slug: "jbr",
        name: "JBR (Jumeirah Beach Residence)",
        blurb: "Whether you're in a Sadaf, Bahar or Rimal tower or staying near The Walk, we bring IQOS ILUMA, TEREA and STIG to JBR without you having to fight beach-day traffic.",
        nearby: ["dubai-marina", "jlt", "palm-jumeirah"],
    },
    {
        slug: "jlt",
        name: "JLT (Jumeirah Lake Towers)",
        blurb: "JLT's clusters are a quick hop for our couriers. Tell us your cluster and tower and we'll deliver to the lobby, your office or your apartment door.",
        nearby: ["dubai-marina", "jbr", "discovery-gardens", "al-barsha"],
    },
    {
        slug: "palm-jumeirah",
        name: "Palm Jumeirah",
        blurb: "We deliver along the trunk, the fronds and the crescent — villas, residences and hotels. Add a note with your building or frond number for a smooth drop-off.",
        nearby: ["dubai-marina", "jbr", "jumeirah", "al-barsha"],
    },
    {
        slug: "downtown-dubai",
        name: "Downtown Dubai",
        blurb: "Around Burj Khalifa, Dubai Mall and Boulevard, our couriers deliver to residential towers and offices alike — ideal when you're short on TEREA mid-week.",
        nearby: ["business-bay", "difc", "al-quoz", "jumeirah"],
    },
    {
        slug: "business-bay",
        name: "Business Bay",
        blurb: "Running between meetings by the canal? Order to your Business Bay office or apartment and we'll deliver before you need your next session.",
        nearby: ["downtown-dubai", "difc", "al-quoz", "jumeirah"],
    },
    {
        slug: "difc",
        name: "DIFC",
        blurb: "We deliver to DIFC offices and the residences around Gate Avenue. Leave a note for your reception or building security and we'll handle the rest.",
        nearby: ["downtown-dubai", "business-bay", "jumeirah", "karama"],
    },
    {
        slug: "jumeirah",
        name: "Jumeirah",
        blurb: "From Jumeirah 1 to Umm Suqeim, we deliver to villas and apartments along Beach Road and Al Wasl — door to door, cash on delivery if you like.",
        nearby: ["downtown-dubai", "al-quoz", "palm-jumeirah", "business-bay"],
    },
    {
        slug: "al-barsha",
        name: "Al Barsha",
        blurb: "Barsha 1, 2, 3 and Barsha Heights (Tecom) are all on our regular routes, close to Mall of the Emirates — so delivery here is quick and reliable.",
        nearby: ["dubai-marina", "jlt", "al-quoz", "dubai-hills"],
    },
    {
        slug: "al-quoz",
        name: "Al Quoz",
        blurb: "We deliver to Al Quoz homes, warehouses and studios — including the Alserkal Avenue area. Share a location pin on WhatsApp and our courier will find you.",
        nearby: ["al-barsha", "jumeirah", "business-bay", "dubai-hills"],
    },
    {
        slug: "dubai-hills",
        name: "Dubai Hills Estate",
        blurb: "Villas, townhouses and the apartments around Dubai Hills Mall — order online and we'll deliver to your community gate or front door.",
        nearby: ["al-barsha", "al-quoz", "arabian-ranches", "jvc"],
    },
    {
        slug: "jvc",
        name: "JVC (Jumeirah Village Circle)",
        blurb: "JVC is one of the communities we deliver to most. Tell us your district and building and we'll bring your TEREA, ILUMA or STIG straight to you.",
        nearby: ["dubai-hills", "motor-city", "discovery-gardens", "arabian-ranches"],
    },
    {
        slug: "motor-city",
        name: "Motor City",
        blurb: "Uptown Motor City, Green Community and the Dubai Sports City side — we cover them all, with the same prices and delivery rules as central Dubai.",
        nearby: ["jvc", "arabian-ranches", "dubai-hills", "discovery-gardens"],
    },
    {
        slug: "arabian-ranches",
        name: "Arabian Ranches",
        blurb: "Living a little further out doesn't mean waiting longer for your sticks. We deliver to every Arabian Ranches community — just share your villa number.",
        nearby: ["motor-city", "dubai-hills", "jvc", "dubai-silicon-oasis"],
    },
    {
        slug: "discovery-gardens",
        name: "Discovery Gardens",
        blurb: "Discovery Gardens and the nearby Ibn Battuta and Al Furjan areas are on our western routes. Add your cluster and building number when you order.",
        nearby: ["jlt", "jvc", "dubai-marina", "motor-city"],
    },
    {
        slug: "deira",
        name: "Deira",
        blurb: "From Al Rigga and Port Saeed to Al Muraqqabat and the Creek side, we deliver across Deira — order on the site or simply send us a WhatsApp message.",
        nearby: ["al-nahda", "bur-dubai", "karama", "mirdif"],
    },
    {
        slug: "bur-dubai",
        name: "Bur Dubai",
        blurb: "Al Mankhool, Al Raffa, Oud Metha and the Meena Bazaar area — we deliver all over Bur Dubai, with cash on delivery available.",
        nearby: ["karama", "deira", "difc", "jumeirah"],
    },
    {
        slug: "karama",
        name: "Al Karama",
        blurb: "Karama's busy streets are no problem for our couriers. Order by midday and you can have TEREA delivered the same day, right to your building.",
        nearby: ["bur-dubai", "deira", "difc", "business-bay"],
    },
    {
        slug: "al-nahda",
        name: "Al Nahda",
        blurb: "We deliver throughout Al Nahda 1 and 2, Al Qusais and the Dubai side near the Sharjah border — same prices and delivery rules as the rest of Dubai.",
        nearby: ["deira", "mirdif", "international-city", "karama"],
    },
    {
        slug: "mirdif",
        name: "Mirdif",
        blurb: "Mirdif villas, Uptown Mirdif and the area around City Centre Mirdif are all covered. Add your street and villa number for a quick doorstep delivery.",
        nearby: ["al-nahda", "deira", "international-city", "dubai-silicon-oasis"],
    },
    {
        slug: "international-city",
        name: "International City",
        blurb: "Every cluster in International City — from China to England — plus Warsan and the Dragon Mart area. Share your cluster and building and we'll deliver.",
        nearby: ["dubai-silicon-oasis", "mirdif", "al-nahda", "deira"],
    },
    {
        slug: "dubai-silicon-oasis",
        name: "Dubai Silicon Oasis",
        blurb: "We deliver to DSO residences, offices and the nearby Academic City. Order online, choose cash on delivery and we'll bring it to your door.",
        nearby: ["international-city", "mirdif", "arabian-ranches", "al-nahda"],
    },
]

export function getDubaiArea(slug: string) {
    return DUBAI_AREAS.find((a) => a.slug === slug)
}
