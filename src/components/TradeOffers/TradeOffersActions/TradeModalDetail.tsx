import { tradeType } from "../../../types/trade-type";

import { FaArrowRightArrowLeft } from "react-icons/fa6";

import { Icon } from "@chakra-ui/react";
import TradeOfferItems from "../TradeOfferItems";
import TradedListing from "../TradedListing";

const TradeModalDetail: React.FC<{
  type: string;
  trade: tradeType | null;
}> = ({ type, trade }) => {
  return (
    <>
      {type === "received" ? (
        <TradeOfferItems trade={trade as tradeType} type={type} />
      ) : (
        <TradedListing trade={trade as tradeType} type={type} />
      )}
      <Icon
        as={FaArrowRightArrowLeft}
        transform="rotate(90deg)"
        color="gray.600"
      />
      {type === "received" ? (
        <TradedListing trade={trade as tradeType} type={type} />
      ) : (
        <TradeOfferItems trade={trade as tradeType} type={type} />
      )}
    </>
  );
};

export default TradeModalDetail;
