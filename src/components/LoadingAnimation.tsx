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

        {/* The wrapper for the cross */}
        <div className={styles.crossWrapper}>
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

      {/* Phase 1-3: Target Group (Stays centered, fades out) */}
      <div className={clsx(styles.targetGroup, loadingState >= 3 && styles.hidden)}>
        {/* The wrapper for the brackets */}
        <div
          className={clsx(
            styles.bracketsWrapper,
            loadingState === 1 && styles.targetBlink,
            loadingState >= 3 && styles.bracketsExpanded
          )}
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
