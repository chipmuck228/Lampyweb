export const REVEAL_SELECTOR = "[data-reveal]";

export const REVEAL_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.08,
  rootMargin: "0px 0px -12% 0px",
};

type RevealSession = {
  disconnect: () => void;
  observer: IntersectionObserver | null;
};

function markRevealed(element: HTMLElement) {
  if (element.dataset.revealed === "true") {
    return;
  }

  element.dataset.revealReady = "true";
  element.dataset.revealed = "true";
}

function markWaiting(element: HTMLElement) {
  if (element.dataset.revealed === "true") {
    return;
  }

  element.dataset.revealReady = "true";
  element.dataset.revealed = "false";
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isBelowViewport(element: HTMLElement): boolean {
  return element.getBoundingClientRect().top > window.innerHeight;
}

function revealAll(elements: HTMLElement[]) {
  for (const element of elements) {
    markRevealed(element);
  }
}

export function bindScrollReveal(
  root: ParentNode = document,
): RevealSession {
  const elements = [...root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)];

  try {
    if (typeof window.matchMedia !== "function" || prefersReducedMotion()) {
      revealAll(elements);
      return { disconnect() {}, observer: null };
    }

    if (typeof IntersectionObserver !== "function") {
      revealAll(elements);
      return { disconnect() {}, observer: null };
    }

    let disconnected = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (element.dataset.revealed === "true") {
          observer.unobserve(element);
          continue;
        }

        if (entry.isIntersecting) {
          markRevealed(element);
          observer.unobserve(element);
        }
      }
    }, REVEAL_OBSERVER_OPTIONS);

    const classify = () => {
      if (disconnected) {
        return;
      }

      if (prefersReducedMotion()) {
        revealAll(elements);
        observer.disconnect();
        return;
      }

      for (const element of elements) {
        if (element.dataset.revealed === "true") {
          continue;
        }

        if (isBelowViewport(element)) {
          markWaiting(element);
          observer.observe(element);
        } else {
          markRevealed(element);
        }
      }
    };

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMediaChange = () => {
      if (media.matches) {
        revealAll(elements);
        observer.disconnect();
      }
    };
    media.addEventListener("change", onMediaChange);

    const revealHashTarget = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) {
        return;
      }

      const target =
        document.getElementById(id)?.closest<HTMLElement>(REVEAL_SELECTOR) ??
        document.querySelector<HTMLElement>(`${REVEAL_SELECTOR}#${CSS.escape(id)}`);

      if (target) {
        markRevealed(target);
        observer.unobserve(target);
      }
    };

    const onPageShow = () => {
      classify();
      revealHashTarget();
    };

    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("hashchange", revealHashTarget);

    classify();
    revealHashTarget();

    return {
      observer,
      disconnect() {
        disconnected = true;
        observer.disconnect();
        media.removeEventListener("change", onMediaChange);
        window.removeEventListener("pageshow", onPageShow);
        window.removeEventListener("hashchange", revealHashTarget);
      },
    };
  } catch {
    revealAll(elements);
    return { disconnect() {}, observer: null };
  }
}
