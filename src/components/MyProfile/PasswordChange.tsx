import { Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { resetPassword } from "../../util/my-profile";
import { useState } from "react";

import SuccessAlert from "../UI/SuccessAlert";
import validationSchema from "../../form_validation/my-profile/change-password-validation-schema";

import SubmitButton from "../UI/SubmitButton";
import PasswordInput from "../Form/PasswordInput";

function PasswordChange() {
  const [showAlert, setShowAlert] = useState(false);

  const initialData = {
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
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
          description="Your profile information has been updated."
          onClickFunction={setShowAlert}
        />
      )}

      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          resetPassword(values.currentPassword, values.newPassword, values.newPasswordConfirmation);
          
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);
          
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
              <PasswordInput
                name="currentPassword"
                placeholder="Current Password"
                background="white"
              />
              <PasswordInput
                name="newPassword"
                placeholder="New Password"
                background="white"
              />
              <PasswordInput
                name="newPasswordConfirmation"
                placeholder="Confirm New Password"
                background="white"
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
              <SubmitButton title="Change Password" props={props} />
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}

export default PasswordChange;
