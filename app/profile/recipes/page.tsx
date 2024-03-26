
import { AppPage } from "@/app/components/AppPage";
import { SavedRecipes } from "@/app/components/Profile/SavedRecipes";

const SavedRecipesPage = () => {

  return (
    <AppPage
        title="Saved Recipes"
        subtitle=""
    >
        <SavedRecipes />
    </AppPage>
  )
};

export default SavedRecipesPage;
