// types.ts
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: Date;
  attachments?: Attachment[];
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
