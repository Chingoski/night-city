import { createContext, useState } from "react";

import { listingType } from "../types/listing-type";

type allListingsContextType = {
  allListings: listingType[];
  setAllListings: (allListings: listingType[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  nextPage: string;
  setNextPage: (nextPage: string) => void;
};

export const allListingsContext = createContext<allListingsContextType>({
  allListings: [],
  setAllListings: () => {},
  isLoading: false,
  setIsLoading: () => {},
  nextPage: "",
  setNextPage: () => {},
});

const AllListingsContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [allListings, setAllListings] = useState<listingType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState(``);

  const value: allListingsContextType = {
    allListings,
    setAllListings,
    isLoading,
    setIsLoading,
    nextPage,
    setNextPage,
  };

  return (
    <allListingsContext.Provider value={value}>
      {children}
    </allListingsContext.Provider>
  );
};

export default AllListingsContextProvider;
