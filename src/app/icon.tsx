import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#2dd4bf",
        color: "#020617",
        display: "flex",
        fontSize: 23,
        fontWeight: 900,
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      R
    </div>,
    size,
  );
}
