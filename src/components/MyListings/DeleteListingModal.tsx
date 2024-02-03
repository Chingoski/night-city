import { useContext } from "react";
import { listingActionsContext } from "../../context/ListingActionsContext";
import { deleteMyListing } from "../../util/delete-listing";
import { listingType } from "../../types/listing-type";

import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

const DeleteListingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  removeListing: (toDeleteListing: listingType | null) => void;
}> = ({ isOpen, onClose, removeListing }) => {
  const { toDeleteListing } = useContext(listingActionsContext);

  function deleteListingHandler() {
    deleteMyListing(toDeleteListing as listingType);
    onClose();
    removeListing(toDeleteListing);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.900">Delete Listing</ModalHeader>
        <ModalCloseButton colorScheme="teal" />
        <ModalBody color="gray.900">
          Are you sure you want to delete your listing for{" "}
          <Text display="inline" fontWeight="600" color="teal.700">
            {toDeleteListing?.game.name}
          </Text>
          ?
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClose}>
            No
          </Button>
          <Button
            variant="ghost"
            color="red.400"
            _hover={{ backgroundColor: "red.50" }}
            onClick={deleteListingHandler}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteListingModal;
