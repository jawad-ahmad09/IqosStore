import Link from "next/link"
import type { ReactNode } from "react"
import { getProducts, priceRange } from "@/app/data/products"
import { ORIGIN_COUNT, ORIGIN_LIST, REGIONS, listingHref } from "@/app/data/store"
import { formatAED } from "@/app/lib/pricing"
import type { Product, Region } from "@/app/types"

export interface Guide {
    slug: string
    title: string
    description: string
    published: string
    updated: string
    readMinutes: number
    content: () => ReactNode
}

const REGION_KEYS = Object.keys(REGIONS) as Region[]

function ProductLinks({ list }: { list: Product[] }) {
    return (
        <ul>
            {list.map((p) => (
                <li key={p.id}>
                    <Link href={`/products/${p.id}`}>
                        {p.name}
                        {p.region ? ` (${p.region})` : ""}
                    </Link>{" "}
                    — {p.notes}. {formatAED(p.price)}
                    {p.inStock ? "" : " · currently sold out"}
                </li>
            ))}
        </ul>
    )
}

function FlavourGuide() {
    const terea = getProducts({ category: "terea" })
    const byFamily = (family: string) => terea.filter((p) => p.family === family)
    return (
        <>
            <p>
                We stock {terea.length} TEREA flavours from {ORIGIN_COUNT} origins. That&apos;s a lot to choose from, so this guide groups every one of them by
                taste. All TEREA sticks work in every IQOS ILUMA device, and every carton holds 200 sticks (10 packs of 20).
            </p>
            <h2>How TEREA flavours are grouped</h2>
            <p>
                Most TEREA sticks fall into three families. <strong>Tobacco</strong> sticks have no menthol and range from light and smooth to rich and
                roasted. <strong>Menthol</strong> sticks are cool from the first puff, sometimes with fruit or herbal notes. <strong>Capsule</strong>{" "}
                sticks (often called &quot;Pearls&quot;) start one way and change when you click the capsule in the filter.
            </p>
            <h2>Tobacco TEREA ({byFamily("Tobacco").length} flavours)</h2>
            <p>Pick these if you want the taste of tobacco without menthol. Amber, Bronze and the Japanese Regular range are good places to start.</p>
            <ProductLinks list={byFamily("Tobacco")} />
            <h2>Menthol TEREA ({byFamily("Menthol").length} flavours)</h2>
            <p>From soft and fresh to intensely icy. Turquoise is a classic cool menthol; the Black range is for those who want maximum chill.</p>
            <ProductLinks list={byFamily("Menthol")} />
            <h2>Capsule & Pearl TEREA ({byFamily("Capsule").length} flavours)</h2>
            <p>Click the capsule whenever you like to add fruit, floral or extra menthol notes. You don&apos;t have to click it — the stick works either way.</p>
            <ProductLinks list={byFamily("Capsule")} />
            <h2>Still not sure?</h2>
            <p>
                Try our <Link href="/#finder">Flavour Finder</Link> — three quick questions and it suggests four flavours for you. Or message us on
                WhatsApp and we&apos;ll recommend something based on what you usually smoke.
            </p>
        </>
    )
}

function OriginGuide() {
    return (
        <>
            <p>
                Walk into any TEREA conversation in Dubai and someone will ask: Indonesia, Kazakhstan, Uzbekistan, Switzerland or Japan? They&apos;re all genuine
                TEREA and they all fit every IQOS ILUMA. Here&apos;s what actually changes between them.
            </p>
            <h2>The short answer</h2>
            <ul>
                {REGION_KEYS.map((r) => {
                    const list = getProducts({ category: "terea", region: r })
                    return (
                        <li key={r}>
                            <Link href={listingHref({ category: "terea", region: r })}>TEREA {r}</Link> — {list.length} flavours, from{" "}
                            {formatAED(priceRange(list).min)} per carton. {REGIONS[r].blurb}
                        </li>
                    )
                })}
            </ul>
            <h2>Is the tobacco different?</h2>
            <p>
                TEREA is made for each market with that market&apos;s preferences in mind, so the line-up differs: some flavours exist only in one
                origin, and a flavour with the same name can taste slightly different between origins. The stick format, the induction-heated
                element and compatibility are the same everywhere.
            </p>
            <h2>Why is Japanese TEREA more expensive?</h2>
            <p>
                Japan has its own exclusive blends and is imported in smaller quantities, which pushes the price up. If you like refined
                tobacco or unusual menthol blends, it&apos;s worth trying at least once.
            </p>
            <h2>Packaging</h2>
            <p>
                Each origin uses its own local-market packaging and health warnings — Indonesian, Kazakh, Uzbek, Swiss/European or Japanese text. That&apos;s the
                easiest way to tell them apart, and it&apos;s also a sign you&apos;re getting the genuine regional product.
            </p>
            <h2>Which should I buy?</h2>
            <p>
                For value and variety, start with <Link href="/terea/indonesia">Indonesia</Link>. For the familiar classics, choose{" "}
                <Link href="/terea/kazakhstan">Kazakhstan</Link> or <Link href="/terea/uzbekistan">Uzbekistan</Link>. For classic European
                tobacco, try <Link href="/terea/switzerland">Switzerland</Link>. For something premium, go
                with <Link href="/terea/japan">Japan</Link>. Mixing origins in one order is fine — and with 2 or more cartons, delivery is free.
            </p>
        </>
    )
}

function IlumaGuide() {
    const iluma = getProducts({ category: "iluma" })
    const from = (pattern: RegExp) => {
        const list = iluma.filter((p) => pattern.test(p.line ?? ""))
        return list.length ? formatAED(priceRange(list).min) : "—"
    }
    return (
        <>
            <p>
                Every IQOS ILUMA heats TEREA sticks from the inside with SMARTCORE INDUCTION — there&apos;s no heating blade, so there&apos;s nothing to
                clean and no tobacco residue left behind. The models differ in design, battery setup and extra features.
            </p>
            <h2>ILUMA One — simple and compact</h2>
            <p>
                An all-in-one device: no separate holder and charger, just one unit that lasts around 20 sessions per charge. Ideal if you want
                something light that slips into any pocket. From {from(/^ILUMA One$/)} in our store.
            </p>
            <h2>ILUMA (Standard) — holder and pocket charger</h2>
            <p>
                The classic setup: a slim holder you use, and a pocket charger that recharges it between sessions. Good for back-to-back use
                through the day. From {from(/^ILUMA Standard$/)}.
            </p>
            <h2>ILUMA Prime — the premium finish</h2>
            <p>
                Same holder-and-charger idea, wrapped in premium materials with a distinctive wraparound design. Many limited editions are
                Prime models. From {from(/^ILUMA Prime$/)}.
            </p>
            <h2>ILUMA i series — the latest generation</h2>
            <p>
                ILUMA i and ILUMA i Prime are the newest models, adding features such as a touchscreen on selected models and more control
                over your session. ILUMA i starts at {from(/^ILUMA i$/)} and ILUMA i Prime at {from(/^ILUMA i Prime$/)}.
            </p>
            <h2>Which sticks do they use?</h2>
            <p>
                All ILUMA devices use <Link href="/terea">TEREA</Link> only. Don&apos;t use HEETS or any other stick in an ILUMA — they aren&apos;t
                designed for induction heating.
            </p>
            <h2>Our pick</h2>
            <p>
                New to ILUMA? <Link href="/iqos-iluma">ILUMA One</Link> is the easiest start. Want the newest tech? Go for ILUMA i. Want it to
                look special? Keep an eye on our limited editions.
            </p>
        </>
    )
}

function HowToUseGuide() {
    return (
        <>
            <p>
                New to IQOS ILUMA? Using TEREA is simpler than older IQOS devices — there&apos;s no blade, no cleaning and no lighter. Here&apos;s the
                whole routine, step by step.
            </p>
            <h2>1. Charge your device</h2>
            <p>
                Charge your ILUMA before first use with the cable supplied. ILUMA One is a single all-in-one unit; ILUMA, ILUMA Prime and the ILUMA i
                range use a holder that recharges in its pocket charger between sessions.
            </p>
            <h2>2. Insert a TEREA stick</h2>
            <p>
                Push a TEREA stick into the top of the device, tobacco end first, until it stops. Never use HEETS or any other stick — ILUMA is made
                for TEREA only.
            </p>
            <h2>3. Wait for the vibration</h2>
            <p>
                ILUMA starts heating automatically when it detects the stick. After a short warm-up the device vibrates and the light shows it&apos;s
                ready — then you can start.
            </p>
            <h2>4. Enjoy your session</h2>
            <p>
                A session lasts up to about 14 puffs or 6 minutes. The device vibrates again shortly before the end so you know it&apos;s nearly
                finished.
            </p>
            <h2>5. Remove and dispose of the stick</h2>
            <p>
                Pull the stick out and throw it away in a bin. Because ILUMA heats from inside the stick, nothing is left behind in the device and
                there&apos;s no cleaning to do.
            </p>
            <h2>Tips</h2>
            <ul>
                <li>Store TEREA packs somewhere cool and dry — heat and humidity affect the taste.</li>
                <li>Don&apos;t use a damaged or bent stick.</li>
                <li>
                    Not sure which flavour to start with? Try our <Link href="/#finder">Flavour Finder</Link> or read the{" "}
                    <Link href="/guides/terea-flavour-guide">TEREA flavour guide</Link>.
                </li>
            </ul>
        </>
    )
}

function HeetsVsTereaGuide() {
    return (
        <>
            <p>
                Lots of people in the UAE still search for &quot;HEETS&quot; when what they actually need is TEREA. They look similar, but they&apos;re
                made for different devices and can&apos;t be swapped.
            </p>
            <h2>The short answer</h2>
            <ul>
                <li><strong>HEETS</strong> are for older IQOS devices that heat the stick with a blade (such as IQOS 3 DUO and earlier models).</li>
                <li>
                    <strong>TEREA</strong> is for <Link href="/iqos-iluma">IQOS ILUMA</Link>, which heats the stick from the inside by induction.
                </li>
            </ul>
            <h2>Why they aren&apos;t interchangeable</h2>
            <p>
                Every TEREA stick has a small metal element inside that ILUMA heats by induction. HEETS don&apos;t have it, so they won&apos;t heat in
                an ILUMA. And TEREA shouldn&apos;t be used in blade devices — the metal element can damage them.
            </p>
            <h2>Same flavour names</h2>
            <p>
                Many familiar names carried over from HEETS to TEREA — Amber, Bronze, Silver, Yellow, Turquoise, Sienna and Purple Wave among them —
                so if you had a HEETS favourite, there&apos;s probably a TEREA version. Compare them on our <Link href="/flavours">flavour pages</Link>.
            </p>
            <h2>Should I switch to ILUMA?</h2>
            <p>
                ILUMA is the current generation: no blade, no cleaning and no residue. If you&apos;re still on an older device, an{" "}
                <Link href="/iqos-iluma">ILUMA</Link> plus a carton of <Link href="/terea">TEREA</Link> is the way to go.
            </p>
        </>
    )
}

export const GUIDES: Guide[] = [
    {
        slug: "terea-flavour-guide",
        title: "TEREA Flavour Guide UAE: Every Flavour Explained",
        description:
            `Every TEREA flavour sold in the UAE, grouped by taste — tobacco, menthol and capsule pearls — from ${ORIGIN_LIST}, with prices.`,
        published: "2026-10-27",
        updated: "2026-10-27",
        readMinutes: 6,
        content: FlavourGuide,
    },
    {
        slug: "terea-indonesia-vs-kazakhstan-vs-japan",
        title: "TEREA Indonesia vs Kazakhstan vs Uzbekistan vs Swiss vs Japan: What's the Difference?",
        description:
            "Indonesian, Kazakh, Uzbek, Swiss or Japanese TEREA? What changes between origins — flavours, packaging and price — and which one to buy in Dubai.",
        published: "2026-10-27",
        updated: "2026-10-27",
        readMinutes: 4,
        content: OriginGuide,
    },
    {
        slug: "iqos-iluma-models-compared",
        title: "IQOS ILUMA Models Compared: ILUMA i, Prime, One & Standard",
        description:
            "Which IQOS ILUMA should you buy in the UAE? ILUMA One, Standard, Prime and the new ILUMA i series compared — design, battery, features and prices.",
        published: "2026-10-27",
        updated: "2026-10-27",
        readMinutes: 4,
        content: IlumaGuide,
    },
    {
        slug: "how-to-use-terea",
        title: "How to Use TEREA with IQOS ILUMA: Step-by-Step Guide",
        description: "How to use TEREA sticks with IQOS ILUMA, ILUMA One, Prime and ILUMA i — charging, inserting a stick, session length and tips.",
        published: "2026-10-27",
        updated: "2026-10-27",
        readMinutes: 3,
        content: HowToUseGuide,
    },
    {
        slug: "heets-vs-terea",
        title: "HEETS vs TEREA: What's the Difference and Which Do You Need?",
        description: "HEETS or TEREA? Which sticks work with IQOS ILUMA vs older IQOS devices, why they aren't interchangeable, and matching flavours.",
        published: "2026-10-27",
        updated: "2026-10-27",
        readMinutes: 3,
        content: HeetsVsTereaGuide,
    },
]

export function getGuide(slug: string) {
    return GUIDES.find((g) => g.slug === slug)
}
