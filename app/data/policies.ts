import { STORE } from "@/app/data/store"
import { DELIVERY } from "@/app/lib/pricing"

// Store policies. Plain-language and based on how the store actually operates;
// have a UAE lawyer review them before relying on them legally.
export interface Policy {
    slug: string
    title: string
    description: string
    updated: string
    sections: { heading: string; text: string }[]
}

export const DISCLAIMER = `${STORE.name} is an independent online retailer. We are not affiliated with, endorsed by, sponsored by or officially connected to Philip Morris International (PMI), IQOS, TEREA, HEETS, VGOD, STIG or any other brand owner. All product names, trademarks, logos and images belong to their respective owners and are used only to identify the products we sell.`

export const DISCLAIMER_AR =
    "IQOS Store UAE متجر إلكتروني مستقل. لسنا تابعين لشركة فيليب موريس إنترناشونال (PMI) أو IQOS أو TEREA أو HEETS أو VGOD أو STIG أو أي مالك علامة تجارية آخر، ولا نحظى بتأييدهم أو رعايتهم أو أي ارتباط رسمي بهم. جميع أسماء المنتجات والعلامات التجارية والشعارات والصور مملوكة لأصحابها، وتُستخدم فقط للتعريف بالمنتجات التي نبيعها."

export const POLICIES: Policy[] = [
    {
        slug: "terms",
        title: "Terms & Conditions",
        description: `Terms for ordering from ${STORE.name}: eligibility, orders, pricing, payment, delivery and liability.`,
        updated: "2026-10-27",
        sections: [
            { heading: "About us", text: `${DISCLAIMER} By using this website or placing an order you agree to these terms.` },
            { heading: "Adults only", text: "Our products contain nicotine and are for adults aged 18 and over. By ordering you confirm you are of legal age. We may ask for proof of age on delivery and refuse an order if it isn't provided." },
            { heading: "Orders", text: "Placing an order on the website or via WhatsApp is a request to buy. We confirm every order by phone or WhatsApp before dispatch, and we may decline or cancel an order — for example if an item is out of stock or the details can't be verified. If we cancel, you won't be charged." },
            { heading: "Prices", text: "All prices are in UAE dirhams (AED). We try to keep prices and stock accurate, but if an error appears we'll contact you before dispatch so you can confirm or cancel." },
            { heading: "Payment", text: "We accept cash on delivery, bank transfer and online payment. For cash on delivery, payment is due when you receive your order." },
            { heading: "Delivery", text: `We deliver across the UAE. Delivery is free for ${DELIVERY.freeFromItems} or more items; single items cost AED ${DELIVERY.dubai} in Dubai and AED ${DELIVERY.otherEmirates} elsewhere. Delivery times are estimates and can be affected by events outside our control.` },
            { heading: "Product use", text: "TEREA sticks are designed only for IQOS ILUMA devices. Please follow the manufacturer's instructions and warnings. We are not responsible for damage caused by misuse." },
            { heading: "Liability", text: "To the extent allowed by UAE law, our liability for any order is limited to the amount you paid for it." },
            { heading: "Governing law", text: "These terms are governed by the laws of the United Arab Emirates and the Emirate of Dubai." },
            { heading: "Contact", text: `Questions about these terms? WhatsApp ${STORE.whatsappDisplay} or email ${STORE.email}.` },
        ],
    },
    {
        slug: "returns",
        title: "Refund & Return Policy",
        description: `${STORE.name} returns: sealed products within 7 days, free replacement for damaged items.`,
        updated: "2026-10-27",
        sections: [
            { heading: "Returns within 7 days", text: "You can return sealed, unopened products within 7 days of delivery. Products must be in their original packaging with seals intact." },
            { heading: "Damaged or wrong items", text: "If an item arrives damaged or you receive the wrong product, message us within 48 hours with a photo and we'll replace it free of charge." },
            { heading: "Items we can't accept", text: "For hygiene and safety reasons we can't accept opened TEREA packs, used devices or used pods, unless they arrived faulty." },
            { heading: "Faulty devices", text: "If an IQOS ILUMA device doesn't work on arrival, contact us within 48 hours and we'll arrange an exchange after checking it." },
            { heading: "Refunds", text: "Approved refunds are paid by bank transfer or cash, normally within 7 working days of us receiving the returned item." },
            { heading: "How to start a return", text: `WhatsApp ${STORE.whatsappDisplay} with your name, order details and the reason for the return, and we'll arrange collection.` },
        ],
    },
    {
        slug: "privacy",
        title: "Privacy Policy",
        description: `How ${STORE.name} collects and uses your personal information.`,
        updated: "2026-10-27",
        sections: [
            { heading: "What we collect", text: "When you order or contact us we collect the details you give us: your name, phone number, email (optional), delivery address and any notes. If you message us on WhatsApp, we receive what you send there." },
            { heading: "How we use it", text: "We use your details only to confirm, deliver and support your order and to answer your questions. We don't sell your information or use it for third-party advertising." },
            { heading: "Stored in your browser", text: "Your cart and your age confirmation are saved in your own browser (local storage) so they're remembered on your next visit. We don't use advertising or tracking cookies." },
            { heading: "Who we share it with", text: "We share your name, phone and address only with the courier delivering your order. Order details are sent to our store email inbox, and the website is hosted by Vercel." },
            { heading: "How long we keep it", text: "We keep order details for as long as needed to handle your order, returns and our legal obligations, then delete them." },
            { heading: "Your rights", text: `You can ask to see, correct or delete your details at any time — WhatsApp ${STORE.whatsappDisplay} or email ${STORE.email}.` },
        ],
    },
    {
        slug: "age",
        title: "Age Policy (18+)",
        description: `${STORE.name} sells only to adults aged 18 and over.`,
        updated: "2026-10-27",
        sections: [
            { heading: "Adults only", text: "This website sells tobacco and nicotine products. They are intended only for adults aged 18 and over who already use tobacco or nicotine products." },
            { heading: "Age confirmation", text: "Visitors confirm they are 18 or older before browsing. Our couriers may ask for an Emirates ID or other proof of age on delivery and will not hand over an order without it." },
            { heading: "Health warning", text: "Tobacco and nicotine products are addictive and harmful to health. They are not risk-free. If you don't smoke, don't start." },
        ],
    },
]

export function getPolicy(slug: string) {
    return POLICIES.find((p) => p.slug === slug)
}
