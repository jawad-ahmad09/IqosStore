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
    Italy: "إيطاليا",
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
    line?: string // model line filter, e.g. "ILUMA i"
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
        metaDescription: `تيريا ${name} الأصلية في دبي والإمارات: ${list.length} نكهة بسعر ${range(list)} للكرتونة. توصيل في نفس اليوم داخل دبي ومجاني فوق ${aed(DELIVERY.freeFromAmount)}.`,
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
                answer: `نعم، نوصل إلى جميع الإمارات. التوصيل مجاني للطلبات فوق ${aed(DELIVERY.freeFromAmount)}.`,
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
        metaDescription: `تيريا الأصلية في دبي والإمارات من إندونيسيا وكازاخستان وأوزبكستان وسويسرا وإيطاليا واليابان: أكثر من ${tereaList().length} نكهة، توصيل في نفس اليوم والدفع عند الاستلام.`,
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
                answer: `إندونيسيا ${range(tereaList("Indonesia"))}، كازاخستان ${range(tereaList("Kazakhstan"))}، أوزبكستان ${range(tereaList("Uzbekistan"))}، سويسرا ${range(tereaList("Switzerland"))}، إيطاليا ${range(tereaList("Italy"))}، واليابان ${range(tereaList("Japan"))}.`,
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
        "Italy",
        "terea/italy",
        "تيريا الإيطالية تقدم النكهات الأوروبية المفضلة — سيلفر، يلو، أمبر، سيينا وتيك — إلى جانب تركواز وبيربل ويف بالمنثول.",
        "سيلفر ويلو هما الأخف، وأمبر وسيينا متوازنتان، وتيك الأقوى. أما تركواز فمنثول ناعم، وبيربل ويف تجمع المنثول مع لمسة التوت.",
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
        metaDescription: `ايكوس إيلوما الأصلي في دبي والإمارات: إيلوما i وبرايم وون والإصدارات المحدودة. من ${fromPrice(getProducts({ category: "iluma" }))} مع توصيل في نفس اليوم داخل دبي.`,
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
        slug: "iqos-iluma-i",
        category: "iluma",
        line: "ILUMA i",
        h1: "ايكوس إيلوما i في دبي والإمارات",
        metaTitle: `سعر ايكوس إيلوما i في الإمارات — من ${fromPrice(getProducts({ category: "iluma", line: "ILUMA i" }))} | IQOS Store UAE`,
        metaDescription: `ايكوس إيلوما i الجديد في دبي والإمارات: i ون وi ستاندرد وi برايم بجميع الألوان. أجهزة أصلية مغلّفة من ${fromPrice(getProducts({ category: "iluma", line: "ILUMA i" }))} مع توصيل في نفس اليوم داخل دبي.`,
        intro: "إيلوما i هو الجيل الأحدث من ايكوس: تسخين بالحث بدون شفرة، مع وضع الإيقاف المؤقت وميزة FlexPuff، وشاشة لمس في طرازي i ستاندرد وi برايم. اختر الطراز واللون المناسب لك.",
        body: [
            {
                heading: "i ون أم i ستاندرد أم i برايم؟",
                text: "إيلوما i ون جهاز متكامل بدون شاحن منفصل، يكفي لنحو 20 جلسة بالشحنة الواحدة. إيلوما i ستاندرد حامل مع شاحن جيب بشاشة لمس لجلسات متتالية. وإيلوما i برايم يضيف تصميماً فاخراً من الألمنيوم.",
            },
            {
                heading: "ما الجديد مقارنة بإيلوما؟",
                text: "وضع الإيقاف المؤقت يتيح لك إيقاف الجلسة لدقائق ثم متابعتها، وFlexPuff يعدّل طول الجلسة حسب طريقة استخدامك، وتعرض شاشة اللمس البطارية والجلسات. ومثل كل أجهزة إيلوما، يعمل مع أعواد تيريا فقط.",
            },
        ],
        faqs: [
            {
                question: "كم سعر ايكوس إيلوما i في الإمارات؟",
                answer: `إيلوما i ون من ${fromPrice(getProducts({ category: "iluma", line: "ILUMA i One" }))}، وi ستاندرد من ${fromPrice(getProducts({ category: "iluma", line: "ILUMA i Standard" }))}، وi برايم من ${fromPrice(getProducts({ category: "iluma", line: "ILUMA i Prime" }))}، حسب اللون والإصدار.`,
            },
            {
                question: "هل يعمل إيلوما i مع جميع أعواد تيريا؟",
                answer: "نعم. تعمل تيريا من جميع المناشئ — إندونيسيا وكازاخستان وأوزبكستان وسويسرا وإيطاليا واليابان — مع كل طرازات إيلوما i.",
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
                answer: `تبدأ أسعار ستيج لدينا من ${fromPrice(getProducts({ category: "stig" }))}، مع توصيل مجاني للطلبات فوق ${aed(DELIVERY.freeFromAmount)}.`,
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
    fee: DELIVERY.fee,
    speed: e.slug === "dubai" ? "توصيل في نفس اليوم للطلبات قبل الساعة 12 ظهراً، وفي اليوم التالي بعد ذلك." : "توصيل في اليوم التالي.",
}))

// Arabic names for the flavours that have cross-origin comparison pages (/ar/flavours/<slug>).
// A flavour missing here falls back to its English name.
export const AR_FLAVOUR: Record<string, string> = {
    Amber: "أمبر",
    Bronze: "برونز",
    "Purple Wave": "بيربل ويف",
    Silver: "سيلفر",
    "Sun Pearl": "صن بيرل",
    Turquoise: "تركواز",
    Yellow: "يلو",
    Sienna: "سيينا",
    "Green Zing": "جرين زينج",
    "Oasis Pearl": "أوايسس بيرل",
    "Purple Menthol": "بيربل منثول",
    "Riviera Pearl": "ريفيرا بيرل",
    "Summer Wave": "سمر ويف",
    Teak: "تيك",
    "Twilight Pearl": "توايلايت بيرل",
}

export const arFlavour = (name: string) => AR_FLAVOUR[name] ?? name

// Arabic names for the delivery areas listed on each emirate page, keyed by the English name.
export const AR_AREA: Record<string, string> = {
    "Dubai Marina": "دبي مارينا",
    JLT: "أبراج بحيرات جميرا",
    JBR: "جميرا بيتش ريزيدنس",
    "Downtown Dubai": "وسط مدينة دبي",
    "Business Bay": "الخليج التجاري",
    Deira: "ديرة",
    "Bur Dubai": "بر دبي",
    "Al Barsha": "البرشاء",
    Jumeirah: "جميرا",
    "Dubai Silicon Oasis": "واحة دبي للسيليكون",
    "International City": "المدينة العالمية",
    Mirdif: "مردف",
    "Al Quoz": "القوز",
    "Dubai Hills": "دبي هيلز",
    "Arabian Ranches": "المرابع العربية",
    "Discovery Gardens": "ديسكفري جاردنز",
    "Al Reem Island": "جزيرة الريم",
    "Khalifa City": "مدينة خليفة",
    "Al Raha": "الراحة",
    "Yas Island": "جزيرة ياس",
    "Saadiyat Island": "جزيرة السعديات",
    Mussafah: "مصفح",
    "Al Khalidiyah": "الخالدية",
    Corniche: "الكورنيش",
    "Mohammed Bin Zayed City": "مدينة محمد بن زايد",
    "Al Mushrif": "المشرف",
    "Tourist Club Area": "منطقة النادي السياحي",
    "Al Nahda": "النهدة",
    "Al Majaz": "المجاز",
    "Al Taawun": "التعاون",
    "Al Khan": "الخان",
    Muwaileh: "مويلح",
    "Al Qasimia": "القاسمية",
    "University City": "المدينة الجامعية",
    Aljada: "الجادة",
    "Al Nabba": "النباعة",
    "Al Nuaimiya": "النعيمية",
    "Al Rashidiya": "الراشدية",
    "Ajman Corniche": "كورنيش عجمان",
    "Al Jurf": "الجرف",
    "Al Rawda": "الروضة",
    "Emirates City": "مدينة الإمارات",
    "Al Mowaihat": "المويهات",
    "Al Nakheel": "النخيل",
    "Al Hamra Village": "قرية الحمراء",
    "Mina Al Arab": "ميناء العرب",
    "Al Dhait": "الظيت",
    Khuzam: "خزام",
    Julphar: "جلفار",
    "Al Marjan Island": "جزيرة المرجان",
    "Fujairah City": "مدينة الفجيرة",
    Dibba: "دبا",
    "Al Faseel": "الفصيل",
    Merashid: "مريشيد",
    Sakamkam: "سكمكم",
    Kalba: "كلباء",
    "Al Salamah": "السلمة",
    "Al Raas": "الراس",
    "Al Humrah": "الحمرة",
    "Al Ramlah": "الرملة",
    "UAQ Marina": "مارينا أم القيوين",
    "Al Jimi": "الجيمي",
    "Al Muwaiji": "المويجعي",
    Hili: "هيلي",
    "Al Towayya": "الطوية",
    "Al Mutawaa": "المطوع",
    Zakher: "زاخر",
    "Al Khabisi": "الخبيصي",
}

export const arArea = (name: string) => AR_AREA[name] ?? name
