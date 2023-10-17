import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Room from "./RoomElement";

//FIREBASE IMPORTS:
import { db } from "../../firebase";
import { query, collection, onSnapshot, where } from "firebase/firestore";

const ChatRooms = ({ displayName }) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  //FIRESTORE CHAT ROOMS QUERY:
  useEffect(() => {
    if (displayName) {
      const q = query(
        collection(db, "chatRooms"),
        where("userList", "array-contains", displayName)
      );
      console.log(q, "QUERY RAN");
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let chats = [];
        querySnapshot.forEach((doc) => {
          chats.push({ ...doc.data(), id: doc.id });
        });
        chats.sort((chatA, chatB) => {
          return chatB.timestamp - chatA.timestamp;
        });

        setRooms(chats);
      });
      return () => unsubscribe();
    }
  }, [displayName]);

  const openRoom = (room) => {
    navigate("/chat", {
      state: {
        id: room.id,
        name: room.name,
        owner: room.owner,
        userList: room.userList,
        displayName: displayName,
      },
    });
  };

  return (
    <ChatRoomsWrapper>
      <ContentWrapper>
        {rooms &&
          rooms.map((room) => (
            <Room
              onClick={() => openRoom(room)}
              key={room.id}
              room={room}
              owner={room.owner}
            >
              <RoomTitle>{room.name}</RoomTitle>
              <RoomList>Owner: {room.owner}</RoomList>
            </Room>
          ))}
      </ContentWrapper>
    </ChatRoomsWrapper>
  );
};

export default ChatRooms;
const ChatRoomsWrapper = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
  overflow: auto;
  flex-direction: column;
  align-items: center;
  max-width: 75vw;
  min-width: 75vw;
  max-height: 85vh;
  margin-top: 2vh;

  &::-webkit-scrollbar {
    width: 15px; /* Set the width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(179, 224, 179, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e0b3b3;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b3e0b3;
  }
`;

const Room = styled.button`
  color: #b3e0b3;
  background-color: inherit;
  border: 8px solid #b3e0b3;
  border-radius: 25px;
  box-shadow: 0 10px 10px -1px #e0b3b3;
  cursor: pointer;
  vertical-align: middle;
  min-width: 50vw;
  margin: 20px;
  min-height: 150px;
  font-family: Lato;
  font-size: 15px;
  padding: 5px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RoomTitle = styled.h4`
  margin: 0;
  padding-bottom: 10px;
  font-size: calc(50% + 25px);
`;

const RoomList = styled.p`
  margin: 0;
  font-size: calc(1% + 25px);
`;
