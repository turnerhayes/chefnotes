import { AppPage } from "@/app/components/AppPage";
import { Pantry } from "@/app/components/Pantry";

const PantryPage = () => {
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
