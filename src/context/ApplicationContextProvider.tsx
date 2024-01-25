import NavigationContextProvider from "./NavigationContext";
import AllListingsContextProvider from "./AllListingsContext";
import FilteringContextProvider from "./FilterContext";
import OngoingListingsContextProvider from "./OngoingListingsContext";
import CompletedListingsContextProvider from "./CompletedListingsContext";
import CreateTradeContextProvider from "./CreateTradeContext";
import GamesPickerContextProvider from "./GamesPickerContext";

const ApplicationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <GamesPickerContextProvider>
      <CreateTradeContextProvider>
        <CompletedListingsContextProvider>
          <OngoingListingsContextProvider>
            <FilteringContextProvider>
              <NavigationContextProvider>
                <AllListingsContextProvider>
                  {children}
                </AllListingsContextProvider>
              </NavigationContextProvider>
            </FilteringContextProvider>
          </OngoingListingsContextProvider>
        </CompletedListingsContextProvider>
      </CreateTradeContextProvider>
    </GamesPickerContextProvider>
  );
};

export default ApplicationContextProvider;
