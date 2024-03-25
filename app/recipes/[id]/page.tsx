import { AppPage } from "@/app/components/AppPage";
import { RecipeDetail } from "@/app/components/Recipes";
import { useAppSelector } from "@/redux/hooks";

const RecipeDetailPage = ({params}: {params: {id: string;};}) => {
  return (
    <AppPage
        title="Recipes"
        subtitle="Find the recipes you can make."
    >
        <RecipeDetail
          recipeId={params.id}
        />
    </AppPage>
  );
};

export default RecipeDetailPage;
