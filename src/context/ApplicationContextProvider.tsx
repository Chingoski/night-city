import NavigationContextProvider from "./NavigationContext";
import FilteringContextProvider from "./FilterContext";
import CreateTradeContextProvider from "./CreateTradeContext";
import GamesPickerContextProvider from "./GamesPickerContext";
import ListingActionsContextProvider from "./ListingActionsContext";
const ApplicationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ListingActionsContextProvider>
      <GamesPickerContextProvider>
        <CreateTradeContextProvider>
          <FilteringContextProvider>
            <NavigationContextProvider>{children}</NavigationContextProvider>
          </FilteringContextProvider>
        </CreateTradeContextProvider>
      </GamesPickerContextProvider>
    </ListingActionsContextProvider>
  );
};

export default ApplicationContextProvider;
