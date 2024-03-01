"use client";

import { OnboardingWizard } from "@/app/components/OnboardingWizard";
import { useSession } from "next-auth/react";

const OnboardingPage = () => {
  const {
    data: session,
    status
  } = useSession();

  if (status === "loading") {
    return (
      <div>Loading...</div>
    );
  }

  return <OnboardingWizard userDisplayName={session?.user?.name ?? undefined} />;
};

export default OnboardingPage;
