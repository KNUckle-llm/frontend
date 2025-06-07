// 샘플 스레드 데이터
import { Session } from "@/app/lib/types/thread";

export const exampleSessions: Session[] = [
  {
    session_id: "67f669e1fdc5c857d8df3e5b",
    message_count: 5,
    first_message: "안녕하세요! 오늘은 어떤 주제로 이야기해볼까요?",
    last_message: "좋아요! 그럼 시작해볼까요?",
    last_activity: 1700000000,
  },
  {
    session_id: "67f669e1fdc5c13857d8df3e5b",
    message_count: 5,
    first_message: "오늘은 어떤 주제로 이야기해볼까요?",
    last_message: "그럼 시작해볼까요?",
    last_activity: 1700000000,
  },
  {
    session_id: "67f669e1fdc52c857d8df3e5b",
    message_count: 5,
    first_message: "안녕하세요!",
    last_message: "좋아요!",
    last_activity: 1700000000,
  },
];
