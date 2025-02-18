import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuGroup,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ListFilterPlusIcon, CheckIcon } from "lucide-react";

export type FilterProps = {
  allTypes: string[];
  allLanguages: string[];
  allFrameworks: string[];
  filteredTypes: Set<string>;
  filteredLanguages: Set<string>;
  filteredFrameworks: Set<string>;
  onSelectType: (type: string) => void;
  onSelectFramework: (framework: string) => void;
  onSelectLanguage: (language: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function Filter({
  allTypes,
  allLanguages,
  allFrameworks,
  filteredTypes,
  filteredLanguages,
  filteredFrameworks,
  onSelectType,
  onSelectLanguage,
  onSelectFramework,
  open,
  onOpenChange,
}: FilterProps) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger>
        <Button variant="ghost" asChild>
          <div>
            <ListFilterPlusIcon /> Filter
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Type</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandInput
                  placeholder="Filter types..."
                  autoFocus
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No type found.</CommandEmpty>
                  <CommandGroup>
                    {allTypes.map((type) => {
                      return (
                        <CommandItem
                          key={`type-${type}`}
                          onSelect={() => onSelectType(type)}>
                          {filteredTypes.has(type) ? (
                            <CheckIcon />
                          ) : null}
                          {type}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Language</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandInput
                  placeholder="Filter languages..."
                  autoFocus
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup>
                    {allLanguages.map((language) => {
                      return (
                        <CommandItem
                          key={`language-${language}`}
                          onSelect={() => onSelectLanguage(language)}>
                          {filteredLanguages.has(language) ? (
                            <CheckIcon />
                          ) : null}
                          {language}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Framework</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Command>
                <CommandInput
                  placeholder="Filter frameworks..."
                  autoFocus
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {allFrameworks.map((framework) => {
                      return (
                        <CommandItem
                          key={`type-${framework}`}
                          onSelect={() =>
                            onSelectFramework(framework)
                          }>
                          {filteredFrameworks.has(framework) ? (
                            <CheckIcon />
                          ) : null}
                          {framework}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
