import React from "react";

const Hero = ({ children, hero }) => {
  return <header className={hero}>{children}</header>;
};

// setting the defaultProps to show the same img of home page when no props are passed
Hero.defaultProps = {
  hero: "defaultHero",
};

export default Hero;
