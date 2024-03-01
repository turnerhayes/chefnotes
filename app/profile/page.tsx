"use client";

import { useSession } from "next-auth/react";
import { Profile } from "@/app/components/Profile";
import { AppPage, MenuItem } from "../components/AppPage";

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
    >
        <></>
    </AppPage>
  )
};

export default ProfilePage;
