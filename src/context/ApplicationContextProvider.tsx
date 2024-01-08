import NavigationContextProvider from "./NavigationContext";
import AllListingsContextProvider from "./AllListingsContext";
import FilteringContextProvider from "./FilterContext";
import MyListingsContextProvider from "./MyListingsContext";

const ApplicationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MyListingsContextProvider>
      <FilteringContextProvider>
        <NavigationContextProvider>
          <AllListingsContextProvider>{children}</AllListingsContextProvider>
        </NavigationContextProvider>
      </FilteringContextProvider>
    </MyListingsContextProvider>
  );
};

export default ApplicationContextProvider;
