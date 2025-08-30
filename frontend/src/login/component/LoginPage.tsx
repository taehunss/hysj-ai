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
            <Input placeholder="이메일" />
          </InputWrapper>
          <InputWrapper>
            <Input placeholder="비밀번호" type="password" />
            <InputIcon src="/eye-off.png" alt="eye-off" />
          </InputWrapper>
        </InputContainer>
        <LoginButton>로그인</LoginButton>
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
          <BottomText isLink={false}>아직 회원이 아니신가요?</BottomText>
          <BottomText isLink={true}>회원가입 하러 가기</BottomText>
        </BottomTextWrapper>
      </Body>
    </Page>
  );
};
