import { useState, createContext } from "react";
import { tradeType } from "../types/trade-type";

type tradesActionsContextType = {
  toAcceptTrade: tradeType | null;
  setToAcceptTrade: (trade: tradeType | null) => void;
  toCancelTrade: tradeType | null;
  setToCancelTrade: (trade: tradeType | null) => void;
  toUpdateTrade: tradeType | null;
  setToUpdateTrade: (trade: tradeType | null) => void;
  toConfirmTrade: tradeType | null;
  setToConfirmTrade: (trade: tradeType | null) => void;
};

export const tradesActionsContext = createContext<tradesActionsContextType>({
  toAcceptTrade: null,
  setToAcceptTrade: () => {},
  toCancelTrade: null,
  setToCancelTrade: () => {},
  toUpdateTrade: null,
  setToUpdateTrade: () => {},
  toConfirmTrade: null,
  setToConfirmTrade: () => {},
});

const TradesActionsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toAcceptTrade, setToAcceptTrade] = useState<tradeType | null>(null);
  const [toCancelTrade, setToCancelTrade] = useState<tradeType | null>(null);
  const [toUpdateTrade, setToUpdateTrade] = useState<tradeType | null>(null);
  const [toConfirmTrade, setToConfirmTrade] = useState<tradeType | null>(null);

  const value = {
    toAcceptTrade,
    setToAcceptTrade,
    toCancelTrade,
    setToCancelTrade,
    toUpdateTrade,
    setToUpdateTrade,
    toConfirmTrade,
    setToConfirmTrade,
  };

  return (
    <tradesActionsContext.Provider value={value}>
      {children}
    </tradesActionsContext.Provider>
  );
};

export default TradesActionsContextProvider;
