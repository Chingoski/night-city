import { createContext, useState } from "react";
import { cityIdType } from "../types/city-types";

type filteringContextType = {
  inputCityId: cityIdType;
  setInputCityId: (cityId: cityIdType) => void;
  searchInputValue: string;
  setSearchInputValue: (searchInputValue: string) => void;
};

export const filteringContext = createContext<filteringContextType>({
  inputCityId: null,
  setInputCityId: () => {},
  searchInputValue: "",
  setSearchInputValue: () => {},
});

const FilteringContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inputCityId, setInputCityId] = useState<cityIdType>(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const value: filteringContextType = {
    inputCityId,
    setInputCityId,
    searchInputValue,
    setSearchInputValue,
  };
  return (
    <filteringContext.Provider value={value}>
      {children}
    </filteringContext.Provider>
  );
};

export default FilteringContextProvider;
