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

import controller from "../../assets/game-controller-outline.svg";

import { listingType } from "../../types/listing-type";

const ListingCard: React.FC<{ listing: listingType; page?: string }> = ({
  listing,
  page,
}) => {
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
      <CardBody p="0" w="100%">
        <Flex
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Image
            src={listing.game.thumbnail}
            fallbackSrc={controller}
            alt={listing.game.name}
            width="100%"
            height="300px"
            objectFit="cover"
          />
          <Tooltip label={listing.game.name} placement="top" bg="gray.600">
            <Text
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
          <Wrap
            spacing="10px"
            justify="center"
            marginTop="10px"
            padding="0 5px"
          >
            <WrapItem>
              <Badge bg="teal.300">{listing.trade_preference}</Badge>
            </WrapItem>
            <WrapItem>
              <Badge bg="purple.400">{listing.platform.slug}</Badge>
            </WrapItem>
            {listing.game.genres.map((genre) => (
              <WrapItem key={genre.id}>
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
        {page !== "my-listings" && <Button>Trade</Button>}
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
