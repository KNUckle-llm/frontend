"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ServiceIntroSection from "@/app/entities/intro/ServiceIntroSection";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleCTAClick = () => {
    router.push("/");
  };

  return (
    <>
      <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
        {/* Gradient orbs */}
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Main content */}
        <div className="py-10 flex-1 flex flex-col justify-center items-center text-center px-6 md:px-10 z-10 relative max-w-6xl mx-auto">
          {/* Main heading with animated gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 tracking-tight">
            공주대의
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                모든 것
              </span>
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-50" />
            </span>
            을
            <br />
            AI가 답변합니다
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/60 mb-14 max-w-2xl font-light">
            KNUckle AI와 함께 학교생활의 <br className="sm:hidden" />
            모든 궁금증을 해결하세요
          </p>

          {/* CTA Button with hover effect */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow" />
            <button
              onClick={handleCTAClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="cursor-pointer relative px-10 md:px-14 py-3 md:py-4 bg-white text-black rounded-full text-base md:text-lg font-bold transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <span>지금 시작하기</span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 ">
            <div className="animate-bounce w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll" />
            </div>
            <p
              className={
                "left-1/2 -translate-x-1/2 absolute w-60 text-white/50 text-sm mt-2"
              }
            >
              스크롤해서 더 많은 정보를 확인하세요
            </p>
          </div>
        </div>
      </div>

      <ServiceIntroSection />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(12px);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
};

export default LandingPage;
