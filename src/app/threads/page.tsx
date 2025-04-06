import React from "react";
import { Search, MoreHorizontal, Plus, Clock, Book } from "lucide-react";
import Header from "@/app/entities/common/Header";

const LibraryPage = () => {
  // 샘플 게시글 데이터
  const posts = [
    {
      id: 3,
      title:
        "nextjs 공식문서에는 public 폴더에 있는 정적 에셋들은 /image.png 이런식으로 접근 가능하다는데...",
      content:
        "Next.js 공식 문서에 따르면, public 폴더에 있는 정적 애셋은 루트 경로(/)를 기준으로 접근할 수 있습니다. 예를 들어, public/image.png 파일은 브라우저에서 /image.png로 접근할 수 있어야 합니다. 하지만 해당 방식이 작동하지 않는 경우가 있을 수 있습니다. 이는 주로 Next.js의 설정이나 환경에 따른 문제일 수 있습니다.",
      timestamp: "2025년 4월 4일",
    },

    {
      id: 5,
      title: "개발자를 위한 디자인 시스템 적용 방법",
      content:
        "디자인 시스템은 제품의 일관성을 유지하고 개발 속도를 높이는 데 중요한 역할을 합니다. 이 글에서는 개발자 관점에서 디자인 시스템을 효과적으로 프로젝트에 적용하는 방법과 주의사항을 다룹니다. 컴포넌트 기반 아키텍처와 디자인 시스템의 통합 방법, 스타일 가이드 활용법 등을 포함합니다.",
      timestamp: "2025년 4월 3일",
    },
    {
      id: 6,
      title: "TypeScript에서 유용한 타입 추론 패턴",
      content:
        "타입스크립트의 강력한 기능 중 하나는 타입 추론입니다. 이 글에서는 복잡한 타입을 효과적으로 추론하고 활용하는 다양한 패턴에 대해 알아봅니다. 제네릭, 조건부 타입, 인터섹션 타입 등을 활용한 실제 사례와 함께 코드 품질을 높이는 방법을 소개합니다.",
      timestamp: "2025년 4월 2일",
    },
  ];

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
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow duration-200"
            >
              <div className="p-4">
                <h2 className="text-base font-medium text-gray-900 mb-1">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {post.content}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>{post.timestamp}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LibraryPage;
