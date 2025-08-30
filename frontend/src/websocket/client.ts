import { io, Socket } from "socket.io-client";

export type ChatEvent = { message: string };

export interface ChatSocketOptions {
  url?: string; // ex) http://localhost:3333/ws
  path?: string; // default: /socket.io
}

export type ChatCallbacks = {
  onConnect?: (id: string) => void;
  onDelta?: (delta: string) => void;
  onResponse?: (message: string) => void;
  onError?: (message: string) => void;
  onDisconnect?: (reason: string) => void;
};

class ChatSocketClient {
  private socket: Socket | null = null;
  private opts: Required<ChatSocketOptions> = {
    url:
      (import.meta as any)?.env?.VITE_WS_URL ||
      "http://192.168.219.101:3333/ws",
    path: "/socket.io",
  };

  connect(callbacks?: ChatCallbacks) {
    if (this.socket && this.socket.connected) return this.socket;
    const socket = io(this.opts.url, {
      path: this.opts.path,
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socket.on("connect", () => callbacks?.onConnect?.(socket.id ?? ""));
    socket.on("chat:delta  ", (data: string) => callbacks?.onDelta?.(data));
    socket.on("chat:response", (data: { message: string }) => {
      callbacks?.onResponse?.(data?.message);
      // 응답 완료 시 연결 종료 요구사항
      this.disconnect();
    });
    socket.on("chat:error", (msg: string) => callbacks?.onError?.(msg));
    socket.on("connect_error", (err: any) =>
      callbacks?.onError?.(err?.message ?? String(err))
    );
    socket.on("disconnect", (reason: string) =>
      callbacks?.onDisconnect?.(reason)
    );

    this.socket = socket;
    return socket;
  }

  emitChat(payload: ChatEvent) {
    if (!this.socket) throw new Error("Socket not connected");
    this.socket.emit("event", { event: "chat", payload });
  }

  disconnect() {
    try {
      this.socket?.disconnect();
    } finally {
      this.socket = null;
    }
  }

  isConnected() {
    return !!this.socket && this.socket.connected;
  }
}

export const chatSocketClient = new ChatSocketClient();
