// src/app/profile/edit/ProfileEditPageLayout.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import ProfileImageUploader from "@/components/myPage/profile/ProfileImageUploader";
import ProfileImageDefault from "@/assets/images/logoDefaultImg.png";
import InputField from "@/components/common/InputField";
import Input from "@/components/common/Input";
import Dropdown, { DropdownOption } from "@/components/common/Dropdown";
import RadioGroup, { Option } from "@/components/common/RadioGroup";
import { MultiSelectButtonGroup } from "@/components/common/MultiSelectButtonGroup";
import Button from "@/components/common/Button";
import MegaPhoneIcon from "@/assets/icons/MegaPhoneIcon";
import InterestTabBar from "@/components/login/InterestTabBar";
import Checkbox from "@/components/common/Checkbox";
import { useUserInterests } from "@/hooks/useUser";
import Skeleton from "@/components/common/Skeleton";

export default function ProfileEditPageLayout() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>(
    ProfileImageDefault.src.toString() || ""
  );
  const [name, setName] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("planning");
  const [isMarketingAgreed, setIsMarketingAgreed] = useState<boolean>(false);
  const [currentRoleName, setCurrentRoleName] = useState<
    "기획자" | "디자이너" | "개발자" | "마케팅"
  >("기획자");

  // API로 관심사 조회
  const { data: apiInterestData, isLoading: isLoadingInterests } =
    useUserInterests(currentRoleName);

  const genderOptions: Option[] = [
    { label: "남성", value: "male" },
    { label: "여성", value: "female" },
  ];

  const ageOptions: Option[] = [
    { label: "10대", value: "10대" },
    { label: "20대", value: "20대" },
    { label: "30대", value: "30대" },
    { label: "40대", value: "40대" },
    { label: "50대", value: "50대" },
    { label: "60대이상", value: "60대이상" },
  ];

  const jobOptions: Option[] = [
    { label: "기획자", value: "pm" },
    { label: "디자이너", value: "design" },
    { label: "개발자", value: "dev" },
    { label: "마케팅", value: "marketing" },
  ];

  // 탭 매핑
  const tabToRoleMap: Record<
    string,
    "기획자" | "디자이너" | "개발자" | "마케팅"
  > = {
    planning: "기획자",
    design: "디자이너",
    development: "개발자",
    marketing: "마케팅",
  };

  // API 데이터만 사용 (목업 데이터 제거)
  const interestOptions =
    apiInterestData && apiInterestData.length > 0
      ? apiInterestData.map((item: { name: string }) => ({
          label: item.name,
          value: item.name,
        }))
      : [];

  const handleChangeImage = (file: File) => {
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
    setActiveTab(tab);
    // 탭에 해당하는 역할명으로 변경하여 API 재호출
    const roleName = tabToRoleMap[tab];
    if (roleName) {
      setCurrentRoleName(roleName);
    }
    // 탭 변경 시 선택된 관심사 초기화
    setSelectedInterests([]);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSave = () => {
    // TODO: API 연동
    console.log({
      imageUrl,
      name,
      selectedGender,
      selectedAge,
      selectedJob,
      selectedInterests,
      isMarketingAgreed,
    });
    router.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Text typography="head2_sb_30" color="black" as="h2">
            프로필 설정
          </Text>
          <ProfileImageUploader
            imageUrl={imageUrl}
            onChangeImage={handleChangeImage}
          />
        </div>
        <div className={styles.itemGroup}>
          <div className={styles.item}>
            <InputField label="이름">
              <Input
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={handleChangeName}
              />
            </InputField>
            <InputField label="연령">
              <Dropdown
                options={ageOptions}
                selected={{ label: selectedAge, value: selectedAge }}
                onSelect={handleChangeAge}
                block
                buttonLabel={selectedAge ? selectedAge : "연령대를 선택하세요"}
                spaceBetween
              />
            </InputField>
          </div>
          <div className={styles.item}>
            <InputField label="성별">
              <RadioGroup
                options={genderOptions}
                selectedValue={selectedGender}
                onChange={handleChangeGender}
              />
            </InputField>
            <InputField label="직무">
              <Dropdown
                options={jobOptions}
                selected={{ label: selectedJob, value: selectedJob }}
                onSelect={handleChangeJob}
                block
                buttonLabel={selectedJob ? selectedJob : "직무를 선택하세요"}
                spaceBetween
              />
            </InputField>
          </div>
          <div className={styles.interestSection}>
            <div className={styles.fieldWrapper}>
              <div className={styles.fieldLabel}>
                <Text typography="label3_m_14" color="black" as="span">
                  관심사
                </Text>
                <Text typography="label4_m_12" color="neutral-70" as="span">
                  주요 관심사를 선택해주세요
                </Text>
              </div>
              <InterestTabBar
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
            {isLoadingInterests ? (
              <div className={styles.skeletonWrapper}>
                <Skeleton width="7rem" height="2.5rem" />
                <Skeleton width="7rem" height="2.5rem" />
                <Skeleton width="7rem" height="2.5rem" />
                <Skeleton width="7rem" height="2.5rem" />
              </div>
            ) : (
              <MultiSelectButtonGroup
                options={interestOptions}
                selectedValues={selectedInterests}
                onSelect={handleChangeInterest}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div
          className={`${styles.marketingSection} ${
            isMarketingAgreed ? styles.active : ""
          }`}
        >
          <div className={styles.marketingText}>
            <div className={styles.marketingTitle}>
              <MegaPhoneIcon
                color={isMarketingAgreed ? "var(--Primary-strong)" : "#474747"}
              />
              <Text typography="sub3_m_16" color="black">
                마케팅 수신 동의
              </Text>
            </div>

            <Text typography="body2_r_14" color="neutral-30">
              서비스 소식과 이벤트, 맞춤형 혜택을 빠르게 받아보세요!
            </Text>
          </div>
          <Checkbox
            checked={isMarketingAgreed}
            onChange={setIsMarketingAgreed}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <Button
          variant="outlined"
          size="extraLarge"
          className={styles.footerButton}
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button
          variant="primary"
          size="extraLarge"
          className={styles.footerButton}
          onClick={handleSave}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
