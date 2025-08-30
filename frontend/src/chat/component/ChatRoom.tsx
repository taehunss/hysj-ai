import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { useAuth } from "../../context/AuthContext";
import { useChatSocket } from "../hook/useChatSocket";
import { useGetPersons } from "../hook/useGetPersons";
import { BirthInfoModal } from "./BirthInfoModal";
import {
  AvatarCircle,
  Backdrop,
  Card,
  ChatListCard,
  CTA,
  HamburgerButton,
  HamburgerButtonIcon,
  Header,
  HeaderContent,
  InputBar,
  IntroTitle,
  IntroTitle2,
  IntroTitle3,
  IntroTitle4,
  Logo,
  LogoutButton,
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
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChatSocket();
  const { persons, getPersons } = useGetPersons();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    getPersons().then((result) => {
      console.log(`result: ${JSON.stringify(result)}`);
    });
  }, [messages]);

  const onSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    sendMessage(text);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
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
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Sidebar>

      <Header>
        <HamburgerButton onClick={toggleSidebar} aria-label="open sidebar">
          <HamburgerButtonIcon />
        </HamburgerButton>
        <HeaderContent>
          <h3>새로운 채팅</h3>
        </HeaderContent>
      </Header>
      <Backdrop open={sidebarOpen} onClick={closeSidebar} />

      <Main>
        {messages.length === 0 ? (
          <Card>
            <Logo src="/hysj-logo.png" alt="hysj logo" />
            <IntroTitle>안녕하세요. 한양사주 AI 입니다.</IntroTitle>
            {persons.length > 0 ? (
              <>
                <IntroTitle3>무엇이든 물어보세요!</IntroTitle3>
              </>
            ) : (
              <CTA onClick={() => setModalOpen(true)}>
                <IntroTitle2>내 사주가 궁금하다면?</IntroTitle2>
                <br />
                <IntroTitle4>생년월일 입력하러 가기</IntroTitle4>
              </CTA>
            )}
          </Card>
        ) : (
          <ChatListCard>
            {messages.map((m, idx) => (
              <MessageBubble key={idx} isUser={m.role === "user"}>
                {m.role === "user" ? (
                  m.text
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.text}
                  </ReactMarkdown>
                )}
              </MessageBubble>
            ))}
            <div ref={bottomRef} />
          </ChatListCard>
        )}
      </Main>
      <BirthInfoModal open={modalOpen} onClose={() => setModalOpen(false)} />

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
