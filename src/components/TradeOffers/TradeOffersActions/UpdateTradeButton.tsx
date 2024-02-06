import { useContext } from "react";
import { tradesActionsContext } from "../../../context/TradesActionsContext";

import { Button, Icon, Text } from "@chakra-ui/react";
import { FaPenToSquare } from "react-icons/fa6";
import { tradeType } from "../../../types/trade-type";

const UpdateTradeButton: React.FC<{ onOpen: () => void; trade: tradeType }> = ({
  onOpen,
  trade,
}) => {
  const { setToUpdateTrade } = useContext(tradesActionsContext);

  function updateTradeHandler() {
    onOpen();
    setToUpdateTrade(trade);
  }
  return (
    <Button
      borderColor="teal.400"
      variant="outline"
      _hover={{ backgroundColor: "teal.50" }}
      onClick={updateTradeHandler}
    >
      <Icon as={FaPenToSquare} color="teal.400" />
      <Text ml="5px" color="teal.400">
        Update
      </Text>
    </Button>
  );
};

export default UpdateTradeButton;
