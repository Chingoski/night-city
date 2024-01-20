import NavigationContextProvider from "./NavigationContext";
import AllListingsContextProvider from "./AllListingsContext";
import FilteringContextProvider from "./FilterContext";
import OngoingListingsContextProvider from "./OngoingListingsContext";
import CompletedListingsContextProvider from "./CompletedListingsContext";

const ApplicationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CompletedListingsContextProvider>
      <OngoingListingsContextProvider>
        <FilteringContextProvider>
          <NavigationContextProvider>
            <AllListingsContextProvider>{children}</AllListingsContextProvider>
          </NavigationContextProvider>
        </FilteringContextProvider>
      </OngoingListingsContextProvider>
    </CompletedListingsContextProvider>
  );
};

export default ApplicationContextProvider;
