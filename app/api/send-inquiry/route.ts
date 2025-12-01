import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { CartItem, ContactFormData } from "@/app/types"

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
async function sendEmail(data: ContactFormData) {
    const accessKey = "d09fea7a-554d-4f5f-94e8-bb4cb091d449";

    const formData = new FormData();
    formData.append("access_key", accessKey);
    formData.append("from_name", data.name);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    // REQUIRED or Web3Forms returns HTML
    formData.append("redirect", "https://web3forms.com/success");

    // Custom fields
    if (data.address) formData.append("address", data.address);
    if (data.city) formData.append("city", data.city);
    if (data.country) formData.append("country", data.country);

    formData.append("subject", `New Inquiry from ${data.name}`);
    formData.append("message", data.message || "");

    if (data.selectedProducts?.length) {
        const productsText = data.selectedProducts
            .map(item => `${item.name} x ${item.quantity} - $${item.price}`)
            .join('\n');

        formData.append("products", productsText);
    }

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    const text = await response.text();
    console.log("[Web3Forms raw response]", text);

    let result;
    try {
        result = JSON.parse(text);
    } catch {
        throw new Error("Web3Forms returned HTML. Access key is invalid OR missing required fields.");
    }

    if (!result.success) {
        throw new Error(result.message || "Web3Forms error");
    }

    return result;
}


function buildEmailText(data: ContactFormData) {
    const lines: string[] = []
    lines.push("New Inquiry / Order")
    lines.push("")
    lines.push("Customer Information:")
    lines.push(`Name: ${data.name}`)
    lines.push(`Email: ${data.email}`)
    lines.push(`Phone: ${data.phone}`)

    if (data.message) {
        lines.push("")
        lines.push("Message:")
        lines.push(data.message)
    }

    if (data.selectedProducts && data.selectedProducts.length > 0) {
        lines.push("")
        lines.push("Selected Products:")
        let total = 0
        for (const item of data.selectedProducts as CartItem[]) {
            const lineTotal = item.price * item.quantity
            total += lineTotal
            lines.push(`- ${item.name} x ${item.quantity} @ $${item.price.toFixed(2)} = $${lineTotal.toFixed(2)}`)
        }
        lines.push("")
        lines.push(`Total: $${total.toFixed(2)}`)
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

        // Build the email content
        const emailText = buildEmailText(data as ContactFormData);

        // Send to Web3Forms
        const result = await sendEmail({
            ...data as ContactFormData,
            message: emailText // Use the formatted text as the message
        });

        return NextResponse.json({
            success: true,
            message: "Inquiry sent successfully!",
            result
        })

    } catch (error) {
        console.error("[send-inquiry] Error:", error)
        return NextResponse.json({
            success: false,
            error: "Failed to send message",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 })
    }
}