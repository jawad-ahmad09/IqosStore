"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, MessageCircle, ShoppingBag } from "lucide-react"
import { useCart } from "@/app/context/CartContext"
import { useUI } from "@/app/context/UIContext"
import { listingHref, whatsappLink } from "@/app/data/store"

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.42 9.42 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.69C5.78.69.68 5.79.68 12.05c0 2 .52 3.96 1.52 5.68L.58 23.62l6.03-1.58a11.33 11.33 0 0 0 5.43 1.38h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.32-8.03" />
        </svg>
    )
}

// Floating WhatsApp button on desktop; on mobile a bottom tab bar takes its place.
export default function WhatsAppButton() {
    const pathname = usePathname()
    const { count } = useCart()
    const { openCart } = useUI()

    const tab = "flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-bold"

    return (
        <>
            <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="group fixed bottom-6 right-6 z-50 hidden items-center gap-0 rounded-full bg-[#25D366] p-4 text-white shadow-[0_16px_40px_-12px_rgb(37_211_102/0.8)] transition-all hover:gap-2 hover:pr-6 md:flex"
            >
                <WhatsAppIcon size={28} />
                <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-40">
                    Chat with us
                </span>
            </a>

            <nav className="fixed inset-x-0 bottom-0 z-[80] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
                <div className="flex">
                    <Link href="/" className={`${tab} ${pathname === "/" ? "text-ember" : "text-ink-soft"}`}>
                        <Home size={21} />
                        Home
                    </Link>
                    <Link href={listingHref()} className={`${tab} ${pathname === "/listings" ? "text-ember" : "text-ink-soft"}`}>
                        <LayoutGrid size={21} />
                        Shop
                    </Link>
                    <button onClick={openCart} className={`${tab} relative text-ink-soft`}>
                        <span className="relative" data-cart-target>
                            <ShoppingBag size={21} />
                            {count > 0 && (
                                <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-ember px-1 text-[10px] text-white">
                                    {count}
                                </span>
                            )}
                        </span>
                        Cart
                    </button>
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${tab} text-[#1fa855]`}>
                        <MessageCircle size={21} />
                        WhatsApp
                    </a>
                </div>
            </nav>
        </>
    )
}
