import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Room from "./RoomElement";

//FIREBASE IMPORTS:
import { db, auth } from "../../firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

const ChatRooms = () => {
  const { displayName } = auth.currentUser;
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "chatRooms"));
    console.log(q);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let chats = [];
      querySnapshot.forEach((doc) => {
        chats.push({ ...doc.data(), id: doc.id });
      });
      setRooms(chats);
    });
    return () => unsubscribe();
  }, [displayName]);
  return (
    <ChatWrapper>
      <ContentWrapper>
        {rooms &&
          rooms.map((room) => (
            <Room key={room.id} room={room} owner={room.owner} />
          ))}
      </ContentWrapper>
    </ChatWrapper>
  );
};

export default ChatRooms;
const ChatWrapper = styled.div``;

const ContentWrapper = styled.div`
`;
