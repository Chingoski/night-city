import NavigationContextProvider from "./NavigationContext";
import AllListingsContextProvider from "./AllListingsContext";
import FilteringContextProvider from "./FilterContext";

const ApplicationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <FilteringContextProvider>
      <NavigationContextProvider>
        <AllListingsContextProvider>{children}</AllListingsContextProvider>
      </NavigationContextProvider>
    </FilteringContextProvider>
  );
};

export default ApplicationContextProvider;
