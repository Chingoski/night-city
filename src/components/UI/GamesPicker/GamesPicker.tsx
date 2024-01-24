import { ChangeEvent, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { gameType } from "../../../types/game-types";
import { userType } from "../../../types/user-types";
import { listingType } from "../../../types/listing-type";

import { fetchGames, placeTradeOffer } from "../../../util/create-trade";

import { Flex, Text } from "@chakra-ui/react";
import SubmitButton from "../SubmitButton";
import GamesSearchInput from "./GamesSearchInput";
import GameResults from "./GameResults";
import SelectedGamesList from "./SelectedGamesList";
import CashInput from "../CashInput";

const GamesPicker: React.FC<{ listing: listingType }> = ({ listing }) => {
  const [searchValue, setSearchValue] = useState("");
  const [offeredCash, setOfferedCash] = useState(0);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [gameResults, setGameResults] = useState<gameType[]>([]);
  const [pickedGames, setPickedGames] = useState<gameType[]>([]);
  const [gamesErrorMessage, setGamesErrorMessage] = useState("");
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const navigate = useNavigate();

  const authUser = useLoaderData() as userType;

  function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setFormErrorMessage("");
    const value = event.target.value;
    setSearchValue(value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      fetchGames(value, setGameResults, pickedGames);
      if (event.target.value !== "") {
        setResultsOpen(true);
      } else {
        setResultsOpen(false);
      }
    }, 300);

    setTimeoutId(newTimeoutId);
  }

  function gamePickHandler(game: gameType) {
    setResultsOpen(false);
    setSearchValue("");
    if (pickedGames.length < 3) {
      setPickedGames([...pickedGames, game]);
      setGameResults(
        gameResults.filter(
          (pickedGame) =>
            !(
              game.id === pickedGame.id && game.platform === pickedGame.platform
            )
        )
      );
    } else {
      setGamesErrorMessage("You have reached the games limit!");
    }
  }

  function closeResultsHandler() {
    setResultsOpen(false);
  }

  function gameRemoveHandler(removedGame: gameType) {
    setPickedGames(
      pickedGames.filter(
        (game) =>
          !(
            game.id === removedGame.id && game.platform === removedGame.platform
          )
      )
    );
  }

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
        setOfferedCash
      );
      navigate("/");
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
      <SelectedGamesList games={pickedGames} onClick={gameRemoveHandler} />
      {gamesErrorMessage !== "" && pickedGames.length === 3 && (
        <Text fontSize="0.9rem" color="red.500">
          {gamesErrorMessage}
        </Text>
      )}
      <GamesSearchInput
        inputChangeHandler={inputChangeHandler}
        searchValue={searchValue}
      />
      {resultsOpen && (
        <GameResults
          gameResults={gameResults}
          gamePickHandler={gamePickHandler}
          closeResultsHandler={closeResultsHandler}
        />
      )}
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

export default GamesPicker;
