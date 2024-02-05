import { Menu, MenuItem, MenuList, MenuButton, Button } from "@chakra-ui/react";

import { option } from "../../types/option-types";

import { FaChevronDown } from "react-icons/fa";

const StatusMenuSelect: React.FC<{
  selectedStatus: number;
  selectStatusHandler: (status: number) => void;
}> = ({ selectedStatus, selectStatusHandler }) => {
  const statusOptions: option[] = [
    { id: 0, name: "Pending" },
    { id: 1, name: "Accepted" },
    { id: 2, name: "Completed" },
  ];
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<FaChevronDown />}
        textAlign="left"
        backgroundColor="white"
        color="gray.600"
        fontWeight="400"
        fontSize="1rem"
      >
        {statusOptions[selectedStatus].name}
      </MenuButton>
      <MenuList w="100%">
        {statusOptions.map(
          (status) =>
            status.id !== selectedStatus && (
              <MenuItem
                fontSize="1rem"
                key={status.id}
                onClick={() => selectStatusHandler(status.id)}
              >
                {status.name}
              </MenuItem>
            )
        )}
      </MenuList>
    </Menu>
  );
};

export default StatusMenuSelect;
