import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import defaultImg from "../images/room-1.jpeg";

// This component is used to render each individual room in home and rooms pages
const Room = ({ room }) => {
  const { name, images, price, slug } = room;
  return (
    <article className="room">
      <div className="img-container">
        {/* show a default img in case the first image in images arr of room doesn't load */}
        <img src={images[0] || defaultImg} alt="single room" />
        <div className="price-top">
          <h6>${price}</h6>
        </div>
        <Link to={`/rooms/${slug}`} className="btn-primary room-link">
          Features
        </Link>
      </div>
      <p className="room-info">{name}</p>
    </article>
  );
};

// Checking the props types passed to this component
Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
  }),
};

export default Room;
