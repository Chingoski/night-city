import * as yup from "yup";

const phoneRegex = /^\+3897\d{7}$/;

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, "Phone number must be in the format +3897XXXXXXX")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  cityId: yup.string().required('You must select a City'),
  dateOfBirth: yup.date()
  .max(new Date(), 'Date of Birth must be in the past')
  .test(
    'is-over-16',
    'You must be at least 16 years old',
    function (value) {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age >= 16 - 1;
      }

      return age >= 16;
    }
  )
  .required('Date of Birth is required'),
});

export default validationSchema;
