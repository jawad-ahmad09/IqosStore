"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

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
    const show = (message: string) => {
        const id = Date.now() + Math.random()
        setToasts((prev) => [...prev, { id, message }])
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 2000)
    }

    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            <div className="fixed top-4 right-4 z-[200] space-y-2">
                {toasts.map((t) => (
                    <div key={t.id} className="bg-foreground text-background px-4 py-2 rounded shadow">
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


