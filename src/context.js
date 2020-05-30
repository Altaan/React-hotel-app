import React, { Component } from "react";

import items from "./data";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    // used to sort rooms according to price
    sortedRooms: [],
    // featured rooms to be displayed on Home page
    featuredRooms: [],
    loading: true,
  };

  componentDidMount() {
    // formatting the data to remove some of the nesting
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
    });
  }

  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      // getting the images of every item
      let images = item.fields.images.map((image) => image.fields.file.url);
      // coping the props from fields obj in every item. Overwriting existing prop, images, & creating new prop, id
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  // this function will be passed down to consumers with value prop in RoomContext.Provider
  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    // getting the room obj that matches the slug in url
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  render() {
    return (
      <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
