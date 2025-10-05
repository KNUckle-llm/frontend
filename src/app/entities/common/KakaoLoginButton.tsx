"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const KakaoLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("kakao", { callbackUrl: "/" });
    } catch (error) {
      console.error("로그인 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className={`w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors bg-[#FEE500]`}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
      ) : (
        <>
          <Image
            src="/assets/kakao.svg"
            width={24}
            height={24}
            alt="카카오 로고"
          />
          <span className="text-sm font-medium text-neutral-700">
            카카오로 계속하기
          </span>
        </>
      )}
    </button>
  );
};

export default KakaoLoginButton;
