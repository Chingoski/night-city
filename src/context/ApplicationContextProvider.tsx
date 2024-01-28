import NavigationContextProvider from "./NavigationContext";
import FilteringContextProvider from "./FilterContext";
import CreateTradeContextProvider from "./CreateTradeContext";
import GamesPickerContextProvider from "./GamesPickerContext";
import DeleteListingContextProvider from "./DeleteListingContext";

const ApplicationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DeleteListingContextProvider>
      <GamesPickerContextProvider>
        <CreateTradeContextProvider>
          <FilteringContextProvider>
            <NavigationContextProvider>{children}</NavigationContextProvider>
          </FilteringContextProvider>
        </CreateTradeContextProvider>
      </GamesPickerContextProvider>
    </DeleteListingContextProvider>
  );
};

export default ApplicationContextProvider;
