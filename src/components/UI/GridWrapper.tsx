import { SimpleGrid } from "@chakra-ui/react";

const GridWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SimpleGrid
      mt="10px"
      minChildWidth="300px"
      spacing="15px"
      sx={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {children}
    </SimpleGrid>
  );
};

export default GridWrapper;
