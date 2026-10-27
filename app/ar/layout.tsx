import { Cairo } from "next/font/google"

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-arabic" })

// Arabic section: right-to-left content in an Arabic typeface. The shared header
// and footer stay in English; everything inside is Arabic.
export default function ArabicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div lang="ar" dir="rtl" className={`${cairo.variable} arabic`}>
            {children}
        </div>
    )
}
