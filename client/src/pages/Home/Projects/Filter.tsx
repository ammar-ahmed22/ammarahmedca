import React, { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, MenuDivider, MenuItem, Button } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { useQuery } from "@apollo/client"
import { FilterOptsQuery, FilterOptsResponse } from '../../../graphql/queries/FilterOpts';

const Filter : React.FC<SearchFilterProps> = ({ projects, setProjects }) => {

    type ProjectFilterOpts = Omit<IFilterOpts, "category">
    
    const [filterBy, setFilterBy] = useState<keyof ProjectFilterOpts>("type");
    const [filterParams, setFilterParams] = useState<ProjectFilterOpts | undefined>();
    const [dataLoaded, setDataLoaded] = useState(false);

    const { data } = useQuery<FilterOptsResponse>(FilterOptsQuery)

    useEffect(() => {
        
        if (data && !dataLoaded){
            setFilterParams(data.filterOpts)
            setDataLoaded(true)
        }

        if (filterParams){
        setProjects( (prevProjects : IMetadata[]) => {
            
            return projects.filter( project => {
                let match = false;

                project[filterBy]?.forEach( item => {
                    if (filterParams[filterBy].indexOf(item) !== -1){
                        match = true
                    }
                })

                if (project[filterBy]?.length === 0){
                    match = false
                }

                return match
            })
        })
        }

    }, [filterBy, data, filterParams, dataLoaded, setDataLoaded, setProjects, projects])

    const handleFilterParamChange = (updatedFilterParams : string[] | string) => {
        
        setFilterParams( prevFilterParams => {
            if (prevFilterParams){
                const res = {...prevFilterParams}
                if (Array.isArray(updatedFilterParams)){
                    res[filterBy] = updatedFilterParams;
                } else {
                    res[filterBy] = [updatedFilterParams];
                }

                return res
            }
            return prevFilterParams;
        })
    }

    const handleReset = () => {
        if (data){
            setFilterParams(data.filterOpts)
        }
    }

    
    return (
        <Menu closeOnSelect={false} >
            <MenuButton as={Button} variant="outline" colorScheme="black" rightIcon={<ChevronDownIcon />} >
                Filter
            </MenuButton>
            <MenuList>
                
                <MenuOptionGroup title="Category" type="radio" defaultValue="type" onChange={ (value) => setFilterBy(value as keyof ProjectFilterOpts)}>
                    <MenuItemOption value="type">Type</MenuItemOption>
                    <MenuItemOption value="frameworks">Framework</MenuItemOption>
                    <MenuItemOption value="languages">Language</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                {
                    data && filterBy && filterParams && (
                        <MenuOptionGroup title={filterBy[0].toUpperCase() + filterBy.substring(1)} type="checkbox" value={filterParams[filterBy]} onChange={handleFilterParamChange}>
                            {
                                data.filterOpts[filterBy].map( (item, idx) => {
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
