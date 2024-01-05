import { createContext, useState } from "react";
import { listingType } from "../types/listing-type";
import host from "../host";

type allListingsContextType = {
  allListings: listingType[];
  setAllListings: (allListings: listingType[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  url: string;
  setUrl: (nextPage: string) => void;
};

export const allListingsContext = createContext<allListingsContextType>({
  allListings: [],
  setAllListings: () => {},
  isLoading: false,
  setIsLoading: () => {},
  url: "",
  setUrl: () => {},
});

const AllListingsContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [allListings, setAllListings] = useState<listingType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(`${host}/api/game_listings`);

  const value: allListingsContextType = {
    allListings,
    setAllListings,
    isLoading,
    setIsLoading,
    url,
    setUrl,
  };

  return (
    <allListingsContext.Provider value={value}>
      {children}
    </allListingsContext.Provider>
  );
};

export default AllListingsContextProvider;
