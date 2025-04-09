// app/auth/signin/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { ArrowLeft, Github, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Header from "@/app/entities/common/Header";
import Footer from "@/app/entities/common/Footer";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: string) => {
    try {
      setIsLoading(provider);
      await signIn(provider, { callbackUrl });
    } catch (error) {
      console.error("로그인 실패:", error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Header
        title="로그인"
        subTitle="KNUckle을 시작하기 위해 로그인해주세요"
        onBackClick={handleBack}
      />

      <div className="w-full max-w-md px-8 py-12 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/assets/logo.png"
            width={80}
            height={80}
            alt="KNUckle 로고"
            className="rounded-full bg-neutral-300 mb-4"
          />
          <h1 className="text-2xl font-light text-center mb-2">
            KNUckle에 오신 것을 환영합니다
          </h1>
          <p className="text-neutral-500 text-center text-sm">
            계정에 로그인하고 공주대의 모든 정보를 편리하게 이용하세요
          </p>
        </div>

        <div className="w-full space-y-4">
          <button
            onClick={() => handleSignIn("google")}
            disabled={!!isLoading}
            className={`w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors ${
              isLoading === "google" ? "bg-neutral-100" : "bg-white"
            }`}
          >
            {isLoading === "google" ? (
              <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-sm font-medium text-neutral-700">
                  Google로 계속하기
                </span>
              </>
            )}
          </button>

          <button
            onClick={() => handleSignIn("github")}
            disabled={!!isLoading}
            className={`w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors ${
              isLoading === "github" ? "bg-neutral-100" : "bg-white"
            }`}
          >
            {isLoading === "github" ? (
              <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
            ) : (
              <>
                <Github size={20} />
                <span className="text-sm font-medium text-neutral-700">
                  GitHub로 계속하기
                </span>
              </>
            )}
          </button>

          <button
            onClick={() => handleSignIn("email")}
            disabled={!!isLoading}
            className={`w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors ${
              isLoading === "email" ? "bg-neutral-100" : "bg-white"
            }`}
          >
            {isLoading === "email" ? (
              <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
            ) : (
              <>
                <Mail size={20} />
                <span className="text-sm font-medium text-neutral-700">
                  이메일로 계속하기
                </span>
              </>
            )}
          </button>
        </div>

        <div className="mt-8 text-xs text-center text-neutral-500">
          <p>
            계속 진행하면 KNUckle의{" "}
            <a href="#" className="underline">
              서비스 약관
            </a>
            과{" "}
            <a href="#" className="underline">
              개인정보 보호정책
            </a>
            에 동의하게 됩니다.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignInPage;
