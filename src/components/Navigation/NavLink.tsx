import { Text, Link } from "@chakra-ui/react";
import { ReactElement } from "react";

const NavigationLink: React.FC<{
  path: string;
  title: string;
  isCollapsed: boolean;
  icon: ReactElement;
}> = ({ path, title, isCollapsed, icon }) => {
  return (
    <Link
      href={path}
      w="100%"
      p="10px"
      marginLeft="10px"
      textTransform="capitalize"
      _hover={{ textDecoration: "none", color: "teal.300" }}
      alignItems="center"
      flexDirection="row"
      display="flex"
      gap="5px"
    >
      {icon}
      <Text display={isCollapsed ? "none" : "block"}>{title}</Text>
    </Link>
  );
};

export default NavigationLink;
