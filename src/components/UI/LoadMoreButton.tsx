import { Button } from "@chakra-ui/react";

const LoadMoreButton: React.FC<{ loadMoreHandler: () => void }> = ({
  loadMoreHandler,
}) => {
  return (
    <Button
      bg="gray.200"
      _hover={{ bg: "gray.300" }}
      w="200px"
      margin="auto"
      onClick={loadMoreHandler}
    >
      Load More
    </Button>
  );
};

export default LoadMoreButton;
