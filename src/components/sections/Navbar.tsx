"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button8 } from "@/components/ui/Button8";
import styles from "./Navbar.module.css";

/** Right-to-left reading order, so the first entry renders furthest right. */
const NAV_ITEMS = [
  { label: "الرئيسية", href: "#", active: true },
  { label: "من نحن", href: "#about" },
  { label: "الخدمات", href: "#services", hasMenu: true },
  { label: "الصناعات", href: "#industries" },
  { label: "أعمالنا", href: "#works" },
  { label: "تواصل معنا", href: "#contact" },
];

/* Figma 2166:28462 "Links container" — the الخدمات drop-down. The artboard
   draws no targets for the rows, so each one lands on the services section. */
const SERVICE_LINKS = [
  "تحليل البيانات و الذكاء الاصطناعي",
  "تطوير المواقع الالكترونية",
  "استديو الابداع",
  "انظمة ERP",
];

const SERVICES_HREF = "#services";

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [sheetServicesOpen, setSheetServicesOpen] = useState(false);
  const servicesItem = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => {
      setMenuOpen(false);
      setServicesOpen(false);
    };
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setServicesOpen(false);
      setSheetServicesOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* A tap opens the pop-over without ever producing a mouseleave, so anything
     pressed outside the item has to close it. */
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesItem.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

  /* The sheet covers the viewport, so the page behind it must not scroll. */
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setSheetServicesOpen(false);
  };

  /** The 210 x 184 card, shared by the desktop pop-over and the sheet. */
  const renderServiceMenu = (id: string, className: string) => (
    <ul id={id} className={className}>
      {SERVICE_LINKS.map((label) => (
        <li key={label}>
          <a href={SERVICES_HREF} className={styles.menuLink} onClick={closeAll}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className={cx(styles.header, scrolled && styles.scrolled)}>
      <div className={styles.inner}>
        {/* Two lockups: the artboard draws 85.14 x 54.36 on desktop and a
            differently proportioned 46.99 x 35 on the 390 screen. */}
        <a href="#" className={styles.logo} aria-label="Transformix">
          <Image
            className={styles.logoWide}
            src="/icons/logo.svg"
            alt=""
            width={86}
            height={55}
            priority
          />
          <Image
            className={styles.logoCompact}
            src="/icons/logo-mobile.svg"
            alt=""
            width={47}
            height={35}
            priority
          />
        </a>

        <nav className={styles.nav} aria-label="التنقل الرئيسي">
          <ul className={styles.list}>
            {NAV_ITEMS.map((item) =>
              item.hasMenu ? (
                <li
                  key={item.label}
                  ref={servicesItem}
                  className={cx(styles.item, styles.itemMenu)}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    className={cx(styles.link, styles.trigger)}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    aria-controls="nav-services-menu"
                    onClick={() => setServicesOpen((open) => !open)}
                  >
                    {item.label}
                    <Image
                      className={styles.chevron}
                      src="/icons/nav-chevron.svg"
                      alt=""
                      width={16}
                      height={16}
                      aria-hidden
                    />
                  </button>
                  {renderServiceMenu(
                    "nav-services-menu",
                    cx(
                      styles.menu,
                      styles.dropdown,
                      servicesOpen && styles.dropdownOpen,
                    ),
                  )}
                </li>
              ) : (
                <li key={item.label} className={styles.item}>
                  <a
                    href={item.href}
                    className={cx(styles.link, item.active && styles.active)}
                    aria-current={item.active ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className={styles.cta}>
          <Button8>احجز استشارة مجانية</Button8>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label="فتح القائمة"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <Image
            src="/icons/lucide-menu.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden
          />
        </button>

        {/* Figma 2164:28439 "Navbar 9" — the small-screen menu. */}
        <div
          id="mobile-menu"
          className={cx(styles.sheet, menuOpen && styles.sheetOpen)}
        >
          <button
            type="button"
            className={styles.close}
            aria-label="إغلاق القائمة"
            onClick={closeAll}
          >
            <span />
            <span />
          </button>

          <ul className={styles.sheetList}>
            {NAV_ITEMS.map((item) =>
              item.hasMenu ? (
                <li key={item.label} className={styles.sheetItem}>
                  <button
                    type="button"
                    className={styles.sheetTrigger}
                    aria-expanded={sheetServicesOpen}
                    aria-controls="sheet-services-menu"
                    onClick={() => setSheetServicesOpen((open) => !open)}
                  >
                    <span>{item.label}</span>
                    <Image
                      className={styles.sheetChevron}
                      src="/icons/menu-chevron.svg"
                      alt=""
                      width={17}
                      height={9}
                      aria-hidden
                    />
                  </button>
                  {renderServiceMenu(
                    "sheet-services-menu",
                    cx(
                      styles.menu,
                      styles.sheetMenu,
                      sheetServicesOpen && styles.sheetMenuOpen,
                    ),
                  )}
                </li>
              ) : (
                <li key={item.label} className={styles.sheetItem}>
                  <a
                    href={item.href}
                    className={cx(
                      styles.sheetLink,
                      item.active && styles.sheetActive,
                    )}
                    aria-current={item.active ? "page" : undefined}
                    onClick={closeAll}
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}

            <li className={styles.sheetCtaItem}>
              <Button8 size="compact">احجز استشارة مجانية</Button8>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
