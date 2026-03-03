// src/hooks/mutations/useContinueLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { continueLogin } from "@/api/auth";
import { getUserEmailAndName } from "@/api/user";
import { useAuth } from "../useAuth";
import { queryKeys } from "../queryKeys";
import { WithdrawPendingUserInfo } from "@/types/user";

export const useContinueLogin = () => {
  const { login, setUserName, setUserEmail } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (info: WithdrawPendingUserInfo) => {
      const { accessToken } = await continueLogin(info);

      // 토큰 저장
      login(accessToken);

      // 유저 정보 가져오기 (재가입 직후이므로 401 시 interceptor 처리 건너뜀)
      try {
        const userData = await getUserEmailAndName({ skipAuthErrorHandling: true });
        if (userData?.name) setUserName(userData.name);
        if (userData?.email) setUserEmail(userData.email);
        queryClient.setQueryData(queryKeys.user.emailAndName(), userData);
      } catch (error) {
        console.error("Failed to fetch user info after continue-login:", error);
      }

      return { accessToken };
    },
  });
};
