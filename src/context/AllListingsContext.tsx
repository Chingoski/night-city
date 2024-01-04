import { createContext, useState } from "react";
import { listingType } from "../types/listing-type";

type allListingsContextType = {
  allListings: listingType[];
  setAllListings: (allListings: listingType[]) => void;
};

export const allListingsContext = createContext<allListingsContextType>({
  allListings: [],
  setAllListings: () => {},
});

const AllListingsContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [allListings, setAllListings] = useState<listingType[]>([]);
  const value: allListingsContextType = { allListings, setAllListings };

  return (
    <allListingsContext.Provider value={value}>
      {children}
    </allListingsContext.Provider>
  );
};

export default AllListingsContextProvider;
