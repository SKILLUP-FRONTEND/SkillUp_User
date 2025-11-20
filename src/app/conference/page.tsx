// src/app/conference/page.tsx

import ConferencePageLayout from "./ConferencePageLayout";
import { getEventList } from "@/api/events";

export default async function page() {
  // SSR: 초기 데이터 서버에서 로드
  const initialEventList = await getEventList({
    category: "CONFERENCE_SEMINAR",
    sort: "latest",
    page: 0,
  });

  return (
    <div style={{ paddingTop: "6rem" }}>
      <ConferencePageLayout initialEventList={initialEventList} />
    </div>
  );
}
