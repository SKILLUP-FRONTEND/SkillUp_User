// src/app/oauth/google/callback/page.tsx

import { Suspense } from "react";
import OAuthCallback from "@/components/oauth/OAuthCallback";

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthCallback provider="google" />
    </Suspense>
  );
}
