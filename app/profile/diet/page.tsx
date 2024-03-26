
import { AppPage } from "@/app/components/AppPage";
import { DietaryPreferences } from "@/app/components/Profile/DietaryPreferences";

const DietaryPreferencesPage = () => {

  return (
    <AppPage
        title="Diet & Allergies"
        subtitle=""
    >
        <DietaryPreferences />
    </AppPage>
  )
};

export default DietaryPreferencesPage;
