"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import { Check } from "lucide-react"

interface ToastItem {
    id: number
    message: string
}

interface ToastContextValue {
    show: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    const show = useCallback((message: string) => {
        const id = Date.now() + Math.random()
        setToasts((prev) => [...prev.slice(-2), { id, message }])
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 2600)
    }, [])

    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            <div
                aria-live="polite"
                className="pointer-events-none fixed inset-x-0 bottom-20 z-[200] flex flex-col items-center gap-2 px-4 md:bottom-8"
            >
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className="animate-pop flex items-center gap-2.5 rounded-full bg-ink py-2.5 pl-2.5 pr-5 text-sm font-semibold text-white shadow-2xl"
                    >
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-ember">
                            <Check size={14} strokeWidth={3} />
                        </span>
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error("useToast must be used within ToastProvider")
    return ctx
}
