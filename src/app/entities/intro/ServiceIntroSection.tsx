"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ServiceIntroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const demoQuestion =
    "공주대학교 컴퓨터공학과의 교육과정은 어떻게 구성되어 있나요?";
  const demoResponse =
    "공주대학교 컴퓨터공학과는 4년제 학부과정으로 운영되며, 프로그래밍 기초부터 고급 소프트웨어 개발, 인공지능, 데이터사이언스까지 체계적인 교육과정을 제공합니다.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setIsTyping(true);
          }, 1000);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= demoResponse.length) {
        setTypedText(demoResponse.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isTyping]);

  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "정확한 답변",
      description:
        "공주대학교 공식 데이터를 바탕으로 신뢰할 수 있는 정보를 제공합니다.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "빠른 응답",
      description: "최신 LLM 기술로 몇 초 내에 원하는 답변을 받을 수 있습니다.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "출처 명시",
      description:
        "모든 답변에 공식 홈페이지 등 정확한 출처가 함께 제공됩니다.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      title: "상세 검색",
      description:
        "학과, 교육과정, 입학정보 등 다양한 정보를 상세하게 검색합니다.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black py-32 px-6 md:px-10 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-white/80">
              How It Works
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            공주대학교 정보를
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              똑똑하게
            </span>{" "}
            찾아보세요
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            궁금한 것을 물어보면 AI가 정확한 출처와 함께 빠르게 알려드립니다
          </p>
        </div>

        {/* Demo Section */}
        <div className="mb-32 max-w-4xl mx-auto">
          {/* Question */}
          <div className="relative group mb-6">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  Q
                </div>
                <p className="text-white text-lg md:text-xl leading-relaxed pt-2">
                  {demoQuestion}
                </p>
              </div>
            </div>
          </div>

          {/* Answer */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20" />
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                  {!isTyping && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  {!isTyping ? (
                    <div className="flex items-center gap-3">
                      <span className="text-white/60">
                        AI가 답변을 생성하고 있습니다
                      </span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white text-lg md:text-xl leading-relaxed mb-6">
                        {typedText}
                        {typedText.length < demoResponse.length && (
                          <span className="inline-block w-0.5 h-6 bg-purple-400 ml-1 animate-blink" />
                        )}
                      </p>
                      {typedText.length >= demoResponse.length && (
                        <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-3">
                            <svg
                              className="w-5 h-5 text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <p className="text-blue-400 font-semibold">
                              출처 정보
                            </p>
                          </div>
                          <ul className="text-white/70 space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>
                                공주대학교 공식 홈페이지 - 컴퓨터공학과 소개
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>2024학년도 교육과정 안내서</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>컴퓨터공학과 학과사무실 공지사항</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-24">
          <h3 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            왜 선택해야 할까요?
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}
                />
                <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
                  <div className="text-white mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500" />
            <Link
              href="/"
              className="relative block px-12 py-5 bg-white text-black rounded-full text-lg font-bold transition-all duration-300 hover:scale-105"
            >
              지금 질문하기
            </Link>
          </div>
          <p className="text-white/50 mt-6 text-lg">
            공주대학교에 대한 모든 궁금증을 해결해보세요
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ServiceIntroSection;
