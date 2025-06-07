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

export interface Session {
  session_id: string;
  message_count: number;
  first_message: string;
  last_message: string;
  last_activity: number;
}
