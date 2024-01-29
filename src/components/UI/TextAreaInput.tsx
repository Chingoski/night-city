import { ChangeEvent, useState } from "react";
import { Textarea, Text, Flex } from "@chakra-ui/react";

const TextAreaInput: React.FC<{
  title: string;
  placeholder: string;
  value: string;
  valueChangeHandler: (value: string) => void;
}> = ({ title, placeholder, value, valueChangeHandler }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function textAreaChangeHandler(event: ChangeEvent<HTMLTextAreaElement>) {
    valueChangeHandler(event.target.value);
    if (event.target.value.length < 20) {
      setErrorMessage("Your description seems kind of short");
      setIsInvalid(true);
    }
    if (event.target.value.length >= 20) {
      setErrorMessage("");
      setIsInvalid(false);
    }
  }

  return (
    <Flex flexDir="column" w="100%">
      <Text fontSize="1rem" fontWeight="600" w="100%" mb="10px">
        {title}
      </Text>
      <Textarea
        value={value}
        isInvalid={isInvalid}
        backgroundColor="white"
        placeholder={placeholder}
        focusBorderColor="teal.300"
        onChange={textAreaChangeHandler}
        id="description"
      />
      {isInvalid && (
        <Text w="100%" fontSize="0.9rem" color="red.500">
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
};

export default TextAreaInput;
