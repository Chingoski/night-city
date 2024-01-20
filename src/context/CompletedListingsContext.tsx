import { createContext, useState } from "react";

import { listingType } from "../types/listing-type";

type completedListingsContextType = {
  completedListings: listingType[];
  setCompletedListings: (completedListings: listingType[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  nextPage: URL | null;
  setNextPage: (nextPage: URL | null) => void;
};

export const completedListingsContext =
  createContext<completedListingsContextType>({
    completedListings: [],
    setCompletedListings: () => {},
    isLoading: false,
    setIsLoading: () => {},
    nextPage: null,
    setNextPage: () => {},
  });

const CompletedListingsContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [completedListings, setCompletedListings] = useState<listingType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState<URL | null>(null);

  const value: completedListingsContextType = {
    completedListings,
    setCompletedListings,
    isLoading,
    setIsLoading,
    nextPage,
    setNextPage,
  };

  return (
    <completedListingsContext.Provider value={value}>
      {children}
    </completedListingsContext.Provider>
  );
};

export default CompletedListingsContextProvider;
