"use client";

import {
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
  const pointerDownOutside = useRef(false);
  const [open, setOpen] = useState(false);
  const headingId = useId();
  const captionId = useId();

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
    // children must exist in the DOM before showModal announces the dialog
    flushSync(() => setOpen(true));
    dlg.showModal();
    // pan affordance: figures never render below natural width, so narrow
    // viewports overflow — without a visible cue the clipped edge reads
    // as broken, not pannable (responsive audit P2)
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
              className={styles.figRegion}
              data-fig-region
              tabIndex={0}
              role="group"
              aria-label={`${label}, scrollable figure`}
            >
              <div className={styles.figSize}>{children}</div>
            </div>
            <p className={styles.panHint} aria-hidden="true">
              {"← DRAG TO PAN — FIGURE SHOWN AT FULL SIZE"}
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
