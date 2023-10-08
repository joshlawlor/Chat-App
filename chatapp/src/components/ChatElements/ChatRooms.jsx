import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { query, collection, onSnapshot, where } from "firebase/firestore";

const ChatRooms = () => {
  const { uid, displayName } = auth.currentUser;

  return <div>ChatRooms</div>;
};

export default ChatRooms;
