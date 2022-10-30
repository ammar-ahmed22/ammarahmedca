import React, { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, MenuDivider, MenuItem, Button } from "@chakra-ui/react"
import { ChevronDownIcon, RepeatIcon } from "@chakra-ui/icons"
import { useQuery, gql } from "@apollo/client"

const Filter = ({ projects, setProjects }) => {

    const GET_FILTER_BY = gql`
        query {
            FilterBy {
                frameworks
                languages
                type
            }
        }
    ` 

    const [filterBy, setFilterBy] = useState("type");
    const [filterParams, setFilterParams] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

    const { data, loading, error } = useQuery(GET_FILTER_BY)

    useEffect(() => {
        
        if (data && !dataLoaded){
            setFilterParams(data.FilterBy)
            setDataLoaded(true)
        }

        if (Object.keys(filterParams).length !== 0 && filterBy !== ""){
        setProjects( prevProjects => {
            
            return projects.filter( project => {
                let match = false;

                project[filterBy].forEach( item => {
                    if (filterParams[filterBy].indexOf(item) !== -1){
                        match = true
                    }
                })

                if (project[filterBy].length === 0){
                    match = false
                }

                return match
            })
        })
        }

    }, [filterBy, data, filterParams, dataLoaded, setDataLoaded, setProjects, projects])

    const handleFilterParamChange = updatedFilterParams => {
        
        setFilterParams( prevFilterParams => {
            const res = {...prevFilterParams}
            res[filterBy] = updatedFilterParams;
            console.log(res)
            
            console.log(prevFilterParams)


            return res
        })
    }

    const handleReset = e => {
        if (data){
            setFilterParams(data.FilterBy)
        }
    }

    
    return (
        <Menu closeOnSelect={false} >
            <MenuButton as={Button} variant="outline" colorScheme="black" rightIcon={<ChevronDownIcon />} >
                Filter
            </MenuButton>
            <MenuList>
                
                <MenuOptionGroup title="Category" type="radio" defaultValue="type" onChange={ value => setFilterBy(value)}>
                    <MenuItemOption value="type">Type</MenuItemOption>
                    <MenuItemOption value="frameworks">Framework</MenuItemOption>
                    <MenuItemOption value="languages">Language</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                {
                    data && filterBy && (
                        <MenuOptionGroup title={filterBy[0].toUpperCase() + filterBy.substring(1)} type="checkbox" value={filterParams[filterBy]} onChange={handleFilterParamChange}>
                            {
                                data.FilterBy[filterBy].map( (item, idx) => {
                                    return <MenuItemOption value={item} key={`${filterBy}-${idx}`}>{item}</MenuItemOption>
                                })
                            }
                        </MenuOptionGroup>
                    )
                }
                <MenuDivider />
                <MenuOptionGroup>
                    <MenuItem onClick={handleReset} >Reset</MenuItem>
                </MenuOptionGroup>
                
            </MenuList>
            
        </Menu>
    );
}

export default Filter;
