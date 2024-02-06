import { useState } from "react";

import { gameType } from "../../../types/game-types";
import { fetchGames } from "../../../util/create-trade";

import { Flex } from "@chakra-ui/react";
import CashInput from "../../UI/CashInput";
import PickedGamesList from "../../UI/GamesPicker/PickedGamesList";
import GamesSearchInput from "../../UI/GamesPicker/GamesSearchInput";
import GameResults from "../../UI/GamesPicker/GameResults";

const UpdateTradeForm: React.FC<{
  offeredCash: string;
  cashChangeHandler: (value: number) => void;
  offeredGames: gameType[];
  gamesChangeHandler: (games: gameType[]) => void;
  errorMessageHandler: (msg: string) => void;
}> = ({
  cashChangeHandler,
  offeredCash,
  offeredGames,
  gamesChangeHandler,
  errorMessageHandler,
}) => {
  const [gameResults, setGameResults] = useState<gameType[]>([]);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [gamesSearchValue, setGamesSearchValue] = useState("");
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  function onCashChange(value: number) {
    cashChangeHandler(value);
  }

  function gameRemoveHandler(removedGame: gameType) {
    gamesChangeHandler(
      offeredGames.filter(
        (game) =>
          !(
            game.id === removedGame.id && game.platform === removedGame.platform
          )
      )
    );
  }

  function gamesInputChangeHandler(value: string) {
    errorMessageHandler("");
    setGamesSearchValue(value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      fetchGames(value, setGameResults, offeredGames);
      if (value !== "") {
        setResultsOpen(true);
      } else {
        setResultsOpen(false);
      }
    }, 300);

    setTimeoutId(newTimeoutId);
  }

  function gamePickHandler(game: gameType) {
    setResultsOpen(false);
    setGamesSearchValue("");
    if (offeredGames.length < 3) {
      gamesChangeHandler([...offeredGames, game]);
      setGameResults(
        gameResults.filter(
          (pickedGame) =>
            !(
              game.id === pickedGame.id && game.platform === pickedGame.platform
            )
        )
      );
    }
    if (offeredGames.length === 3) {
      errorMessageHandler("Game limit reached!");
    }
  }

  function closeResultsHandler() {
    setResultsOpen(false);
  }

  return (
    <Flex flexDir="column" w="100%">
      <CashInput onChange={onCashChange} value={offeredCash} />
      <Flex
        w="100%"
        flexDir="column"
        justifyContent="space-evenly"
        alignItems="left"
      >
        <PickedGamesList
          games={offeredGames}
          onClick={gameRemoveHandler}
          title="Games I want to trade:"
        />

        <GamesSearchInput
          inputChangeHandler={gamesInputChangeHandler}
          searchValue={gamesSearchValue}
        />
        {resultsOpen && (
          <GameResults
            gameResults={gameResults}
            gamePickHandler={gamePickHandler}
            closeResultsHandler={closeResultsHandler}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default UpdateTradeForm;
