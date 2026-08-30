"use client";

import Image from "next/image";
import { CompMedia } from "@/components/ui/CompMedia";
import { Reveal } from "@/components/ui/Reveal";
import { useInView } from "@/lib/useInView";
import styles from "./AllInOne.module.css";

export function AllInOne() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.banner}>
          <Image
            className={styles.bannerPlate}
            src="/icons/tree.svg"
            alt=""
            width={1173}
            height={121}
            aria-hidden
          />
          <h2 className={styles.bannerTitle}>كل ما تحتاجة في مكان واحد</h2>
        </Reveal>

        <div className={styles.body}>
          <div
            ref={ref}
            className={[styles.diagram, inView && styles.diagramIn]
              .filter(Boolean)
              .join(" ")}
          >
            <div className={styles.diagramInner}>
              <CompMedia
                name="diagram"
                poster="/images/comp-3-1.png"
                width={639}
                height={567}
                label="مخطط يوضح تفرّع خدمات Transformix من مصدر واحد"
              />
            </div>
          </div>

          <Reveal as="p" className={styles.caption}>
            اكتشف كيف تجمع Transformix بين الإبداع والتقنية لبناء خدمات وحلول
            رقمية تساعد شركتك على النمو بثقة.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
