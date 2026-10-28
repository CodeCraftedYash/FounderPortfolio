import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose, IoCheckmarkCircleOutline } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/* ------------------------------------------------------------------ */
/*  Endpoints (change these to match your Express routes)              */
/* ------------------------------------------------------------------ */
const ENDPOINTS = {
  services: "/api/services", // GET  -> [{ id, name }]
  slots: "/api/consultations/slots", // GET  ?date=YYYY-MM-DD&serviceId=1 -> ["09:00", "09:30", ...]
  book: "/api/consultations", // POST -> { fullName, email, phone, serviceId, date, time, notes }
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

// "14:30" -> "2:30 PM"
const formatTime = (t) => {
  const [h, m] = String(t).split(":").map(Number);
  if (Number.isNaN(h)) return String(t);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m || 0).padStart(2, "0")} ${suffix}`;
};

// Accepts ["09:00"] or [{ time: "09:00", available: false }]
const normalizeSlots = (data) => {
  const list = Array.isArray(data) ? data : data?.slots ?? [];
  return list.map((s) =>
    typeof s === "string"
      ? { time: s, available: true }
      : { time: s.time, available: s.available !== false }
  );
};

// Accepts [{ id, name }] or [{ _id, title }]
const normalizeServices = (data) => {
  const list = Array.isArray(data) ? data : data?.services ?? [];
  return list.map((s) => ({
    id: s.id ?? s._id ?? s.service_id,
    name: s.name ?? s.title ?? s.service_name,
  }));
};

const validate = (f) => {
  const e = {};
  if (f.fullName.trim().length < 2) e.fullName = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
  if (f.phone.replace(/\D/g, "").length < 7)
    e.phone = "Enter a phone number with at least 7 digits.";
  if (!f.serviceId) e.serviceId = "Choose a service.";
  if (!f.date) e.date = "Pick a date.";
  else if (f.date < todayISO()) e.date = "Pick a date from today onwards.";
  if (!f.time) e.time = "Choose a time slot.";
  return e;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/*  Shared styles (all colours / fonts come from your CSS variables)   */
/* ------------------------------------------------------------------ */
const inputClass =
  "w-full rounded-md border border-(--gold-dark)/45 bg-(--background) px-3.5 py-2.5 " +
  "font-(family-name:--font-body) text-(length:--font-size-medium) text-(--font-color) " +
  "placeholder:text-(--font-color)/35 outline-none transition-colors [color-scheme:dark] " +
  "focus:border-(--gold-primary) focus:ring-2 focus:ring-(--gold-primary)/20 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const errorClass =
  "mt-1.5 font-(family-name:--font-tag) text-(length:--font-size-xsmall) text-(--font-color-s2)";

function Field({ label, htmlFor, error, optional, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-baseline justify-between font-(family-name:--font-tag) text-(length:--font-size-xsmall) tracking-wide text-(--gold-light)"
      >
        {label}
        {optional && <span className="text-(--font-color)/45">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className={errorClass}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */
export default function ConsultModal({ onClose, apiBaseUrl = "", lenis }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceId: "",
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]);
  const [servicesState, setServicesState] = useState("loading"); // loading | ready | error
  // Slots are stored together with the request they belong to, so "loading"
  // can be derived (no setState needed at the start of the effect).
  const [slotsResult, setSlotsResult] = useState({ key: "", status: "idle", slots: [] });
  const [slotsReload, setSlotsReload] = useState(0); // bump to refetch
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);

  const set = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({
      ...f,
      [key]: value,
      // A different date or service means the chosen time may no longer exist
      ...(key === "date" || key === "serviceId" ? { time: "" } : {}),
    }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  /* ---- Lock page scroll while open (works with Lenis too) ---- */
  useEffect(() => {
    const lenisInstance = lenis || window.lenis;
    const body = document.body;
    const html = document.documentElement;
    const prev = {
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };

    // Stop the layout jumping when the scrollbar disappears
    const scrollbar = window.innerWidth - html.clientWidth;
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    lenisInstance?.stop();

    return () => {
      body.style.overflow = prev.bodyOverflow;
      html.style.overflow = prev.htmlOverflow;
      body.style.paddingRight = prev.bodyPaddingRight;
      lenisInstance?.start();
    };
  }, [lenis]);

  /* ---- Focus: move in on open, restore on close ---- */
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    firstFieldRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, []);

  /* ---- Entrance animation ---- */
  useGSAP(
    () => {
      const d = prefersReducedMotion() ? 0 : 0.35;
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: d });
      gsap.fromTo(
        panelRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: d, ease: "power3.out" }
      );
    },
    { scope: overlayRef }
  );

  const requestClose = () => {
    const d = prefersReducedMotion() ? 0 : 0.22;
    gsap.to(panelRef.current, { y: 16, opacity: 0, duration: d, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: d, onComplete: onClose });
  };

  /* ---- Escape to close + simple focus trap ---- */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        requestClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Load services ---- */
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${apiBaseUrl}${ENDPOINTS.services}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error();
        setServices(normalizeServices(await res.json()));
        setServicesState("ready");
      } catch (err) {
        if (err.name !== "AbortError") setServicesState("error");
      }
    })();
    return () => controller.abort();
  }, [apiBaseUrl]);

  /* ---- Load available time slots when date or service changes ---- */
  const { date, serviceId } = form;
  const slotsKey = date && serviceId ? `${date}|${serviceId}|${slotsReload}` : "";

  useEffect(() => {
    if (!slotsKey) return;
    const controller = new AbortController();
    (async () => {
      try {
        const qs = new URLSearchParams({ date, serviceId });
        const res = await fetch(`${apiBaseUrl}${ENDPOINTS.slots}?${qs}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error();
        const data = normalizeSlots(await res.json());
        setSlotsResult({ key: slotsKey, status: "ready", slots: data });
      } catch (err) {
        if (err.name !== "AbortError") {
          setSlotsResult({ key: slotsKey, status: "error", slots: [] });
        }
      }
    })();
    return () => controller.abort();
  }, [slotsKey, date, serviceId, apiBaseUrl]);

  const slotsState = !slotsKey
    ? "idle"
    : slotsResult.key !== slotsKey
    ? "loading"
    : slotsResult.status; // "ready" | "error"
  const slots = slotsState === "ready" ? slotsResult.slots : [];

  /* ---- Submit ---- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      const firstKey = Object.keys(found)[0];
      panelRef.current?.querySelector(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(`${apiBaseUrl}${ENDPOINTS.book}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          serviceId: form.serviceId,
          date: form.date,
          time: form.time,
          notes: form.notes.trim(),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (res.status === 409) {
          // Slot was just taken: clear the choice and refresh the list
          setForm((f) => ({ ...f, time: "" }));
          setSlotsReload((n) => n + 1);
        }
        throw new Error(body.message || "We couldn't book that slot. Please try again.");
      }
      setDone(true);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedService = services.find((s) => String(s.id) === String(form.serviceId));

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-(--background)/80 backdrop-blur-md sm:items-center sm:p-6"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
        // data-lenis-prevent lets the panel scroll on its own while Lenis is stopped
        data-lenis-prevent
        className="relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-2xl border border-(--gold-dark)/35 bg-(--fground) shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] [scrollbar-color:var(--gold-dark)_transparent] [scrollbar-width:thin] sm:max-w-lg sm:rounded-2xl"
      >
        {/* Gold hairline: the one decorative detail */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-(--gold-primary) to-transparent" />

        <button
          type="button"
          onClick={requestClose}
          aria-label="Close consultation form"
          className="absolute right-3 top-4 z-10 grid size-9 place-items-center rounded-full text-(--font-color)/70 transition-colors hover:bg-(--fground-highlighted) hover:text-(--gold-light) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold-primary)"
        >
          <IoClose size={22} />
        </button>

        {done ? (
          <div className="px-6 pb-9 pt-12 text-center sm:px-9">
            <IoCheckmarkCircleOutline className="mx-auto text-(--gold-primary)" size={54} />
            <h2
              id="consult-title"
              className="mt-4 font-(family-name:--font-display) text-[2rem] leading-tight text-(--font-color)"
            >
              Your consultation is booked
            </h2>
            <p className="mx-auto mt-3 max-w-sm font-(family-name:--font-body) text-(length:--font-size-medium) leading-relaxed text-(--font-color-s1)/85">
              {selectedService?.name} on{" "}
              {new Date(`${form.date}T00:00`).toLocaleDateString(undefined, {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}{" "}
              at {formatTime(form.time)}. We've sent the details to {form.email}.
            </p>
            <button
              type="button"
              onClick={requestClose}
              className="mt-8 rounded-md bg-(--gold-primary) px-7 py-2.5 font-(family-name:--font-body) text-(length:--font-size-medium) text-(--background) transition-colors hover:bg-(--gold-highlight) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold-light)"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-6 pb-8 pt-9 sm:px-9">
            <h2
              id="consult-title"
              className="pr-10 font-(family-name:--font-display) text-[2rem] leading-tight text-(--font-color)"
            >
              Book a consultation
            </h2>
            <p className="mt-2 font-(family-name:--font-body) text-(length:--font-size-medium) text-(--font-color-s1)/80">
              Choose a service and a time that suits you.
            </p>

            <div className="mt-7 space-y-4">
              <Field label="Full name" htmlFor="fullName" error={errors.fullName}>
                <input
                  ref={firstFieldRef}
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={set("fullName")}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email address" htmlFor="email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={set("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field label="Phone number" htmlFor="phone" error={errors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Consultation service" htmlFor="serviceId" error={errors.serviceId}>
                <select
                  id="serviceId"
                  name="serviceId"
                  value={form.serviceId}
                  onChange={set("serviceId")}
                  disabled={servicesState !== "ready"}
                  aria-invalid={!!errors.serviceId}
                  aria-describedby={errors.serviceId ? "serviceId-error" : undefined}
                  className={inputClass}
                >
                  <option value="">
                    {servicesState === "loading"
                      ? "Loading services…"
                      : servicesState === "error"
                      ? "Couldn't load services"
                      : "Select a service"}
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {servicesState === "error" && (
                  <p className={errorClass}>
                    We couldn't load the service list. Close this window and try again.
                  </p>
                )}
              </Field>

              <Field label="Appointment date" htmlFor="date" error={errors.date}>
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={todayISO()}
                  value={form.date}
                  onChange={set("date")}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? "date-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <fieldset>
                <legend className="mb-1.5 font-(family-name:--font-tag) text-(length:--font-size-xsmall) tracking-wide text-(--gold-light)">
                  Appointment time
                </legend>

                {slotsState === "idle" && (
                  <p className="rounded-md border border-dashed border-(--gold-dark)/45 px-3.5 py-3 font-(family-name:--font-body) text-(length:--font-size-small) text-(--font-color)/55">
                    Pick a service and a date to see open times.
                  </p>
                )}
                {slotsState === "loading" && (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4" aria-label="Loading times">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-10 animate-pulse rounded-md bg-(--fground-highlighted)"
                      />
                    ))}
                  </div>
                )}
                {slotsState === "error" && (
                  <p className={errorClass.replace("mt-1.5 ", "")}>
                    We couldn't load the available times.{" "}
                    <button
                      type="button"
                      onClick={() => setSlotsReload((n) => n + 1)}
                      className="text-(--gold-light) underline underline-offset-2 hover:text-(--gold-highlight)"
                    >
                      Try again
                    </button>
                  </p>
                )}
                {slotsState === "ready" && slots.length === 0 && (
                  <p className="rounded-md border border-dashed border-(--gold-dark)/45 px-3.5 py-3 font-(family-name:--font-body) text-(length:--font-size-small) text-(--font-color)/65">
                    No times are open on this date. Try another day.
                  </p>
                )}
                {slotsState === "ready" && slots.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4" role="radiogroup">
                    {slots.map((s) => {
                      const selected = form.time === s.time;
                      return (
                        <button
                          key={s.time}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          disabled={!s.available}
                          onClick={() => {
                            setForm((f) => ({ ...f, time: s.time }));
                            setErrors((er) => ({ ...er, time: undefined }));
                          }}
                          className={
                            "h-10 rounded-md border font-(family-name:--font-tag) text-(length:--font-size-xsmall) transition-colors " +
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold-primary) " +
                            (selected
                              ? "border-(--gold-primary) bg-(--gold-primary) text-(--background)"
                              : s.available
                              ? "border-(--gold-dark)/45 bg-(--background) text-(--font-color-s1) hover:border-(--gold-primary) hover:bg-(--fground-highlighted)"
                              : "cursor-not-allowed border-(--gold-dark)/20 bg-(--background) text-(--font-color)/25 line-through")
                          }
                        >
                          {formatTime(s.time)}
                        </button>
                      );
                    })}
                  </div>
                )}
                {errors.time && (
                  <p role="alert" className={errorClass}>
                    {errors.time}
                  </p>
                )}
              </fieldset>

              <Field label="Additional notes" htmlFor="notes" optional>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  maxLength={1000}
                  value={form.notes}
                  onChange={set("notes")}
                  placeholder="Anything we should know before the call?"
                  className={inputClass + " resize-none"}
                />
              </Field>
            </div>

            {submitError && (
              <p
                role="alert"
                className="mt-5 rounded-md border border-(--font-color-s2)/40 bg-(--font-color-s2)/10 px-3.5 py-2.5 font-(family-name:--font-body) text-(length:--font-size-small) text-(--font-color-s2)"
              >
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-md bg-linear-to-b from-(--gold-highlight) to-(--gold-primary) px-4 py-3 font-(family-name:--font-body) text-(length:--font-size-medium) text-(--background) transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold-light) disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting && (
                <span className="size-4 animate-spin rounded-full border-2 border-(--background)/30 border-t-(--background)" />
              )}
              {submitting ? "Booking…" : "Book consultation"}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}