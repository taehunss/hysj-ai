import React, { useEffect, useRef, useState } from "react";
import { useChatSocket } from "../hook/useChatSocket";
import {
  AvatarCircle,
  Backdrop,
  Card,
  ChatListCard,
  CTA,
  HamburgerButton,
  Header,
  HeaderContent,
  InputBar,
  IntroTitle,
  Logo,
  Main,
  MessageBubble,
  NewChatButton,
  Page,
  Row,
  SendButton,
  Sidebar,
  SidebarSection,
  TextInput,
} from "./ChatRoom.style";

const ChatRoom: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChatSocket();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    sendMessage(text);
  };
  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const closeSidebar = () => setSidebarOpen(false);
  return (
    <Page>
      <Sidebar open={sidebarOpen}>
        <NewChatButton>+ NEW CHAT</NewChatButton>
        <SidebarSection>
          <Row>
            <AvatarCircle>?</AvatarCircle>
            <strong>○○일주</strong>
          </Row>
        </SidebarSection>
        <SidebarSection>
          <strong>최근대화내역</strong>
        </SidebarSection>
        <SidebarSection>마이페이지</SidebarSection>
        <SidebarSection>한양사주의 다른 서비스</SidebarSection>
        <SidebarSection>설정 및 도움말</SidebarSection>
      </Sidebar>

      <Header>
        <HamburgerButton onClick={toggleSidebar} aria-label="open sidebar">
          ☰
        </HamburgerButton>
        <HeaderContent>
          <Logo src="/hysj-logo.png" alt="hysj logo" />
          <h3>안녕하세요. 한양사주 AI 입니다.</h3>
        </HeaderContent>
      </Header>
      <Backdrop open={sidebarOpen} onClick={closeSidebar} />

      <Main>
        {messages.length === 0 ? (
          <Card>
            <IntroTitle>내 사주가 궁금하다면?</IntroTitle>
            <CTA>생년월일 입력하러 가기 〉</CTA>
          </Card>
        ) : (
          <ChatListCard>
            {messages.map((m, idx) => (
              <MessageBubble key={idx} isUser={m.role === "user"}>
                {m.text}
              </MessageBubble>
            ))}
            <div ref={bottomRef} />
          </ChatListCard>
        )}
      </Main>

      <InputBar
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <TextInput
          placeholder="한양사주에게 물어보기"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <SendButton type="submit">〉</SendButton>
      </InputBar>
    </Page>
  );
};

export default ChatRoom;
