import { createContext, useState } from "react";

type filteringContextType = {
  searchInputValue: string;
  setSearchInputValue: (searchInputValue: string) => void;
  cityId: number;
  setCityId: (cityId: number) => void;
  platformId: number;
  setPlatformId: (platformId: number) => void;
  tradePreference: string | null;
  setTradePreference: (tradePreference: string | null) => void;
  order: string | null;
  setOrder: (order: string | null) => void;
};

export const filteringContext = createContext<filteringContextType>({
  searchInputValue: "",
  setSearchInputValue: () => {},
  cityId: 0,
  setCityId: () => {},
  platformId: 0,
  setPlatformId: () => {},
  tradePreference: null,
  setTradePreference: () => {},
  order: "",
  setOrder: () => {},
});

const FilteringContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [cityId, setCityId] = useState(0);
  const [platformId, setPlatformId] = useState(0);
  const [tradePreference, setTradePreference] = useState<string | null>(null);
  const [order, setOrder] = useState<string | null>("");

  const value: filteringContextType = {
    searchInputValue,
    setSearchInputValue,
    cityId,
    setCityId,
    platformId,
    setPlatformId,
    tradePreference,
    setTradePreference,
    order,
    setOrder,
  };
  return (
    <filteringContext.Provider value={value}>
      {children}
    </filteringContext.Provider>
  );
};

export default FilteringContextProvider;
