import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  message: yup
    .string()
    .min(50, "You should describe your problem/issue in more detail")
    .required("Message is required"),
});

export default validationSchema;
