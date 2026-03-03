"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingAnimation.module.css";
import clsx from "clsx";

export type LoadingState = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface LoadingAnimationProps {
  loadingState: LoadingState | number;
  targetRect: DOMRect | null; // The top-left corner we migrate to
}

export default function LoadingAnimation({ loadingState, targetRect }: LoadingAnimationProps) {
  const [migratorStyle, setMigratorStyle] = useState({ top: "50%", left: "50%" });
  const [panOffset, setPanOffset] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;

    const updatePan = () => {
      if (!startTime) startTime = Date.now();
      const elapsed = Date.now() - startTime;

      // Calculate a looping 2-second sine wave between -40 and +40
      const phase = (elapsed / 2000) * 2 * Math.PI;
      const currentOffset = Math.sin(phase) * -40; // Starts by moving left

      if (loadingState === 0) {
        setPanOffset(currentOffset);
        animationFrameId = requestAnimationFrame(updatePan);
      } else {
        setPanOffset(0); // Snap back to center when state changes
      }
    };

    if (loadingState === 0) {
      animationFrameId = requestAnimationFrame(updatePan);
    } else {
      setPanOffset(0);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [loadingState]);

  useEffect(() => {
    if (loadingState >= 5 && targetRect) {
      setMigratorStyle({
        top: `${targetRect.top}px`,
        left: `${targetRect.left}px`,
      });
    }
  }, [loadingState, targetRect]);

  if (loadingState >= 11) return null; // Fully loaded, hide this layer entirely

  return (
    <div className={styles.loadingContainer}>

      {/* The migrator moves from center to top-left of the main card */}
      <div
        className={clsx(styles.migrator, loadingState >= 7 && styles.hidden)}
        style={migratorStyle}
      >
        {/* Phase 4: The Expanding Lines that follow the + */}
        <div className={clsx(styles.expandingHLine, loadingState >= 4 && styles.expandingHLineActive)} />
        <div className={clsx(styles.expandingVLine, loadingState >= 4 && styles.expandingVLineActive)} />

        {/* The panning wrapper for the cross */}
        <div
          className={styles.crossWrapper}
          style={{ transform: `translateX(${panOffset}px)` }}
        >
          {/* The rotating cross */}
          <div className={clsx(
            styles.centerCross,
            loadingState >= 2 && styles.centerCrossRotated,
            loadingState === 1 && styles.crossBlinkRed,
            loadingState >= 4 && styles.centerCrossFadeOut
          )}>
            <div className={styles.crossLineHorizontal} />
            <div className={styles.crossLineVertical} />
          </div>
        </div>
      </div>

      {/* Phase 1-3: Target Acquired (Stays centered, fades out) */}
      <div className={clsx(styles.targetGroup, loadingState >= 3 && styles.hidden)}>
        <div className={clsx(
          styles.targetText,
          loadingState >= 2 && styles.textFadeOut,
          loadingState === 0 && styles.searchingBlink
        )}>
          {loadingState === 0 ? "SEARCHING..." : "TARGET ACQUIRED"}
        </div>
        {/* The panning wrapper for the brackets */}
        <div
          className={clsx(styles.bracketsWrapper, loadingState >= 3 && styles.bracketsExpanded)}
          style={{ transform: `translateX(${panOffset}px)` }}
        >
          <div className={styles.brackets}>
            <div className={styles.bracketLeft} />
            <div className={styles.bracketRight} />
          </div>
        </div>
      </div>

    </div>
  );
}
