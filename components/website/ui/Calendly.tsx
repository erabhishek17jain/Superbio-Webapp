"use client";

import { PopupButton } from "react-calendly";
import { useEffect, useState } from "react";

export default function Calendly() {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRootElement(document.getElementById("calendly-root"));
    }
  }, []);

  if (!rootElement) return null;

  return (
    <PopupButton
      className="flex w-fit items-center gap-x-2 border px-6 py-3 text-sm font-semibold uppercase shadow-xl shadow-border drop-shadow-sm transition-colors lg:border-black lg:bg-black lg:text-white lg:hover:bg-white lg:hover:text-black"
      url="https://calendly.com/loqo/introduction-30min"
      rootElement={rootElement!}
      text="Schedule Appointment!"
    />
  );
}
