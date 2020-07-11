import React, { Component } from "react";

// import items from "./data";

import Client from "./Contentful";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    // used to sort rooms according to price
    sortedRooms: [],
    // featured rooms to be displayed on Home page
    featuredRooms: [],
    loading: true,
    // the following properties are for RoomsFilter in Rooms page
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  // This function gets the data from contenful
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachHotelRooms",
        order: "sys.createdAt",
      });
      // formatting the data to remove some of the nesting
      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter((room) => room.featured === true);
      // getting maxSize and maxPrice for rooms from data to setState according to the data
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
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

  // this function is used to find the specific room that matches the url to be displayed in singleRoom page
  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    // getting the room obj that matches the slug in url
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  // this function is responsible for tracking changes in the input values of RoomsFilter component
  handleChange = (event) => {
    // the target can be select or checkbox
    const target = event.target;
    // getting the value according to the target type
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    // setting the state according to user input to change the rendered option
    this.setState(
      {
        // dynamically setting the name and value
        [name]: value,
      },
      // filterRooms is the callback func when the user changes a search parameter
      this.filterRooms
    );
  };

  // this function is used to filter rooms according to the search parameters obtained by handleChange
  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;

    // returning all rooms as long as the room type is kept on "all"
    let tempRooms = [...rooms];
    // converting the capacity, price values to int coz select returns a str when an option is selected
    capacity = parseInt(capacity);
    price = parseInt(price);

    // filtering rooms according to the room type selected
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }
    // filtering capacity according to number of guests selected
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);
    // filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );
    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }
    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }
    this.setState({ sortedRooms: tempRooms });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

// HOC that wraps the passed component with consumer to pass the context
function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext, withRoomConsumer };
