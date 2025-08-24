import styled, { createGlobalStyle } from "styled-components";

// 전역 텍스처 배경
export const GlobalBase = createGlobalStyle`
  html, body, #root { height: 100%; }
  body {
    background-image: url("/texture-paper.png");
    background-repeat: repeat;
    background-size: 600px 600px;
    background-color: #f2f3f5;
  }
`;

// 필요 시 특정 컨테이너에서도 재사용 가능
export const BaseBackground = styled.div``;
