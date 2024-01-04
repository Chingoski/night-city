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

import axios from "axios";
import host from "../../host";
import { useState, useEffect } from "react";

import { submitRegisterData } from "../../util/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [cities, setCities] = useState([]);

  const fetchCities = async () => {
    const response = await axios.get(`${host}/api/cities`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.status !== 200) {
      setCities([]);
    }

    setCities(response.data.data);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const navigate = useNavigate();

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
        onSubmit={async (values, actions) => {
          await submitRegisterData(
            values.firstName,
            values.lastName,
            values.email,
            values.phoneNumber,
            values.dateOfBirth,
            values.address,
            values.cityId,
            values.password,
            values.confirmPassword
          );

          actions.setSubmitting(false);

          navigate('/');
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
              <TextInput
                name="firstName"
                placeholder="First Name"
                type="text"
              />
              <TextInput name="lastName" placeholder="Last Name" type="text" />
              <TextInput name="email" placeholder="Email" type="text" />
              <TextInput
                name="phoneNumber"
                placeholder="Phone Number"
                type="text"
              />
              <TextInput
                name="dateOfBirth"
                placeholder="mm/dd/yyyy"
                type="date"
              />
              <TextInput name="address" placeholder="Address" type="text" />
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
