import { Flex, useStyleConfig } from "@chakra-ui/react";

import { useContext } from "react";
import { navigationContext } from "../../context/NavigationContext";
import { tab } from "../../types/tabs-types";
import OngoingListings from "./OngoingListings";
import TabMenu from "../UI/TabMenu";
import CompletedListings from "./CompletedListings";

function MyListings() {
  const styles = useStyleConfig("Home");
  const { isCollapsed } = useContext(navigationContext);

  const tabs: tab[] = [
    { id: 1, name: "Ongoing", element: <OngoingListings /> },
    { id: 2, name: "Completed", element: <CompletedListings /> },
  ];
  return (
    <Flex
      marginBottom="15px"
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

export default MyListings;
