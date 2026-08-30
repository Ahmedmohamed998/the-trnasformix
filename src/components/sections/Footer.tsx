import Image from "next/image";
import styles from "./Footer.module.css";

type LinkColumn = {
  title: string;
  width: number;
  links: string[];
};

/* Right-to-left order, so "الشركة" sits furthest right as on the artboard. */
const COLUMNS: LinkColumn[] = [
  {
    title: "الشركة",
    width: 123,
    links: ["من نحن", "اعمالنا", "المدونة"],
  },
  {
    title: "الخدمات",
    width: 123,
    links: [
      "علوم البيانات",
      "الذكاء الاصطناعي",
      "استديو الابداع",
      "انظمة ERP ",
      "تطوير المواقع",
    ],
  },
  {
    title: "الصناعات",
    width: 115,
    links: ["السياحة", "التعليم"],
  },
];

type ContactRow = {
  icon: string;
  text: string;
  href?: string;
  muted: boolean;
  /** Artboard underlines the email only. */
  plain?: boolean;
};

const CONTACT: ContactRow[] = [
  {
    icon: "/icons/lucide-mail.svg",
    text: "Info@thetransformix.com",
    href: "mailto:Info@thetransformix.com",
    muted: false,
  },
  {
    icon: "/icons/lucide-phone.svg",
    text: "+966567623953",
    href: "tel:+966567623953",
    muted: false,
    plain: true,
  },
  {
    icon: "/icons/lucide-map-pin.svg",
    text: "المملكة العربية السعودية ,جدة",
    muted: true,
  },
  {
    icon: "/icons/lucide-map-pin.svg",
    text: "الامارات المتحدة,الشارقة",
    muted: true,
  },
];

/* Right-to-left: the artboard reads Behance, LinkedIn, Instagram, Facebook from
   left to right, so Facebook leads here to land on the right. */
const SOCIAL = [
  { icon: "/icons/social-4.svg", label: "فيسبوك" },
  { icon: "/icons/social-3.svg", label: "إنستغرام" },
  { icon: "/icons/social-2.svg", label: "لينكدإن" },
  { icon: "/icons/social-1.svg", label: "بيهانس" },
];

const rem = (px: number) => `${px / 10}rem`;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.brandTop}>
            <Image
              className={styles.brandLogo}
              src="/icons/logo-footer.svg"
              alt="Transformix"
              width={173}
              height={111}
            />
            <p className={styles.tagline}> حلول رقمية متكاملة تدعم نمو أعمالك</p>
          </div>

          <div className={styles.social}>
            {SOCIAL.map((item) => (
              <a
                key={item.icon}
                className={styles.socialLink}
                href="#"
                aria-label={item.label}
              >
                <Image src={item.icon} alt="" width={40} height={40} aria-hidden />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.columns}>
            {COLUMNS.map((column) => (
              <div
                key={column.title}
                className={styles.column}
                style={{ width: rem(column.width) }}
              >
                <p className={styles.columnTitle}>{column.title}</p>
                <ul className={styles.columnList}>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a dir="auto" className={styles.columnLink} href="#">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={`${styles.column} ${styles.contact}`}>
              <p className={styles.columnTitle}>تواصل معنا</p>
              {CONTACT.map((row) => {
                const text = (
                  <span
                    dir="auto"
                    className={[styles.contactText, row.muted && styles.contactMuted]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {row.text}
                  </span>
                );

                return (
                  <div key={row.text} className={styles.contactRow}>
                    <Image
                      className={styles.contactIcon}
                      src={row.icon}
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden
                    />
                    {row.href ? (
                      <a
                        className={row.plain ? undefined : styles.contactLink}
                        href={row.href}
                      >
                        {text}
                      </a>
                    ) : (
                      text
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.legal}>
            <hr className={styles.rule} />
            <p className={styles.copyright}>
              ©جميع الحقوق محفوظة لشركة Transformix
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
