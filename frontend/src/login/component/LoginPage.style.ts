import styled from "styled-components";
import { BaseColor, media } from "../../App.style";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  ${media.mobile} {
    padding: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  ${media.mobile} {
    margin-bottom: 30px;
  }
`;

export const Logo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: contain;
  margin-bottom: 20px;

  ${media.mobile} {
    width: 60px;
    height: 60px;
    margin-bottom: 16px;
  }
`;

export const Body = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${media.mobile} {
    max-width: 100%;
  }
`;

export const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${BaseColor.black};
  text-align: center;
  width: 100%;
  line-height: 1.3;
  margin-bottom: 12px;

  ${media.mobile} {
    font-size: 24px;
    margin-bottom: 8px;
  }
`;

export const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${BaseColor.gray};
  text-align: center;
  width: 100%;
  margin-bottom: 32px;

  ${media.mobile} {
    font-size: 13px;
    margin-bottom: 24px;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  ${media.mobile} {
    margin-bottom: 20px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  background-color: ${BaseColor.white};
  color: ${BaseColor.black};
  padding: 0 16px;
  padding-right: 48px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${BaseColor.darkYellowGray};
  }

  &:hover {
    border-color: #d0d0d0;
  }

  &::placeholder {
    color: #999;
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
  opacity: 0.6;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: none;
  background-color: ${BaseColor.darkYellowGray};
  color: ${BaseColor.black};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 24px;

  &:hover:not(:disabled) {
    background-color: #d4c8b8;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${media.mobile} {
    height: 44px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

export const SocialLoginContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;

  ${media.mobile} {
    gap: 10px;
    margin-bottom: 24px;
  }
`;

export const SocialLoginButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  background-color: ${BaseColor.white};
  color: ${BaseColor.black};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background-color: #f8f8f8;
    border-color: #d0d0d0;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  ${media.mobile} {
    height: 44px;
    gap: 10px;
    padding: 0 12px;
  }
`;

export const SocialLoginButtonText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${BaseColor.black};

  ${media.mobile} {
    font-size: 13px;
  }
`;

export const Or = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  margin: 24px 0;

  ${media.mobile} {
    margin: 20px 0;
  }
`;

export const SocialLoginLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;

  ${media.mobile} {
    width: 18px;
    height: 18px;
  }
`;

export const BottomTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${media.mobile} {
    gap: 6px;
  }
`;

export const BottomText = styled.div<{ isLink?: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.isLink ? BaseColor.blue : BaseColor.gray)};
  cursor: ${(props) => (props.isLink ? "pointer" : "default")};
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => (props.isLink ? "#0056b3" : BaseColor.gray)};
  }

  ${media.mobile} {
    font-size: 13px;
  }
`;
