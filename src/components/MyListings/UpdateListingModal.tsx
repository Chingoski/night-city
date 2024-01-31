import { useState, useContext, useEffect } from "react";
import { listingActionsContext } from "../../context/ListingActionsContext";

import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  Flex,
  Text,
  Icon,
  Image,
  Tooltip,
} from "@chakra-ui/react";

import TextAreaInput from "../UI/TextAreaInput";
import TradePreferenceSelect from "../UI/TradePreferenceSelect";

import { updateListing } from "../../util/update-listing";
import { FaCheckCircle } from "react-icons/fa";
import controller from "../../assets/controller.png";

const UpdateListingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { toUpdateListing } = useContext(listingActionsContext);

  const [didSubmit, setDidSubmit] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState<string>("");
  const [updatedTradePreference, setUpdatedTradePreference] = useState<
    string | null
  >("");

  useEffect(() => {
    setUpdatedDescription(toUpdateListing?.description as string);
    setUpdatedTradePreference(toUpdateListing?.trade_preference as string);
    setFormErrorMessage("");
    setDidSubmit(false);
  }, [toUpdateListing]);

  async function updateListingHandler() {
    if (updatedDescription.length > 20) {
      await updateListing(
        toUpdateListing,
        updatedDescription,
        updatedTradePreference,
        setFormErrorMessage,
        setDidSubmit
      );
    } else {
      setFormErrorMessage("Your listing description is too short!");
    }
  }

  function descriptionUpdateHandler(value: string) {
    setUpdatedDescription(value);
    setFormErrorMessage("");
  }

  function tradePreferenceUpdateHandler(value: string | null) {
    setUpdatedTradePreference(value);
    setFormErrorMessage("");
  }

  function closeModalHandler() {
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.900">Update Listing</ModalHeader>
        <ModalCloseButton colorScheme="teal" />
        {!didSubmit ? (
          <>
            <ModalBody color="gray.900">
              <Tooltip
                label={toUpdateListing?.game.name}
                placement="top"
                bg="gray.600"
              >
                <Text
                  noOfLines={1}
                  textAlign="center"
                  fontWeight="600"
                  w="100%"
                  marginTop="5px"
                  textTransform="uppercase"
                >
                  {toUpdateListing?.game.name} ({toUpdateListing?.platform.slug}
                  )
                </Text>
              </Tooltip>
              <Image
                src={toUpdateListing?.game.thumbnail}
                fallbackSrc={controller}
                w="100%"
                borderRadius="5px"
              />
              <FormControl>
                <TextAreaInput
                  title="Description:"
                  placeholder="What can you tell us about your listing?"
                  value={updatedDescription as string}
                  valueChangeHandler={descriptionUpdateHandler}
                />
                <TradePreferenceSelect
                  selectedTradePreference={updatedTradePreference}
                  selectHandler={tradePreferenceUpdateHandler}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter flexDir="column">
              <Flex w="100%" justifyContent="center">
                <Button
                  colorScheme="teal"
                  mr={3}
                  onClick={updateListingHandler}
                >
                  Update
                </Button>
              </Flex>
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
            </ModalFooter>
          </>
        ) : (
          <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            minH="300px"
            gap="20px"
          >
            <Icon
              as={FaCheckCircle}
              boxSize={10}
              color="teal.300"
              marginBottom="15px"
            />
            <Text>You have successfully updated your listing.</Text>
            <Button
              variant="ghost"
              color="red.400"
              _hover={{ backgroundColor: "red.50" }}
              onClick={closeModalHandler}
            >
              Close
            </Button>
          </Flex>
        )}
      </ModalContent>
    </Modal>
  );
};
export default UpdateListingModal;
