import {
  Text,
  Heading,
  Button,
  Flex,
  Textarea,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

import { useState } from "react";
import validationSchema from "../../form_validation/contact-us/validation-schema";
import TextInput from "../Form/TextInput";
import { Form, Formik, Field, FieldInputProps, FormikProps } from "formik";

function ContactUs() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Flex
      w="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {showAlert && (
        <Alert
          status="success"
          position="absolute"
          top="10px"
          right="10px"
          width="500px"
        >
          <AlertIcon />
          <AlertTitle mr={2}>Success!</AlertTitle>
          <AlertDescription>Your message has been sent.</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setShowAlert(false)}
          />
        </Alert>
      )}

      <Text noOfLines={1} color="teal.500">
        Contact Us
      </Text>
      <Heading as="h1" noOfLines={1}>
        Help & Support
      </Heading>
      <Text noOfLines={1}>Get in touch and let us know how we can help.</Text>

      <Formik
        initialValues={{
          email: "",
          message: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);
          actions.setSubmitting(false);
          values.email = "";
          values.message = "";
        }}
      >
        {(props) => (
          <Form style={{ width: "70%", maxWidth: "600px" }}>
            <Flex
              flexDirection="column"
              mt={4}
              gap="10px"
              justifyContent="center"
              alignItems="center"
              w="100%"
            >
              <TextInput
                name="email"
                placeholder="Email"
                type="email"
                background="white"
              />
              <Field name="message">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<any>;
                }) => (
                  <FormControl
                    isInvalid={
                      form.errors["message"] != "" &&
                      form.errors["message"] != undefined &&
                      form.touched["message"] == true
                    }
                  >
                    <Textarea
                      background="white"
                      placeholder="How can we assist you?"
                      {...field}
                    ></Textarea>
                    <FormErrorMessage>
                      {typeof form.errors["message"] === "string"
                        ? (form.errors["message"] as string)
                        : "Invalid input"}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                textTransform="uppercase"
                isLoading={props.isSubmitting}
                type="submit"
                backgroundColor="teal.500"
                color="white"
                marginTop="10px"
                width="200px"
                _hover={{ backgroundColor: "teal.300" }}
              >
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}

export default ContactUs;
