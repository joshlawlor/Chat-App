import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const RoomElement =  ({room}) => {
  const navigate = useNavigate();

  const showMessages =() => {
    //NEED TO PASS ROOM ID AND PATH TO CHATS/CHAT_ID TO CHAT COMPONENT
    //CHAT COMPONENT SHOULD SEARCH DB/CHATS/CHAT_ID/MESSAGES AND DISPLAY CURRENT ROOMS MESSAGES ONLY
    // navigate("/chat/room", {
    //   state: {
    //     id: room.id,
    //     name: room.name,
    //     owner: room.owner,
    //     userList: room.userList,
    //   },
    // });
  };

  return (
    <RoomWrapper>
      <Room onClick={showMessages} className="room">
        <p className="name">{room.name}</p>
      </Room>
    </RoomWrapper>
  );
};

export default RoomElement;

const RoomWrapper = styled.div`
    display: flex;
`

const Room = styled.div`
display:inline-block;
color:#444;
border:1px solid #CCC;
background:#DDD;
box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
cursor:pointer;
vertical-align:middle;
max-width: 100px;
padding: 5px;
text-align: center;
`