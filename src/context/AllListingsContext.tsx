import { createContext, useState } from "react";

import { listingType } from "../types/listing-type";

type allListingsContextType = {
  allListings: listingType[];
  setAllListings: (allListings: listingType[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  nextPage: URL | null;
  setNextPage: (nextPage: URL | null) => void;
};

export const allListingsContext = createContext<allListingsContextType>({
  allListings: [],
  setAllListings: () => {},
  isLoading: false,
  setIsLoading: () => {},
  nextPage: null,
  setNextPage: () => {},
});

const AllListingsContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [allListings, setAllListings] = useState<listingType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState<URL | null>(null);

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
