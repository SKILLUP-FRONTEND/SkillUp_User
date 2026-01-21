// src/hooks/mutations/useUpdateUserProfile.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/api/user";
import { UpdateUserProfileRequest } from "@/types/user";
import { queryKeys } from "../queryKeys";

// 유저 프로필 업데이트 Hook
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserProfileRequest) => {
      return await updateUserProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.emailAndName() });
    },
  });
};
