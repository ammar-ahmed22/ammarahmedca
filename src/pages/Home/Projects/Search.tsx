import React, { useState, useEffect } from "react";
import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { IProjectMetadata } from "@ammarahmedca/types";

type SearchProps = {
  projects?: IProjectMetadata[];
  setProjects: React.Dispatch<React.SetStateAction<IProjectMetadata[]>>;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled?: boolean;
};

const Search: React.FC<SearchProps> = ({
  projects,
  setProjects,
  setSearching,
  isDisabled = true,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query !== "" && projects) {
      setSearching(true);
      const queryRegex = new RegExp(query.toLowerCase(), "g");

      setProjects(() => {
        return projects.filter((project) => {
          let match = false;

          // does query match the name
          if (queryRegex.test(project.name.toLowerCase())) {
            match = true;
          }

          // does query match any of the languages
          project.languages?.forEach((language) => {
            if (queryRegex.test(language.toLowerCase())) {
              match = true;
            }
          });

          // does query match any of the frameworks
          project.frameworks?.forEach((framework) => {
            if (queryRegex.test(framework.toLowerCase())) {
              match = true;
            }
          });

          // does query match of any of the types
          project.type?.forEach((item) => {
            if (queryRegex.test(item.toLowerCase())) {
              match = true;
            }
          });

          return match;
        });
      });
    } else if (projects) {
      setProjects(projects);
      setSearching(false);
    }
  }, [query, projects, setProjects, setSearching]);

  const searchIcon = <FontAwesomeIcon icon={faSearch as IconProp} />;

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={searchIcon}
        color="gray.300"
      />
      <Input
        type="text"
        placeholder="Search by name, type, language or framework"
        focusBorderColor="brand."
        onChange={(e) => setQuery(e.target.value)}
        isDisabled={isDisabled}
      />
    </InputGroup>
  );
};

export default Search;
