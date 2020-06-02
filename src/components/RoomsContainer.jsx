import React from "react";

import { withRoomConsumer } from "../context";

import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import Loading from "./Loading";

// This component renders the RoomsFilter and RoomsList in the Rooms page
const RoomsContainer = ({ context }) => {
  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  );
};

// using HOC withRoomConsumer to get the context
export default withRoomConsumer(RoomsContainer);
