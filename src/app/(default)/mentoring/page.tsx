// src/app/mentoring/page.tsx

import EventPageLayout from "@/components/events/EventPageLayout";
import { buildEventPageParams } from "@/utils/buildEventPageParams";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MentoringPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { apiParams, initialEventList } = await buildEventPageParams(
    "NETWORKING_MENTORING",
    params
  );

  return (
    <div style={{ paddingTop: "6.25rem" }}>
      <EventPageLayout
        pageId="mentoring"
        initialEventList={initialEventList}
        initialParams={apiParams}
      />
    </div>
  );
}
