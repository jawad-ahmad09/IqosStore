"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export default function WhatsAppButton() {
    const [isHovered, setIsHovered] = useState(false)

    // WhatsApp number with country code (no + or spaces)
    const whatsappNumber = "971561928359" // +971 56 192 8359

    // Pre-filled message that customer will send
    const defaultMessage = "Hello! I'm interested in your IQOS products. Can you help me?"

    const handleWhatsAppClick = () => {
        // Format the WhatsApp URL
        const encodedMessage = encodeURIComponent(defaultMessage)
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

        // Open WhatsApp in new tab
        window.open(whatsappURL, "_blank")
    }

    return (
        <>
            {/* Floating WhatsApp Button */}
            <button
                onClick={handleWhatsAppClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group"
                aria-label="Chat on WhatsApp"
            >
                {/* Button Content */}
                <div className="flex items-center gap-3 px-4 py-4 md:px-5 md:py-5">
                    {/* WhatsApp Icon */}
                    <div className="relative">
                        <MessageCircle
                            size={28}
                            className="group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Notification Dot (optional - for attention) */}
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    </div>

                    {/* Text Label (visible on hover on desktop, always on mobile) */}
                    <span className={`
                        text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300
                        md:max-w-0 md:opacity-0
                        ${isHovered ? 'md:max-w-xs md:opacity-100' : ''}
                        max-w-xs opacity-100 md:hidden
                    `}>
                        Chat with us
                    </span>
                </div>

                {/* Ripple Effect on Click */}
                <span className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-30 transition-opacity"></span>
            </button>

            {/* Pulsing Ring Animation */}
            <div className="fixed bottom-6 right-6 z-40 pointer-events-none">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
            </div>
        </>
    )
}
