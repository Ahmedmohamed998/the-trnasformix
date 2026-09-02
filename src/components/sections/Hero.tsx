import { Button8 } from "@/components/ui/Button8";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.copy}>
          <Reveal as="h1" className={styles.title}>
            نبني حلولًا رقمية تساعد أعمالك على النمو
          </Reveal>
          <Reveal as="p" className={styles.subtitle} delay={120}>
            نجمع بين البيانات والذكاء الاصطناعي، التصميم، تطوير التجارب الرقمية
            وأنظمة الأعمال لنحوّل تحدياتك إلى حلول عملية تساعدك على العمل بكفاءة
            أكبر والنمو بشكل أوضح.
          </Reveal>
        </div>
        <Reveal delay={240}>
          <Button8>ابدء مشروعك معنا</Button8>
        </Reveal>
      </div>

      {/* The complete showreel is contained inside the hero band. Muted and
          inline so it may autoplay; the band's gradient shows through until
          the first frame decodes, which is why there is no poster. */}
      <div className={styles.video}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-label="عرض أعمال Transformix"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
