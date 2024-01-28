import NavigationContextProvider from "./NavigationContext";
import FilteringContextProvider from "./FilterContext";
import CreateTradeContextProvider from "./CreateTradeContext";
import GamesPickerContextProvider from "./GamesPickerContext";

const ApplicationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <GamesPickerContextProvider>
      <CreateTradeContextProvider>
        <FilteringContextProvider>
          <NavigationContextProvider>{children}</NavigationContextProvider>
        </FilteringContextProvider>
      </CreateTradeContextProvider>
    </GamesPickerContextProvider>
  );
};

export default ApplicationContextProvider;
