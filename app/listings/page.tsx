import { Suspense } from "react"
import AllListingsPage from "../components/Alllisting"

export default function ListingsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-24">Loading listings…</div>}>
            <AllListingsPage />
        </Suspense>
    )
}
