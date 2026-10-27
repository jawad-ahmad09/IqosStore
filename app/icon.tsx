import { ImageResponse } from "next/og"

export const size = { width: 512, height: 512 }
export const contentType = "image/png"

// Brand mark: a glowing ember "i" on the night tile, matching the header logo.
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 112,
                    background: "radial-gradient(circle at 50% 55%, #e4572e 0%, #8a2f12 38%, #13100d 72%)",
                    color: "#fff",
                    fontSize: 340,
                    fontWeight: 800,
                }}
            >
                i
            </div>
        ),
        size,
    )
}
