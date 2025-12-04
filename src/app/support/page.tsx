// src/app/support/page.tsx

import SupportPageLayout from "./SupportPageLayout";
import { getCustomerCenterInquiry } from "@/api/user";

export default async function SupportPage() {
  // SSR: 서버에서 FAQ 데이터 조회
  let faqData = [];
  try {
    faqData = await getCustomerCenterInquiry();
  } catch (error) {
    console.error("Failed to fetch FAQ data:", error);
  }

  return (
    <div style={{ paddingTop: "6rem" }}>
      <SupportPageLayout faqData={faqData} />
    </div>
  );
}
