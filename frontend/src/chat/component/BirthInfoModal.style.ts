import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

export const Dialog = styled.div`
  width: min(560px, 92vw);
  /* 한지 전역 배경 위에서도 일관된 종이 질감 */
  background-color: #f7f3e9;
  background-image: url("/texture-paper.png");
  background-repeat: repeat;
  background-size: 600px 600px;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Title = styled.h3`
  margin: 0;
`;

export const CloseBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Radio = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: #ddd6c3;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 90%;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  outline: none;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const PrimaryBtn = styled.button`
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  background: #ddd6c3;
  cursor: pointer;
`;
