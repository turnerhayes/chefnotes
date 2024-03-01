"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isOnboardingComplete } from "@/app/onboarding";
import { AppPage } from "@/app/components/AppPage";

export default function Home() {
  const router = useRouter();
  const isOnboarded = isOnboardingComplete();

  useEffect(() => {
    if (!isOnboarded) {
      router.push("/onboarding");
    }
    else {
      router.push("/pantry");
    }
  }, [isOnboarded, router]);

  return null;
}
