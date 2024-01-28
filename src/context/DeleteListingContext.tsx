import { createContext, useState } from "react";
import { listingType } from "../types/listing-type";

type deleteListingContextType = {
  listing: listingType | null;
  setListing: (listing: listingType | null) => void;
};

export const deleteListingContext = createContext<deleteListingContextType>({
  listing: null,
  setListing: () => {},
});

const DeleteListingContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [listing, setListing] = useState<listingType | null>(null);
  const value = { listing, setListing };
  return (
    <deleteListingContext.Provider value={value}>
      {children}
    </deleteListingContext.Provider>
  );
};

export default DeleteListingContextProvider;
