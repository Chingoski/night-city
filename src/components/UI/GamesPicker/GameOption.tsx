import { Text } from "@chakra-ui/react";
import { gameType } from "../../../types/game-types";

const GameOption: React.FC<{
  game: gameType;
  onClick: (game: gameType) => void;
}> = ({ game, onClick }) => {
  return (
    <Text
      fontSize="1rem"
      color="gray.900"
      _hover={{ color: "teal.300", cursor: "pointer" }}
      onClick={() => onClick(game)}
    >
      {`${game.name} (${game.platform.slug})`}
    </Text>
  );
};

export default GameOption;
