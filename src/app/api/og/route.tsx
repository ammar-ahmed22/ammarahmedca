import { ImageResponse } from "next/og";

async function loadGoogleFont(font: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

const colors = {
  bg: "#0a0a0a",
  fg: "#f3f3f3",
  muted: "#747474",
  border: "#252525",
  surface: "#121212",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "ammar ahmed";
  const description =
    searchParams.get("description") ||
    "muslim. engineer. husband. father.";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: colors.bg,
          color: colors.fg,
          fontFamily: "Geist Mono",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "48px",
            backgroundColor: colors.surface,
            padding: "0 48px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <span style={{ color: colors.muted, fontSize: 20 }}>
            ammar@web:~$
          </span>
          <span
            style={{ color: colors.fg, fontSize: 20, marginLeft: 12 }}
          >
            cat post.md
          </span>
        </div>

        {/* Content area */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: "36px 48px",
          }}
        >
          <div style={{ color: colors.border, fontSize: 18 }}>
            ---
          </div>

          <div
            style={{
              fontFamily: "Rozha One",
              fontSize: 52,
              color: colors.fg,
              lineHeight: 1.1,
              marginTop: 20,
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 22,
              color: colors.muted,
              lineHeight: 1.5,
              marginTop: 16,
            }}
          >
            {description}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "56px",
            padding: "0 48px",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <div></div>
          <span style={{ color: colors.fg, fontSize: 20 }}>
            ammarahmed.ca
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist Mono",
          data: await loadGoogleFont("JetBrains+Mono"),
          style: "normal",
        },
        {
          name: "Rozha One",
          data: await loadGoogleFont("Rozha+One"),
          style: "normal",
        },
      ],
    },
  );
}
