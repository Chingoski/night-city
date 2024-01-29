import { useContext } from "react";
import { deleteListingContext } from "../../context/DeleteListingContext";

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
import { deleteListing } from "../../util/delete-listing";
import { listingType } from "../../types/listing-type";

const DeleteListingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  removeListing: (deletedListing: listingType | null) => void;
}> = ({ isOpen, onClose, removeListing }) => {
  const { listing } = useContext(deleteListingContext);

  function deleteListingHandler() {
    deleteListing(listing as listingType);
    onClose();
    removeListing(listing);
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
            {listing?.game.name}
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
