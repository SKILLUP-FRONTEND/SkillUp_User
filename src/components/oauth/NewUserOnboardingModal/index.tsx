"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Text from "@/components/common/Text";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import { RoleName, ROLE_DISPLAY_OPTIONS, ROLE_NAME } from "@/constants/role";
import { useUserInterests } from "@/hooks/queries/useUser";
import { AGE_OPTIONS, GENDER_OPTIONS } from "@/constants/profileFormOptions";
import { useUpdateUserProfile } from "@/hooks/mutations/useUpdateUserProfile";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import Modal from "@/components/common/Modal";
import styles from "./styles.module.css";

interface NewUserOnboardingModalProps {
  isOpen: boolean;
  onSaved: () => void;
}

export default function NewUserOnboardingModal({
  isOpen,
  onSaved,
}: NewUserOnboardingModalProps) {
  const { userName } = useAuth();
  const { showToast } = useToast();
  const { mutate: updateProfile, isPending: isSaving } = useUpdateUserProfile();

  const [selectedRole, setSelectedRole] = useState<RoleName | null>(null);
  const [activeTab, setActiveTab] = useState<RoleName>(ROLE_NAME.PLANNING);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isAgeMenuOpen, setIsAgeMenuOpen] = useState(false);

  const roleMenuRef = useRef<HTMLDivElement>(null);
  const ageMenuRef = useRef<HTMLDivElement>(null);

  const { data: apiInterests, isLoading: isLoadingInterests } =
    useUserInterests(activeTab);

  useEffect(() => {
    if (!isOpen) {
      setSelectedRole(null);
      setSelectedInterests([]);
      setSelectedAge("");
      setSelectedGender("");
      setActiveTab(ROLE_NAME.PLANNING);
      setIsRoleMenuOpen(false);
      setIsAgeMenuOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!roleMenuRef.current?.contains(event.target as Node)) {
        setIsRoleMenuOpen(false);
      }
      if (!ageMenuRef.current?.contains(event.target as Node)) {
        setIsAgeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const interestOptions = useMemo(() => {
    if (apiInterests && apiInterests.length > 0) {
      return apiInterests.map((item: { name: string }) => item.name);
    }

    return [];
  }, [apiInterests]);

  const handleSelectInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSelectRole = (role: RoleName) => {
    setSelectedRole(role);
    setActiveTab(role);
    setSelectedInterests([]);
    setIsRoleMenuOpen(false);
  };

  const isSubmitDisabled =
    !selectedRole ||
    selectedInterests.length === 0 ||
    interestOptions.length === 0 ||
    !selectedAge ||
    !selectedGender ||
    isSaving;

  const handleSave = () => {
    if (isSubmitDisabled) return;

    updateProfile(
      {
        name: userName || "사용자",
        age: selectedAge,
        gender: selectedGender,
        role: selectedRole,
        interests: selectedInterests,
        marketingAgreement: false,
      },
      {
        onSuccess: () => {
          showToast({
            title: "정보 저장 완료",
            message: "맞춤 정보가 저장되었습니다.",
            type: "success",
            duration: 2500,
          });
          onSaved();
        },
        onError: () => {
          showToast({
            title: "저장 실패",
            message: "입력값을 확인 후 다시 시도해주세요.",
            type: "error",
            duration: 3000,
          });
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} toggle={() => {}}>
      <div className={styles.content}>
        <Text typography="head2_sb_30" color="black" as="h2" className={styles.title}>
          맞춤형 정보를 드릴 수 있도록,
          <br />
          아래 내용을 입력해주세요!
        </Text>

        <div className={styles.topFields}>
          <div className={styles.fieldColumn}>
            <Text typography="label3_m_14" color="black">
              연령
            </Text>
            <div className={styles.dropdown} ref={ageMenuRef}>
              <button
                type="button"
                className={styles.dropdownButton}
                onClick={() => setIsAgeMenuOpen((prev) => !prev)}
              >
                <Text typography="body1_r_16" color={selectedAge ? "neutral-20" : "neutral-50"}>
                  {selectedAge || "연령대를 선택하세요"}
                </Text>
                <ChevronDownIcon color="var(--Neutral-40)" />
              </button>

              {isAgeMenuOpen && (
                <div className={styles.dropdownList}>
                  {AGE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => {
                        setSelectedAge(option.label);
                        setIsAgeMenuOpen(false);
                      }}
                    >
                      <Text typography="body1_r_16" color="neutral-20">
                        {option.label}
                      </Text>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.fieldColumn}>
            <Text typography="label3_m_14" color="black">
              성별
            </Text>
            <div className={styles.genderRow}>
              {GENDER_OPTIONS.map((option) => {
                const isActive = selectedGender === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`${styles.genderButton} ${
                      isActive ? styles.genderButtonActive : ""
                    }`}
                    onClick={() => setSelectedGender(option.value)}
                  >
                    <Text
                      typography="label3_m_14"
                      color={isActive ? "white" : "neutral-30"}
                    >
                      {option.label}
                    </Text>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <Text typography="label3_m_14" color="black">
            직무
          </Text>

          <div className={styles.dropdown} ref={roleMenuRef}>
            <button
              type="button"
              className={styles.dropdownButton}
              onClick={() => setIsRoleMenuOpen((prev) => !prev)}
            >
              <Text typography="body1_r_16" color={selectedRole ? "neutral-20" : "neutral-50"}>
                {selectedRole ?? "직무를 선택하세요"}
              </Text>
              <ChevronDownIcon color="var(--Neutral-40)" />
            </button>

            {isRoleMenuOpen && (
              <div className={styles.dropdownList}>
                {ROLE_DISPLAY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={styles.dropdownItem}
                    onClick={() => handleSelectRole(option.value)}
                  >
                    <Text typography="body1_r_16" color="neutral-20">
                      {option.value}
                    </Text>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.interestSection}>
          <div className={styles.interestHeader}>
            <div className={styles.interestLabelGroup}>
              <Text typography="label3_m_14" color="black">
                관심사
              </Text>
              <Text typography="label4_m_12" color="neutral-70">
                주요 관심사를 선택해주세요
              </Text>
            </div>

            <div className={styles.roleTabs}>
              {ROLE_DISPLAY_OPTIONS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.value);
                    setSelectedInterests([]);
                  }}
                  className={`${styles.roleTab} ${
                    activeTab === tab.value ? styles.roleTabActive : ""
                  }`}
                >
                  <Text
                    typography="label3_m_14"
                    color={activeTab === tab.value ? "primary-heavy" : "neutral-60"}
                  >
                    {tab.label}
                  </Text>
                </button>
              ))}
            </div>
          </div>

          {isLoadingInterests ? (
            <Text
              typography="body2_r_14"
              color="neutral-60"
              className={styles.infoText}
            >
              관심사 목록을 불러오는 중입니다.
            </Text>
          ) : interestOptions.length === 0 ? (
            <Text
              typography="body2_r_14"
              color="neutral-60"
              className={styles.infoText}
            >
              선택 가능한 관심사가 없습니다.
            </Text>
          ) : (
            <div className={styles.interestsGrid}>
              {interestOptions.map((interest: string) => {
                const isSelected = selectedInterests.includes(interest);

                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleSelectInterest(interest)}
                    className={`${styles.interestChip} ${
                      isSelected ? styles.interestChipActive : ""
                    }`}
                  >
                    <Text
                      typography="label2_m_16"
                      color={isSelected ? "primary-strong" : "fill-strong"}
                    >
                      {interest}
                    </Text>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.confirmButton}
          disabled={isSubmitDisabled}
          onClick={handleSave}
        >
          <Text
            typography="sub2_m_18"
            color={isSubmitDisabled ? "neutral-70" : "white"}
          >
            {isSaving ? "저장 중..." : "확인했어요"}
          </Text>
        </button>
      </div>
    </Modal>
  );
}
