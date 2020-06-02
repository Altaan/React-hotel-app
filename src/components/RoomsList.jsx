import React from "react";
import Room from "./Room";

// This component renders the sorted rooms array according to the search in Rooms page
const RoomsList = ({ rooms }) => {
  // show a message if the sorted rooms arr is empty
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>unfortunately no rooms found matching your search parameters</h3>
      </div>
    );
  }
  // render each room according to the room component
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map((room) => {
          return <Room key={room.id} room={room} />;
        })}
      </div>
    </section>
  );
};

export default RoomsList;
