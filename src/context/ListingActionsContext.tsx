import { createContext, useState } from "react";
import { listingType } from "../types/listing-type";

type listingActionsContextType = {
  toDeleteListing: listingType | null;
  setToDeleteListing: (listing: listingType | null) => void;
  toUpdateListing: listingType | null;
  setToUpdateListing: (listing: listingType | null) => void;
};

export const listingActionsContext = createContext<listingActionsContextType>({
  toDeleteListing: null,
  setToDeleteListing: () => {},
  toUpdateListing: null,
  setToUpdateListing: () => {},
});

const ListingActionsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [toDeleteListing, setToDeleteListing] = useState<listingType | null>(
    null
  );
  const [toUpdateListing, setToUpdateListing] = useState<listingType | null>(
    null
  );

  const value = {
    toDeleteListing,
    setToDeleteListing,
    toUpdateListing,
    setToUpdateListing,
  };
  return (
    <listingActionsContext.Provider value={value}>
      {children}
    </listingActionsContext.Provider>
  );
};

export default ListingActionsContextProvider;
