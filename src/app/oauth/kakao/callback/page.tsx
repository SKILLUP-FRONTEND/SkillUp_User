// src/app/oauth/kakao/callback/page.tsx

import { Suspense } from "react";
import OAuthCallback from "@/components/oauth/OAuthCallback";

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthCallback provider="kakao" />
    </Suspense>
  );
}
