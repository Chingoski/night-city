import { createContext, useState } from "react";
import { listingType } from "../types/listing-type";

type createTradeContextType = {
  listing: listingType | null;
  setListing: (listing: listingType | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  didSubmit: boolean;
  setDidSubmit: (didSubmit: boolean) => void;
};

export const createTradeContext = createContext<createTradeContextType>({
  listing: null,
  setListing: () => {},
  isLoading: false,
  setIsLoading: () => {},
  didSubmit: false,
  setDidSubmit: () => {},
});

const CreateTradeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [listing, setListing] = useState<listingType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const value = {
    listing,
    setListing,
    isLoading,
    setIsLoading,
    didSubmit,
    setDidSubmit,
  };

  return (
    <createTradeContext.Provider value={value}>
      {children}
    </createTradeContext.Provider>
  );
};

export default CreateTradeContextProvider;
