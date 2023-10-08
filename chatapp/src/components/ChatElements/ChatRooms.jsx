import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Room from "./RoomElement";

//FIREBASE IMPORTS:
import { db } from "../../firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

const ChatRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  //FIRESTORE CHAT ROOMS QUERY:
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
  }, []);

  const openRoom = (room) => {
    navigate("/chat", {
      state: {
        id: room.id,
        name: room.name,
        owner: room.owner,
        userList: room.userList,
      },
    });
  };

  return (
    <ChatWrapper>
      <ContentWrapper>
        {rooms &&
          rooms.map((room) => (
            <Room
              onClick={() => openRoom(room)}
              key={room.id}
              room={room}
              owner={room.owner}
            >
              <p className="name">{room.name}</p>
            </Room>
          ))}
      </ContentWrapper>
    </ChatWrapper>
  );
};

export default ChatRooms;
const ChatWrapper = styled.div``;

const ContentWrapper = styled.div``;

const Room = styled.div`
  display: inline-block;
  color: #444;
  border: 1px solid #ccc;
  background: #ddd;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  vertical-align: middle;
  max-width: 100px;
  padding: 5px;
  text-align: center;
`;
