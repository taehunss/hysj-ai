import styled from "styled-components";
import { BaseColor, media } from "../../App.style";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  padding-top: 10%;

  ${media.mobile} {
    padding-top: 3%;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: contain;
  margin: 5% 0;

  ${media.mobile} {
    width: 80px;
    height: 80px;
    margin: 3% 0;
  }
`;

export const Body = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${media.mobile} {
    width: 80%;
  }
`;

export const Title = styled.div`
  font-size: 38px;
  font-weight: 1000;
  color: ${BaseColor.black};
  text-align: left;
  width: 100%;

  ${media.mobile} {
    font-size: 34px;
  }
`;

export const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${BaseColor.gray};
  text-align: left;
  width: 100%;

  ${media.mobile} {
    font-size: 12px;
  }
`;

export const InputContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  margin-bottom: 10%;

  ${media.mobile} {
    width: 100%;
    margin-top: 8%;
    margin-bottom: 8%;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 12px;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${BaseColor.white};
  background-color: ${BaseColor.white};
  color: ${BaseColor.black};
  padding: 0 16px;
  padding-right: 48px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${BaseColor.darkYellowGray};
  }
  &:active {
    background-color: ${BaseColor.lightYellowGray};
  }
  &:hover {
    background-color: ${BaseColor.white};
  }

  ${media.mobile} {
    height: 44px;
    font-size: 16px;
  }
`;

export const InputIcon = styled.img`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  object-fit: contain;
  cursor: pointer;
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${BaseColor.darkYellowGray};
  background-color: ${BaseColor.lightYellowGray};
  color: ${BaseColor.black};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:active {
    transform: translateY(1px);
  }

  ${media.mobile} {
    height: 44px;
    font-size: 16px;
  }
`;

export const SocialLoginContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SocialLoginButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${BaseColor.white};
  background-color: ${BaseColor.white};
  color: ${BaseColor.black};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 0 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:active {
    background-color: ${BaseColor.darkYellowGray};
    transform: translateY(1px);
  }

  ${media.mobile} {
    height: 44px;
    gap: 10px;
    padding: 0 12px;
  }
`;

export const SocialLoginButtonText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${BaseColor.black};

  ${media.mobile} {
    font-size: 14px;
  }
`;

export const Or = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: 20px 0;
`;

export const SocialLoginLogo = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;

  ${media.mobile} {
    width: 20px;
    height: 20px;
  }
`;

export const BottomTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
  gap: 10px;

  ${media.mobile} {
    margin-top: 5%;
  }
`;

export const BottomText = styled.div<{ isLink?: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isLink ? BaseColor.blue : BaseColor.gray)};
  cursor: ${(props) => (props.isLink ? "pointer" : "default")};

  ${media.mobile} {
    font-size: 12px;
  }
`;
