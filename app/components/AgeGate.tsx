"use client"

import { useState, useSyncExternalStore } from "react"
import { Logo } from "./Header"

const KEY = "iqos-age-confirmed"
const EVENT = "iqos-age-confirmed"

function subscribe(callback: () => void) {
    window.addEventListener(EVENT, callback)
    return () => window.removeEventListener(EVENT, callback)
}

function getSnapshot() {
    try {
        return localStorage.getItem(KEY) === "1"
    } catch {
        return true // storage blocked: don't trap the visitor behind the gate
    }
}

// Tobacco and nicotine products: visitors confirm they're 18+ once per browser.
export default function AgeGate() {
    const confirmed = useSyncExternalStore(subscribe, getSnapshot, () => true)
    const [declined, setDeclined] = useState(false)

    if (confirmed) return null

    const confirm = () => {
        try {
            localStorage.setItem(KEY, "1")
        } catch {
            // Storage blocked — the event below still closes the gate for this page view.
        }
        window.dispatchEvent(new Event(EVENT))
    }

    return (
        <div className="fixed inset-0 z-[400] grid place-items-center bg-night/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="age-title">
            <div className="animate-pop w-full max-w-sm rounded-[1.75rem] bg-sand p-6 text-center shadow-2xl md:p-8">
                <div className="flex justify-center">
                    <Logo />
                </div>
                {declined ? (
                    <>
                        <h2 id="age-title" className="mt-6 text-2xl font-extrabold">Sorry!</h2>
                        <p className="mt-2 text-ink-soft">This store is only for adults aged 18 and over.</p>
                    </>
                ) : (
                    <>
                        <h2 id="age-title" className="mt-6 text-2xl font-extrabold">Are you 18 or older?</h2>
                        <p className="mt-2 text-sm text-ink-soft">
                            This website sells tobacco and nicotine products intended for adult users only.
                        </p>
                        <div className="mt-6 grid gap-2">
                            <button onClick={confirm} className="btn btn-ember w-full text-base">
                                Yes, I&apos;m 18+
                            </button>
                            <button onClick={() => setDeclined(true)} className="btn w-full text-ink-soft hover:text-ink">
                                No
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
