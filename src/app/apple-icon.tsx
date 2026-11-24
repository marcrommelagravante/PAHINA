import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

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
          backgroundColor: "#F4F1EA",
        }}
      >
        <svg
          width="156"
          height="156"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="60" cy="60" r="56" fill="#FAF8F3" />
          <circle cx="60" cy="60" r="44" fill="#DCE7EF" fillOpacity="0.45" />
          <circle
            cx="60"
            cy="60"
            r="55.5"
            stroke="#41474D"
            strokeWidth="3.2"
            opacity="0.94"
          />
          <circle
            cx="60"
            cy="60"
            r="43.5"
            stroke="#41474D"
            strokeWidth="1.9"
            opacity="0.7"
          />
          <path
            d="M 60 79 C 51.5 74.4 41.8 73.6 34 75.5 L 34 54 C 41.8 52.1 51.5 52.9 60 57.8"
            stroke="#41474D"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 60 79 C 68.5 74.4 78.2 73.6 86 75.5 L 86 54 C 78.2 52.1 68.5 52.9 60 57.8"
            stroke="#41474D"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 38.8 80.5 C 45.6 79 53.2 79.5 60 83.2 C 66.8 79.5 74.4 79 81.2 80.5"
            stroke="#41474D"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />
          <path
            d="M 60 79 L 60 57.8 C 60 50.3 54.8 47.8 55.7 42.3 C 56.6 36.8 64.3 35.6 63.7 29.6 C 63.4 26.3 60.8 24.2 59.1 22.8"
            stroke="#41474D"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
