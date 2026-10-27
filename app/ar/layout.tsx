// Arabic section: right-to-left content in the Arabic typeface (loaded in the root
// layout). The shared header and footer stay in English; everything inside is Arabic.
export default function ArabicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div lang="ar" dir="rtl" className="arabic">
            {children}
        </div>
    )
}
