"use client"

import Image from "next/image"
import { useState } from "react"

export default function ProductGallery({ images, name, soldOut, tint }: { images: string[]; name: string; soldOut: boolean; tint: string }) {
    const [active, setActive] = useState(0)

    return (
        <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="plate relative aspect-square overflow-hidden rounded-[1.75rem] border border-line" style={{ "--tint": tint } as React.CSSProperties}>
                <Image
                    data-product-image
                    src={images[active]}
                    alt={name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className={`object-contain p-6 md:p-10 ${soldOut ? "opacity-60 grayscale" : ""}`}
                />
                {soldOut && (
                    <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1.5 text-xs font-extrabold text-white">Sold out</span>
                )}
            </div>
            {images.length > 1 && (
                <div className="mt-3 flex gap-2">
                    {images.map((src, i) => (
                        <button
                            key={src}
                            style={{ "--tint": tint } as React.CSSProperties}
                            onClick={() => setActive(i)}
                            aria-label={`Show image ${i + 1}`}
                            className={`plate relative h-20 w-20 overflow-hidden rounded-2xl border-2 transition ${
                                i === active ? "border-ember" : "border-line hover:border-ink-faint"
                            }`}
                        >
                            <Image src={src} alt="" fill sizes="80px" className="object-contain p-1.5" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
