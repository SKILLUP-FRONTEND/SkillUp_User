// src/app/oauth/naver/callback/page.tsx

import { Suspense } from "react";
import OAuthCallback from "@/components/oauth/OAuthCallback";

export default function NaverCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthCallback provider="naver" />
    </Suspense>
  );
}
