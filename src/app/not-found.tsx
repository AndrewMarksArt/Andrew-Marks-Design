import Link from "next/link";

/**
 * Branded 404 (judge-panel pass, research 005): the stock Next error page
 * broke the brand on exactly the page a mistyped shared link lands on.
 * Terminal voice, no chrome dependencies — renders inside the root layout.
 */
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "grid",
        placeContent: "center",
        gap: "16px",
        padding: "48px 24px",
        textAlign: "center",
        fontFamily: "var(--font-geist-mono), monospace",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          color: "var(--accent)",
        }}
      >
        {"// 404 — THIS ROUTE DOESN'T RESOLVE"}
      </p>
      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-geist), sans-serif",
          fontSize: "clamp(24px, 2.2917vw, 33px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
        }}
      >
        Nothing lives at this address.
      </h1>
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          color: "var(--meta-gray)",
        }}
      >
        <Link
          href="/"
          style={{
            color: "inherit",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          {"return_to_index →"}
        </Link>
      </p>
    </main>
  );
}
