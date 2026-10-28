import { useEffect, useState } from "react";

function waitForImages() {
  const images = Array.from(document.images);

  return Promise.all(
    images.map(
      (image) =>
        new Promise((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }

          const finish = () => resolve();
          image.addEventListener("load", finish, { once: true });
          image.addEventListener("error", finish, { once: true });
        }),
    ),
  );
}

function LoadingScreen() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const markReady = async () => {
      await Promise.all([
        waitForImages(),
        document.fonts?.ready ?? Promise.resolve(),
      ]);

      if (isMounted) {
        setIsReady(true);
      }
    };

    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady, { once: true });
    }

    return () => {
      isMounted = false;
      window.removeEventListener("load", markReady);
    };
  }, []);

  if (isReady) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[#040a0e] text-[#fff7df]"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#9f7a42] border-t-[#e4cd9b]" />
        <span className="font-tag text-xs uppercase tracking-[0.35em] text-[#e4cd9b]">
          Loading
        </span>
      </div>
    </div>
  );
}

export default LoadingScreen;
