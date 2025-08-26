import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function YakushkinPortfolio() {
  const images = [
    "/images/photo_2025-08-22_20-29-50.webp",
    "/images/photo_2025-08-22_20-30-08.webp",
    "/images/photo_2025-08-22_20-30-18.webp",
    "/images/photo_2025-08-22_20-30-23.webp",
  ];

  const [index, setIndex] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [firstLoaded, setFirstLoaded] = useState(false);

  // Предзагрузка первой картинки для плавного появления
  useEffect(() => {
    const img = new Image();
    img.src = images[0];
    img.onload = () => setFirstLoaded(true);
  }, []);

  // Предзагрузка всех картинок
  useEffect(() => {
    let loadedCount = 0;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setAllLoaded(true);
        }
      };
    });
  }, []);

  // Переключение картинок после полной предзагрузки
  useEffect(() => {
    if (!allLoaded) return;
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, [allLoaded, images.length]);

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#1e293b",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Фоновый слайдер */}
      <AnimatePresence>
        {firstLoaded && allLoaded && (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${images[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: -1,
            }}
          />
        )}
      </AnimatePresence>

      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem 2rem",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <FadeIn>
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "0.5rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            REMKOMANDA
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "1rem",
              fontWeight: "400",
            }}
          >
             ИП Якушкин Дмитрий Олегович
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{ fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
            Профессиональные работы по отделке и демонтажу помещений
          </p>
        </FadeIn>
      </section>

      {/* About */}
      <section
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "4rem 2rem",
          backgroundColor: "rgba(255,255,255,0.8)",
          borderRadius: "1rem",
          marginBottom: "2rem",
        }}
      >
        <FadeIn>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>О нас</h2>
          <p>
            Мы — команда профессионалов, выполняющая работы по отделке и демонтажу любых помещений.
            Работаем быстро, качественно и с соблюдением всех стандартов безопасности.
          </p>
        </FadeIn>
      </section>

      {/* Contact */}
      <section
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "4rem 2rem",
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: "1rem",
          color: "#fff",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        <FadeIn>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Связаться</h2>
          <p style={{ marginBottom: "1rem" }}>
            Позвоните или напишите нам, чтобы обсудить ваш проект.
          </p>
          <p>📞 +7 953 447-12-18</p>
          <p>📧 dimayakyshkin6@mail.ru</p>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "2rem",
          fontSize: "0.875rem",
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        © {new Date().getFullYear()} REMKOMANDA. ИП Якушкин Дмитрий Олегович. Все права защищены.
      </footer>
    </div>
  );
}
