import { Flex, Box, Link } from "@chakra-ui/react";

function ErrorPage() {
  return (
    <Flex
      flexDirection="column"
      w="100%"
      h="100dvh"
      bg="gray.100"
      justifyContent="center"
      alignItems="center"
      fontFamily="var(--primary-font)"
      fontSize="1.2rem"
      color="gray.700"
    >
      <Flex
        bg="white"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p="100px"
        borderRadius="15px"
        boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      >
        <Box fontSize="1.5rem" fontWeight="500">
          Whoops! Something went wrong...
        </Box>
        <Box>
          Try going back to{" "}
          <Link
            href="/"
            color="cyan.700"
            _hover={{ textDecoration: "none", color: "cyan.400" }}
          >
            all listings
          </Link>
          .
        </Box>
      </Flex>
    </Flex>
  );
}

export default ErrorPage;
