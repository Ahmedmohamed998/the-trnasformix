"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Faq.module.css";

type FaqEntry = {
  number: string;
  question: string;
  answer: string;
};

/* NOTE: only the first item is drawn expanded on the artboard, so it is the
   only one whose answer copy exists in Figma. The remaining three carry
   stand-in answers — replace them with the final copy. */
const ITEMS: FaqEntry[] = [
  {
    number: "01",
    question: "هل يمكن أن يحتاج مشروعي أكثر من خدمة؟",
    answer:
      "نعم. كثير من المشاريع تحتاج مزيجًا من التقنية، البيانات، التصميم والأنظمة، لذلك نكوّن الحل حسب احتياج المشروع وليس حسب خدمة واحدة.",
  },
  {
    number: "02",
    question: "كيف أعرف أي حل مناسب لي؟",
    answer:
      "نبدأ بجلسة قصيرة نفهم فيها أهدافك وتحدياتك الحالية، ثم نقترح المسار والخدمات الأنسب لمشروعك قبل أي التزام.",
  },
  {
    number: "03",
    question: "هل تعملون على تطوير أنظمة موجودة بالفعل؟",
    answer:
      "نعم. نراجع الأنظمة القائمة، نحدد فرص التحسين، ونطوّرها أو نربطها بأنظمة أخرى دون الحاجة إلى إعادة البناء من الصفر.",
  },
  {
    number: "04",
    question: "هل تقدمون حلولًا مخصصة؟",
    answer:
      "نعم. نصمم كل حل حول احتياج حقيقي وهدف واضح، سواء كان نظامًا داخليًا، تجربة رقمية أو حلًا مبنيًا على الذكاء الاصطناعي.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.panel}>
        <div className={styles.container}>
          <div className={styles.head}>
            <div className={styles.spacer} />
            <Reveal as="h2" className={styles.title}>
              إجابات واضحة على أسئلتك
            </Reveal>
          </div>

          <div className={styles.list}>
            <div className={styles.listInner}>
              {ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={item.number}
                    className={[styles.item, isOpen && styles.itemOpen]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <button
                      type="button"
                      className={styles.trigger}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.number}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className={styles.question}>
                        <span className={styles.number}>{item.number}</span>
                        <span className={styles.questionText}>
                          {item.question}
                        </span>
                      </span>

                      <span className={styles.marker}>
                        <span className={styles.markerCircle}>
                          <Image
                            className={styles.markerIcon}
                            src={
                              isOpen
                                ? "/icons/faq-minus.svg"
                                : "/icons/faq-plus.svg"
                            }
                            alt=""
                            width={14}
                            height={14}
                            aria-hidden
                          />
                        </span>
                      </span>
                    </button>

                    <div
                      id={`faq-answer-${item.number}`}
                      className={[styles.answer, isOpen && styles.answerOpen]
                        .filter(Boolean)
                        .join(" ")}
                      role="region"
                    >
                      <div className={styles.answerInner}>
                        <p className={styles.answerText}>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
