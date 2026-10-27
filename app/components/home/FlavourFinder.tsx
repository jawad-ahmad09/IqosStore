"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react"
import ProductCard from "../ProductCard"
import { getProducts } from "@/app/data/products"
import { listingHref } from "@/app/data/store"
import type { Product } from "@/app/types"

type Answer = string | null

interface Option {
    value: string
    label: string
    hint: string
    emoji: string
}

const QUESTIONS: { key: "style" | "taste" | "budget"; title: string; options: Option[] }[] = [
    {
        key: "style",
        title: "What kind of stick do you enjoy?",
        options: [
            { value: "Tobacco", label: "Classic tobacco", hint: "No menthol, pure tobacco taste", emoji: "🍂" },
            { value: "Menthol", label: "Fresh menthol", hint: "Cool from the first puff", emoji: "❄️" },
            { value: "Capsule", label: "Click capsule", hint: "Switch the flavour mid-session", emoji: "🔘" },
            { value: "any", label: "Surprise me", hint: "Show me a bit of everything", emoji: "✨" },
        ],
    },
    {
        key: "taste",
        title: "Which notes sound best?",
        options: [
            { value: "fruity", label: "Fruity", hint: "Berries, mango, citrus, peach", emoji: "🍓" },
            { value: "icy", label: "Cool & icy", hint: "Mint, menthol, strong chill", emoji: "🧊" },
            { value: "rich", label: "Warm & rich", hint: "Roasted, cocoa, wood, nut", emoji: "☕" },
            { value: "any", label: "No preference", hint: "I'm open to anything", emoji: "🤷" },
        ],
    },
    {
        key: "budget",
        title: "Everyday value or Japanese premium?",
        options: [
            { value: "value", label: "Best value", hint: "Indonesia, Kazakhstan, Uzbekistan", emoji: "💸" },
            { value: "premium", label: "Japanese premium", hint: "Japan-market blends", emoji: "🇯🇵" },
            { value: "any", label: "Either is fine", hint: "Show the best match", emoji: "👌" },
        ],
    },
]

const TASTE_WORDS: Record<string, RegExp> = {
    fruity: /berr|fruit|mango|peach|citrus|lime|lemon|strawberr|raspberr|apricot|grape|tropical|passion|apple|melon|cherry|plum|orange/i,
    icy: /menthol|mint|ic[ey]|chill|cool|frost|fresh/i,
    rich: /cocoa|wood|nut|roast|rich|full|toast|bold|spic|tea|caramel|warm/i,
}

function recommend(answers: Record<string, Answer>): Product[] {
    const pool = getProducts({ category: "terea" }).filter((p) => p.inStock)
    const scored = pool.map((p) => {
        let score = 0
        const text = `${p.notes} ${p.description}`
        if (answers.style && answers.style !== "any") score += p.family === answers.style ? 4 : 0
        if (answers.taste && answers.taste !== "any") score += TASTE_WORDS[answers.taste].test(p.notes) ? 3 : TASTE_WORDS[answers.taste].test(text) ? 1 : 0
        if (answers.budget === "premium") score += p.region === "Japan" ? 3 : -2
        if (answers.budget === "value") score += p.region === "Japan" ? -3 : 1
        return { p, score }
    })
    // Stable sort keeps catalogue order for ties, then spread picks across origins.
    scored.sort((a, b) => b.score - a.score)
    const picks: Product[] = []
    const regions = new Map<string, number>()
    for (const { p } of scored) {
        const n = regions.get(p.region!) ?? 0
        if (n >= 2) continue
        picks.push(p)
        regions.set(p.region!, n + 1)
        if (picks.length === 4) break
    }
    return picks
}

export default function FlavourFinder() {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<Record<string, Answer>>({ style: null, taste: null, budget: null })
    const done = step >= QUESTIONS.length
    const results = useMemo(() => (done ? recommend(answers) : []), [done, answers])

    const choose = (key: string, value: string) => {
        setAnswers((a) => ({ ...a, [key]: value }))
        setStep((s) => s + 1)
    }

    const restart = () => {
        setAnswers({ style: null, taste: null, budget: null })
        setStep(0)
    }

    const question = QUESTIONS[step]

    return (
        <section id="finder" className="py-14 md:py-20">
            <div className="container-x">
                <div className="grain relative overflow-hidden rounded-[2rem] bg-night p-5 text-white md:p-10 lg:p-14">
                    <div className="animate-glow pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-ember/40 blur-[110px]" />
                    <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-iluma/30 blur-[110px]" />

                    <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-gold">
                                <Sparkles size={14} /> Flavour Finder
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">Not sure which TEREA to pick?</h2>
                            <p className="mt-3 max-w-md text-white/65">
                                Answer three quick questions and we&apos;ll match you with flavours from our {getProducts({ category: "terea" }).length}-strong range.
                            </p>

                            <div className="mt-6 flex gap-2" aria-hidden="true">
                                {QUESTIONS.map((q, i) => (
                                    <span
                                        key={q.key}
                                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i < step ? "bg-ember" : i === step ? "bg-white/50" : "bg-white/15"}`}
                                    />
                                ))}
                            </div>
                            <p className="mt-2 text-xs font-bold text-white/50">
                                {done ? "Your matches are ready" : `Question ${step + 1} of ${QUESTIONS.length}`}
                            </p>
                        </div>

                        <div className="min-h-[340px]">
                            {!done ? (
                                <div key={step} className="animate-pop">
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <h3 className="text-xl font-extrabold md:text-2xl">{question.title}</h3>
                                        {step > 0 && (
                                            <button
                                                onClick={() => setStep((s) => s - 1)}
                                                className="flex shrink-0 items-center gap-1 text-sm font-bold text-white/60 hover:text-white"
                                            >
                                                <ArrowLeft size={15} /> Back
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {question.options.map((o) => (
                                            <button
                                                key={o.value}
                                                onClick={() => choose(question.key, o.value)}
                                                className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:border-ember hover:bg-white/10 ${
                                                    answers[question.key] === o.value ? "border-ember bg-white/10" : "border-white/10 bg-white/5"
                                                }`}
                                            >
                                                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-2xl transition-transform group-hover:scale-110">
                                                    {o.emoji}
                                                </span>
                                                <span>
                                                    <span className="block font-display text-base font-bold">{o.label}</span>
                                                    <span className="block text-xs text-white/55">{o.hint}</span>
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="animate-pop">
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <h3 className="text-xl font-extrabold md:text-2xl">We think you&apos;ll love these</h3>
                                        <button onClick={restart} className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-white/60 hover:text-white">
                                            <RotateCcw size={15} /> Start over
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-ink">
                                        {results.map((p) => (
                                            <ProductCard key={p.id} product={p} />
                                        ))}
                                    </div>
                                    <Link
                                        href={listingHref({
                                            category: "terea",
                                            region: answers.budget === "premium" ? "Japan" : undefined,
                                        })}
                                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold hover:text-white"
                                    >
                                        Browse all matching flavours →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
