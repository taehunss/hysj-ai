import styled from "styled-components";

export const Page = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 64px 1fr 64px;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar input";
  height: 100vh;

  /* Mobile first: 430x932 기준 단일 컬럼 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: max(calc(env(safe-area-inset-top) + 56px), 56px) 1fr max(
        calc(env(safe-area-inset-bottom) + 72px),
        72px
      );
    grid-template-areas:
      "header"
      "main"
      "input";
  }
`;

export const Sidebar = styled.aside<{ open?: boolean }>`
  grid-area: sidebar;
  background: #f7f7f8;
  border-right: 1px solid #ececec;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: min(80vw, 300px);
    max-width: 90vw;
    background: #f7f7f8;
    border-right: 1px solid #ececec;
    padding-top: calc(env(safe-area-inset-top) + 12px);
    transform: translateX(${(p) => (p.open ? "0" : "-100%")});
    transition: transform 0.25s ease;
    z-index: 1000;
    box-shadow: 2px 0 16px rgba(0, 0, 0, 0.1);
  }
`;

export const SidebarSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #ececec;
  padding: 12px;
`;

export const NewChatButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 1px dashed #c9c9c9;
  background: #fafafa;
  cursor: pointer;
`;

export const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-bottom: 1px solid #ececec;
  padding-top: env(safe-area-inset-top);
  height: 100%;
  position: relative;
`;

export const Main = styled.main`
  grid-area: main;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 16px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.6); /* 한지 위에 얇은 카드감 */
  border-radius: 18px;
  padding: 24px 28px;
  width: min(640px, 100%);
`;

// 대화 리스트 표시용 카드(가로 폭과 정렬 조정)
export const ChatListCard = styled(Card)`
  width: 100%;
  height: 100%;
  max-width: 680px;
  align-items: stretch;
  background: rgba(255, 255, 255, 0.6);
`;

export const CTA = styled.button`
  background: #e9e3d7;
  border: none;
  border-radius: 16px;
  padding: 14px 24px;
  font-size: 18px;
  cursor: pointer;
`;

export const IntroTitle = styled.div`
  font-weight: 700;
`;

export const InputBar = styled.form`
  grid-area: input;
  display: grid;
  grid-template-columns: 1fr 44px;
  gap: 8px;
  align-items: center;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.6);
  padding-bottom: max(8px, env(safe-area-inset-bottom));
  position: sticky;
  bottom: 0;
`;

export const TextInput = styled.input`
  height: 44px;
  border-radius: 12px;
  border: 1px solid #dcdcdc;
  padding: 0 14px;
  background: #ffffff;
  font-size: 16px; /* iOS 줌 방지 */
`;

export const SendButton = styled.button`
  height: 44px;
  width: 44px;
  border-radius: 12px;
  border: none;
  background: #e9e3d7;
  cursor: pointer;

  &:active {
    opacity: 0.9;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Logo = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: contain;
`;

export const HamburgerButton = styled.button`
  position: absolute;
  left: 12px;
  top: calc(env(safe-area-inset-top) + 10px);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const Backdrop = styled.div<{ open?: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: ${(p) => (p.open ? 1 : 0)};
  pointer-events: ${(p) => (p.open ? "auto" : "none")};
  transition: opacity 0.25s ease;
  z-index: 900;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AvatarCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MessageBubble = styled.div<{ isUser: boolean }>`
  align-self: ${(p) => (p.isUser ? "flex-end" : "flex-start")};
  background: ${(p) => (p.isUser ? "#007AFF" : "#E9ECEF")};
  color: ${(p) => (p.isUser ? "#fff" : "#000")};
  padding: 10px 14px;
  border-radius: 12px;
  margin: 6px 0;
  max-width: 90%;
  word-break: break-word;
`;

export const LogoutButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #ff6b6b;
  background: #fff5f5;
  color: #ff6b6b;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #ff6b6b;
    color: white;
  }

  &:active {
    transform: scale(0.98);
  }
`;
