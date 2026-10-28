import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import ConsultModal from "./ConsultModal";

/**
 * Small floating button in the bottom-right corner.
 * Clicking it opens the consultation modal and locks page scrolling
 * until the close (X) button is pressed.
 *
 * Props:
 *  - apiBaseUrl: e.g. "http://localhost:5000" (leave "" if you proxy /api)
 *  - lenis:      your Lenis instance (optional)
 */
export default function ConsultWidget({ apiBaseUrl = "", lenis }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="fixed bottom-5 right-5 z-[900] flex items-center gap-2 rounded-full border border-(--gold-light)/50 bg-linear-to-b from-(--gold-highlight) to-(--gold-primary) px-4 py-3 font-(family-name:--font-body) text-(length:--font-size-small) text-(--background) shadow-[0_10px_30px_-8px_rgba(216,181,104,0.55)] transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold-light)"
      >
        <IoCalendarOutline size={18} />
        <span className="hidden sm:inline">Book a consultation</span>
        <span className="sm:hidden">Book</span>
      </button>

      {open && (
        <ConsultModal
          apiBaseUrl={apiBaseUrl}
          lenis={lenis}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}