"use client";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

const SettingsPage = () => {
  const [nickname, setNickname] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");

  return (
    <div className="flex h-screen bg-white">
      {/* 설정 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 상단 헤더 */}
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center">
            <button className="w-8 h-8 flex items-center justify-center mr-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">설정</h1>
          </div>
        </div>

        {/* 설정 컨텐츠 */}
        <div className="flex-1 overflow-auto p-6 max-w-3xl mx-auto w-full">
          <div className="space-y-8">
            {/* 프로필 설정 섹션 */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-800">프로필 설정</h2>
              <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="nickname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    닉네임
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="KNUckle이 당신을 어떻게 부를까요?"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    대화 중 KNUckle이 사용할 당신의 호칭을 설정하세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 시스템 프롬프트 설정 섹션 */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-800">
                시스템 프롬프트
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="systemPrompt"
                    className="block text-sm font-medium text-gray-700"
                  >
                    기본 시스템 프롬프트
                  </label>
                  <textarea
                    id="systemPrompt"
                    className="w-full p-3 border border-gray-200 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="KNUckle에게 기본적인 지시사항을 입력하세요..."
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    모든 대화에 적용될 시스템 프롬프트를 설정하세요. KNUckle의
                    기본 성향과 답변 방식을 정의합니다.
                  </p>
                </div>

                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                    저장하기
                  </button>
                </div>
              </div>
            </div>

            {/* 예시 프롬프트 템플릿 섹션 */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-800">
                프롬프트 템플릿
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    자주 사용하는 프롬프트 템플릿
                  </p>

                  <div className="p-3 border border-gray-200 bg-white rounded-md cursor-pointer hover:bg-gray-50">
                    <p className="font-medium">친절한 도우미</p>
                    <p className="text-sm text-gray-500 truncate">
                      당신은 친절하고 도움이 되는 AI 비서입니다...
                    </p>
                  </div>

                  <div className="p-3 border border-gray-200 bg-white rounded-md cursor-pointer hover:bg-gray-50">
                    <p className="font-medium">코딩 어시스턴트</p>
                    <p className="text-sm text-gray-500 truncate">
                      당신은 코딩을 도와주는 프로그래밍 전문가입니다...
                    </p>
                  </div>

                  <div className="p-3 border border-gray-200 bg-white rounded-md cursor-pointer hover:bg-gray-50">
                    <p className="font-medium">+ 새 템플릿 추가</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
