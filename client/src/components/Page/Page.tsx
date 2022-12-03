import React from "react";
import NavBar from "./NavBar";
import PageContent from "./PageContent";
import Footer from "./Footer";

interface PageProps {
  children: React.ReactNode;
  activeNav: "home" | "about" | "blog" | "chess";
}

const Page: React.FC<PageProps> = ({ children, activeNav }) => {
  return (
    <>
      <NavBar active={activeNav} />
      <PageContent>{children}</PageContent>
      <Footer />
    </>
  );
};

export default Page;
