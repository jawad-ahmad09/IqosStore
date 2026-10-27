// Animates a copy of a product image into whichever cart button is visible
// (header on desktop, bottom tab bar on mobile), then bumps that button.
export function flyToCart(source: HTMLElement | null) {
    if (!source || typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const target = [...document.querySelectorAll<HTMLElement>("[data-cart-target]")].find((el) => {
        const r = el.getBoundingClientRect()
        return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight
    })
    if (!target) return

    const from = source.getBoundingClientRect()
    const to = target.getBoundingClientRect()
    const size = Math.min(from.width, from.height, 140)

    const ghost = source.cloneNode(true) as HTMLElement
    Object.assign(ghost.style, {
        position: "fixed",
        left: `${from.left + from.width / 2 - size / 2}px`,
        top: `${from.top + from.height / 2 - size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        margin: "0",
        zIndex: "300",
        pointerEvents: "none",
        borderRadius: "1rem",
        background: "#fff",
        boxShadow: "0 20px 40px -12px rgb(0 0 0 / 0.35)",
        objectFit: "contain",
    })
    document.body.appendChild(ghost)

    const dx = to.left + to.width / 2 - (from.left + from.width / 2)
    const dy = to.top + to.height / 2 - (from.top + from.height / 2)

    ghost
        .animate(
            [
                { transform: "translate(0, 0) scale(1)", opacity: 1 },
                { transform: `translate(${dx * 0.55}px, ${dy * 0.35 - 80}px) scale(0.6)`, opacity: 1, offset: 0.55 },
                { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0.4 },
            ],
            { duration: 700, easing: "cubic-bezier(0.5, 0, 0.3, 1)" },
        )
        .finished.finally(() => {
            ghost.remove()
            target.classList.remove("animate-bump")
            void target.offsetWidth // restart the animation
            target.classList.add("animate-bump")
        })
}
