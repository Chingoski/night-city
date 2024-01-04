import NavigationContextProvider from "./NavigationContext";
import AllListingsContextProvider from "./AllListingsContext";

const ApplicationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <NavigationContextProvider>
      <AllListingsContextProvider>{children}</AllListingsContextProvider>
    </NavigationContextProvider>
  );
};

export default ApplicationContextProvider;
