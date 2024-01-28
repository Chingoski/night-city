import NavigationContextProvider from "./NavigationContext";
import FilteringContextProvider from "./FilterContext";
<<<<<<< Updated upstream
import OngoingListingsContextProvider from "./OngoingListingsContext";
import CompletedListingsContextProvider from "./CompletedListingsContext";
=======
import CreateTradeContextProvider from "./CreateTradeContext";
import GamesPickerContextProvider from "./GamesPickerContext";
import DeleteListingContextProvider from "./DeleteListingContext";
>>>>>>> Stashed changes
import CreateTradeContextProvider from "./CreateTradeContext";
import GamesPickerContextProvider from "./GamesPickerContext";

const ApplicationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
<<<<<<< Updated upstream
    <CompletedListingsContextProvider>
      <OngoingListingsContextProvider>
    <GamesPickerContextProvider>
      <CreateTradeContextProvider>
        <FilteringContextProvider>
          <NavigationContextProvider>{children}</NavigationContextProvider>
        </FilteringContextProvider>
      </OngoingListingsContextProvider>
    </CompletedListingsContextProvider>
  );
};

export default ApplicationContextProvider;
