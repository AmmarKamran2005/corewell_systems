"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Background loop for the closing CTA band.
 *
 * Three gates, each closing a different way of wasting a visitor's bandwidth:
 *
 * 1. Mounted, not hidden. A `<video>` in the markup fetches regardless of what
 *    CSS says about it, so the only way a phone never pays for 2.7MB is for the
 *    element not to exist there.
 * 2. Reduced motion gets no download either. The band is complete without the
 *    loop, so the honest answer to "I don't want animation" is nothing sent,
 *    not a paused first frame.
 * 3. Nothing loads until the band is near the viewport. This section is the
 *    last thing on the page; a visitor who reads the hero and leaves should
 *    never have paid for it.
 *
 * All three decide after mount, so the server-rendered band is the plain dark
 * section it has always been and the video is strictly an enhancement.
 */
export function CtaBandVideo() {
  const anchor = useRef<HTMLDivElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wideEnough = window.matchMedia("(min-width: 768px)");
    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setAllowed(wideEnough.matches && !stillness.matches);

    decide();
    wideEnough.addEventListener("change", decide);
    stillness.addEventListener("change", decide);
    return () => {
      wideEnough.removeEventListener("change", decide);
      stillness.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!allowed || near) return;
    const el = anchor.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    // One viewport of warning is enough for the first frames to arrive before
    // the band is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [allowed, near]);

  return (
    <div ref={anchor} className="absolute inset-0">
      {allowed && near && (
        <video
          src="/media/cta-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
