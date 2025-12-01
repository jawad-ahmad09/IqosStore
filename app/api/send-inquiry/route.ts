import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { CartItem, ContactFormData } from "@/app/types"
import nodemailer from "nodemailer"

// async function sendEmail(data: ContactFormData) {
//     const accessKey = "786c863e-045a-448e-be7d-2e3a46c77ad4"

//     console.log("[send-inquiry] Sending to Web3Forms with data:", data)

//     try {
//         const formData = new FormData();
//         formData.append("access_key", accessKey);
//         formData.append("name", data.name);
//         formData.append("email", data.email);
//         formData.append("phone", data.phone);
//         formData.append("phone", data.address);
//         formData.append("phone", data.city);
//         formData.append("phone", data.country);
//         formData.append("message", data.message || "");
//         formData.append("subject", `New Inquiry from ${data.name}`);

//         if (data.selectedProducts && data.selectedProducts.length > 0) {
//             const productsText = data.selectedProducts.map((item: CartItem) =>
//                 `${item.name} x ${item.quantity} - $${item.price}`
//             ).join('\n');
//             formData.append("products", productsText);
//         }

//         const response = await fetch("https://api.web3forms.com/submit", {
//             method: "POST",
//             body: formData
//         });

//         const result = await response.json();
//         console.log("[send-inquiry] Web3Forms response:", result);

//         if (result.success) {
//             return result;
//         } else {
//             throw new Error(result.message || "Web3Forms submission failed");
//         }
//     } catch (error) {
//         console.error("[send-inquiry] Web3Forms error:", error);
//         throw error;
//     }
// }
// Email configuration using Gmail with OAuth-style authentication
const EMAIL_CONFIG = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: "jawadrathore30@gmail.com",
        pass: "vlmh scjx uyjk byla",
    },
    tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    }
}

async function sendEmail(data: ContactFormData) {
    try {
        // Build formatted email message
        const emailMessage = buildEmailText(data);

        console.log("[sendEmail] Sending order via SMTP...");
        console.log("[sendEmail] Customer:", data.name, data.email, data.phone);

        // Create transporter
        const transporter = nodemailer.createTransport(EMAIL_CONFIG);

        // Verify connection
        await transporter.verify();
        console.log("[SMTP] Connection verified ✓");

        // Send email
        const result = await transporter.sendMail({
            from: `"IQOS Store" <${EMAIL_CONFIG.auth.user}>`,
            to: EMAIL_CONFIG.auth.user, // Send to yourself
            replyTo: data.email, // Customer can reply directly
            subject: `🛒 New IQOS Store Order from ${data.name}`,
            text: emailMessage,
        });

        console.log("[SMTP] ✅ Email sent successfully! ID:", result.messageId);
        return { success: true, id: result.messageId };
    } catch (error: any) {
        console.error("[sendEmail Error]", error);
        console.error("[Error Details]", error.message);

        // If Gmail blocks, log detailed error
        if (error.code === 'EAUTH') {
            console.error("❌ Gmail authentication failed!");
            console.error("Solution: Enable 'Less secure app access' at: https://myaccount.google.com/lesssecureapps");
            console.error("Or generate App Password at: https://myaccount.google.com/apppasswords");
        }

        throw error;
    }
}


function buildEmailText(data: ContactFormData) {
    const lines: string[] = []
    lines.push("New IQOS Store Order Inquiry")
    lines.push("================================")
    lines.push("")
    lines.push("Customer Information:")
    lines.push(`Name: ${data.name}`)
    lines.push(`Email: ${data.email}`)
    lines.push(`Phone: ${data.phone}`)

    if (data.address) lines.push(`Address: ${data.address}`)
    if (data.city) lines.push(`City: ${data.city}`)
    if (data.country) lines.push(`Country: ${data.country}`)

    if (data.message) {
        lines.push("")
        lines.push("Special Instructions:")
        lines.push(data.message)
    }

    if (data.selectedProducts && data.selectedProducts.length > 0) {
        lines.push("")
        lines.push("Order Details:")
        lines.push("--------------------------------")
        let total = 0
        for (const item of data.selectedProducts as CartItem[]) {
            const lineTotal = item.price * item.quantity
            total += lineTotal
            lines.push(`${item.name}`)
            lines.push(`  Quantity: ${item.quantity}`)
            lines.push(`  Unit Price: AED ${item.price.toFixed(2)}`)
            lines.push(`  Subtotal: AED ${lineTotal.toFixed(2)}`)
            lines.push("")
        }
        lines.push("--------------------------------")
        lines.push(`TOTAL: AED ${total.toFixed(2)}`)
        lines.push("")
        lines.push("✓ Free delivery within UAE")
        lines.push("✓ Authentic products guaranteed")
    }

    return lines.join("\n")
}

export async function POST(req: NextRequest) {
    try {
        const data = (await req.json()) as Partial<ContactFormData>
        console.log("[send-inquiry] Received form data:", data)

        if (!data?.name || !data?.email || !data?.phone) {
            return NextResponse.json({
                success: false,
                error: "Missing required fields: name, email, and phone are required"
            }, { status: 400 })
        }

        // Build and log the email content
        const emailText = buildEmailText(data as ContactFormData);
        console.log("[send-inquiry] Order details:\n", emailText)

        // Send email via Gmail SMTP - must succeed!
        const result = await sendEmail(data as ContactFormData);

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

        // Return proper error to user
        return NextResponse.json({
            success: false,
            error: "Failed to send order inquiry. Please try again or contact us directly via WhatsApp.",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 })
    }
}