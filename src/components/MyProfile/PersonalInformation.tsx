import { Flex, Button, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Field, Form, Formik, FieldInputProps, FormikProps } from "formik";
import { useLoaderData } from "react-router-dom";
import { updateUser } from "../../util/my-profile";
import { useState, useEffect } from "react";
import { userType } from "../../types/user-types";

import SuccessAlert from "../UI/SuccessAlert";
import validationSchema from "../../form_validation/my-profile/validation-schema";
import TextInput from "../Form/TextInput";
import CitySelect from "../UI/CitySelect";

import axios from "axios";
import host from "../../host";
import SubmitButton from "../UI/SubmitButton";

const formatDate = function (inputDate: string) {
  const parts = inputDate.split("/");

  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  return `${year}-${month}-${day}`;
};

const PersonalInformation: React.FC = () => {
  const [cities, setCities] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const authUser = useLoaderData() as userType;

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

  const initialData = {
    firstName: authUser.first_name,
    lastName: authUser.last_name,
    email: authUser.email,
    phoneNumber: authUser.phone_number,
    address: authUser.address,
    cityId: `${authUser.city_id}`,
    dateOfBirth: formatDate(authUser.date_of_birth),
  };

  return (
    <Flex
      w="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {showAlert && (
        <SuccessAlert
          title="Success!"
          description="Your user has been updated."
          onClickFunction={setShowAlert}
        />
      )}

      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);

          await updateUser(
            authUser.id,
            values.firstName,
            values.lastName,
            values.email,
            values.phoneNumber,
            values.dateOfBirth,
            values.address,
            values.cityId
          );

          actions.setSubmitting(false);
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
              <SubmitButton title="Update" props={props}/>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default PersonalInformation;
