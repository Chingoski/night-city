import * as yup from "yup";

const phoneRegex = /^\+3897\d{7}$/;

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, "Phone number must be in the format +3897XXXXXXX")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  cityId: yup.string().required('You must select a City')
});

export default validationSchema;
