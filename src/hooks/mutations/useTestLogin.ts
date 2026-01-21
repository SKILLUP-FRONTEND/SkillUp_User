// src/hooks/mutations/useTestLogin.ts

import { useMutation } from "@tanstack/react-query";
import { getTestLogin } from "@/api/user";

// 테스트 로그인 Hook
export const useTestLogin = () => {
  return useMutation({
    mutationFn: async () => {
      return await getTestLogin();
    },
  });
};
