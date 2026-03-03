"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  showOnboardingAtom,
  showWithdrawPendingAtom,
  withdrawPendingUserInfoAtom,
} from "@/store/authAtoms";
import NewUserOnboardingModal from "@/components/oauth/NewUserOnboardingModal";
import WithdrawPendingUserModal from "@/components/oauth/WithdrawPendingUserModal";
import { useContinueLogin } from "@/hooks/mutations/useContinueLogin";
import { useToast } from "@/hooks/useToast";
import { queryKeys } from "@/hooks/queryKeys";

export default function OnboardingModalController() {
  const router = useRouter();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [showOnboarding, setShowOnboarding] = useAtom(showOnboardingAtom);
  const [showWithdrawPending, setShowWithdrawPending] = useAtom(showWithdrawPendingAtom);
  const [withdrawPendingUserInfo, setWithdrawPendingUserInfo] = useAtom(
    withdrawPendingUserInfoAtom
  );
  const { mutate: continueLogin, isPending: isRejoining } = useContinueLogin();

  const handleSaved = () => {
    setShowOnboarding(false);
    router.push("/profile/edit");
  };

  const handleRejoin = () => {
    if (!withdrawPendingUserInfo) {
      showToast({
        title: "재가입 실패",
        message: "재가입 정보를 찾을 수 없습니다. 다시 로그인해주세요.",
        type: "error",
        duration: 3000,
      });
      setShowWithdrawPending(false);
      return;
    }

    continueLogin(withdrawPendingUserInfo, {
      onSuccess: async () => {
        // showWithdrawPending이 true인 상태에서 invalidate & refetch를 완료해야
        // 혹시 refetch 중 401이 발생해도 interceptor가 로그인 모달을 띄우지 않음
        await queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
        setShowWithdrawPending(false);
        setWithdrawPendingUserInfo(null);
        showToast({
          title: "재가입 완료",
          message: "다시 돌아오셨네요! 환영합니다.",
          type: "success",
          duration: 2500,
        });
        router.push("/");
      },
      onError: () => {
        showToast({
          title: "재가입 실패",
          message: "재가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
          type: "error",
          duration: 3000,
        });
      },
    });
  };

  return (
    <>
      <NewUserOnboardingModal isOpen={showOnboarding} onSaved={handleSaved} />
      <WithdrawPendingUserModal
        isOpen={showWithdrawPending}
        onCancel={() => {
          setShowWithdrawPending(false);
          setWithdrawPendingUserInfo(null);
        }}
        onRejoin={handleRejoin}
        isLoading={isRejoining}
      />
    </>
  );
}
