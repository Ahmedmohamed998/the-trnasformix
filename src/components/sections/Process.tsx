"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button8 } from "@/components/ui/Button8";
import { Reveal } from "@/components/ui/Reveal";
import { useInView } from "@/lib/useInView";
import styles from "./Process.module.css";

type Figure = {
  src: string;
  alt: string;
  /** Straight crop, or the 45°-rotated diamond the artboard alternates to. */
  shape: "rect" | "diamond";
  /** Outer box on the artboard, in artboard px. */
  left: number;
  top: number;
  size: number;
  /** The image's own box inside that crop. */
  boxW: number;
  boxH: number;
  /** Diamond only: the counter-rotating stage inside the 350px window. */
  stageX?: number;
  stageY?: number;
  stageSize?: number;
  /** The picture's offset and scale inside its box, in per cent. */
  cropX: number;
  cropY: number;
  cropW: number;
  cropH: number;
};

type Step = {
  title: string;
  text: string;
  bullets: string[];
  figure: Figure;
};

/* The six variants of Figma's "Component 20" (2099:5295), one per step —
   Desktop-90 … Desktop-95. Odd steps are drawn as a straight 350px crop, even
   steps as the same crop rotated into a diamond; step 6 reuses step 1's photo.

   NOTE: the last bullet of step 1 carries a leftover designer note on the
   artboard ("اعملي صورة للمحتوي دة"); only the bullet copy is used here. */
const STEPS: Step[] = [
  {
    title: "1.نفهم",
    text: "نبدأ بفهم المشروع، أهدافه، التحديات وطريقة العمل الحالية، عشان نحدد الصورة كاملة قبل ما نقترح أي حل.",
    bullets: [
      "فهم أهداف المشروع",
      "تحديد التحديات الرئيسية",
      "مراجعة المستخدمين والعمليات",
      "تحديد الأولويات",
    ],
    figure: {
      src: "/images/process-1.png",
      alt: "فريق يناقش مخطط عمل على لوحة",
      shape: "rect",
      left: 100,
      top: 185,
      size: 350,
      boxW: 400,
      boxH: 272,
      cropX: -4.15,
      cropY: -11.9,
      cropW: 111.35,
      cropH: 142.07,
    },
  },
  {
    title: "2. نحلل",
    text: "نراجع البيانات، الأنظمة وتجربة المستخدم لاكتشاف الفرص والمشكلات التي تحتاج إلى معالجة.",
    bullets: [
      "تحليل البيانات المتاحة",
      "مراجعة رحلة المستخدم",
      "دراسة الأنظمة الحالية",
      "اكتشاف فرص التحسين",
    ],
    figure: {
      src: "/images/process-2.png",
      alt: "زميلان يراجعان لوحات بيانات ومخطط تدفق على الحائط",
      shape: "diamond",
      left: 103,
      top: 80,
      size: 494.975,
      stageX: -175,
      stageY: -342.6,
      stageSize: 868.327,
      boxW: 732,
      boxH: 496,
      cropX: -11.95,
      cropY: -41.89,
      cropW: 122.69,
      cropH: 157.64,
    },
  },
  {
    title: "3.  نحدد الاتجاه",
    text: "نحوّل ما اكتشفناه إلى خطة واضحة تحدد الحل الأنسب، نطاق العمل وأولويات التنفيذ.",
    bullets: [
      "تحديد الحل المناسب",
      "وضع استراتيجية التنفيذ",
      "تحديد نطاق المشروع",
      "ترتيب الأولويات",
    ],
    figure: {
      src: "/images/process-3.png",
      alt: "عرض خطة مشروع أمام فريق في قاعة اجتماعات",
      shape: "rect",
      left: 100,
      top: 185,
      size: 350,
      boxW: 407.491,
      boxH: 272,
      cropX: -0.05,
      cropY: -30.34,
      cropW: 100.1,
      cropH: 130.34,
    },
  },
  {
    title: "4.  نبني",
    text: "نبدأ في تصميم وتطوير الحل، مع مراجعات مستمرة لضمان أن كل جزء يخدم الهدف الأساسي للمشروع.",
    bullets: [
      "التصميم والتطوير",
      "بناء النماذج الأولية",
      "التكامل بين الأنظمة",
      "مراجعات واختبارات مستمرة",
    ],
    figure: {
      src: "/images/process-4.png",
      alt: "مراجعة نماذج الشاشات على شاشة كبيرة أثناء التطوير",
      shape: "diamond",
      left: 100,
      top: 80,
      size: 494.975,
      stageX: -279.67,
      stageY: -279.67,
      stageSize: 938.331,
      boxW: 792,
      boxH: 535,
      cropX: -9.84,
      cropY: -20.55,
      cropW: 109.73,
      cropH: 141.12,
    },
  },
  {
    title: "5.  نطلق",
    text: "نختبر التجربة بالكامل، نجهز الحل للتشغيل، ثم نطلقه بصورة مستقرة وجاهزة للاستخدام.",
    bullets: [
      "اختبار الجودة والأداء",
      "تجهيز الإطلاق",
      "نقل وتشغيل الأنظمة",
      "تدريب الفريق عند الحاجة",
    ],
    figure: {
      src: "/images/process-5.png",
      alt: "عرض لوحة إطلاق المنتج ومؤشرات الأداء",
      shape: "rect",
      left: 100,
      top: 201,
      size: 350,
      boxW: 400,
      boxH: 272,
      cropX: -4.49,
      cropY: -0.04,
      cropW: 104.46,
      cropH: 120.46,
    },
  },
  {
    title: "6.  نطور",
    text: "بعد الإطلاق نتابع الأداء والنتائج، ونحدد فرص التطوير والتحسين مع نمو المشروع.",
    bullets: [
      "متابعة الأداء",
      "تحليل النتائج",
      "تحسين التجربة",
      "تطوير الحل مع نمو الأعمال",
    ],
    figure: {
      src: "/images/process-1.png",
      alt: "فريق يناقش مخطط عمل على لوحة",
      shape: "diamond",
      left: 100,
      top: 92,
      size: 494.975,
      stageX: -257.04,
      stageY: -240.07,
      stageSize: 836.507,
      boxW: 704,
      boxH: 479,
      cropX: -4.15,
      cropY: -11.9,
      cropW: 111.35,
      cropH: 142.07,
    },
  },
];

/** Star travel, in artboard px: it starts at y=33 and walks the 509px rail. */
const STAR_TOP_START = 33;
const STAR_TRAVEL = 450;
const AUTOPLAY_MS = 4200;

/** The rail is only drawn from this width up, so only here does scroll drive it. */
const SCROLL_DRIVEN = "(min-width: 1025px)";

const rem = (px: number) => `${px / 10}rem`;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function Process() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scrollDriven, setScrollDriven] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    once: false,
  });

  useEffect(() => {
    const query = window.matchMedia(SCROLL_DRIVEN);
    const sync = () => setScrollDriven(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* Desktop: the timeline is pinned for the length of the track, and the
     scrolled fraction of that track *is* the walk down the rail — the star
     glides with the wheel while the copy swaps once per step. */
  useEffect(() => {
    if (!scrollDriven) return;
    const node = track.current;
    if (!node) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const { top, height } = node.getBoundingClientRect();
      const span = height - window.innerHeight;
      const walked = span > 0 ? clamp01(-top / span) : 0;
      setProgress(walked);
      setIndex(Math.min(STEPS.length - 1, Math.floor(walked * STEPS.length)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollDriven]);

  /* Below the rail's breakpoint there is nothing to walk, so the steps cycle
     on their own while the stack is on screen and the dots stay in charge. */
  useEffect(() => {
    if (scrollDriven || !inView) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % STEPS.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [scrollDriven, inView]);

  const walked = scrollDriven ? progress : index / (STEPS.length - 1);
  const step = STEPS[index];

  return (
    <section id="process" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headCopy}>
            <Reveal as="h2" className={styles.title}>
              من التحدي إلى حل جاهز للنمو
            </Reveal>
            <Reveal as="p" className={styles.subtitle} delay={120}>
              نعمل بخطوات واضحة تبدأ بفهم أعمالك وتنتهي بحل قابل للتطوير{" "}
            </Reveal>
          </div>
          <Reveal delay={240}>
            <Button8>ابدء مشروعك معنا</Button8>
          </Reveal>
        </div>

        {/* One viewport of pin plus a dwell per remaining step. */}
        <div
          ref={track}
          className={styles.track}
          style={{ "--dwells": STEPS.length - 1 } as CSSProperties}
        >
          <div className={styles.sticky}>
            <div ref={ref} className={styles.timeline}>
              <div className={styles.rail} />

              <div
                className={styles.star}
                style={{ top: rem(STAR_TOP_START + walked * STAR_TRAVEL) }}
              >
                <Image
                  className={styles.starSpin}
                  src="/icons/star.svg"
                  alt=""
                  width={82}
                  height={82}
                  aria-hidden
                />
              </div>

              {/* All six are mounted so the swap is a cross-fade, not a load. */}
              {STEPS.map((item, figureIndex) => {
                const figure = item.figure;
                const isActive = figureIndex === index;
                const picture = (
                  <div
                    className={styles.figureCrop}
                    style={
                      {
                        "--box-w": rem(figure.boxW),
                        "--box-h": rem(figure.boxH),
                        "--crop-x": `${figure.cropX}%`,
                        "--crop-y": `${figure.cropY}%`,
                        "--crop-w": `${figure.cropW}%`,
                        "--crop-h": `${figure.cropH}%`,
                      } as CSSProperties
                    }
                  >
                    <Image
                      src={figure.src}
                      alt={isActive ? figure.alt : ""}
                      width={Math.round(figure.boxW)}
                      height={Math.round(figure.boxH)}
                      aria-hidden={isActive ? undefined : true}
                    />
                  </div>
                );

                return (
                  <div
                    key={item.title}
                    className={[
                      styles.figure,
                      figure.shape === "diamond"
                        ? styles.figureDiamond
                        : styles.figureRect,
                      isActive && styles.figureActive,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={
                      {
                        "--fig-x": rem(figure.left),
                        "--fig-y": rem(figure.top),
                        "--fig-size": rem(figure.size),
                        "--stage-x": rem(figure.stageX ?? 0),
                        "--stage-y": rem(figure.stageY ?? 0),
                        "--stage-size": rem(figure.stageSize ?? figure.size),
                      } as CSSProperties
                    }
                  >
                    {figure.shape === "diamond" ? (
                      <div className={styles.tilt}>
                        <div className={styles.window}>
                          <div className={styles.stage}>
                            <div className={styles.untilt}>{picture}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      picture
                    )}
                  </div>
                );
              })}

              <div key={index} className={`${styles.step} ${styles.stepEnter}`}>
                <div className={styles.stepCopy}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepText}>{step.text}</p>
                </div>

                <ul className={styles.bullets}>
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className={styles.bullet}>
                      <Image
                        className={styles.bulletDot}
                        src="/icons/dot.svg"
                        alt=""
                        width={10}
                        height={10}
                        aria-hidden
                      />
                      <span className={styles.bulletText}>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.mobileDots}>
                {STEPS.map((item, dotIndex) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={item.title}
                    className={[
                      styles.dotButton,
                      dotIndex === index && styles.dotActive,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => setIndex(dotIndex)}
                  >
                    <span />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
