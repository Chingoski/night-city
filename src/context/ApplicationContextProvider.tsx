import NavigationContextProvider from "./NavigationContext";
import AllListingsContextProvider from "./AllListingsContext";
import FilteringContextProvider from "./FilterContext";
<<<<<<< Updated upstream
import OngoingListingsContextProvider from "./OngoingListingsContext";
import CompletedListingsContextProvider from "./CompletedListingsContext";
=======
import CreateTradeContextProvider from "./CreateTradeContext";
import GamesPickerContextProvider from "./GamesPickerContext";
import DeleteListingContextProvider from "./DeleteListingContext";
>>>>>>> Stashed changes

const ApplicationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
<<<<<<< Updated upstream
    <CompletedListingsContextProvider>
      <OngoingListingsContextProvider>
        <FilteringContextProvider>
          <NavigationContextProvider>
            <AllListingsContextProvider>{children}</AllListingsContextProvider>
          </NavigationContextProvider>
        </FilteringContextProvider>
      </OngoingListingsContextProvider>
    </CompletedListingsContextProvider>
=======
    <DeleteListingContextProvider>
      <GamesPickerContextProvider>
        <CreateTradeContextProvider>
          <FilteringContextProvider>
            <NavigationContextProvider>{children}</NavigationContextProvider>
          </FilteringContextProvider>
        </CreateTradeContextProvider>
      </GamesPickerContextProvider>
    </DeleteListingContextProvider>
>>>>>>> Stashed changes
  );
};

export default ApplicationContextProvider;
