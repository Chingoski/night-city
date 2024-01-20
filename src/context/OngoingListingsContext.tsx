import { createContext, useState } from "react";

import { listingType } from "../types/listing-type";

type ongoingListingsContextType = {
  ongoingListings: listingType[];
  setOngoingListings: (ongoingListings: listingType[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  nextPage: URL | null;
  setNextPage: (nextPage: URL | null) => void;
};

export const ongoingListingsContext = createContext<ongoingListingsContextType>(
  {
    ongoingListings: [],
    setOngoingListings: () => {},
    isLoading: false,
    setIsLoading: () => {},
    nextPage: null,
    setNextPage: () => {},
  }
);

const OngoingListingsContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [ongoingListings, setOngoingListings] = useState<listingType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState<URL | null>(null);

  const value: ongoingListingsContextType = {
    ongoingListings,
    setOngoingListings,
    isLoading,
    setIsLoading,
    nextPage,
    setNextPage,
  };

  return (
    <ongoingListingsContext.Provider value={value}>
      {children}
    </ongoingListingsContext.Provider>
  );
};

export default OngoingListingsContextProvider;
