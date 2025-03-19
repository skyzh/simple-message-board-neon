"use client";

import { AuthButton } from "@/components/AuthButton";
import { Message, MessageBoardContent } from "@/components/MessageBoardContent";
import { getMessages } from "@/lib/actions";
import { useUser } from "@stackframe/stack";
import { useState, useEffect } from "react";
export default function Home() {
  const user = useUser();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (user) {
        const token = await user.getAuthJson();
        const messages = await getMessages(token?.accessToken || undefined);
        setMessages(messages as Message[]);
      }
    };
    fetchMessages();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-gray-900">Message Board</h1>
              <span className="inline-flex items-center py-0.5 text-xs font-medium text-gray-500">
                powered by
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Neon
              </span>
            </div>
            <div className="flex items-center">
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <MessageBoardContent initialMessages={messages} />
        </div>
      </main>
    </div>
  );
}
