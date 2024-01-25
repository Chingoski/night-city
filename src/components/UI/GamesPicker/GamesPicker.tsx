import { useContext, useState, ChangeEvent } from "react";
import { gamesPickerContext } from "../../../context/GamesPickerContext";

import { Flex, Text } from "@chakra-ui/react";
import PickedGamesList from "./PickedGamesList";
import GamesSearchInput from "./GamesSearchInput";
import GameResults from "./GameResults";

import { fetchGames } from "../../../util/create-trade";

import { gameType } from "../../../types/game-types";

const GamesPicker: React.FC<{
  setFormErrorMessage: (formErrorMessage: string) => void;
}> = ({ setFormErrorMessage }) => {
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const {
    searchValue,
    setSearchValue,
    gameResults,
    setGameResults,
    pickedGames,
    setPickedGames,
    gamesErrorMessage,
    setGamesErrorMessage,
    resultsOpen,
    setResultsOpen,
  } = useContext(gamesPickerContext);

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

  function closeResultsHandler() {
    setResultsOpen(false);
  }

  return (
    <Flex
      w="100%"
      flexDir="column"
      justifyContent="space-evenly"
      alignItems="left"
    >
      <PickedGamesList games={pickedGames} onClick={gameRemoveHandler} />
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
    </Flex>
  );
};

export default GamesPicker;
