import { Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Field, FieldInputProps, FormikProps } from "formik";

function PasswordInput(props: {
  name: string;
  placeholder: string;
  background?: string;
}) {
  let name = props.name;
  let placeholder = props.placeholder;
  const backgroundStyle = props.background
    ? { background: props.background }
    : {};

  return (
    <Field name={name}>
      {({
        field,
        form,
      }: {
        field: FieldInputProps<string>;
        form: FormikProps<any>;
      }) => (
        <FormControl
          isInvalid={
            form.errors[name] != "" &&
            form.errors[name] != undefined &&
            form.touched[name] == true
          }
        >
          <Input
            {...field}
            placeholder={placeholder}
            type="password"
            {...backgroundStyle}
            focusBorderColor="teal.300"
          />
          <FormErrorMessage>
            {" "}
            {typeof form.errors[name] === "string"
              ? (form.errors[name] as string)
              : "Invalid input"}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

export default PasswordInput;
