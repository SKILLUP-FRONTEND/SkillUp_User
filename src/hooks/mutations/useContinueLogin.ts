// src/hooks/mutations/useContinueLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDefaultStore } from "jotai";
import { continueLogin } from "@/api/auth";
import { getUserEmailAndName } from "@/api/user";
import { tokenAtom, userNameAtom, userEmailAtom } from "@/store/authAtoms";
import { queryKeys } from "../queryKeys";
import { WithdrawPendingUserInfo } from "@/types/user";

export const useContinueLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (info: WithdrawPendingUserInfo) => {
      const { accessToken } = await continueLogin(info);

      // Jotai store에 직접 토큰 저장 (React 렌더 사이클을 거치지 않고 즉시 반영)
      const store = getDefaultStore();
      store.set(tokenAtom, accessToken);

      // 유저 정보 가져오기 (토큰을 직접 전달하여 확실히 인증)
      try {
        const userData = await getUserEmailAndName({
          accessToken,
          skipAuthErrorHandling: true,
        });
        if (userData?.name) store.set(userNameAtom, userData.name);
        if (userData?.email) store.set(userEmailAtom, userData.email);
        queryClient.setQueryData(queryKeys.user.emailAndName(), userData);
      } catch (error) {
        console.error("Failed to fetch user info after continue-login:", error);
      }

      return { accessToken };
    },
  });
};
