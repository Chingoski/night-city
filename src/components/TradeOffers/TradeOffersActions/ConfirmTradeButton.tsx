import { useContext } from "react";
import { tradesActionsContext } from "../../../context/TradesActionsContext";

import { Button, Icon, Text } from "@chakra-ui/react";
import { FaHandshake } from "react-icons/fa";
import { tradeType } from "../../../types/trade-type";

const ConfirmTradeButton: React.FC<{
  onOpen: () => void;
  trade: tradeType;
  type: string;
}> = ({ onOpen, trade, type }) => {
  const { setToConfirmTrade } = useContext(tradesActionsContext);

  function confirmTradeHandler() {
    onOpen();
    setToConfirmTrade(trade);
  }
  return (
    <>
      {type === "received" &&
        (trade.owner_confirmed ? (
          <Button
            borderColor="gray.400"
            variant="outline"
            _hover={{ backgroundColor: "gray.50", cursor: "auto" }}
            disabled={true}
          >
            <Icon as={FaHandshake} color="gray.400" />
            <Text ml="5px" color="gray.400">
              Confirmed
            </Text>
          </Button>
        ) : (
          <Button
            borderColor="teal.400"
            variant="outline"
            _hover={{ backgroundColor: "teal.50" }}
            onClick={confirmTradeHandler}
          >
            <Icon as={FaHandshake} color="teal.400" />
            <Text ml="5px" color="teal.400">
              Confirm
            </Text>
          </Button>
        ))}
      {type === "sent" &&
        (trade.trader_confirmed ? (
          <Button
            borderColor="gray.400"
            variant="outline"
            _hover={{ backgroundColor: "gray.50", cursor: "auto" }}
            disabled={true}
          >
            <Icon as={FaHandshake} color="gray.400" />
            <Text ml="5px" color="gray.400">
              Confirmed
            </Text>
          </Button>
        ) : (
          <Button
            borderColor="teal.400"
            variant="outline"
            _hover={{ backgroundColor: "teal.50" }}
            onClick={confirmTradeHandler}
          >
            <Icon as={FaHandshake} color="teal.400" />
            <Text ml="5px" color="teal.400">
              Confirm
            </Text>
          </Button>
        ))}
    </>
  );
};

export default ConfirmTradeButton;
