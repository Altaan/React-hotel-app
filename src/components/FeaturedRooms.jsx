import React, { Component } from "react";
import { RoomContext } from "../context";

import Loading from "./Loading";
import Title from "./Title";
import Room from "./Room";

// this component displays the featured rooms section in the home page
export default class FeaturedRooms extends Component {
  // ** pass the entire context to contextType not just the consumer
  static contextType = RoomContext; // this is only done in class component
  render() {
    // Getting access to the data in context. using rooms as alias for featuredRooms
    let { featuredRooms: rooms, loading } = this.context;
    // Using the Room component to render each featured room
    rooms = rooms.map((room) => {
      return <Room key={room.id} room={room} />;
    });
    return (
      <section className="featured-rooms">
        <Title title="featured rooms" />
        <div className="featured-rooms-center">
          {loading ? <Loading /> : rooms}
        </div>
      </section>
    );
  }
}
