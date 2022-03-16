import React from 'react';
import NavBar from './NavBar';
import PageContent from './PageContent';
import Footer from './Footer';
import { useParams, useLocation} from "react-router-dom"
import { useQuery, gql } from "react-router-dom"

const BlogPost = () => {
    //console.log("post:", match)

    const { postName } = useParams();
    const location = useLocation();

    console.log({ postName, location })

    const GET_BLOG_POST_CONTENT = gql`
        query($blogContentId: String!){
            BlogContent(id: $blogContentId){
                type
                content
            }
        }
    `

    const blogContent = useQuery(GET_BLOG_POST_CONTENT);

    return (
        <>
            <NavBar active="blog"/>
            <PageContent>
                

            </PageContent>
            <Footer />
        </>
    );
}

export default BlogPost;
