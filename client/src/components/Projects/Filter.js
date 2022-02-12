import React, { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, Button } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery, gql } from "@apollo/client"

const Filter = () => {

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

    const { data, loading, error } = useQuery(GET_FILTER_BY)

    
    return (
        <Menu closeOnSelect={false} >
            <MenuButton as={Button} colorScheme="red" rightIcon={<FontAwesomeIcon icon="search" />}>
                Filter
            </MenuButton>
            <MenuList minWidth="240px">
                
                <MenuOptionGroup title="By" type="radio" defaultValue="type" onChange={ value => setFilterBy(value)}>
                    <MenuItemOption value="type">Type</MenuItemOption>
                    <MenuItemOption value="frameworks">Framework</MenuItemOption>
                    <MenuItemOption value="languages">Language</MenuItemOption>
                </MenuOptionGroup>
                {
                    data && filterBy && (
                        <MenuOptionGroup title={filterBy[0].toUpperCase() + filterBy.substring(1)} type="checkbox" value={data.FilterBy[filterBy]}>
                            {
                                data.FilterBy[filterBy].map( (item, idx) => {
                                    return <MenuItemOption value={item} key={`${filterBy}-${idx}`}>{item}</MenuItemOption>
                                })
                            }
                        </MenuOptionGroup>
                    )
                }
                
            </MenuList>
        </Menu>
    );
}

export default Filter;
