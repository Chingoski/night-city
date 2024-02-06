import { useContext, useEffect, useState } from "react";
import { tradesActionsContext } from "../../../context/TradesActionsContext";
import { cancelTrade } from "../../../util/cancel-trade";

import { FaCheckCircle } from "react-icons/fa";

import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";

import { tradeType } from "../../../types/trade-type";

const CancelTradeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;

  removeTrade: (trade: tradeType) => void;
}> = ({ isOpen, onClose, removeTrade }) => {
  const [didCancel, setDidCancel] = useState(false);
  const { toCancelTrade } = useContext(tradesActionsContext);

  function confirmCancelHandler() {
    cancelTrade(toCancelTrade?.id as number, setDidCancel);
  }

  function closeHandler() {
    removeTrade(toCancelTrade as tradeType);
    onClose();
  }

  useEffect(() => setDidCancel(false), [toCancelTrade]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {didCancel ? (
          <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            minH="300px"
            gap="20px"
          >
            <Icon
              as={FaCheckCircle}
              boxSize={10}
              color="teal.300"
              marginBottom="15px"
            />
            <Text>Trade offer cancelled!</Text>
            <Button
              variant="ghost"
              color="red.500"
              _hover={{ backgroundColor: "red.100" }}
              onClick={closeHandler}
            >
              Close
            </Button>
          </Flex>
        ) : (
          <>
            <ModalHeader color="gray.900">Cancel Trade Offer</ModalHeader>
            <ModalCloseButton colorScheme="teal" />
            <ModalBody
              color="gray.900"
              display="flex"
              flexDir="column"
              gap="10px"
              alignItems="center"
            >
              <Text w="100%">
                Are you sure you want to cancel the trade offer?
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                color="white"
                background="red.500"
                _hover={{ backgroundColor: "red.300" }}
                mr={3}
                onClick={confirmCancelHandler}
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CancelTradeModal;
