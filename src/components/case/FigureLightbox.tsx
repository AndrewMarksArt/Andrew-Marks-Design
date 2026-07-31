"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import styles from "./FigureLightbox.module.css";

/**
 * Click-to-enlarge for the inline-SVG case figures. The SVG is never
 * nested inside the trigger (screen readers would double-announce it):
 * the frame holds the figure, then an inset-0 overlay button after it in
 * DOM. The dialog re-renders the same children at viewport size — it must
 * stay AFTER the inline copy in DOM so duplicated SVG ids (marker defs)
 * resolve to the always-rendered inline copy.
 *
 * Scroll lock lives in globals.css (html:has(dialog.figure-lightbox[open]))
 * because body-level overflow:hidden cannot propagate past the site's
 * html { overflow-x: clip }; --sb-comp is measured here before showModal.
 */
export default function ZoomableFigure({
  label,
  aspect,
  naturalWidth,
  caption,
  unframed = false,
  children,
}: {
  /** short figure name (normal case; CSS uppercases) — dialog heading + trigger label */
  label: string;
  /** viewBox width / height, drives dialog width */
  aspect: number;
  /** viewBox width in px — the mobile pan floor (figures render legibly at natural size) */
  naturalWidth: number;
  /** page caption, echoed inside the dialog when present */
  caption?: string;
  /** hero slot provides its own plate/border/padding */
  unframed?: boolean;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const figSizeRef = useRef<HTMLDivElement>(null);
  const pointerDownOutside = useRef(false);
  const pinch = useRef<{ dist: number; width: number } | null>(null);
  const [open, setOpen] = useState(false);
  const [touchUI, setTouchUI] = useState(false);
  const headingId = useId();
  const captionId = useId();

  // Pinch-to-zoom on phones (Andrew, 2026-07-31): figures open at fit
  // width and pinch toward natural size. Zoom is implemented as a WIDTH
  // change (not a transform) so one-finger pan stays native region
  // scrolling with momentum; the scroll offsets are corrected each step
  // so the point between the fingers stays put. Listeners are attached
  // natively because touchmove must be non-passive to preventDefault
  // (blocking the browser's page-zoom), which React's synthetic events
  // don't guarantee.
  useEffect(() => {
    if (!open || !touchUI) return;
    const region = regionRef.current;
    const dlg = dialogRef.current;
    if (!region || !dlg) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 2 || !figSizeRef.current) return;
      const [a, b] = [e.touches[0], e.touches[1]];
      pinch.current = {
        dist: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
        width: figSizeRef.current.getBoundingClientRect().width,
      };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || !pinch.current || !figSizeRef.current)
        return;
      e.preventDefault();
      const fig = figSizeRef.current;
      const [a, b] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const styles = getComputedStyle(region);
      const fitWidth =
        region.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight);
      const target = Math.min(
        Math.max((pinch.current.width * dist) / pinch.current.dist, fitWidth),
        naturalWidth,
      );
      const current = fig.getBoundingClientRect().width;
      if (Math.abs(target - current) < 0.5) return;
      const scale = target / current;
      const rRect = region.getBoundingClientRect();
      const midX = (a.clientX + b.clientX) / 2 - rRect.left;
      const midY = (a.clientY + b.clientY) / 2 - rRect.top;
      const sl = region.scrollLeft;
      const st = region.scrollTop;
      fig.style.width = `${target}px`;
      region.scrollLeft = (sl + midX) * scale - midX;
      region.scrollTop = (st + midY) * scale - midY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinch.current = null;
    };
    // iOS Safari fires proprietary gesture events for pinches — swallow
    // them inside the dialog or Safari zooms the whole page instead
    const swallow = (e: Event) => e.preventDefault();

    region.addEventListener("touchstart", onTouchStart, { passive: true });
    region.addEventListener("touchmove", onTouchMove, { passive: false });
    region.addEventListener("touchend", onTouchEnd, { passive: true });
    dlg.addEventListener("gesturestart", swallow);
    dlg.addEventListener("gesturechange", swallow);
    return () => {
      region.removeEventListener("touchstart", onTouchStart);
      region.removeEventListener("touchmove", onTouchMove);
      region.removeEventListener("touchend", onTouchEnd);
      dlg.removeEventListener("gesturestart", swallow);
      dlg.removeEventListener("gesturechange", swallow);
      pinch.current = null;
    };
  }, [open, touchUI, naturalWidth]);

  const outsideDialog = (e: { clientX: number; clientY: number }) => {
    const dlg = dialogRef.current;
    if (!dlg) return false;
    const r = dlg.getBoundingClientRect();
    return (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    );
  };

  const openDialog = () => {
    const dlg = dialogRef.current;
    if (!dlg || dlg.open) return;
    document.documentElement.style.setProperty(
      "--sb-comp",
      `${window.innerWidth - document.documentElement.clientWidth}px`,
    );
    const mobile = window.matchMedia("(max-width: 639px)").matches;
    // children must exist in the DOM before showModal announces the dialog
    flushSync(() => {
      setTouchUI(mobile);
      setOpen(true);
    });
    dlg.showModal();
    if (mobile) {
      // phones always get the affordance strip: it teaches the pinch
      dlg.setAttribute("data-pan", "true");
      return;
    }
    // desktop: the fit model means nothing should overflow; the strip
    // appears only when a figure actually does
    const region = dlg.querySelector("[data-fig-region]");
    if (region && region.scrollWidth > region.clientWidth + 4) {
      dlg.setAttribute("data-pan", "true");
    } else {
      dlg.removeAttribute("data-pan");
    }
  };

  const handleClose = () => {
    setOpen(false);
    document.documentElement.style.removeProperty("--sb-comp");
  };

  return (
    <div className={unframed ? styles.zoomWrap : `${styles.zoomWrap} ${styles.framed}`}>
      {children}
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="dialog"
        aria-label={`Enlarge: ${label}`}
        onClick={openDialog}
      >
        <span className={styles.enlargeTag} aria-hidden="true">
          {"[+] ENLARGE"}
        </span>
      </button>
      <dialog
        ref={dialogRef}
        className={`figure-lightbox ${styles.lightbox}`}
        style={
          {
            "--fig-aspect": aspect,
            "--fig-natural": `${naturalWidth}px`,
          } as CSSProperties
        }
        aria-labelledby={headingId}
        aria-describedby={caption ? captionId : undefined}
        onClose={handleClose}
        onPointerDown={(e) => {
          pointerDownOutside.current = outsideDialog(e);
        }}
        onClick={(e) => {
          // true backdrop click only: both down and up outside the panel
          if (pointerDownOutside.current && outsideDialog(e)) {
            dialogRef.current?.close();
          }
        }}
      >
        {open && (
          <>
            {/* close button first in DOM: showModal's initial focus target */}
            <div className={styles.header}>
              <button
                type="button"
                className={styles.closeBtn}
                aria-label="Close"
                onClick={() => dialogRef.current?.close()}
              >
                <span className={styles.closeKey} aria-hidden="true">
                  {"[ESC] "}
                </span>
                CLOSE
              </button>
              <span id={headingId} className={styles.title}>
                {label}
              </span>
            </div>
            <div
              ref={regionRef}
              className={styles.figRegion}
              data-fig-region
              tabIndex={0}
              role="group"
              aria-label={`${label}, scrollable figure`}
            >
              <div ref={figSizeRef} className={styles.figSize}>
                {children}
              </div>
            </div>
            <p className={styles.panHint} aria-hidden="true">
              {touchUI
                ? "PINCH TO ZOOM · DRAG TO PAN"
                : "← DRAG TO PAN — FIGURE SHOWN AT FULL SIZE"}
            </p>
            {caption && (
              <p id={captionId} className={styles.dialogCaption}>
                {caption}
              </p>
            )}
          </>
        )}
      </dialog>
    </div>
  );
}
