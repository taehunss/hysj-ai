import { useEffect, useState } from "react";
import { chatSocketClient } from "../../websocket/client";

export type ChatMessage = { role: "user" | "ai"; text: string };

export function useChatSocket() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    chatSocketClient.connect({
      onConnect: () => setIsConnected(true),
      onDelta: (delta) => {
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === "ai") {
            const next = [...prev];
            next[next.length - 1] = { role: "ai", text: last.text + delta };
            return next;
          }
          return [...prev, { role: "ai", text: delta }];
        });
      },
      onResponse: () => {},
      onError: (msg) => {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: `[error] ${msg}` },
        ]);
      },
      onDisconnect: () => setIsConnected(false),
    });
  }, []);

  const sendMessage = (text: string) => {
    // 전송 전 연결이 끊겨 있다면 재연결
    if (!chatSocketClient.isConnected()) {
      chatSocketClient.connect({
        onConnect: () => setIsConnected(true),
        onDelta: (d) =>
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last && last.role === "ai") {
              const next = [...prev];
              next[next.length - 1] = { role: "ai", text: last.text + d };
              return next;
            }
            return [...prev, { role: "ai", text: d }];
          }),
        onResponse: () => setIsConnected(false),
        onError: (msg) =>
          setMessages((prev) => [
            ...prev,
            { role: "ai", text: `[error] ${msg}` },
          ]),
        onDisconnect: () => setIsConnected(false),
      });
    }
    const message = text.trim();
    if (!message) return;
    setMessages((prev) => [...prev, { role: "user", text: message }]);
    try {
      chatSocketClient.emitChat({ message });
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `[error] 소켓 미연결` },
      ]);
    }
  };

  const reset = () => setMessages([]);

  return { messages, sendMessage, isConnected, reset } as const;
}
