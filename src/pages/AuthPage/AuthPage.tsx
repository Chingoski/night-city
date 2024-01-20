import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import host from "../../host";

import SignIn from "../../components/Auth/SignIn";
import SignUp from "../../components/Auth/SignUp";

function AuthPage() {
  const [searchParams, _setSearchParams] = useSearchParams();
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

export async function loader() {
  const response = await axios.get(`${host}/api/cities`, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  return response.data.data;
}
