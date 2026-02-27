"use client";

import { useEffect, useRef } from "react";

export default function GazePortrait() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const ATLAS_SRC = "/atlas.jpg";
        const COLS = 9;
        const ROWS = 9;
        const TOTAL = COLS * ROWS;
        const FRAME_W = 256;
        const FRAME_H = 256;
        const INVERT = false;

        canvas.width = FRAME_W;
        canvas.height = FRAME_H;

        let mouse = 0.5;
        let smooth = 0.5;
        let lastIdx = -1;
        let animationFrameId: number;

        const atlas = new Image();
        atlas.src = ATLAS_SRC;

        let t0 = 0;

        atlas.onload = () => {
            t0 = performance.now();

            function tick(now: number) {
                smooth += (mouse - smooth) * 0.35;
                const drift = Math.sin((now - t0) / 3000) * 0.015;
                const val = Math.max(0, Math.min(1, smooth + drift));
                const idx = Math.round(val * (TOTAL - 1));

                if (idx !== lastIdx) {
                    lastIdx = idx;
                    const col = idx % COLS;
                    const row = Math.floor(idx / COLS);

                    ctx!.clearRect(0, 0, FRAME_W, FRAME_H);
                    ctx!.drawImage(
                        atlas,
                        col * FRAME_W + 1, row * FRAME_H + 1, FRAME_W - 2, FRAME_H - 2,
                        1, 1, FRAME_W - 2, FRAME_H - 2
                    );
                }

                animationFrameId = requestAnimationFrame(tick);
            }
            animationFrameId = requestAnimationFrame(tick);
        };

        const remap = (px: number) => {
            const v = px / window.innerWidth;
            return INVERT ? 1 - v : v;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse = remap(e.clientX);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
                mouse = remap(e.touches[0].clientX);
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return <canvas id="c" ref={canvasRef}></canvas>;
}
