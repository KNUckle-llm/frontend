// types.ts
export interface Message {
  id: string;
  session_id: string;
  content: string;
  message_type: "human" | "ai";
  createdAt: Date;
  timestamp: string;
  additional_data?: Record<string, any>;
}

export interface Attachment {
  id: string;
  type: "image" | "file" | "code";
  url: string;
  name?: string;
}

export interface Thread {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
  metadata?: Record<string, any>;
}
