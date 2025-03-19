'use client';

import { useUser } from "@stackframe/stack";
import { MessageCard } from "./MessageCard";
import { useEffect, useState } from "react";
import { MessageForm } from "./MessageForm";

export interface Message {
  id: string | number;
  content: string;
  author_name: string;
  author_image_url?: string;
  created_at: string;
}

export function MessageBoardContent({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleMessagePosted = (newMessage: Message) => {
    setMessages([newMessage, ...messages]);
  };

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  return (
    <div className="space-y-6">
      <MessageForm onMessagePosted={handleMessagePosted} />

      <div className="space-y-4">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            author={message.author_name}
            content={message.content}
            timestamp={new Date(message.created_at).toLocaleString()}
            authorImageUrl={message.author_image_url}
          />
        ))}
      </div>
    </div>
  );
} 