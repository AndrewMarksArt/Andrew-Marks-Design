"use client";

import { useEffect, useState, useRef } from "react";
import GazePortrait from "../components/GazePortrait";
import Typewriter from "../components/Typewriter";
import LoadingAnimation from "../components/LoadingAnimation";

export default function Home() {
  const [loadingState, setLoadingState] = useState<number>(1);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const cardRef = useRef<HTMLElement>(null);

  // Sequence orchestrator
  useEffect(() => {
    const sequence = [
      { state: 2, delay: 1200 }, // Wait for target brackets to blink, then start rotating
      { state: 3, delay: 400 },  // Brackets expand
      { state: 4, delay: 500 },  // Lines expand from center
      { state: 5, delay: 600 },  // Prepare migration target and start migration
      { state: 6, delay: 800 },  // Wait for migrator to arrive, then snap top/left boundaries on
      { state: 7, delay: 100 },  // Tiny pause before revealing more
      { state: 8, delay: 300 },  // Bottom/Right boundaries expand out, base blocks fade to white
      { state: 9, delay: 800 },  // Portrait sweep begins (takes 800ms)
      { state: 10, delay: 400 }, // Inner component boundaries reveal
      { state: 11, delay: 800 }, // Text elements fade in (fully loaded)
    ];

    let currentTimeout: ReturnType<typeof setTimeout>;

    const runSequence = async () => {
      for (const step of sequence) {
        await new Promise<void>((resolve) => {
          currentTimeout = setTimeout(() => {
            setLoadingState(step.state);
            resolve();
          }, step.delay);
        });
      }
    };

    runSequence();

    return () => clearTimeout(currentTimeout);
  }, []);

  // Card scaling and target tracking
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

      // Also calculate the precise screen coordinates of the top-left structural corner
      // This is used by the LoadingAnimation to migrate its center cross
      if (card) {
        // We need the rect *after* scaling has been applied. 
        // requestAnimationFrame ensures the browser has painted the scaled transform
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          // The visual top-left of our structural box is the top boundary + left boundary
          // We add padding manually if we need to, but the v-left is at 0 of the card, and b-top is at 0.
          setTargetRect({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            bottom: rect.bottom,
            right: rect.right,
            x: rect.left,
            y: rect.top,
            toJSON: () => { }
          });
        });
      }
    }

    // Run once on mount
    fitCardToScreen();
    // And on resize
    window.addEventListener("resize", fitCardToScreen);
    return () => window.removeEventListener("resize", fitCardToScreen);
  }, []);

  return (
    <>
      <LoadingAnimation loadingState={loadingState} targetRect={targetRect} />

      <div id="scaler">
        <main
          ref={cardRef}
          className={`card ${loadingState < 11 ? 'loading-active' : ''} phase-${loadingState}`}
        >
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

            <div className="header-text" role="heading" aria-level={1}>
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
              <Typewriter start={loadingState >= 11} />
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
    </>
  );
}
