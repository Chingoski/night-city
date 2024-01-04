import NavigationContextProvider from "./NavigationContext";

const ApplicationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <NavigationContextProvider>{children}</NavigationContextProvider>;
};

export default ApplicationContextProvider;
