import Link from "next/link"
import type { ReactNode } from "react"
import { getProducts, priceRange } from "@/app/data/products"
import { ORIGIN_COUNT, REGIONS, listingHref } from "@/app/data/store"
import { formatAED } from "@/app/lib/pricing"
import type { Product, Region } from "@/app/types"

export interface Guide {
    slug: string
    title: string
    metaTitle?: string // shorter <title> when the headline is too long for search results
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
                Walk into any TEREA conversation in Dubai and someone will ask: Indonesia, Kazakhstan, Uzbekistan, Switzerland, Italy or Japan? They&apos;re all genuine
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
                Each origin uses its own local-market packaging and health warnings — Indonesian, Kazakh, Uzbek, Swiss, Italian or Japanese text. That&apos;s the
                easiest way to tell them apart, and it&apos;s also a sign you&apos;re getting the genuine regional product.
            </p>
            <h2>Which should I buy?</h2>
            <p>
                For value and variety, start with <Link href="/terea/indonesia">Indonesia</Link>. For the familiar classics, choose{" "}
                <Link href="/terea/kazakhstan">Kazakhstan</Link> or <Link href="/terea/uzbekistan">Uzbekistan</Link>. For classic European
                tobacco, try <Link href="/terea/switzerland">Switzerland</Link> or <Link href="/terea/italy">Italy</Link>. For something premium, go
                with <Link href="/terea/japan">Japan</Link>. Mixing origins in one order is fine — and once your order is over AED 400, delivery is free.
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
                The <Link href="/iqos-iluma-i">ILUMA i series</Link> is the newest generation, with Pause Mode, FlexPuff and — on i Standard and i
                Prime — a touchscreen charger. <Link href="/iqos-iluma-i/one">ILUMA i One</Link> starts at {from(/^ILUMA i One$/)},{" "}
                <Link href="/iqos-iluma-i/standard">ILUMA i Standard</Link> at {from(/^ILUMA i Standard$/)} and{" "}
                <Link href="/iqos-iluma-i/prime">ILUMA i Prime</Link> at {from(/^ILUMA i Prime$/)}.
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
                made for different devices and can&apos;t be swapped. (Just want the TEREA match for your old HEETS flavour? See{" "}
                <Link href="/heets-dubai">HEETS in Dubai</Link>.)
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


function FakeTereaGuide() {
    return (
        <>
            <p>
                Grey-market TEREA is everywhere in the UAE, and most of it is genuine stock imported from other markets — that&apos;s why you see
                Kazakh, Japanese or Indonesian packs in Dubai. But counterfeit sticks do exist. Here&apos;s how to tell what you&apos;re holding.
            </p>
            <h2>1. Imported packs are normal — a foreign language is not a red flag</h2>
            <p>
                TEREA is made for specific markets. A <Link href="/terea/japan">Japan edition</Link> has Japanese text, a{" "}
                <Link href="/terea/kazakhstan">Kazakhstan edition</Link> has Kazakh and Russian, and a{" "}
                <Link href="/terea/indonesia">Indonesia edition</Link> has Indonesian health warnings. What matters is that the pack matches the origin
                the seller claims. A &quot;Japan&quot; pack with Indonesian text is a mismatch worth questioning.
            </p>
            <h2>2. Check the carton and the cellophane</h2>
            <ul>
                <li>A carton holds 10 packs of 20 sticks and should arrive sealed in its original cellophane.</li>
                <li>Printing should be sharp, colours consistent from pack to pack, and the tear strip neat.</li>
                <li>Loose packs with resealed or missing cellophane are the most common way fakes and old stock get mixed in.</li>
            </ul>
            <h2>3. Look at the sticks</h2>
            <ul>
                <li>Every stick in a pack should look identical: same length, same paper, same filter and printing.</li>
                <li>Tobacco should be packed evenly — no loose ends, gaps or crumbling.</li>
                <li>
                    Genuine TEREA has a metal heating element inside the tobacco, which is how <Link href="/iqos-iluma">IQOS ILUMA</Link> heats it by
                    induction. A stick that won&apos;t heat, heats unevenly or tastes burnt is a warning sign.
                </li>
            </ul>
            <h2>4. Watch the price</h2>
            <p>
                TEREA cartons in the UAE sit in a fairly narrow price band for each origin (see our <Link href="/terea-price-uae">TEREA price list</Link>
                ). A carton far below that band is either old stock, damaged, or not genuine.
            </p>
            <h2>5. Buy from a seller who tells you the origin</h2>
            <p>
                A trustworthy shop names the origin of every carton, shows real photos of the pack you&apos;ll receive and lets you return a damaged
                product. Ours lists the origin on every product page — browse <Link href="/terea">all TEREA</Link> — and every carton ships sealed.
            </p>
            <h2>Got a suspicious pack?</h2>
            <p>
                Don&apos;t use sticks that look or taste wrong. If you bought them from us, message us on WhatsApp with a photo and we&apos;ll look
                into it under our <Link href="/policies/returns">returns policy</Link>.
            </p>
        </>
    )
}

function CartonGuide() {
    const terea = getProducts({ category: "terea" })
    const { min, max } = priceRange(terea)
    const perStick = (price: number) => (price / 200).toFixed(2)
    const days = (perDay: number) => Math.round(200 / perDay)
    return (
        <>
            <p>
                The short answer: <strong>a TEREA carton has 200 sticks</strong> — 10 packs of 20. How long that lasts depends on how many you use a
                day. Here are the numbers.
            </p>
            <h2>What&apos;s in a TEREA carton</h2>
            <ul>
                <li>10 packs per carton</li>
                <li>20 sticks per pack</li>
                <li>200 sticks per carton</li>
                <li>One stick = one session on IQOS ILUMA (about 14 puffs or around 6 minutes, whichever comes first)</li>
            </ul>
            <h2>How long a carton lasts</h2>
            <table>
                <thead>
                    <tr>
                        <th>Sticks per day</th>
                        <th>One pack lasts</th>
                        <th>One carton lasts</th>
                    </tr>
                </thead>
                <tbody>
                    {[5, 10, 15, 20].map((n) => (
                        <tr key={n}>
                            <td>{n}</td>
                            <td>{n >= 20 ? "1 day" : `${(20 / n).toFixed(1).replace(/\.0$/, "")} days`}</td>
                            <td>about {days(n)} days</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Cost per stick in the UAE</h2>
            <p>
                Our TEREA cartons run from {formatAED(min)} to {formatAED(max)} depending on origin. That works out to about AED {perStick(min)} to
                AED {perStick(max)} per stick. Kazakhstan, Uzbekistan and Indonesia are the everyday-value origins; Japan is the premium range. Full
                details are on the <Link href="/terea-price-uae">TEREA price list</Link>.
            </p>
            <h2>Carton or pack?</h2>
            <p>
                Buying by the carton is cheaper per stick and means fewer orders. Delivery is free on orders over AED 400, so two or more cartons
                usually ship free anywhere in the UAE. See <Link href="/delivery">delivery details</Link>.
            </p>
            <h2>Keep your carton fresh</h2>
            <p>
                Unopened packs keep well; opened packs slowly dry out. Read <Link href="/guides/how-to-store-terea-in-uae-heat">how to store TEREA in
                UAE heat</Link> before you leave a carton in the car.
            </p>
        </>
    )
}

function StorageGuide() {
    return (
        <>
            <p>
                UAE summers regularly pass 45°C outdoors and a parked car gets much hotter. Heat and humidity are the two things that change how a
                TEREA stick tastes, so where you keep your carton matters.
            </p>
            <h2>Do TEREA sticks expire?</h2>
            <p>
                Tobacco sticks don&apos;t spoil like food, but they do age. Over time — faster once a pack is opened — the tobacco dries out and the
                flavour fades. Menthol and capsule sticks lose their freshness first. A sealed pack stored well stays good far longer than an open one
                rattling around in a bag.
            </p>
            <h2>Where to keep a carton</h2>
            <ul>
                <li>Indoors, in an air-conditioned room, away from windows and direct sun.</li>
                <li>In the original sealed packs until you need them — open one pack at a time.</li>
                <li>Away from strong smells (perfume, oud, spices); tobacco absorbs them.</li>
                <li>Not in the fridge: taking cold packs into warm, humid air causes condensation.</li>
            </ul>
            <h2>Never leave TEREA — or your ILUMA — in the car</h2>
            <p>
                A car parked in the sun can get hot enough to dry sticks out quickly and to damage capsule sticks. It&apos;s also bad for your{" "}
                <Link href="/iqos-iluma-i">ILUMA device</Link>: lithium batteries don&apos;t like extreme heat. Take both with you.
            </p>
            <h2>Humidity and the beach</h2>
            <p>
                Damp sticks heat poorly and can taste flat. At the beach or by the pool, keep the pack closed and in a bag, and don&apos;t use a stick
                that&apos;s got wet.
            </p>
            <h2>Signs a stick is past its best</h2>
            <ul>
                <li>The tobacco looks dry or crumbles at the end.</li>
                <li>Flavour is weak or harsh from the first puff.</li>
                <li>A capsule doesn&apos;t click or adds no flavour.</li>
            </ul>
            <p>
                Ordering fresh is easy: we deliver the same day in Dubai and next day across the UAE, so there&apos;s no need to stockpile more than
                you&apos;ll use. Browse <Link href="/terea">TEREA</Link> or read <Link href="/guides/terea-carton-how-many-sticks">how long a carton
                lasts</Link>.
            </p>
        </>
    )
}

function CapsuleGuide() {
    const capsule = getProducts({ category: "terea" }).filter((p) => p.family === "Capsule")
    const byRegion = REGION_KEYS.map((r) => ({ region: r, list: capsule.filter((p) => p.region === r) })).filter((g) => g.list.length)
    return (
        <>
            <p>
                Capsule TEREA — often sold as &quot;Pearl&quot; flavours — has a small capsule in the filter. Squeeze it and it releases an extra
                flavour, usually menthol or fruit. We currently stock {capsule.length} capsule TEREA flavours from {byRegion.length} origins.
            </p>
            <h2>How to use a capsule stick</h2>
            <ol>
                <li>Insert the stick into your <Link href="/iqos-iluma">IQOS ILUMA</Link> as normal and start a session.</li>
                <li>Take a few puffs to taste the base blend.</li>
                <li>Squeeze the filter between your fingers until you feel the click.</li>
                <li>Keep going — the flavour changes for the rest of the stick.</li>
            </ol>
            <p>
                You don&apos;t have to click the capsule at all; the stick works either way. Clicking it before you start gives you the capsule flavour
                from the first puff.
            </p>
            <h2>Pearl vs Wave vs regular</h2>
            <ul>
                <li><strong>Pearl / capsule</strong>: two flavours in one — base blend first, capsule flavour after the click.</li>
                <li><strong>Wave / menthol</strong>: cool from the first puff, no capsule.</li>
                <li><strong>Regular tobacco</strong>: no menthol and no capsule — Amber, Bronze, Sienna and similar.</li>
            </ul>
            {byRegion.map(({ region, list }) => (
                <div key={region}>
                    <h2>
                        Capsule TEREA from {region} ({list.length})
                    </h2>
                    <ProductLinks list={list} />
                </div>
            ))}
            <p>
                Want to compare the same Pearl across origins? <Link href="/flavours/sun-pearl">Sun Pearl</Link> comes from four origins — see the{" "}
                <Link href="/flavours">flavour comparisons</Link>.
            </p>
        </>
    )
}

function OrderingGuide() {
    return (
        <>
            <p>
                Ordering TEREA, IQOS ILUMA or STIG from us takes a couple of minutes. Here&apos;s exactly how it works, what delivery costs and how you
                can pay.
            </p>
            <h2>1. Pick your products</h2>
            <p>
                Browse by origin — <Link href="/terea/indonesia">Indonesia</Link>, <Link href="/terea/kazakhstan">Kazakhstan</Link>,{" "}
                <Link href="/terea/uzbekistan">Uzbekistan</Link>, <Link href="/terea/switzerland">Switzerland</Link>,{" "}
                <Link href="/terea/italy">Italy</Link> or <Link href="/terea/japan">Japan</Link> — or by device:{" "}
                <Link href="/iqos-iluma-i">IQOS ILUMA i</Link>, <Link href="/iqos-iluma">ILUMA</Link> and <Link href="/vgod-stig">VGOD STIG</Link>. Every
                product page shows the price per carton and whether it&apos;s in stock.
            </p>
            <h2>2. Check out — or just WhatsApp us</h2>
            <p>
                Add items to your cart and check out with your name, phone number and address. Prefer chatting? Send your order on WhatsApp and
                we&apos;ll confirm it there. We reply day and night.
            </p>
            <h2>3. Delivery times</h2>
            <ul>
                <li><strong>Dubai</strong>: same day when you order before 12PM; next day after that.</li>
                <li>
                    <strong>Other emirates</strong> (<Link href="/delivery/abu-dhabi">Abu Dhabi</Link>, <Link href="/delivery/sharjah">Sharjah</Link>,{" "}
                    <Link href="/delivery/ajman">Ajman</Link>, <Link href="/delivery/ras-al-khaimah">Ras Al Khaimah</Link>,{" "}
                    <Link href="/delivery/fujairah">Fujairah</Link>, <Link href="/delivery/umm-al-quwain">Umm Al Quwain</Link> and{" "}
                    <Link href="/delivery/al-ain">Al Ain</Link>): next day.
                </li>
            </ul>
            <h2>4. Delivery cost</h2>
            <p>Free on orders over AED 400 anywhere in the UAE. Below that, delivery is a flat AED 20.</p>
            <h2>5. Payment</h2>
            <ul>
                <li>Cash on delivery — pay the courier when your order arrives.</li>
                <li>Bank transfer.</li>
                <li>Online payment.</li>
            </ul>
            <h2>6. Age check</h2>
            <p>
                Our products are for adults 18 and over. The courier may ask for ID on delivery. See our <Link href="/policies/age">age policy</Link>.
            </p>
            <h2>Something wrong with your order?</h2>
            <p>
                Message us on WhatsApp with a photo. Damaged or incorrect items are handled under our <Link href="/policies/returns">returns
                policy</Link>.
            </p>
        </>
    )
}


const byIntensity = (...levels: string[]) => getProducts({ category: "terea" }).filter((p) => p.intensity && levels.includes(p.intensity))

function StrongestGuide() {
    const strong = byIntensity("Strong")
    const icy = byIntensity("Icy")
    return (
        <>
            <p>
                &quot;Strong&quot; means two different things to TEREA smokers: a <strong>full, heavy tobacco taste</strong>, or an{" "}
                <strong>intense menthol chill</strong>. Below are both, taken from the intensity rating on each product in our catalogue.
            </p>
            <h2>Strongest tobacco taste ({strong.length})</h2>
            <p>
                These are the boldest non-menthol sticks we stock — the closest to a full-flavour cigarette. Good for heavy smokers switching to IQOS
                ILUMA who find lighter blends too thin.
            </p>
            <ProductLinks list={strong} />
            <h2>Strongest menthol: the icy range ({icy.length})</h2>
            <p>
                Rated &quot;Icy&quot;, these give the most intense cooling of any TEREA we stock. Japanese-market menthols lead this group. For more
                cold menthol options from other origins, browse the <Link href="/guides/terea-flavour-guide">menthol section of the flavour guide</Link>.
            </p>
            <ProductLinks list={icy} />
            <h2>Does a stronger taste mean more nicotine?</h2>
            <p>
                Not necessarily. Taste intensity comes mostly from the blend and the menthol, not the nicotine level, and many TEREA flavours carry
                similar nicotine. If nicotine is listed for a product, you&apos;ll find it in the Details box on its product page.
            </p>
            <h2>Want something lighter?</h2>
            <p>
                See the <Link href="/guides/smoothest-terea-flavours">smoothest and lightest TEREA flavours</Link>, or browse every flavour by taste in
                the <Link href="/guides/terea-flavour-guide">TEREA flavour guide</Link>.
            </p>
        </>
    )
}

function SmoothestGuide() {
    const light = byIntensity("Light")
    const medium = byIntensity("Medium")
    return (
        <>
            <p>
                New to IQOS ILUMA, or just prefer a softer session? These are the TEREA flavours rated &quot;Light&quot; and &quot;Medium&quot; in our
                catalogue — smooth, easy and a good place to start.
            </p>
            <h2>Lightest and smoothest TEREA ({light.length})</h2>
            <ProductLinks list={light} />
            <h2>Medium: balanced, not heavy ({medium.length})</h2>
            <p>A step up in body without the weight of the strongest blends — a good everyday choice once you know what you like.</p>
            <ProductLinks list={medium} />
            <h2>Tips for first-time TEREA users</h2>
            <ul>
                <li>Start with a light tobacco or a soft menthol rather than an icy or strong blend.</li>
                <li>Buy one carton of two different flavours rather than two of the same — tastes vary more than you&apos;d expect.</li>
                <li>
                    Try a capsule stick without clicking it first; you get a light base blend and can add flavour later. See{" "}
                    <Link href="/guides/terea-pearl-capsule-flavours">Pearl & capsule flavours</Link>.
                </li>
                <li>
                    Not sure? The <Link href="/#finder">Flavour Finder</Link> picks four sticks for you in three questions.
                </li>
            </ul>
            <p>
                Looking for the opposite end? Read about the <Link href="/guides/strongest-terea-flavours">strongest TEREA flavours</Link>.
            </p>
        </>
    )
}

function BurntTasteGuide() {
    return (
        <>
            <p>
                IQOS ILUMA heats TEREA from the inside by induction — nothing burns, so a stick shouldn&apos;t taste burnt. When it does, one of these
                is usually the cause.
            </p>
            <h2>1. The stick was used twice</h2>
            <p>
                Each TEREA stick is made for one session. Reinserting a used stick heats tobacco that&apos;s already been heated, and that tastes harsh
                and burnt. Use a fresh stick every time.
            </p>
            <h2>2. Back-to-back sessions</h2>
            <p>
                Several sessions in a row can make the next one taste hotter and harsher. Give the device a short break between sticks, especially
                in a hot room or outdoors in summer.
            </p>
            <h2>3. A dry, old or damp stick</h2>
            <p>
                Sticks that have dried out — from an opened pack left for weeks, or a carton left in a hot car — taste flat and harsh. Damp sticks
                heat poorly too. See <Link href="/guides/how-to-store-terea-in-uae-heat">how to store TEREA in UAE heat</Link>.
            </p>
            <h2>4. A bent or damaged stick</h2>
            <p>
                If the stick is bent or the tobacco end is crushed, it may not sit and heat evenly. Insert it straight, filter side out, and don&apos;t
                use damaged sticks.
            </p>
            <h2>5. Dirt in the cap or opening</h2>
            <p>
                ILUMA has no blade to clean, but tobacco crumbs can collect around the opening. Remove the cap and wipe it gently with a dry cloth or
                cotton bud.
            </p>
            <h2>6. A counterfeit stick</h2>
            <p>
                If every stick in a pack tastes burnt or won&apos;t heat properly, the pack may not be genuine. Here&apos;s{" "}
                <Link href="/guides/how-to-spot-fake-terea">how to spot fake TEREA</Link>.
            </p>
            <h2>Still tastes burnt?</h2>
            <p>
                Try a stick from a different, freshly opened pack. If the problem stays, the device may need checking — message us on WhatsApp. If
                you bought it from us, see our <Link href="/policies/returns">returns policy</Link> for faulty devices.
            </p>
        </>
    )
}

export const GUIDES: Guide[] = [
    {
        slug: "terea-flavour-guide",
        title: "TEREA Flavour Guide UAE: Every Flavour Explained",
        description:
            `Every TEREA flavour sold in the UAE grouped by taste — tobacco, menthol and capsule pearls — across ${ORIGIN_COUNT} origins, with prices.`,
        published: "2026-10-27",
        updated: "2026-10-27",
        readMinutes: 6,
        content: FlavourGuide,
    },
    {
        slug: "terea-indonesia-vs-kazakhstan-vs-japan",
        title: "TEREA Indonesia vs Kazakhstan vs Uzbekistan vs Swiss vs Japan: What's the Difference?",
        metaTitle: "Indonesia vs Kazakhstan vs Japan TEREA Compared",
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
        metaTitle: "ILUMA i vs Prime vs One vs Standard Compared",
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
        metaTitle: "How to Use TEREA with IQOS ILUMA",
        description: "How to use TEREA sticks with IQOS ILUMA, ILUMA One, Prime and ILUMA i — charging, inserting a stick, session length and tips.",
        published: "2026-10-27",
        updated: "2026-10-27",
        readMinutes: 3,
        content: HowToUseGuide,
    },
    {
        slug: "heets-vs-terea",
        title: "HEETS vs TEREA: What's the Difference and Which Do You Need?",
        metaTitle: "HEETS vs TEREA: Difference & Which You Need",
        description: "HEETS or TEREA? Which sticks work with IQOS ILUMA vs older IQOS devices, why they aren't interchangeable, and matching flavours.",
        published: "2026-10-27",
        updated: "2026-10-27",
        readMinutes: 3,
        content: HeetsVsTereaGuide,
    },
    {
        slug: "how-to-spot-fake-terea",
        title: "How to Spot Fake TEREA in the UAE: 5 Checks Before You Buy",
        metaTitle: "How to Spot Fake TEREA in the UAE",
        description: "Imported TEREA is normal in Dubai — fakes aren't. Check the pack language, cellophane, sticks and price to tell genuine TEREA from counterfeit.",
        published: "2026-11-06",
        updated: "2026-11-06",
        readMinutes: 4,
        content: FakeTereaGuide,
    },
    {
        slug: "terea-carton-how-many-sticks",
        title: "How Many Sticks in a TEREA Carton & How Long Does It Last?",
        metaTitle: "TEREA Carton: How Many Sticks & How Long It Lasts",
        description: "A TEREA carton has 200 sticks (10 packs × 20). How many days it lasts at 5, 10, 15 or 20 a day, and the cost per stick in the UAE.",
        published: "2026-11-06",
        updated: "2026-11-06",
        readMinutes: 3,
        content: CartonGuide,
    },
    {
        slug: "how-to-store-terea-in-uae-heat",
        title: "Do TEREA Sticks Expire? How to Store TEREA in UAE Heat",
        metaTitle: "Do TEREA Sticks Expire? Storing TEREA in UAE Heat",
        description: "How heat and humidity affect TEREA, where to keep a carton in the UAE summer, why not to leave it in the car, and signs a stick is past its best.",
        published: "2026-11-06",
        updated: "2026-11-06",
        readMinutes: 3,
        content: StorageGuide,
    },
    {
        slug: "terea-pearl-capsule-flavours",
        title: "TEREA Pearl & Capsule Flavours Explained (UAE List)",
        metaTitle: "TEREA Pearl & Capsule Flavours Explained",
        description: "What TEREA Pearl and capsule sticks are, how to click the capsule, Pearl vs Wave, and every capsule TEREA flavour in stock in Dubai by origin.",
        published: "2026-11-06",
        updated: "2026-11-06",
        readMinutes: 4,
        content: CapsuleGuide,
    },
    {
        slug: "how-to-order-terea-online-dubai",
        title: "How to Order TEREA Online in Dubai & UAE: Delivery, Cost & Payment",
        metaTitle: "How to Order TEREA Online in Dubai & UAE",
        description: "Order TEREA and IQOS ILUMA online in the UAE: same-day Dubai delivery before 12PM, next day to other emirates, free over AED 400, cash on delivery.",
        published: "2026-11-06",
        updated: "2026-11-06",
        readMinutes: 3,
        content: OrderingGuide,
    },
    {
        slug: "strongest-terea-flavours",
        title: "Strongest TEREA Flavours in the UAE: Boldest Tobacco & Iciest Menthol",
        metaTitle: "Strongest TEREA Flavours in the UAE",
        description: "The strongest TEREA sticks in Dubai: the boldest tobacco blends and the iciest menthols, by intensity, with prices and origins.",
        published: "2026-11-06",
        updated: "2026-11-06",
        readMinutes: 3,
        content: StrongestGuide,
    },
    {
        slug: "smoothest-terea-flavours",
        title: "Smoothest & Lightest TEREA Flavours: Best Picks for Beginners",
        metaTitle: "Smoothest & Lightest TEREA Flavours for Beginners",
        description: "The smoothest, lightest TEREA flavours in the UAE — the best first sticks for new IQOS ILUMA users — with prices and origins.",
        published: "2026-11-06",
        updated: "2026-11-06",
        readMinutes: 3,
        content: SmoothestGuide,
    },
    {
        slug: "why-does-terea-taste-burnt",
        title: "Why Does My TEREA Taste Burnt? 6 Causes and Fixes",
        metaTitle: "Why Does My TEREA Taste Burnt? Causes & Fixes",
        description: "TEREA tasting burnt or harsh in your IQOS ILUMA? Six common causes — reused sticks, back-to-back sessions, dry sticks, fakes — and how to fix each.",
        published: "2026-11-06",
        updated: "2026-11-06",
        readMinutes: 3,
        content: BurntTasteGuide,
    },
]

export function getGuide(slug: string) {
    return GUIDES.find((g) => g.slug === slug)
}
