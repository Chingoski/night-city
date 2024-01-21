import { Text, Box } from "@chakra-ui/react";

const TradeTip: React.FC<{
  title: string;
  tip: string;
  align?: string;
}> = ({ title, tip, align }) => {
  return (
    <Box fontSize="1rem" textAlign={align === "left" ? "left" : "center"}>
      <Text fontWeight="600" color="teal.500" textTransform="capitalize">
        {title}
      </Text>
      <Text>{tip}</Text>
    </Box>
  );
};

export default TradeTip;
