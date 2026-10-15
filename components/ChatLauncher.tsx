"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Assistant = dynamic(() => import("./PortfolioChat"), {
  ssr: false,
  loading: () => (
    <button type="button" className="chat-launcher" disabled aria-live="polite">
      Opening assistant…
    </button>
  ),
});

/** Load voice, files and phone utilities only when a visitor opens the chat. */
export default function ChatLauncher() {
  const [activated, setActivated] = useState(false);
  return activated ? (
    <Assistant initialOpen />
  ) : (
    <button
      type="button"
      className="chat-launcher"
      aria-expanded={false}
      aria-controls="portfolio-chat"
      onClick={() => setActivated(true)}
    >
      Let’s plan your project <span aria-hidden="true">↗</span>
    </button>
  );
}
