import { AppPage } from "@/app/components/AppPage";
import { GroceryList } from "../components/GroceryList";

const GroceryListPage = () => {
  return (
    <AppPage
        title="Grocery List"
        subtitle="Simplify your grocery store trip in this tab."
    >
        <GroceryList
        />
    </AppPage>
  );
};

export default GroceryListPage;
