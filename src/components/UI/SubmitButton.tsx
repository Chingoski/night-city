import { Button } from "@chakra-ui/react";
import { FormikProps } from "formik";

function SubmitButton({
  title,
  props,
  onClick,
}: {
  title: string;
  props?: FormikProps<any>;
  onClick?: () => void;
}) {
  return (
    <Button
      textTransform="uppercase"
      isLoading={props?.isSubmitting}
      type="submit"
      background="teal.500"
      color="white"
      _hover={{ backgroundColor: "teal.300" }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}

export default SubmitButton;
