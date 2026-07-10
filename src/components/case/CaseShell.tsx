import type { ReactNode } from "react";
import Link from "next/link";
import MetaBar from "../site/MetaBar";
import LinksGrid from "../site/LinksGrid";
import Footer from "../site/Footer";
import styles from "./case.module.css";

/**
 * Shared chrome for case-study pages: the site's meta bar on top, a
 * terminal-style RETURN_TO_INDEX link (the back-to-home affordance —
 * mono utility voice, accent + draw-in underline on hover), the page
 * content, then the links band + footer from the main page.
 */
export default function CaseShell({ children }: { children: ReactNode }) {
  return (
    <div className="page">
      <main className="plateMain">
        <MetaBar />
        <div className={`content ${styles.backRow}`}>
          <Link href="/" className={styles.backLink}>
            <span aria-hidden="true">{"← // "}</span>
            RETURN_TO_INDEX
          </Link>
        </div>
        {children}
        <LinksGrid />
      </main>
      <Footer />
    </div>
  );
}
