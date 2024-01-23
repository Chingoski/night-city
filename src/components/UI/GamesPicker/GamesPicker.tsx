import {
  Flex,
  FormControl,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { gameType } from "../../../types/game-types";
import { userType } from "../../../types/user-types";
import { fetchGames, placeTradeOffer } from "../../../util/create-trade";
import GameOption from "./GameOption";
import SelectedGamesList from "./SelectedGamesList";
import CashInput from "../CashInput";

import { FaGamepad } from "react-icons/fa";
import SubmitButton from "../SubmitButton";
import { useLoaderData } from "react-router-dom";
import { listingType } from "../../../types/listing-type";

const GamesPicker: React.FC<{ listing: listingType }> = ({ listing }) => {
  const [offeredCash, setOfferedCash] = useState(0);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [gameResults, setGameResults] = useState<gameType[]>([]);
  const [pickedGames, setPickedGames] = useState<gameType[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const authUser = useLoaderData() as userType;

  function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      fetchGames(value, setGameResults);
    }, 500);

    setTimeoutId(newTimeoutId);
  }

  function gamePickHandler(game: gameType) {
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
      setErrorMessage("You have reached the games limit!");
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

  function cashChangeHandler(value: number) {
    setOfferedCash(value);
  }

  function onSubmit() {
    placeTradeOffer(pickedGames, offeredCash, authUser.id, listing.id);
  }

  return (
    <>
      <SelectedGamesList games={pickedGames} onClick={gameRemoveHandler} />
      {errorMessage !== "" && pickedGames.length === 3 && (
        <Text fontSize="0.9rem" color="red.500">
          {errorMessage}
        </Text>
      )}
      <Flex w="100%" flexDir="column">
        <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaGamepad} color="gray.600" />
            </InputLeftElement>
            <Input
              type="text"
              onChange={inputChangeHandler}
              placeholder="Search games"
            />
          </InputGroup>
        </FormControl>
      </Flex>

      {gameResults.length > 0 && (
        <Flex
          w="100%"
          flexDir="column"
          maxH="200px"
          overflowY="auto"
          p="10px"
          backgroundColor="gray.200"
          marginTop="10px"
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              bg: "gray.500",
              borderRadius: "md",
            },
            "&::-webkit-scrollbar-track": {
              bg: "gray.100",
            },
          }}
        >
          {gameResults.map((gameResult) => (
            <GameOption
              key={`${gameResult.id} ${gameResult.platform.id}`}
              game={gameResult}
              onClick={() => gamePickHandler(gameResult)}
            />
          ))}
        </Flex>
      )}

      <CashInput onChange={cashChangeHandler} />
      <Flex w="100%" justifyContent="center" marginTop="20px">
        <SubmitButton title="Place Offer" onClick={onSubmit} />
      </Flex>
    </>
  );
};

export default GamesPicker;
