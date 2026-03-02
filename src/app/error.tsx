"use client";

import Header from "@/components/common/Header";
import ErrorPage from "@/components/common/Error";

export default function GlobalError() {
  return (
    <>
      <Header variant="sub" />
      <ErrorPage type="500" />
    </>
  );
}