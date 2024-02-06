import { useContext } from "react";
import { tradesActionsContext } from "../../../context/TradesActionsContext";

import { tradeType } from "../../../types/trade-type";
import { FaHandshakeSlash } from "react-icons/fa";

import { Button, Text, Icon } from "@chakra-ui/react";

const CancelTradeButton: React.FC<{ onOpen: () => void; trade: tradeType }> = ({
  onOpen,
  trade,
}) => {
  const { setToCancelTrade } = useContext(tradesActionsContext);

  function cancelTradeHandler() {
    onOpen();
    setToCancelTrade(trade);
  }
  return (
    <Button
      borderColor="red.400"
      variant="outline"
      _hover={{ backgroundColor: "red.50" }}
      onClick={cancelTradeHandler}
    >
      <Icon as={FaHandshakeSlash} color="red.400" />
      <Text ml="5px" color="red.400">
        Cancel
      </Text>
    </Button>
  );
};

export default CancelTradeButton;
