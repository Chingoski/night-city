import { Flex, Input, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SignUp() {
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
      <Text>Register</Text>
      <Input placeholder="First Name" />
      <Input placeholder="Last Name" />

      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Input placeholder="Confirm password" type="password" />

      <Flex flexDirection="row" justifyContent="space-between" w="100%">
        <Button textTransform="uppercase">Register</Button>
        <Button textTransform="uppercase" bg="none">
          <Link to="?mode=signin">Sign In</Link>
        </Button>
      </Flex>
    </Flex>
  );
}

export default SignUp;
