import { Button, Icon, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const AddButton: React.FC<{ title: string; onClick: () => void }> = ({
  title,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      background="teal.500"
      color="white"
      _hover={{ backgroundColor: "teal.300" }}
    >
      <Icon as={FaPlus} />
      <Text ml="10px" textTransform="uppercase" fontSize="0.9rem">
        {title}
      </Text>
    </Button>
  );
};

export default AddButton;
