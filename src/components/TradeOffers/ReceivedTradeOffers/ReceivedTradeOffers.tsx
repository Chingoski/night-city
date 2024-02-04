import { Flex } from "@chakra-ui/react";

import ReceivedPendingOffers from "./ReceivedPendingOffers";
import ReceivedAcceptedOffers from "./ReceivedAcceptedOffers";
import ReceivedCompletedOffers from "./ReceivedCompletedOffers";

import { tab } from "../../../types/tabs-types";

function ReceivedTradeOffers() {
  const tabs: tab[] = [
    {
      id: 1,
      name: "Pending",
      element: <ReceivedPendingOffers />,
    },
    {
      id: 2,
      name: "Accepted",
      element: <ReceivedAcceptedOffers />,
    },
    {
      id: 3,
      name: "Completed",
      element: <ReceivedCompletedOffers />,
    },
  ];
  return <Flex w="100%"></Flex>;
}

export default ReceivedTradeOffers;
