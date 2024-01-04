import {
  Flex,
  Input,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";

import { Field, Form, Formik, FieldInputProps, FormikProps } from "formik";
import validationSchema from "../../form_validation/sign-in/validation-schema";

import TextInput from "../Form/TextInput";
import PasswordInput from "../Form/PasswordInput";

function SignIn() {
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
        //toDo Integrate axios with router actions
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              gap="20px"
            >          
              <TextInput name="email" placeholder="Email"/>
              <PasswordInput name="password" placeholder="Password"/>
            </Flex>

            <Flex
              flexDirection="column"
              mt={4}
              gap="10px"
              justifyContent="center"
              alignItems="center"
              w="100%"
            >
              <Button
                textTransform="uppercase"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Sign In
              </Button>
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
