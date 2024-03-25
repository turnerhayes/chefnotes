"use client";

import { useSession } from "next-auth/react";
import { AppPage } from "@/app/components/AppPage";
import { Recipes } from "@/app/components/Recipes";

const RecipesPage = () => {
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
        title="Recipes"
        subtitle="Find the recipes you can make."
    >
        <Recipes />
    </AppPage>
  );
};

export default RecipesPage;
