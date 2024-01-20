import { Flex, Button, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Field, Form, Formik, FieldInputProps, FormikProps } from "formik";

import validationSchema from "../../form_validation/register/validation-schema";
import initialValues from "../../form_validation/register/initial-values";

import TextInput from "../Form/TextInput";
import CitySelect from "../UI/CitySelect";

import axios from "axios";
import host from "../../host";
import { useState, useEffect } from "react";

import { submitRegisterData } from "../../util/auth";
import { useNavigate } from "react-router-dom";

const PersonalInformation:React.FC = () => {
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
      w="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
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

          navigate("/");
        }}
      >
        {(props) => (
          <Form style={{ width: "70%", maxWidth: "600px" }}>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              gap="20px"
            >
              <Flex flexDirection="row" width="100%" gap="20px">
                <TextInput
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  background="white"
                />
                <TextInput
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  background="white"
                />
              </Flex>

              <TextInput
                name="email"
                placeholder="Email"
                type="text"
                background="white"
              />
              <TextInput
                name="phoneNumber"
                placeholder="Phone Number"
                type="text"
                background="white"
              />
              <TextInput
                name="dateOfBirth"
                placeholder="mm/dd/yyyy"
                type="date"
                background="white"
              />
              <TextInput
                name="address"
                placeholder="Address"
                type="text"
                background="white"
              />
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
                    <CitySelect
                      cities={cities}
                      field={field}
                      background="white"
                    />
                    <FormErrorMessage> {form.errors.cityId}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
                background="teal.500"
                color="white"
              >
                Update
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}

export default PersonalInformation;
