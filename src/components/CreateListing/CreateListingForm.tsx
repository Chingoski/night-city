import { FormControl, Flex, Text } from "@chakra-ui/react";
import GamesPicker from "../UI/GamesPicker/GamesPicker";
import SubmitButton from "../UI/SubmitButton";
import TextAreaInput from "../UI/TextAreaInput";
import TradePreferenceSelect from "../UI/TradePreferenceSelect";

const CreateListingForm: React.FC<{
  selectedTradePreference: string | null;
  formErrorMessage: string;
  setFormErrorMessage: (formErrorMessage: string) => void;
  listingDescription: string;
  descriptionHandler: (value: string) => void;
  tradePreferenceHandler: (tradePreference: string | null) => void;
  createListingHandler: () => void;
}> = ({
  selectedTradePreference,
  formErrorMessage,
  setFormErrorMessage,
  listingDescription,
  descriptionHandler,
  tradePreferenceHandler,
  createListingHandler,
}) => {
  return (
    <FormControl
      w="100%"
      maxW="600px"
      display="flex"
      flexDir="column"
      justifyContent="flex-start"
      alignItems="center"
      gap="20px"
    >
      <GamesPicker
        maxGames={1}
        title="Game I want to list:"
        setFormErrorMessage={setFormErrorMessage}
      />
      <TextAreaInput
        title="Description:"
        placeholder="What can you tell us about your listing?"
        value={listingDescription}
        valueChangeHandler={descriptionHandler}
      />
      <TradePreferenceSelect
        selectHandler={tradePreferenceHandler}
        selectedTradePreference={selectedTradePreference}
      />

      <Flex
        w="100%"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        marginTop="30px"
      >
        <SubmitButton title="List Game" onClick={createListingHandler} />
        {formErrorMessage !== "" && (
          <Text
            fontSize="0.9rem"
            color="red.500"
            marginTop="10px"
            textAlign="center"
            w="80%"
          >
            {formErrorMessage}
          </Text>
        )}
      </Flex>
    </FormControl>
  );
};

export default CreateListingForm;
