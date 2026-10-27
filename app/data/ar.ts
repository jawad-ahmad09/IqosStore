import { EMIRATE_PAGES } from "@/app/data/emirates"
import { getProducts, priceRange } from "@/app/data/products"
import { DELIVERY } from "@/app/lib/pricing"
import type { Category, Product, Region } from "@/app/types"

// Arabic landing pages for Arabic-language searches in the UAE
// ("ايكوس دبي", "تيريا الامارات"). Product pages stay in English; these pages
// link into them. Prices are computed from the catalogue.

export const aed = (n: number) => `${n.toLocaleString("en-AE")} درهم`

const range = (list: Product[]) => {
    const { min, max } = priceRange(list)
    return min === max ? aed(min) : `${min}–${max} درهم`
}
const tereaList = (region?: Region) => getProducts({ category: "terea", region })
const fromPrice = (list: Product[]) => aed(priceRange(list).min)

export const AR_REGION: Record<Region, string> = {
    Indonesia: "إندونيسيا",
    Kazakhstan: "كازاخستان",
    Uzbekistan: "أوزبكستان",
    Switzerland: "سويسرا",
    Japan: "اليابان",
}

export const AR_EMIRATE: Record<string, string> = {
    dubai: "دبي",
    "abu-dhabi": "أبوظبي",
    sharjah: "الشارقة",
    ajman: "عجمان",
    "ras-al-khaimah": "رأس الخيمة",
    fujairah: "الفجيرة",
    "umm-al-quwain": "أم القيوين",
    "al-ain": "العين",
}

export const AR_FAMILY: Record<string, string> = {
    Tobacco: "تبغ",
    Menthol: "منثول",
    Capsule: "كبسولة",
    Fruit: "فواكه",
    Dessert: "حلويات",
    Device: "جهاز",
}

export interface ArCollection {
    slug: string // English slug; Arabic URL is /ar/<slug>
    category: Category
    region?: Region
    h1: string
    metaTitle: string
    metaDescription: string
    intro: string
    body: { heading: string; text: string }[]
    faqs: { question: string; answer: string }[]
}

const regionCollection = (region: Region, slug: string, intro: string, extra: string): ArCollection => {
    const list = tereaList(region)
    const name = AR_REGION[region]
    return {
        slug,
        category: "terea",
        region,
        h1: `تيريا ${name} في دبي والإمارات`,
        metaTitle: `تيريا ${name} دبي — ${list.length} نكهة من ${fromPrice(list)} | IQOS Store UAE`,
        metaDescription: `اشترِ سجائر تيريا ${name} الأصلية في دبي والإمارات. ${list.length} نكهة بسعر ${range(list)} للكرتونة، توصيل في نفس اليوم داخل دبي وتوصيل مجاني لطلبين أو أكثر.`,
        intro,
        body: [
            { heading: `لماذا تيريا ${name}؟`, text: extra },
            {
                heading: "متوافقة مع جميع أجهزة إيلوما",
                text: "تعمل تيريا من جميع المناشئ مع كل أجهزة ايكوس إيلوما: إيلوما وإيلوما ون وإيلوما برايم وسلسلة إيلوما i. لا تعمل مع أجهزة ايكوس القديمة مثل IQOS 3 DUO.",
            },
        ],
        faqs: [
            {
                question: `كم سعر تيريا ${name} في دبي؟`,
                answer: `سعر كرتونة تيريا ${name} لدينا ${range(list)}، وتحتوي الكرتونة على 200 عود (10 علب × 20).`,
            },
            {
                question: "هل التوصيل متاح خارج دبي؟",
                answer: `نعم، نوصل إلى جميع الإمارات. التوصيل مجاني عند طلب ${DELIVERY.freeFromItems} منتجات أو أكثر.`,
            },
        ],
    }
}

export const AR_COLLECTIONS: ArCollection[] = [
    {
        slug: "terea",
        category: "terea",
        h1: "سجائر تيريا في دبي والإمارات",
        metaTitle: `تيريا دبي — جميع النكهات من ${fromPrice(tereaList())} | IQOS Store UAE`,
        metaDescription: `تسوّق سجائر تيريا الأصلية في دبي والإمارات: إندونيسيا، كازاخستان، أوزبكستان، سويسرا واليابان. أكثر من ${tereaList().length} نكهة، توصيل في نفس اليوم داخل دبي، والدفع عند الاستلام.`,
        intro: "جميع نكهات تيريا في مكان واحد — من التبغ الكلاسيكي إلى المنثول وكبسولات النكهة. اختر حسب بلد المنشأ أو حسب الطعم، واستلم طلبك في نفس اليوم داخل دبي.",
        body: [
            {
                heading: "ما هي تيريا؟",
                text: "تيريا هي أعواد التبغ المسخّن المصممة لأجهزة ايكوس إيلوما. يحتوي كل عود على عنصر معدني صغير يسخّنه الجهاز بالحث، فلا توجد شفرة تحتاج إلى تنظيف ولا يحدث احتراق. تحتوي الكرتونة على 10 علب في كل علبة 20 عوداً.",
            },
            {
                heading: "تبحث عن هيتس؟",
                text: "هيتس مخصصة لأجهزة ايكوس القديمة. إذا كان لديك جهاز إيلوما فأنت تحتاج إلى تيريا — لا تعمل هيتس في إيلوما، ولا تعمل تيريا في الأجهزة القديمة.",
            },
        ],
        faqs: [
            {
                question: "كم سعر كرتونة تيريا في دبي؟",
                answer: `إندونيسيا ${range(tereaList("Indonesia"))}، كازاخستان ${range(tereaList("Kazakhstan"))}، أوزبكستان ${range(tereaList("Uzbekistan"))}، سويسرا ${range(tereaList("Switzerland"))}، واليابان ${range(tereaList("Japan"))}.`,
            },
            {
                question: "هل منتجاتكم أصلية؟",
                answer: "نعم، جميع المنتجات أصلية 100% وتصل مغلّفة.",
            },
        ],
    },
    regionCollection(
        "Indonesia",
        "terea/indonesia",
        "تيريا إندونيسيا هي أوسع تشكيلة لدينا — إصدارات خاصة، ونكهات بيرل بكبسولة، ونكهات ويف المنعشة.",
        "تصدر تيريا إندونيسيا إصدارات جديدة باستمرار، لذلك هي الخيار الأمثل إذا كنت تحب تجربة نكهات مختلفة، وبأسعار يومية مناسبة.",
    ),
    regionCollection(
        "Kazakhstan",
        "terea/kazakhstan",
        "تشكيلة كازاخستان تضم كلاسيكيات تيريا المحبوبة في الإمارات — أمبر، سيلفر، برونز، تركواز — مع مجموعة من نكهات الكبسولة.",
        "إذا كنت تبحث عن نكهة يومية موثوقة فابدأ بكازاخستان: تبغ متوازن في أمبر، ونعومة في سيلفر، وغنى في برونز، ومنثول منعش في تركواز.",
    ),
    regionCollection(
        "Uzbekistan",
        "terea/uzbekistan",
        "تيريا أوزبكستان تقدم النكهات الناعمة المفضلة — أمبر، سيلفر، برونز، تركواز وتشكيلة ويف — بسعر موحد.",
        "جميع كراتين أوزبكستان بنفس السعر، مما يسهّل الجمع بين نكهات التبغ والمنثول والكبسولة في طلب واحد.",
    ),
    regionCollection(
        "Switzerland",
        "terea/switzerland",
        "تيريا السويسرية تقدم التشكيلة الأوروبية الكلاسيكية — من سيلفر الخفيفة ويلو الحلوة إلى أمبر الغنية وتيك القوية.",
        "سيلفر ويلو هما الأخف، وأمبر وسيينا في الوسط، بينما برونز وتيك الأكثر قوة. وتتوفر أيضاً تركواز بمنثول خفيف وبيربل ويف بنكهة العنب.",
    ),
    regionCollection(
        "Japan",
        "terea/japan",
        "تيريا اليابان معروفة بخلطاتها الراقية والمميزة — من ريتش ريغولر إلى تروبيكال منثول وبلوسوم بيرل. إنها تشكيلتنا الفاخرة.",
        "لليابان تشكيلة خاصة من النكهات المصممة للسوق الياباني، وكثير منها غير متوفر في أي سوق آخر، لذلك سعرها أعلى.",
    ),
    {
        slug: "iqos-iluma",
        category: "iluma",
        h1: "أجهزة ايكوس إيلوما في دبي والإمارات",
        metaTitle: `سعر ايكوس إيلوما في الإمارات — من ${fromPrice(getProducts({ category: "iluma" }))} | IQOS Store UAE`,
        metaDescription: `اشترِ ايكوس إيلوما الأصلي في دبي والإمارات: إيلوما i، إيلوما i برايم، برايم، ون والإصدارات المحدودة. من ${fromPrice(getProducts({ category: "iluma" }))} مع توصيل في نفس اليوم داخل دبي.`,
        intro: "يسخّن ايكوس إيلوما أعواد تيريا من الداخل بتقنية SMARTCORE INDUCTION — بدون شفرة وبدون تنظيف. اختر سلسلة إيلوما i الأحدث، أو برايم الفاخر، أو ون الصغير، أو إصداراً محدوداً.",
        body: [
            {
                heading: "أي إيلوما يناسبك؟",
                text: "إيلوما ون جهاز متكامل صغير الحجم. إيلوما ستاندرد يتكون من حامل وشاحن جيب. إيلوما برايم بخامات فاخرة وتصميم مميز. وسلسلة إيلوما i هي الجيل الأحدث بميزات إضافية مثل شاشة لمس في بعض الطرازات.",
            },
        ],
        faqs: [
            {
                question: "كم سعر ايكوس إيلوما في الإمارات؟",
                answer: `تبدأ أسعار أجهزة إيلوما لدينا من ${fromPrice(getProducts({ category: "iluma" }))}، وتختلف أسعار الإصدارات المحدودة.`,
            },
            {
                question: "ما الأعواد التي تعمل مع إيلوما؟",
                answer: "أعواد تيريا فقط، من أي بلد منشأ. لا تستخدم هيتس في أجهزة إيلوما.",
            },
        ],
    },
    {
        slug: "vgod-stig",
        category: "stig",
        h1: "ستيج VGOD في دبي والإمارات",
        metaTitle: `ستيج دبي — بودات VGOD STIG من ${fromPrice(getProducts({ category: "stig" }))} | IQOS Store UAE`,
        metaDescription: `اشترِ بودات VGOD STIG وSTIG XL في دبي والإمارات بنكهات متعددة. من ${fromPrice(getProducts({ category: "stig" }))} مع توصيل في نفس اليوم داخل دبي.`,
        intro: "ستيج من VGOD جهاز بود صغير جاهز للاستخدام — بدون شحن وبدون تعبئة. اختر النكهة واستمتع. ويقدم STIG XL سعة أكبر لاستخدام أطول.",
        body: [
            {
                heading: "ستيج أم ستيج XL؟",
                text: "يأتي ستيج الأصلي في عبوة من 3 بودات بنيكوتين ملحي 6%، بينما STIG XL جهاز واحد أكبر بعدد سحبات أكثر وتركيز نيكوتين أقل.",
            },
        ],
        faqs: [
            {
                question: "كم سعر ستيج في دبي؟",
                answer: `تبدأ أسعار ستيج لدينا من ${fromPrice(getProducts({ category: "stig" }))}، مع توصيل مجاني عند طلب منتجين أو أكثر.`,
            },
        ],
    },
]

export function getArCollection(slug: string) {
    return AR_COLLECTIONS.find((c) => c.slug === slug)
}

export const AR_DELIVERY = EMIRATE_PAGES.map((e) => ({
    slug: e.slug,
    name: AR_EMIRATE[e.slug],
    fee: e.singleItemFee,
    speed: e.slug === "dubai" ? "توصيل في نفس اليوم للطلبات قبل الساعة 12 ظهراً، وفي اليوم التالي بعد ذلك." : "توصيل في اليوم التالي.",
}))
