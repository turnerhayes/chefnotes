"use client";

import { useSession } from "next-auth/react";
import { AppPage } from "@/app/components/AppPage";
import { Pantry } from "@/app/components/Pantry";

const PantryPage = () => {
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
        title="Pantry Inventory"
        subtitle="Select all the ingredients you have at home."
    >
        <Pantry />
    </AppPage>
  );
};

export default PantryPage;
