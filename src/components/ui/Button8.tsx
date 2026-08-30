import type { ReactNode } from "react";
import styles from "./Button8.module.css";

type Button8Props = {
  children: ReactNode;
  href?: string;
  className?: string;
  /** `compact` is the 128.85 x 36 instance the small-screen menu draws. */
  size?: "default" | "compact";
};

/** The gradient pill CTA that repeats five times across the page. */
export function Button8({
  children,
  href = "#contact",
  className,
  size = "default",
}: Button8Props) {
  return (
    <a
      href={href}
      className={[styles.root, size === "compact" && styles.compact, className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.pill} aria-hidden />
      <span className={styles.label}>{children}</span>
    </a>
  );
}
