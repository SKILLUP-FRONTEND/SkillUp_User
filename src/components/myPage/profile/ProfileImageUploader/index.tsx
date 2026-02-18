// src/components/myPage/profile/ProfileImageUploader/index.tsx

"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import { PenIcon } from "@/assets/icons/PenIcon";
import { useRef } from "react";
import logoDefaultImg from "@/assets/images/logoDefaultImg.png";

interface ProfileImageUploaderProps {
  imageUrl: string;
  onChangeImage: (file: File) => void;
  size?: "small" | "large";
}

export default function ProfileImageUploader({
  imageUrl,
  onChangeImage,
  size = "large",
}: ProfileImageUploaderProps) {
  const imageSize = size === "small" ? 100 : 120;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChangeImage(file);
    }
  };

  // data: URL (미리보기)인지 확인
  const isDataUrl = imageUrl && imageUrl.startsWith("data:");

  // 유효한 이미지 URL인지 확인
  const isValidUrl =
    imageUrl &&
    (imageUrl.startsWith("/") ||
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://"));

  return (
    <div
      className={`${styles.wrapper} ${size === "small" ? styles.small : ""}`}
    >
      {isDataUrl ? (
        <img
          src={imageUrl}
          alt="Profile Preview"
          width={imageSize}
          height={imageSize}
          className={styles.profileImg}
        />
      ) : (
        <Image
          src={isValidUrl ? imageUrl : logoDefaultImg}
          alt="Profile"
          width={imageSize}
          height={imageSize}
          className={styles.profileImg}
        />
      )}
      <button className={styles.editBtn} onClick={handleClick}>
        <PenIcon fillColor="none" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
}
