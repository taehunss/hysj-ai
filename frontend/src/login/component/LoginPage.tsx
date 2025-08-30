import { useNavigate } from "react-router-dom";
import { useEmailLogin } from "../hook/useEmailLogin";
import {
  Body,
  BottomText,
  BottomTextWrapper,
  Description,
  Header,
  Input,
  InputContainer,
  InputIcon,
  InputWrapper,
  LoginButton,
  Logo,
  Or,
  Page,
  SocialLoginButton,
  SocialLoginButtonText,
  SocialLoginContainer,
  SocialLoginLogo,
  Title,
} from "./LoginPage.style";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    email,
    password,
    isLoading,
    handleEmailLogin,
    setEmail,
    setPassword,
  } = useEmailLogin();

  const onLoginClick = async () => {
    try {
      await handleEmailLogin();
      // 로그인 성공 시 채팅 페이지로 이동
      navigate("/chat");
    } catch (error) {
      // TODO: 에러 처리 (예: 에러 메시지 표시)
      console.error("로그인 실패:", error);
    }
  };

  return (
    <Page>
      <Header>
        <Logo src="/hysj-logo.png" alt="hysj logo" />
      </Header>
      <Body>
        <Title>
          여러분의 계정으로 <br /> 로그인하세요
        </Title>
        <Description>이메일과 비밀번호를 입력하여 로그인하세요.</Description>
        <InputContainer>
          <InputWrapper>
            <Input
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputIcon src="/eye-off.png" alt="eye-off" />
          </InputWrapper>
        </InputContainer>
        <LoginButton onClick={onLoginClick} disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </LoginButton>
        <Or src="/or.png" alt="hyunsujin" />
        <SocialLoginContainer>
          <SocialLoginButton>
            <SocialLoginLogo src="/google.png" alt="google" />
            <SocialLoginButtonText>
              구글 계정으로 로그인하기
            </SocialLoginButtonText>
          </SocialLoginButton>
          <SocialLoginButton>
            <SocialLoginLogo src="/naver.png" alt="naver" />
            <SocialLoginButtonText>
              네이버 계정으로 로그인하기
            </SocialLoginButtonText>
          </SocialLoginButton>
          <SocialLoginButton>
            <SocialLoginLogo src="/kakao.png" alt="kakao" />
            <SocialLoginButtonText>
              카카오 계정으로 로그인하기
            </SocialLoginButtonText>
          </SocialLoginButton>
        </SocialLoginContainer>
        <BottomTextWrapper>
          <BottomText>계정이 없으신가요? </BottomText>
          <BottomText isLink onClick={() => navigate("/login")}>
            회원가입 하러가기
          </BottomText>
        </BottomTextWrapper>
      </Body>
    </Page>
  );
};
