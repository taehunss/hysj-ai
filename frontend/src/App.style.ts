import styled, { createGlobalStyle } from "styled-components";

export const BaseColor = {
  white: "#FFFFFF",
  black: "#000",
  blue: "#4D81E7",
  lightYellowGray: "#DDD6C3",
  darkYellowGray: "#928B77",
  gray: "#888888",
};

// 반응형 브레이크포인트
export const breakpoints = {
  mobile: "320px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1440px",
};

// 미디어 쿼리 헬퍼
export const media = {
  mobile: `@media (max-width: ${breakpoints.tablet})`,
  tablet: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
};

// 전역 텍스처 배경
export const GlobalBase = createGlobalStyle`
  html, body, #root { 
    height: 100%; 
    margin: 0;
    padding: 0;
  }
  
  body {
    background-image: url("/texture-paper.png");
    background-repeat: repeat;
    background-size: 600px 600px;
    background-color: ${BaseColor.white};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  // 모바일 최적화
  @media (max-width: ${breakpoints.tablet}) {
    body {
      font-size: 14px;
    }
    
    // 모바일에서 터치 영역 최적화
    button, input, select, textarea {
      font-size: 16px; // iOS에서 줌 방지
    }
  }

  // 태블릿 최적화
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    body {
      font-size: 16px;
    }
  }

  // 데스크톱 최적화
  @media (min-width: ${breakpoints.desktop}) {
    body {
      font-size: 16px;
    }
  }
`;

// 반응형 컨테이너
export const ResponsiveContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;

  ${media.mobile} {
    padding: 0 12px;
  }

  ${media.tablet} {
    padding: 0 24px;
  }

  ${media.desktop} {
    padding: 0 32px;
  }
`;

// 반응형 카드
export const ResponsiveCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  ${media.mobile} {
    padding: 16px;
    border-radius: 8px;
  }

  ${media.tablet} {
    padding: 20px;
  }

  ${media.desktop} {
    padding: 24px;
  }
`;

// 필요 시 특정 컨테이너에서도 재사용 가능
export const BaseBackground = styled.div``;
