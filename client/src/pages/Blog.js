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
        if (projResp.data){
            console.log(projResp.data)

            const now = new Date();
            const prev = new Date(projResp.data.ProjectInfo[0].published);

            const diff = now - prev
            const s = diff / 1000
            const m = s / 60
            const h = m / 60
            const d = h / 24
            const y = d / 365

            console.log({ now, prev, diff, s, m, h, d, y })

        }
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

    const calculateTimeHasPassed = (prev) => {
        const nowDate = new Date();
        const prevDate = Date.parse(prev)

        const diff = nowDate - prevDate
        const secs = diff / 1000;
        const mins = secs / 60;
        const hrs = mins / 60;
        const days = hrs / 24;
        const weeks = days / 7;
        const months = weeks / 4;
        const years = months / 12;

        if (years >= 1){
            if (years == 1){
                return `${Math.floor(years)} year`
            }else{
                const fullYears = Math.floor(years);
                const rem = years - fullYears;
                
            }
        }
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
                                <Text {...styleProps.postInfo} >{item.published} &bull; {item.readTime} min read</Text>
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
