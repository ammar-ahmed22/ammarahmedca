import React, { useState, useEffect } from 'react';
import { InputGroup, Input, InputLeftElement, useColorModeValue } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ projects, setProjects }) => {

    const [query, setQuery] = useState("");


    useEffect(() => {
        if (query !== ""){
            
            const queryRegex = new RegExp(query, "g");

            setProjects( () => {
                
                return projects.filter( project => {
                    let match = false;
    
                    // does query match the name
                    if (queryRegex.test(project.name)){
                        match = true
                    }
    
                    // does query match any of the languages
                    project.languages.forEach( language => {
                        if (queryRegex.test(language)){
                            match = true
                        }
                    })
    
                    // does query match any of the frameworks
                    project.frameworks.forEach( framework => {
                        if (queryRegex.test(framework)){
                            match = true
                        }
                    })
    
                    // does query match of any of the types
                    project.type.forEach( item => {
                        if (queryRegex.test(item)){
                            match = true
                        }
                    })
    
                    return match
                    
                })
            })
            
        }else{
            setProjects(projects)
        }
    }, [query, projects, setProjects])

    return (
        <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FontAwesomeIcon icon={faSearch} />} color="gray.300"/>
            <Input type="text" placeholder="Search by name, type, language or framework" focusBorderColor={useColorModeValue("primaryLight", "primaryDark")} onChange={e => setQuery(e.target.value)}/>
        </InputGroup>
    );
}

export default Search;
