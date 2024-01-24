import { Flex, Text, IconButton } from "@chakra-ui/react";
import GameOption from "./GameOption";
import { FaXmark } from "react-icons/fa6";
import { gameType } from "../../../types/game-types";

const GameResults: React.FC<{
  gameResults: gameType[];
  gamePickHandler: (game: gameType) => void;
  closeResultsHandler: () => void;
}> = ({ gameResults, gamePickHandler, closeResultsHandler }) => {
  return (
    <Flex
      w="100%"
      flexDir="column"
      backgroundColor="gray.200"
      p="10px"
      pb="0"
      marginTop="10px"
      fontSize="1.1rem"
      borderRadius="5px"
    >
      <Flex justifyContent="space-between" alignItems="center" color="gray.700">
        <Text>Results:</Text>
        <IconButton
          icon={<FaXmark />}
          aria-label="Close results"
          backgroundColor="transparent"
          color="gray.700"
          _hover={{ color: "teal.300" }}
          onClick={closeResultsHandler}
        />
      </Flex>
      {gameResults.length > 0 ? (
        <Flex
          w="100%"
          flexDir="column"
          maxH="150px"
          overflowY="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              bg: "gray.500",
              borderRadius: "md",
            },
            "&::-webkit-scrollbar-track": {
              bg: "transparent",
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
      ) : (
        <Text fontSize="1rem" color="gray.600">
          No results found.
        </Text>
      )}
    </Flex>
  );
};

export default GameResults;
