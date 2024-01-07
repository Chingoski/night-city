import {
  Card,
  CardHeader,
  Flex,
  Box,
  Heading,
  Text,
  CardBody,
  Image,
  CardFooter,
  Button,
  Avatar,
  Badge,
  Wrap,
  WrapItem,
  Tooltip,
} from "@chakra-ui/react";
import { listingType } from "../../types/listing-type";

const ListingCard: React.FC<{ listing: listingType }> = ({ listing }) => {
  return (
    <Card maxW="md" justify="center">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name={listing.owner.first_name + " " + listing.owner.last_name}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
            />
            <Box>
              <Heading size="sm">
                {listing.owner.first_name} {listing.owner.last_name}
              </Heading>
              <Text fontSize="sm">{listing.owner.city.name}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Image
            src={listing.game.thumbnail}
            fallbackSrc="data:image/png;base64,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"
            alt={listing.game.name}
            boxSize="240px"
            objectFit="cover"
            borderRadius="md"
          />
          <Tooltip label={listing.game.name} placement="top" bg="gray.600">
            <Text
              noOfLines={1}
              textAlign="center"
              fontWeight="600"
              w="240px"
              marginTop="5px"
              textTransform="uppercase"
            >
              {listing.game.name}
            </Text>
          </Tooltip>
          <Wrap spacing="10px" justify="center" marginTop="10px">
            <WrapItem>
              <Badge bg="teal.300">{listing.trade_preference}</Badge>
            </WrapItem>
            <WrapItem>
              <Badge bg="purple.400">{listing.platform.slug}</Badge>
            </WrapItem>
            {listing.game.genres.map((genre) => (
              <WrapItem>
                <Badge bg="blue.50">{genre.name}</Badge>
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
      </CardBody>

      <CardFooter
        justify="center"
        sx={{
          "& > button": {
            minW: "70%",
          },
        }}
      >
        <Button>Trade</Button>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
