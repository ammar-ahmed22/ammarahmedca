import React from "react";
import {
  Menu,
  MenuProps,
  MenuButton,
  ButtonProps,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type FilterMenuProps = {
  options: string[];
  filterSet: Set<string>;
  setFilterSet: React.Dispatch<React.SetStateAction<Set<string>>>;
  buttonProps?: ButtonProps;
  buttonChildren?: React.ReactNode;
  menuProps?: Omit<MenuProps, "children">;
};

const FilterMenu: React.FC<FilterMenuProps> = ({
  options,
  filterSet,
  setFilterSet,
  buttonProps,
  menuProps,
  buttonChildren,
}) => {
  return (
    <Menu {...menuProps}>
      <MenuButton as={Button} {...buttonProps}>
        {buttonChildren}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          type="checkbox"
          value={[...filterSet.values()]}
          onChange={(value) => {
            setFilterSet(new Set(value));
          }}
        >
          {options.map((option) => {
            return (
              <MenuItemOption key={option} value={option}>
                {option}
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
        <MenuDivider />
        <MenuItem icon={<DeleteIcon />} onClick={() => setFilterSet(new Set())}>
          Clear All
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FilterMenu;
