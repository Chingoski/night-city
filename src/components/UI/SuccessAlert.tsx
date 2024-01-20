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
      width="500px"
    >
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => onClickFunction(false)}
      />
    </Alert>
  );
}

export default SuccessAlert;
