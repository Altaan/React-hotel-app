import React from "react";

// this component is the image shown at the top of pages
const Hero = ({ children, hero }) => {
  return <header className={hero}>{children}</header>;
};

// setting the defaultProps to show the same img of home page when no props are passed
Hero.defaultProps = {
  hero: "defaultHero",
};

export default Hero;
