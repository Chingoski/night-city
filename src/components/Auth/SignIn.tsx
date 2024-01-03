import { Flex, Input, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <Flex
      bg="white"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      w="20%"
      minW="400px"
      gap="20px"
      p="50px"
      borderRadius="15px"
      boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
    >
      <Text>Sign In</Text>

      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Flex flexDirection="row" justifyContent="space-between" w="100%">
        <Button textTransform="uppercase">Sign In</Button>
        <Button textTransform="uppercase" bg="none">
          <Link to="?mode=register">Register</Link>
        </Button>
      </Flex>
    </Flex>
  );
}

export default SignIn;
