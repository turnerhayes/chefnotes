"use client";

import { useSession } from "next-auth/react";
import { Profile } from "@/app/components/Profile";
import { AppPage } from "@/app/components/AppPage";

const ProfilePage = () => {
  const {
    data: session,
    status
  } = useSession();

  if (status === "loading") {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <AppPage
        title="My Profile"
        subtitle="Check out your Chefstreak, saved recipes and edit your 
        preferences."
    >
        <Profile
          user={session!.user!}
        />
    </AppPage>
  )
};

export default ProfilePage;
