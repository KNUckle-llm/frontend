"use client";

import React, { useEffect, useRef, useState } from "react";

import { Goal, Search, Zap, BookOpen } from "lucide-react";
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
          // 2초 후 타이핑 시작
          setTimeout(() => {
            setIsTyping(true);
          }, 2000);
        }
      },
      { threshold: 0.3 },
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
    }, 50);

    return () => clearInterval(interval);
  }, [isTyping]);

  const features = [
    {
      icon: <Goal />,
      title: "정확한 답변",
      description:
        "공주대학교 공식 데이터를 바탕으로 정확하고 신뢰할 수 있는 정보를 제공합니다.",
    },
    {
      icon: <Zap />,
      title: "빠른 응답",
      description:
        "최신 LLM 기술을 활용하여 몇 초 내에 원하는 답변을 받을 수 있습니다.",
    },
    {
      icon: <BookOpen />,
      title: "출처 명시",
      description:
        "모든 답변에는 공식 홈페이지, 학과 정보 등 정확한 출처가 함께 제공됩니다.",
    },
    {
      icon: <Search />,
      title: "상세 검색",
      description:
        "학과, 교육과정, 입학정보, 학사일정 등 다양한 정보를 상세하게 검색할 수 있습니다.",
    },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        className="min-h-screen bg-gradient-to-b from-[#0F0F23] via-[#1F1F3A] to-[#2A2D47] py-20 px-6 md:px-10 relative overflow-hidden"
      >
        {/* 배경 데코레이션 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF4E45] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF4E45] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* 헤더 섹션 */}
          <div
            className={`text-center mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              공주대학교 정보를
              <br />
              <span className="text-[#FF4E45]">똑똑하게</span> 찾아보세요
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              궁금한 것을 물어보면 AI가 공주대학교의 모든 정보를
              <br />
              정확한 출처와 함께 빠르게 알려드립니다.
            </p>
          </div>

          {/* 데모 섹션 */}
          <div
            className={`mb-20 ${isVisible ? "animate-slide-in-left" : "opacity-0"} delay-200`}
          >
            <div className="max-w-4xl mx-auto">
              {/* 질문 박스 */}
              <div className="gradient-border mb-8">
                <div className="gradient-border-inner p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#FF4E45] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      Q
                    </div>
                    <p className="text-white text-lg md:text-xl leading-relaxed">
                      {demoQuestion}
                    </p>
                  </div>
                </div>
              </div>

              {/* 응답 박스 */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FF4E45] to-[#E63946] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 animate-float-gentle">
                    AI
                  </div>
                  <div className="flex-1">
                    {!isTyping ? (
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>AI가 답변을 생성하고 있습니다</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-[#FF4E45] rounded-full animate-pulse-dot"></div>
                          <div
                            className="w-2 h-2 bg-[#FF4E45] rounded-full animate-pulse-dot"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-[#FF4E45] rounded-full animate-pulse-dot"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p
                          className={`text-white text-lg md:text-xl leading-relaxed mb-4 ${isTyping ? "typing-cursor" : ""}`}
                        >
                          {typedText}
                        </p>
                        {typedText.length >= demoResponse.length && (
                          <div className="mt-4 p-4 bg-[#FF4E45]/10 border border-[#FF4E45]/30 rounded-lg">
                            <p className="text-[#FF4E45] font-semibold text-sm mb-2">
                              📚 출처 정보
                            </p>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>
                                • 공주대학교 공식 홈페이지 - 컴퓨터공학과 소개
                              </li>
                              <li>• 2024학년도 교육과정 안내서</li>
                              <li>• 컴퓨터공학과 학과사무실 공지사항</li>
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

          {/* 기능 소개 */}
          <div
            className={`${isVisible ? "animate-fade-in-up" : "opacity-0"} delay-500`}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              왜 우리 서비스를 선택해야 할까요?
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <div
                    className="text-4xl mb-4 flex justify-center text-white animate-float-gentle"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA 섹션 */}
          <div
            className={`text-center mt-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"} delay-1000`}
          >
            <Link
              href={"/"}
              className="block w-1/3 mx-auto bg-[#FF4E45] hover:bg-[#E63946] text-white px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:scale-105 mb-2"
            >
              지금 질문하기
            </Link>
            <p className="text-gray-400 mt-4">
              공주대학교에 대한 모든 궁금증을 해결해보세요!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceIntroSection;
