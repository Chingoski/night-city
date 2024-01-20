import { Flex, Button, Text, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import validationSchema from "../../form_validation/sign-in/validation-schema";

import { submitLoginData } from "../../util/auth";
import { useNavigate } from "react-router-dom";

import TextInput from "../Form/TextInput";
import PasswordInput from "../Form/PasswordInput";
import SubmitButton from "../UI/SubmitButton";

function SignIn() {
  const navigate = useNavigate();

  return (
    <Flex
      bg="white"
      w="20%"
      minW="400px"
      p="50px"
      borderRadius="15px"
      boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      gap="20px"
    >
      <Text>Sign In</Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          await submitLoginData(values.email, values.password);

          actions.setSubmitting(false);

          navigate("/");
        }}
      >
        {(props) => (
          <Form>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              gap="20px"
            ></Flex>

            <Flex
              flexDirection="column"
              mt={4}
              gap="10px"
              justifyContent="center"
              alignItems="center"
              w="100%"
            >
              <TextInput name="email" placeholder="Email" type="email" />
              <PasswordInput name="password" placeholder="Password" />
              <SubmitButton title="Sign In" props={props}></SubmitButton>
              <Text textAlign="center" fontSize="0.9rem">
                Don't have an account yet?{" "}
                <Link
                  href="/auth?mode=register"
                  textDecoration="underline"
                  _hover={{ color: "cyan.400" }}
                >
                  Register
                </Link>
                .
              </Text>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}

export default SignIn;
