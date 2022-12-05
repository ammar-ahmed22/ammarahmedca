import React, { useEffect } from "react";
import NavBar from "./NavBar";
import PageContent from "./PageContent";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";


interface PageProps {
  children: React.ReactNode;
  activeNav: "home" | "about" | "blog" | "chess";
  pageTitle?: string;
}

const Page: React.FC<PageProps> = ({ children, activeNav, pageTitle }) => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.initialize("G-JB69PRH5HQ");
    ReactGA.send({ hitType: "pageview", path: location.pathname });
  }, [location])

  return (
    <>
      <Helmet>
        <title>{pageTitle ?? "Ammar Ahmed"}</title>
      </Helmet>
      <NavBar active={activeNav} />
      <PageContent>{children}</PageContent>
      <Footer />
    </>
  );
};

export default Page;
