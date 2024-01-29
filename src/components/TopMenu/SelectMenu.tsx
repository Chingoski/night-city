import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { option } from "../../types/option-types";

const SelectMenu: React.FC<{
  name: string;
  options: option[];
  icon: ReactElement;
  isActive: boolean;
  activeId: number | undefined;
  onChange: (value: number) => void;
  sortingMenu: boolean;
}> = ({ name, options, icon, isActive, activeId, onChange, sortingMenu }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={icon}
        backgroundColor={isActive ? "teal.300" : "white"}
        color="gray.600"
        fontSize="1.5rem"
      />
      <MenuList maxH="500px" overflowY="auto" fontSize="1rem">
        {sortingMenu ? (
          <MenuItem value={0} onClick={() => onChange(0)}>
            Sort by:
          </MenuItem>
        ) : (
          <MenuItem value={0} onClick={() => onChange(0)}>
            Filter by {name}:
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            onClick={() => onChange(option.id)}
            backgroundColor={
              activeId === option.id ? "teal.100" : "transparent"
            }
            textTransform="capitalize"
          >
            {option.name} {sortingMenu && "order"}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SelectMenu;
