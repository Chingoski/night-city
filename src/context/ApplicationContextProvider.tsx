import NavigationContextProvider from "./NavigationContext";
import FilteringContextProvider from "./FilterContext";
import CreateTradeContextProvider from "./CreateTradeContext";
import GamesPickerContextProvider from "./GamesPickerContext";
import ListingActionsContextProvider from "./ListingActionsContext";
import TradesActionsContextProvider from "./TradesActionsContext";
const ApplicationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <TradesActionsContextProvider>
      <ListingActionsContextProvider>
        <GamesPickerContextProvider>
          <CreateTradeContextProvider>
            <FilteringContextProvider>
              <NavigationContextProvider>{children}</NavigationContextProvider>
            </FilteringContextProvider>
          </CreateTradeContextProvider>
        </GamesPickerContextProvider>
      </ListingActionsContextProvider>
    </TradesActionsContextProvider>
  );
};

export default ApplicationContextProvider;
