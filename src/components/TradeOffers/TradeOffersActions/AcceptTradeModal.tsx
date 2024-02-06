import { useContext, useEffect, useState } from "react";
import { tradesActionsContext } from "../../../context/TradesActionsContext";
import { acceptTrade } from "../../../util/accept-trade";

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
import TradeModalDetail from "./TradeModalDetail";
import { tradeType } from "../../../types/trade-type";

const AcceptTradeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  type: string;
  removeTrade: (trade: tradeType) => void;
}> = ({ isOpen, onClose, type, removeTrade }) => {
  const [didAccept, setDidAccept] = useState(false);
  const { toAcceptTrade } = useContext(tradesActionsContext);

  function confirmAcceptHandler() {
    acceptTrade(toAcceptTrade?.id as number, setDidAccept);
  }

  function closeHandler() {
    removeTrade(toAcceptTrade as tradeType);
    onClose();
  }

  useEffect(() => setDidAccept(false), [toAcceptTrade]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {didAccept ? (
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
            <Text>Trade offer accepted!</Text>
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
            <ModalHeader color="gray.900">Accept Trade Offer</ModalHeader>
            <ModalCloseButton colorScheme="teal" />
            <ModalBody
              color="gray.900"
              display="flex"
              flexDir="column"
              gap="10px"
              alignItems="center"
            >
              <Text w="100%">
                Are you sure you want to accept the trade offer?
              </Text>
              <TradeModalDetail type={type} trade={toAcceptTrade} />
            </ModalBody>
            <ModalFooter justifyContent="center" m="10px 0">
              <Button
                color="white"
                background="teal.500"
                _hover={{ backgroundColor: "teal.300" }}
                mr={3}
                onClick={confirmAcceptHandler}
              >
                Accept
              </Button>
              <Button
                color="white"
                background="red.500"
                _hover={{ backgroundColor: "red.300" }}
                onClick={onClose}
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

export default AcceptTradeModal;
