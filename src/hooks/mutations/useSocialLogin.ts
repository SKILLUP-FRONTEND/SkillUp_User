// src/hooks/mutations/useSocialLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDefaultStore } from "jotai";
import {
  getSocialLoginUrl,
  sendAuthorizationCode,
  SocialLoginType,
} from "@/api/auth";
import { getUserEmailAndName } from "@/api/user";
import { tokenAtom, userNameAtom, userEmailAtom } from "@/store/authAtoms";
import { queryKeys } from "../queryKeys";
import { OAuthCallbackResponse } from "@/types/user";

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
    }): Promise<OAuthCallbackResponse> => {
      // 토큰 및 로그인 상태 받기
      const {
        accessToken,
        userLoginStatus,
        otherOauthUserInfo,
        withdrawPendingUserInfo,
      } = await sendAuthorizationCode(socialType, code, state);

      // Jotai store에 직접 토큰 저장 (React 렌더 사이클을 거치지 않고 즉시 반영)
      const store = getDefaultStore();
      store.set(tokenAtom, accessToken);

      // NEW_USER / WITHDRAW_PENDING_USER는 유저 정보 조회를 건너뜀
      // - NEW_USER: 백엔드가 401을 반환
      // - WITHDRAW_PENDING_USER: 어차피 바로 logout() 처리되므로 불필요하며, 401 발생 시 로그인 모달이 먼저 뜨는 문제 방지
      if (
        userLoginStatus !== "NEW_USER" &&
        userLoginStatus !== "WITHDRAW_PENDING_USER"
      ) {
        // 유저 정보 가져오기 (토큰을 직접 전달하여 interceptor 의존 없이 확실히 인증)
        try {
          const userData = await getUserEmailAndName({
            accessToken,
            skipAuthErrorHandling: true,
          });
          if (userData?.name) {
            store.set(userNameAtom, userData.name);
          }
          if (userData?.email) {
            store.set(userEmailAtom, userData.email);
          }
          // 쿼리 캐시에도 저장
          queryClient.setQueryData(queryKeys.user.emailAndName(), userData);
        } catch (error) {
          console.error("Failed to fetch user email and name:", error);
        }

        // 유저 데이터 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
      }

      // 모든 작업 완료 후 반환
      return {
        accessToken,
        userLoginStatus,
        otherOauthUserInfo,
        withdrawPendingUserInfo,
      };
    },
  });
};
