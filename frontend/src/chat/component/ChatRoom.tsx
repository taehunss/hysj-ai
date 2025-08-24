import React, { useState } from "react";
import {
  AvatarCircle,
  Backdrop,
  Card,
  CTA,
  HamburgerButton,
  Header,
  HeaderContent,
  InputBar,
  Logo,
  Main,
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
        <Card>
          <div style={{ fontWeight: 700 }}>내 사주가 궁금하다면?</div>
          <CTA>생년월일 입력하러 가기 〉</CTA>
        </Card>
      </Main>

      <InputBar onSubmit={(e) => e.preventDefault()}>
        <TextInput placeholder="한양사주에게 물어보기" />
        <SendButton>〉</SendButton>
      </InputBar>
    </Page>
  );
};

export default ChatRoom;
