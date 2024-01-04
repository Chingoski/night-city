import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";


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

export async function loader() {
  const response = await axios.get(
    "https://2ba0-77-29-41-231.ngrok-free.app/api/cities",
    {
      headers: {
        Authorization:
          "Bearer 1|INc0igPkdcEo4b2TivdSnawKyypb8NVnd17UCxqG5a33f09c",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    }
  );

  return response.data.data;
}
