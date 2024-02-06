import { useContext, useEffect, useState } from "react";
import { tradesActionsContext } from "../../../context/TradesActionsContext";
import { confirmTrade } from "../../../util/confirm-trade";

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

const ConfirmTradeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  type: string;
  removeTrade: (trade: tradeType) => void;
}> = ({ isOpen, onClose, type, removeTrade }) => {
  const [didConfirm, setDidConfirm] = useState(false);
  const { toConfirmTrade } = useContext(tradesActionsContext);

  function confirmAcceptHandler() {
    confirmTrade(toConfirmTrade?.id as number, setDidConfirm);
  }

  function closeHandler() {
    removeTrade(toConfirmTrade as tradeType);
    onClose();
  }

  useEffect(() => setDidConfirm(false), [toConfirmTrade]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {didConfirm ? (
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
            <Text>Trade offer confirmed!</Text>
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
            <ModalHeader color="gray.900">Confirm Trade Offer</ModalHeader>
            <ModalCloseButton colorScheme="teal" />
            <ModalBody
              color="gray.900"
              display="flex"
              flexDir="column"
              gap="10px"
              alignItems="center"
            >
              <Text w="100%">
                Are you sure you want to confirm the trade offer?
              </Text>
              <TradeModalDetail type={type} trade={toConfirmTrade} />
            </ModalBody>
            <ModalFooter justifyContent="center" m="10px 0">
              <Button
                color="white"
                background="teal.500"
                _hover={{ backgroundColor: "teal.300" }}
                mr={3}
                onClick={confirmAcceptHandler}
              >
                Confirm
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

export default ConfirmTradeModal;
