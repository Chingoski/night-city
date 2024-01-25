import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";

import { userType } from "../../types/user-types";
import { listingType } from "../../types/listing-type";

import { placeTradeOffer } from "../../util/create-trade";
import { createTradeContext } from "../../context/CreateTradeContext";
import { gamesPickerContext } from "../../context/GamesPickerContext";

import { Flex, Text } from "@chakra-ui/react";
import SubmitButton from "../UI/SubmitButton";
import CashInput from "../UI/CashInput";
import GamesPicker from "../UI/GamesPicker/GamesPicker";

const TradeInputs: React.FC<{
  listing: listingType;
}> = ({ listing }) => {
  const [offeredCash, setOfferedCash] = useState(0);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const { setDidSubmit } = useContext(createTradeContext);
  const { pickedGames, setPickedGames, setSearchValue } =
    useContext(gamesPickerContext);

  const authUser = useLoaderData() as userType;

  function cashChangeHandler(value: number) {
    setFormErrorMessage("");
    setOfferedCash(value);
  }

  function onSubmit() {
    if (pickedGames.length !== 0 || offeredCash !== 0) {
      placeTradeOffer(
        pickedGames,
        offeredCash,
        authUser.id,
        listing.id,
        setPickedGames,
        setSearchValue,
        setOfferedCash,
        setFormErrorMessage,
        setDidSubmit
      );
    }
    if (pickedGames.length === 0 && offeredCash === 0) {
      setFormErrorMessage(
        `You can't trade nothing for something! Offer cash or another game title for this listing - or both!`
      );
    }
  }

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
    >
      <CashInput onChange={cashChangeHandler} />
      <GamesPicker setFormErrorMessage={setFormErrorMessage} />
      <Flex
        w="100%"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        marginTop="30px"
      >
        <SubmitButton title="Place Offer" onClick={onSubmit} />
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
      </Flex>
    </Flex>
  );
};

export default TradeInputs;
