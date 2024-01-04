import { createContext, useState } from "react";

type navigationContextType = {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

export const navigationContext = createContext<navigationContextType>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

const NavigationContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const value: navigationContextType = { isCollapsed, setIsCollapsed };

  return (
    <navigationContext.Provider value={value}>
      {children}
    </navigationContext.Provider>
  );
};

export default NavigationContextProvider;
