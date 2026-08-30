"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { CompMedia } from "@/components/ui/CompMedia";
import { ArrowLink } from "@/components/ui/ArrowLink";
import styles from "./ServicesTabs.module.css";

type ServiceItem = {
  title: string;
  icon: string;
  text: string;
  /** Measured line width on the artboard, in artboard px. */
  width: number;
  fontSize: number;
};

type ServiceMedia = {
  /** Motion composition under public/videos, poster'd by `image`. */
  video: string;
  image: string;
  alt: string;
  /** The poster's box inside the 530 x 686 card, in artboard px. */
  width: number;
  height: number;
  left: number;
  top: number;
};

type ServiceTab = {
  id: string;
  label: string;
  icon: string;
  /** `null` where the artboard leaves the media card empty. */
  media: ServiceMedia | null;
  items: ServiceItem[];
};

/* Figma 2099:5022 "Component 16" — one variant per tab: Desktop-79 (data/AI),
   Desktop-80 (web), Desktop-81 (studio), Desktop-82 (ERP).

   Right-to-left order, so the variant drawn as active sits furthest right and
   opens by default. */
const TABS: ServiceTab[] = [
  {
    id: "data-ai",
    label: "البيانات والذكاء الاصطناعي",
    icon: "/icons/lucide-brain-circuit.svg",
    media: {
      video: "services-brain",
      image: "/images/services-brain.png",
      alt: "رسم توضيحي لدارة إلكترونية على شكل ورقة شجر",
      width: 1280,
      height: 720,
      left: -360.15,
      top: -0.15,
    },
    items: [
      {
        title: "تحليل البيانات",
        icon: "/icons/lucide-chart-pie.svg",
        text: "نحوّل البيانات الخام إلى رؤى واضحة تساعدك على فهم الأداء، اكتشاف الفرص واتخاذ قرارات أفضل.",
        width: 455,
        fontSize: 18,
      },
      {
        title: "ذكاء الأعمال ولوحات المتابعة",
        icon: "/icons/lucide-brain.svg",
        text: "نبني Dashboards وتقارير تفاعلية تجمع مؤشرات الأداء في مكان واحد وتسهّل المتابعة المستمرة.",
        width: 415,
        fontSize: 18,
      },
      {
        title: "حلول الذكاء الاصطناعي",
        icon: "/icons/lucide-astroid.svg",
        text: "نطوّر AI Agents ومساعدات ذكية وحلول مخصصة تساعد على تحسين تجربة العملاء وتسريع العمل.",
        width: 415,
        fontSize: 16,
      },
    ],
  },
  {
    id: "web",
    label: "تطوير المواقع",
    icon: "/icons/lucide-globe.svg",
    media: {
      video: "services-web",
      image: "/images/services-web.png",
      alt: "جهاز لوحي على مكتب يعرض موقعًا إلكترونيًا",
      width: 530,
      height: 1012,
      left: -0.15,
      top: -326.15,
    },
    items: [
      {
        title: "إنشاء المتاجر الإلكترونية",
        icon: "/icons/lucide-shopping-bag.svg",
        text: "نبني متاجر إلكترونية سهلة الاستخدام تدعم رحلة الشراء وإدارة المنتجات والطلبات بكفاءة.",
        width: 479,
        fontSize: 16,
      },
      {
        title: "تطوير مواقع Odoo وZoho",
        icon: "/icons/lucide-earth.svg",
        text: "نربط الموقع بأنظمة Odoo وZoho لتوحيد المبيعات، العملاء والعمليات داخل منظومة متكاملة.",
        width: 415,
        fontSize: 16,
      },
      {
        title: "تطوير WordPress",
        icon: "/icons/lucide-globe.svg",
        text: "نطوّر مواقع WordPress مرنة وسهلة الإدارة مع تخصيص التصميم والوظائف حسب احتياجك.",
        width: 415,
        fontSize: 16,
      },
    ],
  },
  {
    /* Desktop-81 draws this panel's media card as an empty bordered frame. */
    id: "studio",
    label: "استديو الابداع",
    icon: "/icons/lucide-gem.svg",
    media: null,
    items: [
      {
        title: "تصميم UI/UX",
        icon: "/icons/lucide-monitor-speaker.svg",
        text: "نصمم تجارب رقمية سهلة وواضحة توازن بين احتياجات المستخدم وأهداف الأعمال.",
        width: 479,
        fontSize: 16,
      },
      {
        title: "التسويق الرقمي",
        icon: "/icons/lucide-earth.svg",
        text: "نخطط وننفذ حملات ومحتوى يساعد العلامة على الوصول للجمهور وتحقيق أهدافها التسويقية.",
        width: 415,
        fontSize: 16,
      },
      {
        title: "إنتاج المحتوى والفيديو",
        icon: "/icons/lucide-tv-minimal-play.svg",
        text: "نحوّل الأفكار إلى محتوى بصري وفيديوهات تساعد على جذب الانتباه وتوصيل الرسالة بوضوح.",
        width: 415,
        fontSize: 16,
      },
    ],
  },
  {
    /* HEADS UP: Desktop-82 keeps the ERP headings but still carries the studio
       variant's body copy and its monitor / megaphone / play glyphs — the three
       paragraphs below describe design and marketing work, not ERP. Reproduced
       as drawn; swap `text` and `icon` here once the ERP copy is written. */
    id: "erp",
    label: " ERP",
    icon: "/icons/lucide-chart-no-axes-combined.svg",
    media: {
      video: "services-erp",
      image: "/images/services-erp.png",
      alt: "ألواح شبكية زرقاء متراكبة",
      width: 529,
      height: 939,
      left: -0.15,
      top: -127.15,
    },
    items: [
      {
        title: "تطبيق وتخصيص Odoo",
        icon: "/icons/lucide-monitor-speaker.svg",
        text: "نصمم تجارب رقمية سهلة وواضحة توازن بين احتياجات المستخدم وأهداف الأعمال.",
        width: 479,
        fontSize: 16,
      },
      {
        title: "حلول Zoho",
        icon: "/icons/lucide-megaphone.svg",
        text: "نخطط وننفذ حملات ومحتوى يساعد العلامة على الوصول للجمهور وتحقيق أهدافها التسويقية.",
        width: 415,
        fontSize: 16,
      },
      {
        title: "أتمتة عمليات الأعمال",
        icon: "/icons/lucide-tv-minimal-play.svg",
        text: "نحوّل الأفكار إلى محتوى بصري وفيديوهات تساعد على جذب الانتباه وتوصيل الرسالة بوضوح.",
        width: 415,
        fontSize: 16,
      },
    ],
  },
];

const rem = (px: number) => `${px / 10}rem`;

export function ServicesTabs() {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const active = TABS.find((tab) => tab.id === activeId) ?? TABS[0];
  const media = active.media;

  return (
    <section id="services" className={styles.section}>
      <div className={styles.stage}>
        <div className={styles.tabs} role="tablist" aria-label="خدمات Transformix">
          {TABS.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                className={[styles.tab, isActive && styles.tabActive]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setActiveId(tab.id)}
              >
                <Image
                  className={styles.tabIcon}
                  src={tab.icon}
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden
                />
                <span dir="auto">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Each poster is cropped differently inside the 530 x 686 card, so the
            box travels with the tab rather than living in the stylesheet. */}
        <div
          className={styles.media}
          style={
            media
              ? ({
                  "--media-x": rem(media.left),
                  "--media-y": rem(media.top),
                  "--media-w": rem(media.width),
                  "--media-h": rem(media.height),
                } as CSSProperties)
              : undefined
          }
        >
          {media && (
            <CompMedia
              key={active.id}
              className={`${styles.mediaImage} ${styles.fading}`}
              name={media.video}
              poster={media.image}
              width={media.width}
              height={media.height}
              label={media.alt}
            />
          )}
        </div>

        <div
          className={styles.list}
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
        >
          {active.items.map((item, index) => (
            <div key={`${active.id}-${item.title}`} className={styles.itemBlock}>
              {index > 0 && (
                <hr
                  className={[styles.divider, index === 2 && styles.dividerWarm]
                    .filter(Boolean)
                    .join(" ")}
                />
              )}
              <div
                className={`${styles.item} ${styles.fading}`}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className={styles.itemHead}>
                  <Image
                    className={styles.itemIcon}
                    src={item.icon}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                  />
                  <h3 dir="auto" className={styles.itemTitle}>
                    {item.title}
                  </h3>
                </div>

                <p
                  dir="auto"
                  className={styles.itemText}
                  style={
                    {
                      "--item-width": rem(item.width),
                      "--item-size": rem(item.fontSize),
                    } as CSSProperties
                  }
                >
                  {item.text}
                </p>

                <ArrowLink href="#services" icon="/icons/arrow-service.svg">
                  اعرف المزيد
                </ArrowLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
