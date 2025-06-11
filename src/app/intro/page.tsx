"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ServiceIntroSection from "@/app/entities/intro/ServiceIntroSection";

const LandingPage: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    // 파티클 생성
    const createParticles = () => {
      if (!particlesRef.current) return;

      const particleCount = 50;
      particlesRef.current.innerHTML = "";

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute bg-white/30 rounded-full pointer-events-none animate-particle-float";

        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;

        particlesRef.current.appendChild(particle);
      }
    };

    // 마우스 움직임에 따른 글로우 효과
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;

      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      glowRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)`;
    };

    createParticles();
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleCTAClick = () => {
    router.push("/");
  };

  const languages = ["한국", "EN", "日本"];

  return (
    <>
      <div className="relative h-screen bg-gradient-to-br from-[#2A2D47] via-[#1F1F3A] to-[#0F0F23] overflow-hidden flex flex-col">
        {/* 배경 효과들 */}
        {/* 글로우 효과 */}
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* 구름 애니메이션 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="cloud cloud1 animate-float"></div>
          <div className="cloud cloud2 animate-float"></div>
          <div className="cloud cloud3 animate-float"></div>
        </div>

        {/* 파티클 효과 */}
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

        {/* 메인 콘텐츠 */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-10 z-10 relative">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6 md:mb-10 drop-shadow-2xl tracking-tight animate-fade-in-up">
            공주대의 모든 것을 알려주는 LLM
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight drop-shadow-xl tracking-tight animate-fade-in-up-delayed">
            KNUckle <strong className="font-black">AI</strong>
          </h2>

          <div className="mt-10 md:mt-15 animate-fade-in-up-delayed-2">
            <button
              onClick={handleCTAClick}
              className="bg-white text-orange-500 px-8 md:px-10 py-4 md:py-5 border-none rounded-full text-lg font-bold cursor-pointer transition-all duration-300 shadow-2xl hover:-translate-y-1 hover:shadow-3xl hover:bg-gray-50"
            >
              지금 시작하기
            </button>
          </div>
        </div>
      </div>
      <ServiceIntroSection />
    </>
  );
};

export default LandingPage;
