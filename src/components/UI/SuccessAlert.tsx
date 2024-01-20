import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

function SuccessAlert({
  title,
  description,
  onClickFunction,
}: {
  title: string;
  description: string;
  onClickFunction: (isClicked: boolean) => void;
}) {
  return (
    <Alert
      status="success"
      position="absolute"
      top="10px"
      right="10px"
      width="auto"
      background="teal.100"
    >
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <CloseButton
        onClick={() => onClickFunction(false)}
      />
    </Alert>
  );
}

export default SuccessAlert;
