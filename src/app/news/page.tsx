import React from "react";
import { Bookmark, Share, ChevronLeft } from "lucide-react";
import Header from "@/app/entities/common/Header";

const NewsListPage = () => {
  // 샘플 뉴스 데이터
  const newsItems = [
    {
      id: 1,
      title: "프리미티브 동아리 홈페이지 개발자",
      description:
        "ABC 뉴스에 따르면,  프리미티브 개발자로 알려진 서모씨가 이번에 새로운 프로젝트에 참여한다는 소식이...",
      image: "/logo.png",
      source: "jack527",
      hasBookmark: true,
    },
    {
      id: 2,
      title: "미스크, EU와의 관계에 무역 지대 확장",
      description: "NBC 팔기자 보도에 따르면, 중 이슈로는 역측과 유럽전환...",
      image: "/images/testImage.jpg",
      source: "twentify",
      hasBookmark: false,
    },
    {
      id: 3,
      title: "인도, 논란의 여지가 있는 우루범 재심 판만 통과",
      description: "언다로리피의 이름 루스의 논쟁 패결판, 오늘 구체는 은...",
      image: "/images/testImage.jpg",

      source: "elviyard",
      hasBookmark: false,
    },
    {
      id: 4,
      title: "교황 프란치스코 경계 등장",
      description:
        "ABC 뉴스에 따르는 누스의 논쟁 에 대포면, 교황 프란치스코...",
      image: "/images/testImage.jpg",

      source: "stephenbob",
      hasBookmark: false,
    },
    {
      id: 5,
      title: "메타, 메타글땅 라마 4 출시",
      description:
        "메타는 정식발표 Llama 4 시리즈를 공개하며, 빠스터, 이미지 및 비디오 처리를 민움또롤 고급 기능으로 해당 분야를 혁신할 것으로 기대되는 본격적인 멀티모달 AI 모델을 선보였습니다...",
      image: "/images/testImage.jpg",

      source: "media_editor",
      hasBookmark: true,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 메인 컨텐츠 */}
      <div className="flex-1 overflow-hidden">
        <Header
          title={"추천"}
          subTitle={"공주대의 최근 소식을 빠르게 알아보세요"}
          icon={<ChevronLeft size={20} />}
        />

        <main className="overflow-y-auto h-[calc(100vh-57px)]">
          <div className="max-w-4xl mx-auto py-6 px-4">
            {/* 뉴스 항목들 */}
            {newsItems.map((item) => (
              <div key={item.id} className="mb-8">
                {/* 큰 이미지 뉴스 */}
                {(item.id === 1 || item.id === 5) && (
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-medium mb-2">{item.title}</h2>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-blue-500 rounded-full text-white flex items-center justify-center text-xs">
                            {item.source.charAt(0).toUpperCase()}
                          </div>
                          <span className="ml-2 text-sm text-gray-500">
                            {item.source}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Share size={16} />
                          </button>
                          <button
                            className={`${item.hasBookmark ? "text-blue-500" : "text-gray-400 hover:text-gray-600"}`}
                          >
                            <Bookmark size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* 작은 카드 뉴스 그리드 */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {newsItems.slice(1, 4).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full text-white flex items-center justify-center text-xs">
                          {item.source.charAt(0).toUpperCase()}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">
                          {item.source}
                        </span>
                      </div>
                      <button
                        className={`${item.hasBookmark ? "text-blue-500" : "text-gray-400 hover:text-gray-600"}`}
                      >
                        <Bookmark size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewsListPage;
