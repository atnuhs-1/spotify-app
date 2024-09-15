"use client"

import { useEffect } from "react";

export default function Page() {
  const f = async () => {
    const res = await fetch("/api/getUser");
  };

  useEffect(() => {
    f();
  }, [])

  return (
    <>
    <h1>確認</h1>
    </>
  );
}
