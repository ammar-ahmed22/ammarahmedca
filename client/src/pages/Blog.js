import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { Text, Skeleton } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";

const Blog = ({ match }) => {
    console.log("page", match)

    const GET_PROJ_INFO = gql`
        query ($onlyHasContent: Boolean){
            ProjectInfo(onlyHasContent: $onlyHasContent){
                id
                name
                description
                published
                readTime
            }
        }
    `

    const projResp = useQuery(GET_PROJ_INFO, { variables: {onlyHasContent: true}});

    useEffect(() => {
        

        
    }, [projResp])

    const styleProps = {
        postTitle: {
            fontSize: "2xl",
            fontFamily: "heading",
            fontWeight: "semibold"
        },
        postDescription: {
            my: 0
        },
        postInfo: {
            fontSize: "sm",
            fontWeight: "light"
        }
    }

    const displayTimeSince = (prev) => {
        console.log(prev)
        const nowDate = new Date();
        const prevDate = Date.parse(prev)

        const result = {};

        let delta = Math.abs(nowDate - prevDate) / 1000

        const s = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        }
        
        Object.keys(s).forEach( key => {
            result[key] = Math.floor( delta / s[key]);
            delta -= result[key] * s[key]
        })

        console.log(result)
        
        const pluralize = val => {
            return val === 1 ? "" : "s";
        }

        if (result.year >= 1){
            if (result.month >= 1){
                return `${result.year} year${pluralize(result.year)} ${result.month} month${pluralize(result.month)} ago`
            }else{
                return `${result.year} year${pluralize(result.year)} ago`
            }
        }else if (result.year === 0){
            if (result.month >= 1){
                return `${result.month} month${pluralize(result.month)} ago`
            }else{
                if (result.week >= 1){
                    return `${result.week} week${pluralize(result.week)} ago`
                }else{
                    return `${result.day} day${pluralize(result.day)} ago`
                }
            }
        }

        return "hold up"

        
    }

    return (
        <>
            <NavBar active="blog"/>
            <PageContent>
                <Text fontSize="6xl" fontFamily="heading" as="h1">My <Text as="span" color="primaryLight">Journal</Text></Text>
                <Text fontSize='lg' >Sometimes I like to write about things I've worked on, my experiences or anything else of interest to me. Check it out!</Text>
                {
                    !projResp.loading && projResp.data && projResp.data.ProjectInfo.map( (item, idx) => {
                        return (
                            <Card isLink to={`/blog/${item.name.toLowerCase().split(" ").join("-")}`} key={idx}>
                                <Text {...styleProps.postTitle} >{item.name}</Text>
                                <Text {...styleProps.postInfo} >{displayTimeSince(item.published)} &bull; {item.readTime} min read</Text>
                                <Text {...styleProps.postDescription} >{item.description}</Text>
                            </Card>
                        )
                    })
                }
            </PageContent>
            <Footer />
        </>
    );
}

export default Blog;
