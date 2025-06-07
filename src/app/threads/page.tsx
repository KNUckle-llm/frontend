"use client";

import React from "react";
import { Search, MoreHorizontal, Plus, Clock, Book } from "lucide-react";
import Header from "@/app/entities/common/Header";
import Link from "next/link";
import useDataFetch, {
  useDataFetchConfig,
} from "@/app/hooks/common/useDataFetch";
import SVGLoadingSpinner from "@/app/entities/loading/SVGLoadingSpinner";
import { Session } from "@/app/lib/types/thread";
import { exampleSessions } from "@/app/threads/data";

const LibraryPage = () => {
  const serverURL = process.env.NEXT_PUBLIC_AI_SERVER_URL;

  const config: useDataFetchConfig = {
    url: `${serverURL}/chat/sessions`,
    method: "GET",
    config: {
      params: {
        limit: 10,
      },
    },
  };

  const {
    data: data,
    loading,
    error,
  } = useDataFetch<{ sessions: Session[] }>(config);

  const sessions = data?.sessions || exampleSessions;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SVGLoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className={"max-w-4xl mx-auto flex items-center justify-between  "}>
        <Header
          title={"라이브러리"}
          subTitle={"이전에 나눈 대화를 모아보세요"}
          icon={<Book size={20} />}
        />
        <div className="relative w-80 flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="스레드 검색..."
          />
        </div>
      </div>

      {/* 탭 바 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <button className="px-4 py-3 text-sm font-medium text-gray-800 border-b-2 border-gray-800">
                스레드
              </button>
            </div>
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <MoreHorizontal size={18} />
              </button>
              <button className="p-2 ml-1 text-gray-500 hover:bg-gray-100 rounded-full">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {data &&
            sessions.map((session) => (
              <Link
                href={"/search/" + session.session_id}
                key={session.session_id}
                className="w-full h-full bg-white "
              >
                <div className="p-4 border border-gray-200 rounded-lg  overflow-hidden hover:shadow-sm transition-shadow duration-200">
                  <h2 className="text-base font-medium text-gray-900 mb-1">
                    {session.first_message}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {session.last_message}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>
                        {session.last_activity ||
                          new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </main>
    </div>
  );
};

export default LibraryPage;
