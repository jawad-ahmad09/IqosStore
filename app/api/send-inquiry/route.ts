import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { ContactFormData } from "@/app/types"
import { priceOrder } from "@/app/lib/pricing"
import nodemailer from "nodemailer"

// Gmail SMTP credentials live in environment variables (.env.local locally,
// Project Settings → Environment Variables on Vercel). Use a Gmail App Password.
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const ORDER_INBOX = process.env.ORDER_INBOX || SMTP_USER

let transporter: nodemailer.Transporter | null = null

function getTransporter() {
    if (!SMTP_USER || !SMTP_PASS) throw new Error("SMTP_USER / SMTP_PASS environment variables are not set")
    transporter ??= nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // upgraded with STARTTLS
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
    return transporter
}

async function sendEmail(data: ContactFormData) {
    try {
        const result = await getTransporter().sendMail({
            from: `"IQOS Store" <${SMTP_USER}>`,
            to: ORDER_INBOX,
            replyTo: data.email || undefined, // Customer can reply directly
            subject: `🛒 New IQOS Store ${data.items?.length ? "Order" : "Inquiry"} from ${data.name}`,
            text: buildEmailText(data),
        })

        console.log("[SMTP] ✅ Email sent, id:", result.messageId)
        return { success: true, id: result.messageId }
    } catch (error) {
        const err = error as { code?: string; message?: string }
        console.error("[sendEmail Error]", err.message)
        if (err.code === "EAUTH") {
            console.error("❌ Gmail authentication failed — check SMTP_USER / SMTP_PASS (must be an App Password).")
        }
        throw error
    }
}

// Basic per-IP limit so bots can't burn through the Gmail sending quota.
// In-memory, so it's per server instance — enough to stop casual abuse.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }
const recent = new Map<string, number[]>()

function isRateLimited(ip: string) {
    const now = Date.now()
    const hits = (recent.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs)
    hits.push(now)
    recent.set(ip, hits)
    if (recent.size > 5000) recent.clear()
    return hits.length > RATE_LIMIT.max
}

function clean(value: unknown, max: number) {
    return typeof value === "string" ? value.trim().slice(0, max) : ""
}

function buildEmailText(data: ContactFormData) {
    const order = priceOrder(data.items ?? [], data.emirate)
    const lines: string[] = []
    lines.push(order.lines.length > 0 ? "New IQOS Store Order" : "New IQOS Store Inquiry")
    lines.push("================================")
    lines.push("")
    lines.push("Customer Information:")
    lines.push(`Name: ${data.name}`)
    lines.push(`Phone: ${data.phone}`)
    if (data.email) lines.push(`Email: ${data.email}`)
    if (data.emirate) lines.push(`Emirate: ${data.emirate}`)
    if (data.address) lines.push(`Address: ${data.address}`)

    if (data.message) {
        lines.push("")
        lines.push("Notes / Message:")
        lines.push(data.message)
    }

    if (order.lines.length > 0) {
        lines.push("")
        lines.push("Order Details:")
        lines.push("--------------------------------")
        for (const { product, quantity, lineTotal } of order.lines) {
            lines.push(`${product.name}${product.region ? ` (${product.region})` : ""}`)
            lines.push(`  Quantity: ${quantity}`)
            lines.push(`  Unit Price: AED ${product.price.toFixed(2)}`)
            lines.push(`  Subtotal: AED ${lineTotal.toFixed(2)}`)
            lines.push("")
        }
        lines.push("--------------------------------")
        lines.push(`Items subtotal: AED ${order.subtotal.toFixed(2)}`)
        lines.push(`Delivery: ${order.delivery === 0 ? "FREE" : `AED ${order.delivery.toFixed(2)}`}`)
        lines.push(`TOTAL: AED ${order.total.toFixed(2)}`)
        lines.push("")
        lines.push("Payment: Cash on delivery")
    }

    return lines.join("\n")
}

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
        if (isRateLimited(ip)) {
            return NextResponse.json({
                success: false,
                error: "Too many requests. Please wait a few minutes or contact us on WhatsApp."
            }, { status: 429 })
        }

        const body = (await req.json()) as Partial<ContactFormData> & { website?: string }

        // Honeypot: real visitors never see or fill the "website" field.
        if (body?.website) {
            return NextResponse.json({ success: true, message: "Thanks!" })
        }
        const data: ContactFormData = {
            name: clean(body?.name, 100),
            phone: clean(body?.phone, 30),
            email: clean(body?.email, 150),
            emirate: clean(body?.emirate, 40),
            address: clean(body?.address, 300),
            message: clean(body?.message, 2000),
            items: Array.isArray(body?.items) ? body.items.slice(0, 50) : [],
        }

        if (!data.name || !data.phone) {
            return NextResponse.json({
                success: false,
                error: "Missing required fields: name and phone are required"
            }, { status: 400 })
        }

        // Send email via Gmail SMTP - must succeed!
        const result = await sendEmail(data);

        // Only return success if email was actually sent
        if (result.success) {
            console.log("[send-inquiry] ✅ Order submitted successfully and email sent!")
            return NextResponse.json({
                success: true,
                message: "Order inquiry sent successfully! We'll contact you soon."
            })
        } else {
            // Email sending failed
            console.error("[send-inquiry] ❌ Email sending returned failure:", result)
            throw new Error("Email service failed")
        }

    } catch (error) {
        console.error("[send-inquiry] ❌ Error processing order:", error)

        return NextResponse.json({
            success: false,
            error: "Failed to send order inquiry. Please try again or contact us directly via WhatsApp.",
        }, { status: 500 })
    }
}
