"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { StoreLinkModel } from "@/lib/download-links";
import { StoreLink } from "@/components/store-link";
import styles from "./mobile-navigation.module.css";

type NavItem = {
  href: string;
  label: string;
};

type MobileNavigationProps = {
  items: readonly NavItem[];
  download: StoreLinkModel;
  menuOpen: string;
  menuClose: string;
  ariaLabel: string;
};

export function MobileNavigation({
  items,
  download,
  menuOpen,
  menuClose,
  ariaLabel,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const isClient = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);

    if (open) {
      firstLinkRef.current?.focus();
    }

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const panel = document.getElementById(menuId);
      const focusable = panel?.querySelectorAll<HTMLElement>("a, button");
      if (!focusable?.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuId, open]);

  function closeAndRestore() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  const panel = (
    <nav
      id={menuId}
      className={styles.panel}
      hidden={!open}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <a
          key={item.href}
          ref={index === 0 ? firstLinkRef : undefined}
          href={item.href}
          onClick={closeAndRestore}
        >
          {item.label}
        </a>
      ))}
      <StoreLink link={download} />
    </nav>
  );

  return (
    <div className={styles.wrap}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? menuClose : menuOpen}
      </button>
      {isClient ? createPortal(panel, document.body) : panel}
    </div>
  );
}
