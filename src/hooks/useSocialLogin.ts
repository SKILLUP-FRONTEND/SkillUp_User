// src/hooks/useSocialLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSocialLoginUrl,
  sendAuthorizationCode,
  SocialLoginType,
} from "@/api/auth";
import { getUserEmailAndName } from "@/api/user";
import { useAuth } from "./useAuth";

// 소셜 로그인 URL 가져오기 및 리다이렉트
export const useSocialLogin = () => {
  return useMutation({
    mutationFn: async (socialType: SocialLoginType) => {
      const url = await getSocialLoginUrl(socialType);
      return { url, socialType };
    },
    onSuccess: ({ url }) => {
      // 소셜 로그인 페이지로 리다이렉트
      window.location.href = url;
    },
    onError: (error) => {
      console.error("Failed to get social login URL:", error);
    },
  });
};

// 소셜 로그인 콜백 처리 (인가 코드 전송 후 로그인)
export const useSocialLoginCallback = () => {
  const { login, setUserName, setUserEmail } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      socialType,
      code,
      state,
    }: {
      socialType: SocialLoginType;
      code: string;
      state?: string;
    }) => {
      const token = await sendAuthorizationCode(socialType, code, state);
      return token;
    },
    onSuccess: async (token: string) => {
      // 토큰 저장
      login(token);

      // 유저 이메일 및 이름 바로 조회하여 전역 상태에 저장
      try {
        const userData = await getUserEmailAndName();
        if (userData?.userName) {
          setUserName(userData.userName);
        }
        if (userData?.userEmail) {
          setUserEmail(userData.userEmail);
        }
        // 쿼리 캐시에도 저장
        queryClient.setQueryData(["userEmailAndName"], userData);
      } catch (error) {
        console.error("Failed to fetch user email and name:", error);
      }

      // 유저 데이터 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
