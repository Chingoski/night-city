import { Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Field, FieldInputProps, FormikProps } from "formik";

function PasswordInput(props: {name: string, placeholder: string}) {
    let name = props.name;
    let placeholder = props.placeholder;

    return (
        <Field name={name}>
            {({
                field,
                form,
            }: {
                field: FieldInputProps<string>;
                form: FormikProps<any>; // Changed to 'any' to handle dynamic field names
            }) => (
                <FormControl
                    isInvalid={
                        form.errors[name] && form.touched[name]
                    }
                >
                    <Input {...field} placeholder={placeholder} type="password"/> 
                    {/* Use name for placeholder, or customize as needed */}
                    <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
}


export default PasswordInput;
