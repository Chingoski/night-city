import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

import { FaDollarSign } from "react-icons/fa6";

const CashInput: React.FC<{
  onChange: (value: number) => void;
}> = ({ onChange }) => {
  function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    onChange(+event.target.value);
  }

  return (
    <Flex w="100%" marginTop="20px">
      <FormControl>
        <FormLabel> Cash I'm offering for trade: </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaDollarSign} color="gray.600" />
          </InputLeftElement>
          <Input
            onChange={inputChangeHandler}
            type="number"
            placeholder="Enter amount"
          />
        </InputGroup>
      </FormControl>
    </Flex>
  );
};

export default CashInput;