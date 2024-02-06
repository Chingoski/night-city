import { useContext, useEffect, useState } from "react";
import { tradesActionsContext } from "../../../context/TradesActionsContext";

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

import { updateTradeOffer } from "../../../util/update-trade";
import { gameType } from "../../../types/game-types";
import UpdateTradeForm from "./UpdateTradeForm";

const UpdateTradeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  updateTradesHandler: () => void;
}> = ({ isOpen, onClose, updateTradesHandler }) => {
  const { toUpdateTrade } = useContext(tradesActionsContext);

  const [didUpdate, setDidUpdate] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [offeredCash, setOfferedCash] = useState<string>("0");
  const [offeredGames, setOfferedGames] = useState<gameType[]>([]);

  useEffect(() => {
    if (toUpdateTrade) {
      setOfferedCash(toUpdateTrade?.offered_amount);
      setOfferedGames(toUpdateTrade?.offered_games);
      setDidUpdate(false);
    }
  }, [toUpdateTrade]);

  function confirmUpdateHandler() {
    if (toUpdateTrade) {
      if (offeredGames.length !== 0 || offeredCash !== "0") {
        updateTradeOffer(
          offeredGames,
          +offeredCash,
          toUpdateTrade?.trader_user_id,
          toUpdateTrade.game_listing_id,
          toUpdateTrade.id,
          setFormErrorMessage,
          setDidUpdate
        );
      }
      if (offeredGames.length === 0 && offeredCash === "0") {
        setFormErrorMessage(
          `You can't trade nothing for something! Offer cash or another game title for this listing - or both!`
        );
      }
    }
  }

  function closeHandler() {
    if (toUpdateTrade) {
      updateTradesHandler();
    }
    onClose();
  }

  function cashChangeHandler(value: number) {
    setFormErrorMessage("");
    setOfferedCash(`${value}`);
  }

  function gamesChangeHandler(games: gameType[]) {
    setFormErrorMessage("");
    setOfferedGames(games);
  }

  function errorMessageHandler(value: string) {
    setFormErrorMessage(value);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {didUpdate ? (
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
            <Text>Your offer has been updated!</Text>
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
            <ModalHeader color="gray.900">Update Trade Offer</ModalHeader>
            <ModalCloseButton colorScheme="teal" />
            <ModalBody
              color="gray.900"
              display="flex"
              flexDir="column"
              gap="10px"
              alignItems="center"
            >
              <UpdateTradeForm
                offeredCash={offeredCash}
                cashChangeHandler={cashChangeHandler}
                offeredGames={offeredGames as gameType[]}
                gamesChangeHandler={gamesChangeHandler}
                errorMessageHandler={errorMessageHandler}
              />
            </ModalBody>
            <ModalFooter flexDirection="column" alignItems="center" m="10px 0">
              <Button
                color="white"
                background="teal.500"
                _hover={{ backgroundColor: "teal.300" }}
                mr={3}
                onClick={confirmUpdateHandler}
              >
                Update
              </Button>
              {formErrorMessage !== "" && (
                <Text
                  fontSize="0.9rem"
                  color="red.500"
                  marginTop="10px"
                  textAlign="center"
                  w="80%"
                >
                  {formErrorMessage}
                </Text>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateTradeModal;
