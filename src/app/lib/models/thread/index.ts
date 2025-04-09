// MongoDB 스키마 (mongoose 사용 시)
import mongoose, { Schema, Document } from "mongoose";
import { Attachment, Message, Thread } from "@/app/lib/types/thread";

const AttachmentSchema = new Schema({
  type: { type: String, enum: ["image", "file", "code"], required: true },
  url: { type: String, required: true },
  name: { type: String },
});

const MessageSchema = new Schema({
  content: { type: String, required: true },
  role: { type: String, enum: ["user", "assistant"], required: true },
  createdAt: { type: Date, default: Date.now },
  attachments: [AttachmentSchema],
});

const ThreadSchema = new Schema({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isArchived: { type: Boolean, default: false },
  metadata: { type: Map, of: Schema.Types.Mixed },
});

export const ThreadModel =
  mongoose.models.Thread ||
  mongoose.model<Thread & Document>("Thread", ThreadSchema);

export const MessageModel =
  mongoose.models.Message ||
  mongoose.model<Message & Document>("Message", MessageSchema);

export const AttachmentModel =
  mongoose.models.Attachment ||
  mongoose.model<Attachment & Document>("Attachment", AttachmentSchema);
