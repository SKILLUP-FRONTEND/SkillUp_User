// src/hooks/useProfileEditForm.ts

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/types/user";
import { RoleName, ROLE_NAME } from "@/constants/role";
import { useUpdateUserProfile, useUserInterests } from "@/hooks/useUser";
import { DropdownOption } from "@/components/common/Dropdown";
import ProfileImageDefault from "@/assets/images/logoDefaultImg.png";
import { useToast } from "./useToast";

export const useProfileEditForm = (initialData: UserProfile) => {
  const router = useRouter();
  const { showToast } = useToast();

  // Form State
  const [imageUrl, setImageUrl] = useState<string>(
    initialData.profileImageUrl || ProfileImageDefault.src.toString()
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null); // File 객체 저장
  const [name, setName] = useState<string>(initialData.name);
  const [selectedGender, setSelectedGender] = useState<string>(
    initialData.gender
  );
  const [selectedAge, setSelectedAge] = useState<string>(initialData.age);
  const [selectedJob, setSelectedJob] = useState<string>(initialData.role);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialData.interests
  );
  const [activeTab, setActiveTab] = useState<RoleName>(
    (initialData.role as RoleName) || ROLE_NAME.PLANNING
  );
  const [isMarketingAgreed, setIsMarketingAgreed] = useState<boolean>(
    initialData.marketingAgreement
  );
  const [currentRoleName, setCurrentRoleName] = useState<RoleName>(
    initialData.role as RoleName
  );
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  // API Hooks
  const { data: apiInterestData, isLoading: isLoadingInterests } =
    useUserInterests(currentRoleName);
  const { mutate: updateProfile, isPending: isUpdating } =
    useUpdateUserProfile();

  // Computed Data
  const interestOptions =
    apiInterestData && apiInterestData.length > 0
      ? apiInterestData.map((item: { name: string }) => ({
          label: item.name,
          value: item.name,
        }))
      : [];

  // Handlers
  const handleChangeImage = (file: File) => {
    // File 객체 저장 (API 전송용)
    setProfileImageFile(file);

    // 미리보기 URL 생성 (UI 표시용)
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeAge = (value: DropdownOption) => {
    setSelectedAge(value.label);
  };

  const handleChangeGender = (value: string) => {
    setSelectedGender(value);
  };

  const handleChangeJob = (value: DropdownOption) => {
    setSelectedJob(value.label);
  };

  const handleChangeInterest = (value: string[]) => {
    setSelectedInterests(value);
  };

  const handleTabChange = (tab: string) => {
    const roleName = tab as RoleName;
    setActiveTab(roleName);
    setCurrentRoleName(roleName);
  };

  const toggleAlert = () => {
    setIsAlertOpen((prev) => !prev);
  };

  const handleCancel = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmCancel = () => {
    router.back();
  };

  const handleSave = () => {
    const updateData = {
      name,
      age: selectedAge,
      gender: selectedGender,
      role: selectedJob,
      interests: selectedInterests,
      marketingAgreement: isMarketingAgreed,
      profileImage: profileImageFile, // File 객체 전달
    };

    updateProfile(updateData, {
      onSuccess: () => {
        showToast({
          title: "프로필 업데이트 성공",
          message: "프로필이 성공적으로 업데이트되었습니다.",
          type: "success",
          duration: 3000,
        });
      },
      onError: () => {
        showToast({
          title: "프로필 업데이트 실패",
          message: "프로필 업데이트에 실패했습니다.",
          type: "error",
          duration: 3000,
        });
      },
    });
  };

  return {
    // State
    imageUrl,
    name,
    selectedGender,
    selectedAge,
    selectedJob,
    selectedInterests,
    activeTab,
    isMarketingAgreed,
    currentRoleName,
    isAlertOpen,
    isLoadingInterests,
    isUpdating,
    interestOptions,

    // Handlers
    handleChangeImage,
    handleChangeName,
    handleChangeAge,
    handleChangeGender,
    handleChangeJob,
    handleChangeInterest,
    handleTabChange,
    toggleAlert,
    handleCancel,
    handleConfirmCancel,
    handleSave,
    setIsMarketingAgreed,
  };
};
