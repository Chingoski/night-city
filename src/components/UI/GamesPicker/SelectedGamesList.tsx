import { gameType } from "../../../types/game-types";

import { FaXmark } from "react-icons/fa6";

import { Flex, IconButton, Text } from "@chakra-ui/react";

const SelectedGamesList: React.FC<{
  games: gameType[];
  onClick: (game: gameType) => void;
}> = ({ games, onClick }) => {
  return (
    <Flex flexDir="column" marginTop="20px">
      <Text fontSize="1rem" fontWeight="600">
        Games I'm offering for trade:
      </Text>
      {games.length === 0 ? (
        <Text fontSize="1rem" color="gray.500">
          No games have been selected yet.
        </Text>
      ) : (
        <Flex w="100%" flexDir="row" flexWrap="wrap" gap="5px">
          {games.map((game) => (
            <Flex
              w="auto"
              justifyContent="space-between"
              alignItems="center"
              fontSize="1rem"
              backgroundColor="gray.200"
              borderRadius="15px"
              p="3px 3px 3px 10px"
              _hover={{ color: "teal.300", cursor: "pointer" }}
              key={`${game.id} ${game.platform.id}`}
              onClick={() => onClick(game)}
            >
              <Text>
                {game.name} ({game.platform.slug})
              </Text>
              <IconButton
                icon={<FaXmark />}
                aria-label="Remove game"
                backgroundColor="transparent"
                _hover={{
                  backgroundColor: "transparent",
                }}
              />
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default SelectedGamesList;
