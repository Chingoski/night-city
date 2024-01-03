import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

import SignIn from "../../components/Auth/SignIn";
import SignUp from "../../components/Auth/SignUp";

function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isRegister = searchParams.get("mode") === "register";
  return (
    <Flex
      flexDirection="column"
      w="100%"
      h="100dvh"
      bg="gray.100"
      justifyContent="center"
      alignItems="center"
      fontFamily="var(--primary-font)"
      fontSize="1.2rem"
      color="gray.700"
    >
      {isRegister ? <SignUp /> : <SignIn />}
    </Flex>
  );
}

export default AuthPage;
