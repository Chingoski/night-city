import {
  Flex,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";
import { Field, Form, Formik, FieldInputProps, FormikProps } from "formik";

import validationSchema from "../../form_validation/register/validation-schema";
import initialValues from "../../form_validation/register/initial-values";

import TextInput from "../Form/TextInput";
import PasswordInput from "../Form/PasswordInput";
import CitySelect from "../UI/CitySelect";

import { useLoaderData } from "react-router-dom";
import { cityType } from "../../types/city-types";

function SignUp() {
  const cities = useLoaderData() as cityType[];

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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
              <TextInput name="firstName" placeholder="First Name" />
              <TextInput name="lastName" placeholder="Last Name" />
              <TextInput name="email" placeholder="Email" />
              <TextInput name="phoneNumber" placeholder="Phone Number" />
              <TextInput name="address" placeholder="Address" />
              <Field name="cityId">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<{ cityId: string }>;
                }) => (
                  <FormControl
                    id="cityId"
                    isInvalid={
                      form.errors.cityId != "" &&
                      form.errors.cityId != undefined &&
                      form.touched.cityId
                    }
                  >
                    <CitySelect cities={cities} field={field} />
                    <FormErrorMessage> {form.errors.cityId}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <PasswordInput name="password" placeholder="Password" />
              <PasswordInput
                name="confirmPassword"
                placeholder="Confirm Password"
              />
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
                Register
              </Button>

              <Text textAlign="center" fontSize="0.9rem">
                Already have an account?{" "}
                <Link
                  href="/auth?mode=sigin"
                  textDecoration="underline"
                  _hover={{ color: "cyan.400" }}
                >
                  Sign In
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

export default SignUp;
