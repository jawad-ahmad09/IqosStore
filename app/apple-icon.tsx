import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

// Brand mark: a glowing ember "i" on the night tile, matching the header logo.
export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 40,
                    background: "radial-gradient(circle at 50% 55%, #e4572e 0%, #8a2f12 38%, #13100d 72%)",
                    color: "#fff",
                    fontSize: 120,
                    fontWeight: 800,
                }}
            >
                i
            </div>
        ),
        size,
    )
}
