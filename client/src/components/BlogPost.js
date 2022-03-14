import React from 'react';
import NavBar from './NavBar';
import PageContent from './PageContent';
import Footer from './Footer';

const BlogPost = ({ match }) => {
    console.log("post:", match)
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
