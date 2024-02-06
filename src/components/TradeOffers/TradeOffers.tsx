import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { navigationContext } from "../../context/NavigationContext";

import { userType } from "../../types/user-types";

import { Flex, useStyleConfig } from "@chakra-ui/react";
import TabMenu from "../UI/TabMenu";
import TradeOffersPanel from "./TradeOffersPanel";

import { tab } from "../../types/tabs-types";

function TradeOffers() {
  const { isCollapsed } = useContext(navigationContext);
  const styles = useStyleConfig("Home");

  const user = useLoaderData() as userType;
  const userID = user.id;

  const tabs: tab[] = [
    {
      id: 1,
      name: "Received Trades",
      element: <TradeOffersPanel userID={userID} type="received" />,
    },
    {
      id: 2,
      name: "Sent Trades",
      element: <TradeOffersPanel userID={userID} type="sent" />,
    },
  ];

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginBottom="15px"
      overflow="none"
      sx={{
        ...styles,
        width: isCollapsed
          ? "var(--collapsed-outlet-width)"
          : "var(--open-outlet-width)",
        marginLeft: isCollapsed
          ? "var(--collapsed-nav-width)"
          : "var(--open-nav-width)",
      }}
    >
      <TabMenu tabs={tabs} />
    </Flex>
  );
}

export default TradeOffers;
