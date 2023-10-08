import React from "react";
import { useNavigate } from "react-router-dom";
const RoomElement =  ({room}) => {
  const navigate = useNavigate();

  const showMessages =() => {
    //NEED TO PASS ROOM ID AND PATH TO CHATS/CHAT_ID TO CHAT COMPONENT
    //CHAT COMPONENT SHOULD SEARCH DB/CHATS/CHAT_ID/MESSAGES AND DISPLAY CURRENT ROOMS MESSAGES ONLY
    navigate("/chat/room", {
      state: {
        id: room.id,
        name: room.name,
        owner: room.owner,
        userList: room.userList,
      },
    });
  };

  return (
    <div className="rooms-container">
      <div onClick={showMessages} className="room">
        <p className="name">{room.name}</p>
      </div>
    </div>
  );
};

export default RoomElement;
