import { useState } from "react";
import { useAxios } from "../../api";
import { useAuth } from "../../context/AuthContext";

export const useEmailLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { client } = useAxios();
  const { login } = useAuth();

  const handleEmailLogin = async () => {
    try {
      setIsLoading(true);
      const response = await client.post("/users/email/sign-in", {
        email,
        password,
      });

      // Context를 통해 토큰 저장
      login(response.data.accessToken);
      console.log("로그인 성공:", response.data);

      return response;
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    isLoading,
    handleEmailLogin,
    setEmail,
    setPassword,
  };
};
