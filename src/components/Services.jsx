import React, { Component } from "react";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

import Title from "./Title";

// This component shows the services section on Home page
export class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "Free Cocktails",
        info: "Cocktails are served at our beach front bar",
      },
      {
        icon: <FaHiking />,
        title: "Hiking",
        info:
          "Hiking tour are availabe on daily basis to the wonderful surrounding parks",
      },
      {
        icon: <FaShuttleVan />,
        title: "Free Airport Shuttle",
        info: "Free transportation with our on-demand shuttle service",
      },
      {
        icon: <FaBeer />,
        title: "Free Beer",
        info: "Free beer is served during the happy hour from 18:00 till 19:00",
      },
    ],
  };

  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((service, idx) => {
            return (
              <article key={idx} className="service">
                <span>{service.icon}</span>
                <h6>{service.title}</h6>
                <p>{service.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}

export default Services;
