"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { showOnboardingAtom } from "@/store/authAtoms";
import NewUserOnboardingModal from "@/components/oauth/NewUserOnboardingModal";

export default function OnboardingModalController() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useAtom(showOnboardingAtom);

  const handleSaved = () => {
    setShowOnboarding(false);
    router.push("/profile/edit");
  };

  return (
    <NewUserOnboardingModal isOpen={showOnboarding} onSaved={handleSaved} />
  );
}
