import Hero from "./sections/hero";
import Projects from "./sections/projects";
import Experiences from "./sections/experiences";
import FeaturedPosts from "./sections/featured-posts";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      <Experiences />
      <Projects />
    </>
  );
}
