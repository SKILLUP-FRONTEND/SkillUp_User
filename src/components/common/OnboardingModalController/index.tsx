"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { showOnboardingAtom, showWithdrawPendingAtom } from "@/store/authAtoms";
import NewUserOnboardingModal from "@/components/oauth/NewUserOnboardingModal";
import WithdrawPendingUserModal from "@/components/oauth/WithdrawPendingUserModal";

export default function OnboardingModalController() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useAtom(showOnboardingAtom);
  const [showWithdrawPending, setShowWithdrawPending] = useAtom(showWithdrawPendingAtom);

  const handleSaved = () => {
    setShowOnboarding(false);
    router.push("/profile/edit");
  };

  return (
    <>
      <NewUserOnboardingModal isOpen={showOnboarding} onSaved={handleSaved} />
      <WithdrawPendingUserModal
        isOpen={showWithdrawPending}
        onCancel={() => setShowWithdrawPending(false)}
        onRejoin={() => {
          // TODO: 재가입하기 플로우 기획 확정 후 연결
          console.info("TODO: rejoin flow for WITHDRAW_PENDING_USER");
          setShowWithdrawPending(false);
        }}
      />
    </>
  );
}
