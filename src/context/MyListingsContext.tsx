import { createContext, useState } from "react";

import { listingType } from "../types/listing-type";

type myListingsContextType = {
  myListings: listingType[];
  setMyListings: (myListings: listingType[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  nextPage: URL | null;
  setNextPage: (nextPage: URL | null) => void;
};

export const myListingsContext = createContext<myListingsContextType>({
  myListings: [],
  setMyListings: () => {},
  isLoading: false,
  setIsLoading: () => {},
  nextPage: null,
  setNextPage: () => {},
});

const MyListingsContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [myListings, setMyListings] = useState<listingType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState<URL | null>(null);

  const value: myListingsContextType = {
    myListings,
    setMyListings,
    isLoading,
    setIsLoading,
    nextPage,
    setNextPage,
  };

  return (
    <myListingsContext.Provider value={value}>
      {children}
    </myListingsContext.Provider>
  );
};

export default MyListingsContextProvider;
