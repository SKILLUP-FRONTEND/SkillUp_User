// src/app/my/profile/edit/ProfileEditPageLayout.tsx

"use client";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import ProfileImageUploader from "@/components/myPage/profile/ProfileImageUploader";
import { useState } from "react";
import ProfileImageDefault from "@/assets/images/logoDefaultImg.png";

export default function ProfileEditPageLayout() {
  const [imageUrl, setImageUrl] = useState<string>(
    ProfileImageDefault.src.toString() || ""
  );

  const handleChangeImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className={styles.profileEditPageLayout}>
      <div className={styles.profileEditPageLayoutHeader}>
        <Text typography="head2_sb_30" color="black" as="h2">
          프로필 설정
        </Text>
        <div className={styles.profileEditPageLayoutHeaderRight}>
          <ProfileImageUploader
            imageUrl={imageUrl}
            onChangeImage={handleChangeImage}
          />
        </div>
      </div>
    </div>
  );
}
