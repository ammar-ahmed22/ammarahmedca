import React, { useState, useEffect } from "react";
import { 
  Select,
  SelectItem,
  SelectProps,
  SelectSection
} from "@nextui-org/react"
import { TrashIcon } from "@heroicons/react/24/solid";

type FilterOptions = {
  label: React.ReactNode,
  value: string
}

export type FilterProps = {
  options: FilterOptions[],
  multiSelect?: boolean,
  includeClear?: boolean,
  onSelectionChange?: (values: string[]) => void
} & Omit<SelectProps, "selectionMode" | "selectedKeys" | "onSelectionChange" | "children" | "onChange">

const Filter: React.FC<FilterProps> = ({
  options,
  multiSelect = false,
  includeClear = false,
  onSelectionChange,
  ...others
}) => {
  const [selected, setSelected] = useState(new Set<string>([]));

  useEffect(() => {
    if (onSelectionChange) onSelectionChange([...selected.values()]);
  }, [selected, onSelectionChange])

  return (
    <Select
      selectionMode={multiSelect ? "multiple" : "single"}
      selectedKeys={selected}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        const values = e.target.value.split(",");
        if (includeClear && values.includes("clear")) {
          setSelected(new Set())
          return;
        }
        setSelected(new Set(values))
      }}
      {...others}
    > 
      <SelectSection
        className={`${!includeClear ? "hidden" : ""}`}
        showDivider
      >
        <SelectItem
          key="clear"
          value="clear"
          startContent={<TrashIcon className="size-4" />}
        >
          Clear
        </SelectItem>
      </SelectSection>
      <SelectSection>
      {
        options.map((option) => {
          return (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          )
        })
      }
      </SelectSection>
    </Select>
  )
}

export default Filter;