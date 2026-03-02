"use client";

import { useEffect, useState } from "react";

export default function Typewriter({ start = true }: { start?: boolean }) {
    const [text, setText] = useState("");

    useEffect(() => {
        if (!start) return;

        const fullText = "// INITIALIZING...";
        let twIdx = 0;
        let twIsDeleting = false;
        let twLastTime = 0;
        let animationFrameId: number;

        const TYPE_SPEED = 100;
        const DELETE_SPEED = 80;
        const PAUSE_END = 3000;
        const PAUSE_START = 500;

        function typewriterTick(now: number) {
            if (!twLastTime) twLastTime = now;
            let delay = twIsDeleting ? DELETE_SPEED : TYPE_SPEED;

            if (!twIsDeleting && twIdx === fullText.length) {
                delay = PAUSE_END;
            } else if (twIsDeleting && twIdx === 0) {
                delay = PAUSE_START;
            }

            if (now - twLastTime > delay) {
                if (!twIsDeleting) {
                    if (twIdx >= fullText.length) {
                        twIsDeleting = true;
                    } else {
                        twIdx++;
                    }
                } else {
                    if (twIdx <= 0) {
                        twIsDeleting = false;
                    } else {
                        twIdx--;
                    }
                }

                setText(fullText.substring(0, twIdx));
                twLastTime = now;
            }

            animationFrameId = requestAnimationFrame(typewriterTick);
        }

        animationFrameId = requestAnimationFrame(typewriterTick);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [start]);

    return (
        <>
            <span id="typewriter">{text}</span>
            <span className="cursor-blink">_</span>
        </>
    );
}
