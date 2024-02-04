import {
  Input,
  FormControl,
  FormErrorMessage,
  background,
} from "@chakra-ui/react";
import { Field, FieldInputProps, FormikProps } from "formik";

function TextInput(props: {
  name: string;
  placeholder: string;
  type: string;
  background?: string;
}) {
  const name = props.name;
  const placeholder = props.placeholder;
  const type = props.type;

  const backgroundStyle = background ? { background: props.background } : {};

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
            w="100%"
            {...field}
            placeholder={placeholder}
            type={type}
            {...backgroundStyle}
          />
          <FormErrorMessage>
            {typeof form.errors[name] === "string"
              ? (form.errors[name] as string)
              : "Invalid input"}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

export default TextInput;
