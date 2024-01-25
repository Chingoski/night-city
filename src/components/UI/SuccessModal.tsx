import { Flex, Link, Text, Icon } from "@chakra-ui/react";

import { FaCheckCircle } from "react-icons/fa";

const SuccessModal: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Flex
      w="50%"
      maxW="500px"
      minH="300px"
      backgroundColor="white"
      borderRadius="10px"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      color="gray.00"
      textAlign="center"
      p="50px"
      fontSize="1.1rem"
      gap="10px"
    >
      <Icon
        as={FaCheckCircle}
        boxSize={10}
        color="teal.300"
        marginBottom="15px"
      />
      <Text>{message} </Text>
      <Text>
        Go back to{" "}
        <Link fontWeight="600" href="/" color="teal.300">
          all listings
        </Link>
        .
      </Text>
    </Flex>
  );
};

export default SuccessModal;
