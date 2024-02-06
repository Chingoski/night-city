import { Text } from "@chakra-ui/react";

const NoResultsMessage: React.FC<{ resultType: string }> = ({ resultType }) => {
  return (
    <Text w="100%" margin="auto" textAlign="center">
      No {resultType} found.
    </Text>
  );
};

export default NoResultsMessage;
