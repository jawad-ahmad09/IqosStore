import { useSyncExternalStore } from "react"

const noop = () => () => {}

// False during SSR and the hydration pass, true afterwards. Lets pages that
// depend on localStorage (like the cart) show a skeleton instead of a flash.
export function useHydrated() {
    return useSyncExternalStore(noop, () => true, () => false)
}
