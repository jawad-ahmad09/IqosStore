import Link from "next/link"
import { listingHref } from "./data/store"

export default function NotFound() {
    return (
        <section className="grain relative overflow-hidden bg-night text-white">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/40 blur-[120px]" />
            <div className="container-x relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
                <p className="font-display text-[7rem] font-extrabold leading-none text-ember md:text-[10rem]">404</p>
                <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">This page went up in smoke</h1>
                <p className="mt-3 max-w-md text-white/65">The product may have moved or sold out. Let&apos;s get you back to the good stuff.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href={listingHref()} className="btn btn-ember">Shop all products</Link>
                    <Link href="/" className="btn btn-ghost text-white hover:bg-white hover:text-ink">Back home</Link>
                </div>
            </div>
        </section>
    )
}
