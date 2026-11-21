import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "PAHINA — Coffee & Reading Room. Every page holds a story.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const flatlayPromise = readFile(
  join(process.cwd(), "public/images/editorial/hero-flatlay.jpg")
).then((buf) => `data:image/jpeg;base64,${buf.toString("base64")}`);

export default async function OpenGraphImage() {
  const flatlaySrc = await flatlayPromise;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#F4F1EA",
          padding: 36,
          fontFamily: "Georgia, serif",
          color: "#41474D",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch",
            backgroundColor: "#FAF8F3",
            border: "1px solid #E8E8E4",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {/* Left editorial typography column */}
          <div
            style={{
              width: "54%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "48px 48px 44px 52px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 9999,
                  backgroundColor: "#B9D0E0",
                }}
              />
              <span
                style={{
                  fontSize: 22,
                  letterSpacing: "0.24em",
                  color: "#41474D",
                }}
              >
                PAHINA
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  color: "#41474D",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>Every page</span>
                <span style={{ fontStyle: "italic" }}>holds a story.</span>
              </div>
              <div
                style={{
                  fontSize: 22,
                  lineHeight: 1.45,
                  color: "#56616B",
                  fontFamily: "sans-serif",
                }}
              >
                Coffee & Reading Room — A quiet place for coffee, books, and
                curious minds.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 40,
                borderTop: "1px solid #E8E8E4",
                paddingTop: 20,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontSize: 14,
                    color: "#56616B",
                    fontFamily: "sans-serif",
                  }}
                >
                  Menu
                </span>
                <span style={{ fontSize: 20, color: "#41474D" }}>39 items</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontSize: 14,
                    color: "#56616B",
                    fontFamily: "sans-serif",
                  }}
                >
                  Reading Room
                </span>
                <span style={{ fontSize: 20, color: "#41474D" }}>6 genres</span>
              </div>
            </div>
          </div>

          {/* Right overhead editorial photograph */}
          <div
            style={{
              width: "46%",
              height: "100%",
              display: "flex",
              position: "relative",
              backgroundColor: "#DCE7EF",
              borderLeft: "1px solid #E8E8E4",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flatlaySrc}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
