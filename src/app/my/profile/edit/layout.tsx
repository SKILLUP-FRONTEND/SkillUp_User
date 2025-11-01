// src/app/my/profile/edit/layout.tsx

import Header from "@/components/common/Header";

export default function EditProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="sub" />
      {children}
    </>
  );
}
