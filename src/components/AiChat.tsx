"use client";

import { useState, useRef, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  id: string;
  hidden?: boolean;
}

interface Poem {
  title: string;
  slug: string;
  frontmatter: {
    title: string;
    date: Date;
  };
  content: string;
}

interface AiChatProps {
  poems: Poem[];
}

export default function AiChat({ poems }: AiChatProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messagesParent] = useAutoAnimate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const poemsData = poems
    .map((poem) => `Title: ${poem.title}\nContent:\n${poem.content}`)
    .join("\n\n---\n\n");

  const systemMessage: Message = {
    role: "system",
    content: `You are Orpheus, the legendary poet and musician from Greek mythology. You have access to all of Krish Gupta's poems. Speak in a poetic, mythological tone inspired from these very poems.

Poems Collection:
${poemsData}

This poem is your source of knowledge and vocabulary. Do not use vocabulary that can not be understood by someone who cannot read these poems. Answer concise.

Draw from this collection when discussing poetry, themes, or answering questions.`,
    id: "system",
    hidden: true,
  };

  const greetingMessage: Message = {
    role: "assistant",
    content:
      "Who dare disturb me Orpheus, himself? Oh, you seek to talk to the poems of Krish, well you've come to the right place",
    id: "greeting",
  };

  const [messages, setMessages] = useState<Message[]>([
    systemMessage,
    greetingMessage,
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      apiMessages.push({ role: "user", content: input.trim() });

      const response = await fetch("https://ai.hackclub.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: apiMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
        id: (Date.now() + 1).toString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        id: (Date.now() + 1).toString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="px-8 py-4 border-b border-zinc-800">
        <h2 className="text-2xl text-white">Chat with AI</h2>
        <p className="text-zinc-400 mt-1">
          Talk to Orpheus, about Krish's poems, poetry, literature, or life.
          Thoughts are its own and do not represent Krish, thou must remember.
        </p>
      </div>
      <div
        ref={messagesParent}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
      >
        {messages
          .filter((message) => !message.hidden)
          .map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  message.role === "user"
                    ? "bg-zinc-700 text-white ml-auto"
                    : "bg-zinc-800 text-zinc-200"
                }`}
              >
                <div className="flex items-start space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      message.role === "user" ? "bg-zinc-400" : "bg-zinc-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-400 mb-1">
                      {message.role === "user" ? "You" : "Orpheus"}
                    </p>
                    <div className="prose prose-invert prose-lg max-w-none">
                      {message.content.split("\n").map((line, index) => (
                        <p key={index} className="mb-2 last:mb-0">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-zinc-800 rounded-lg px-4 py-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full mt-2 bg-zinc-500" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-zinc-400 mb-1">
                    Orpheus
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="px-6 py-4 border-t border-zinc-800">
        <div className="flex space-x-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Press Enter to send)"
            className="flex-1 bg-zinc-800 text-white rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-600 placeholder-zinc-400 border border-zinc-700"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-zinc-700 disabled:bg-zinc-800 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors border border-zinc-600 hover:bg-zinc-900"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
