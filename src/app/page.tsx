"use client";

import { useEffect } from "react";
import GazePortrait from "../components/GazePortrait";
import Typewriter from "../components/Typewriter";

export default function Home() {
  useEffect(() => {
    function fitCardToScreen() {
      const scaler = document.getElementById("scaler");
      const card = document.querySelector(".card") as HTMLElement;
      if (!scaler) return;

      const cardHeight = card ? card.offsetHeight : 600;
      const availableHeight = window.innerHeight - 40;
      let scale = 1;

      if (cardHeight > availableHeight) {
        scale = availableHeight / cardHeight;
      }

      scaler.style.transform = `scale(${scale})`;
    }

    // Run once on mount
    fitCardToScreen();
    // And on resize
    window.addEventListener("resize", fitCardToScreen);
    return () => window.removeEventListener("resize", fitCardToScreen);
  }, []);

  return (
    <div id="scaler">
      <main className="card">
        {/* Infinite Vertical Grid Lines for the left/right edge */}
        <div className="vline v-left"></div>
        <div className="vline v-right"></div>

        {/* ================= HEADER ================= */}
        <header className="block header-block">
          {/* Top Boundary Line */}
          <div className="boundary b-top">
            <div className="hline"></div>
            <div className="cross cross-left"></div>
            <div className="cross cross-right"></div>
          </div>

          <div className="header-text">
            UID: AM-9310-TSR // TOP_SECRET // LOC: 36.5298° N, 87.3595° W
          </div>

          {/* Bottom Boundary Line (Separates header from canvas) */}
          <div className="boundary b-bottom">
            <div className="hline"></div>
            <div className="cross cross-left"></div>
            <div className="cross cross-right"></div>
          </div>
        </header>

        {/* ================= BASE CANVAS ================= */}
        <div className="block canvas-block">
          <GazePortrait />
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="block footer-block">
          {/* Top Boundary Line (Separates footer from canvas) */}
          <div className="boundary b-top">
            <div className="hline"></div>
            <div className="cross cross-left"></div>
            <div className="cross cross-right"></div>
          </div>

          <div className="headline">
            <Typewriter />
          </div>

          <div className="subhead">
            <div className="status-row">
              <span>STATUS:</span>
              <span className="dots"></span>
              <span className="val">Coming Soon</span>
            </div>
            <div className="status-row">
              <span>LAST SYNC:</span>
              <span className="dots"></span>
              <span className="val">[ 2.26.2026 ]</span>
            </div>
          </div>

          {/* Bottom Boundary Line */}
          <div className="boundary b-bottom">
            <div className="hline"></div>
            <div className="cross cross-left"></div>
            <div className="cross cross-right"></div>
          </div>
        </footer>
      </main>
    </div>
  );
}
