import { Button } from "@chakra-ui/react";
import { FormikProps } from "formik";

function SubmitButton({title, props} : {title: string, props: FormikProps<any>}) {
  return (
    <Button
      textTransform="uppercase"
      isLoading={props.isSubmitting}
      type="submit"
      background="teal.500"
      color="white"
      _hover={{ backgroundColor: "teal.300" }}
    >
      {title}
    </Button>
  );
}

export default SubmitButton;
