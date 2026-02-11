// src/app/(default)/search/page.tsx

import SearchPageLayout from "./SearchPageLayout";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const searchQuery = (params.q as string) || "";

  // 검색어가 없으면 홈으로 리다이렉트하거나 빈 상태 표시
  if (!searchQuery) {
    return (
      <div style={{ paddingTop: "6.25rem" }}>
        <SearchPageLayout searchQuery="" />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "6.25rem" }}>
      <SearchPageLayout searchQuery={searchQuery} />
    </div>
  );
}
