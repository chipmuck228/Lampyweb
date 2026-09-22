import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ScrollRevealController } from "@/components/scroll-reveal-controller";
import { bindScrollReveal } from "@/lib/scroll-reveal";
import "@/app/globals.css";

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin = "";
  readonly scrollMargin = "";
  readonly thresholds: readonly number[] = [];
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  observed = new Set<Element>();
  disconnected = false;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.callback = callback;
    this.options = options;
    MockIntersectionObserver.instances.push(this);
  }

  observe(element: Element) {
    this.observed.add(element);
  }

  unobserve(element: Element) {
    this.observed.delete(element);
  }

  disconnect() {
    this.disconnected = true;
    this.observed.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  emit(target: Element, isIntersecting: boolean) {
    this.callback(
      [
        {
          target,
          isIntersecting,
          intersectionRatio: isIntersecting ? 0.2 : 0,
          time: 0,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
        } as IntersectionObserverEntry,
      ],
      this,
    );
  }
}

function stubMatchMedia(reduced: boolean) {
  const media = {
    matches: reduced,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: () => true,
  };
  vi.stubGlobal("matchMedia", () => media);
  return media;
}

function place(element: HTMLElement, top: number) {
  element.getBoundingClientRect = () =>
    ({
      x: 0,
      y: top,
      top,
      left: 0,
      right: 120,
      bottom: top + 80,
      width: 120,
      height: 80,
      toJSON() {
        return {};
      },
    }) as DOMRect;
}

function mountSections() {
  const view = render(
    <div>
      <section data-reveal data-reveal-kind="manifesto" id="in-view">
        In view
      </section>
      <section data-reveal data-reveal-kind="family" id="above">
        Above
      </section>
      <section data-reveal data-reveal-kind="download" id="below">
        Below
      </section>
    </div>,
  );

  const inView = view.container.querySelector("#in-view") as HTMLElement;
  const above = view.container.querySelector("#above") as HTMLElement;
  const below = view.container.querySelector("#below") as HTMLElement;
  place(inView, 40);
  place(above, -240);
  place(below, 1400);
  return { view, inView, above, below };
}

describe("scroll reveal controller", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });
    stubMatchMedia(false);
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("keeps content visible before initialization", () => {
    const { below } = mountSections();
    expect(below.getAttribute("data-revealed")).toBeNull();
    expect(below.getAttribute("data-reveal-ready")).toBeNull();
    expect(Number(getComputedStyle(below).opacity)).toBeGreaterThan(0.99);
  });

  it("uses one observer for multiple waiting sections", () => {
    const { below } = mountSections();
    render(
      <div>
        <section data-reveal id="second-below">
          Later
        </section>
      </div>,
    );
    const second = document.querySelector("#second-below") as HTMLElement;
    place(second, 1600);

    bindScrollReveal(document);
    expect(MockIntersectionObserver.instances).toHaveLength(1);
    expect(MockIntersectionObserver.instances[0]?.observed.has(below)).toBe(true);
    expect(MockIntersectionObserver.instances[0]?.observed.has(second)).toBe(true);
  });

  it("reveals first-screen and above-the-fold sections immediately", () => {
    const { inView, above, below } = mountSections();
    bindScrollReveal(document);

    expect(inView.dataset.revealed).toBe("true");
    expect(above.dataset.revealed).toBe("true");
    expect(below.dataset.revealed).toBe("false");
    expect(below.dataset.revealReady).toBe("true");
  });

  it("marks a first intersection as revealed and unobserves it", () => {
    const { below } = mountSections();
    bindScrollReveal(document);
    const observer = MockIntersectionObserver.instances[0];

    observer?.emit(below, true);

    expect(below.dataset.revealed).toBe("true");
    expect(observer?.observed.has(below)).toBe(false);
  });

  it("does not return a revealed section to waiting after it leaves", () => {
    const { below } = mountSections();
    bindScrollReveal(document);
    const observer = MockIntersectionObserver.instances[0];

    observer?.emit(below, true);
    observer?.emit(below, false);

    expect(below.dataset.revealed).toBe("true");
  });

  it("ignores later callbacks on an already revealed section", () => {
    const { below } = mountSections();
    bindScrollReveal(document);
    const observer = MockIntersectionObserver.instances[0];

    observer?.emit(below, true);
    below.dataset.revealed = "true";
    observer?.emit(below, true);
    observer?.emit(below, false);

    expect(below.dataset.revealed).toBe("true");
  });

  it("disconnects the observer when the controller unmounts", () => {
    mountSections();
    const screen = render(<ScrollRevealController />);
    expect(MockIntersectionObserver.instances).toHaveLength(1);
    screen.unmount();
    expect(MockIntersectionObserver.instances[0]?.disconnected).toBe(true);
  });

  it("does not hide content when reduced motion is requested", () => {
    stubMatchMedia(true);
    const { inView, above, below } = mountSections();
    bindScrollReveal(document);

    expect(MockIntersectionObserver.instances).toHaveLength(0);
    expect(inView.dataset.revealed).toBe("true");
    expect(above.dataset.revealed).toBe("true");
    expect(below.dataset.revealed).toBe("true");
  });

  it("does not hide content when IntersectionObserver is missing", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { below } = mountSections();
    bindScrollReveal(document);

    expect(below.dataset.revealed).toBe("true");
    expect(below.dataset.revealed).not.toBe("false");
  });
});
