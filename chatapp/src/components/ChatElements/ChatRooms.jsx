import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Room from "./RoomElement";

//FIREBASE IMPORTS:
import { db } from "../../firebase";
import { query, collection, onSnapshot, where } from "firebase/firestore";

const ChatRooms = ({displayName}) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  //FIRESTORE CHAT ROOMS QUERY:
  useEffect(() => {
    if (displayName) {
      const q = query(
        collection(db, "chatRooms"),
        where("userList", "array-contains", displayName)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let chats = [];
        querySnapshot.forEach((doc) => {
          chats.push({ ...doc.data(), id: doc.id });
        });
        setRooms(chats);
      });
      return () => unsubscribe();
    }
  }, [displayName ]);

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
              <p className="name">{room.name}</p>
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
  justify-content: space-between;
  align-items: center;
  max-width: 75vw;
  min-width: 75vw;
  max-height: 80vh;
  margin-top: 2vh;
`;

const Room = styled.button`
  color: #b3e0b3;
  background-color: inherit;
  border: 8px solid #b3e0b3;
  border-radius: 45%;
  box-shadow: 0 10px 10px -1px #e0b3b3;
  cursor: pointer;
  vertical-align: middle;
  min-width: 150px;
  min-height: 150px;
  font-family: Lato;
  font-size: 15px;
  padding: 5px;
  text-align: center;
`;
