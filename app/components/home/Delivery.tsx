import { BadgeCheck, Banknote, Clock, MessageCircle } from "lucide-react"
import { DELIVERY, formatAED } from "@/app/lib/pricing"

const PERKS = [
    { icon: Clock, title: "Same-day in Dubai", text: "Order before 12PM and it arrives today. After 12PM, next day across all emirates." },
    { icon: BadgeCheck, title: "100% authentic", text: "Sealed stock from verified distributors. Damaged on arrival? We replace it free." },
    { icon: Banknote, title: "Pay on delivery", text: "Cash on delivery, bank transfer or online payment — whatever suits you." },
    { icon: MessageCircle, title: "24/7 on WhatsApp", text: "Real people, quick replies. Flavour advice, order updates, bulk pricing." },
]

export default function Delivery() {
    return (
        <section id="delivery" className="py-14 md:py-20">
            <div className="container-x grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
                <div className="relative overflow-hidden rounded-[1.75rem] bg-ember p-6 text-white md:p-10">
                    <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
                    <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/75">Delivery charges</span>
                    <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
                        Free delivery on {DELIVERY.freeFromItems}+ items.
                    </h2>
                    <p className="mt-3 text-white/80">Anywhere in the UAE. Ordering a single item? Here&apos;s what it costs:</p>

                    <div className="relative mt-8 overflow-hidden rounded-2xl bg-white/10 backdrop-blur">
                        {[
                            ["Dubai — 1 item", formatAED(DELIVERY.dubai)],
                            ["Other emirates — 1 item", formatAED(DELIVERY.otherEmirates)],
                            [`Anywhere — ${DELIVERY.freeFromItems}+ items`, "FREE"],
                        ].map(([label, price]) => (
                            <div key={label} className="flex items-center justify-between border-b border-white/15 px-4 py-3.5 last:border-0">
                                <span className="text-sm font-semibold md:text-base">{label}</span>
                                <span className="font-display text-lg font-extrabold">{price}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
                    {PERKS.map(({ icon: Icon, title, text }) => (
                        <div key={title} className="rounded-[1.5rem] border border-line bg-paper p-5 md:p-6">
                            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ember-soft text-ember">
                                <Icon size={22} />
                            </span>
                            <h3 className="mt-4 text-lg font-extrabold">{title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
