import { useContext } from "react";
import { listingActionsContext } from "../../context/ListingActionsContext";

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Tooltip,
  Text,
  Wrap,
  WrapItem,
  Badge,
  CardHeader,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";

import { listingType } from "../../types/listing-type";
import controller from "../../assets/controller.png";
import { FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

const OngoingListingsCard: React.FC<{
  listing: listingType;
  deleteHandler: () => void;
  updateHandler: () => void;
}> = ({ listing, deleteHandler, updateHandler }) => {
  const { setToDeleteListing, setToUpdateListing } = useContext(
    listingActionsContext
  );

  function onDelete() {
    setToDeleteListing(listing);
    deleteHandler();
  }

  function onUpdate() {
    setToUpdateListing(listing);
    updateHandler();
  }

  return (
    <Card maxW="md" justify="center">
      <CardHeader m="0">
        <Tooltip label={listing.game.name} placement="top" bg="gray.600">
          <Text
            p="0 5px"
            noOfLines={1}
            textAlign="center"
            fontWeight="600"
            w="100%"
            marginTop="5px"
            textTransform="uppercase"
          >
            {listing.game.name}
          </Text>
        </Tooltip>
        <Wrap spacing="10px" justify="center" marginTop="10px" padding="0 5px">
          <WrapItem>
            <Badge bg="teal.300">{listing.trade_preference}</Badge>
          </WrapItem>
          <WrapItem>
            <Badge bg="purple.400">{listing.platform.slug}</Badge>
          </WrapItem>
        </Wrap>
      </CardHeader>
      <CardBody p="0" w="100%">
        <Image
          src={listing.game.thumbnail}
          fallbackSrc={controller}
          alt={listing.game.name}
          width="100%"
          height="300px"
          objectFit="cover"
        />

        <Tooltip label={listing.description}>
          <Text
            noOfLines={2}
            textAlign="center"
            fontSize="1rem"
            p="10px 5px 0 5px"
          >
            {listing.description}
          </Text>
        </Tooltip>
      </CardBody>
      <CardFooter>
        <Flex w="100%" justifyContent="space-evenly">
          <Button
            borderColor="teal.400"
            variant="outline"
            _hover={{ backgroundColor: "teal.50" }}
            onClick={onUpdate}
          >
            <Icon as={FaPenToSquare} color="teal.400" />
            <Text ml="5px" color="teal.400">
              Update
            </Text>
          </Button>
          <Button
            borderColor="red.400"
            variant="outline"
            _hover={{ backgroundColor: "red.50" }}
            onClick={onDelete}
          >
            <Icon as={FaTrash} color="red.400" />
            <Text ml="5px" color="red.400">
              Delete
            </Text>
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default OngoingListingsCard;
