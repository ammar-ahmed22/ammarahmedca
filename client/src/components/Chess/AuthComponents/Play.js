import React, { useContext, useEffect } from 'react';
import NavBar from '../../NavBar';
import PageContent from '../../PageContent';
import Footer from '../../Footer';
import { Box, Text, Button } from "@chakra-ui/react"
import { useQuery, gql } from '@apollo/client';
import { useAuthToken } from '../../../hooks/authToken';
import { useApolloClient } from '@apollo/client';

const Play = ({ history }) => {


    const GET_PLAYER = gql`
        query{
            getPlayer{
                _id
                name{
                    first
                    last
                }
                email
                company
                position
                foundFrom
            }
        }
    `

    
    const [authToken, setAuthToken, removeAuthToken] = useAuthToken();
    const apolloClient = useApolloClient();

    const { data, loading, error } = useQuery(GET_PLAYER)

    useEffect(() => {
        

        if (data){
            console.log(data)
        }
    }, [ data])

    const handleLogout = e => {
        apolloClient.clearStore();
        removeAuthToken();
        history.push("/chess/logout");
    }
    
    return (
        <>
            <NavBar active="chess"/>
            <PageContent>
                <Box mt="10vh">
                    <Text>LOGGED IN PAGE</Text>
                    {
                         data && (
                             <>
                                <Text>Name: {data.getPlayer.name.first} {data.getPlayer.name.last}</Text>
                                <Text>Email: {data.getPlayer.email}</Text>
                                <Text>Company: {data.getPlayer.company}</Text>
                                <Text>Position: {data.getPlayer.position}</Text>
                             </>
                         )
                    }
                    <Button onClick={handleLogout}>Logout</Button>
                </Box>
            </PageContent>
            <Footer />
        </>
    );
}

export default Play;
