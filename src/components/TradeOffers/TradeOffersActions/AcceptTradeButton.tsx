import { useContext } from "react";
import { tradesActionsContext } from "../../../context/TradesActionsContext";

import { Button, Icon, Text } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { tradeType } from "../../../types/trade-type";

const AcceptTradeButton: React.FC<{ onOpen: () => void; trade: tradeType }> = ({
  onOpen,
  trade,
}) => {
  const { setToAcceptTrade } = useContext(tradesActionsContext);

  function acceptTradeHandler() {
    onOpen();
    setToAcceptTrade(trade);
  }
  return (
    <Button
      borderColor="teal.400"
      variant="outline"
      _hover={{ backgroundColor: "teal.50" }}
      onClick={acceptTradeHandler}
    >
      <Icon as={FaCheck} color="teal.400" />
      <Text ml="5px" color="teal.400">
        Accept
      </Text>
    </Button>
  );
};

export default AcceptTradeButton;
