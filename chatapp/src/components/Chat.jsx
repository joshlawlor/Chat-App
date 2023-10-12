import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import settingsIcon from "../assets/images/settingsIcon.png";

import Navbar from "./Navbar";
import EditChat from "../utils/EditChat";
import { useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  query,
  doc,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

//Element imports:
import Message from "./ChatElements/Message";
import SendMessage from "./ChatElements/SendMessage";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [chatUser] = useAuthState(auth);
  const [isOwner, setIsOwner] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const location = useLocation();
  const roomID = location.state.id;
  const roomName = location.state.name;
  const roomOwner = location.state.owner;
  const userList = location.state.userList;
  const displayName = location.state.displayName
  const scroll = useRef();

  //GET ALL MESSAGES
  useEffect(() => {
    console.log("USEFFECT MESSAGES RAN", roomOwner);
    const chatRoomRef = doc(collection(db, "chatRooms"), roomID);
    const messagesSubcollectionRef = collection(chatRoomRef, "Messages");
    if (roomOwner === displayName) {
      setIsOwner(true);
    }
    const q = query(messagesSubcollectionRef, orderBy("timestamp"));
    console.log(q);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [roomName, roomOwner, roomID, chatUser, displayName]);

  // Edit chat room pop up functionality:
  const openEdit = () => {
    setShowEdit(true);
  };
  const closeEdit = () => {
    setShowEdit(false);
  };

  return (
    <ChatWrapper>
      <Navbar />

      <ContentWrapper>
        <EditWrapper>
          {isOwner && (
            <EditButton onClick={openEdit}>
              <Icon src={settingsIcon} />
              Edit
            </EditButton>
          )}
        </EditWrapper>
        <HeaderWrapper>
          <Heading>{roomName}</Heading>
        </HeaderWrapper>
        <MessagesWrapper>
          {messages &&
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          <span ref={scroll}></span>
        </MessagesWrapper>
        <SendMessageWrapper>
          <SendMessage scroll={scroll} roomID={roomID} />
        </SendMessageWrapper>
      </ContentWrapper>
      {showEdit &&
        (
          //THIS IS THE MENU POP UP ELEMENT, STYLED BELOW
          <MenuModal>
            <MenuModalContent>
              <CloseMenu onClick={closeEdit}>x</CloseMenu>
              <EditChat
                userList={userList}
                roomOwner={roomOwner}
                roomID={roomID}
                roomName={roomName}
              />
            </MenuModalContent>
          </MenuModal>
        )}
    </ChatWrapper>
  );
};

export default Chat;

const ChatWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 15vw; /* Adjust the left margin to match the Navbar width */
  position: absolute;
  min-width: 85vw;
`;
const EditWrapper = styled.div`
  margin-top: 50px;
  position: absolute;
  min-width: 10%;
  right: 10px;
  top: 0;
`;
const EditButton = styled.button`
  border: none;
  margin: 10px;
  font-family: Lato;
  font-size: calc(5px + 2vmin);
  background-color: inherit;
  color: #e0b3b3;
  pointer-events: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const MenuModal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const MenuModalContent = styled.div`
  border: 4px solid #e0b3b3;
  border-radius: 25px;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  width: 25%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CloseMenu = styled.button`
  color: #b3e0b3;
  font-weight: bold;
  border: none;
  font-family: Lato;
  font-size: calc(10px + 2vmin);
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Icon = styled.img`
  max-height: 1.5vw;
  margin-right: 15px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h1`
  font-familty: Lato;
  color: #e0b3b3;
  text-decoration: underline;
`;

const MessagesWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  max-height: 82vh;
  min-height: 82vh;
  max-width: 100%;
  padding: 15px;
`;
const SendMessageWrapper = styled.div`
  border: 3px solid blue;
`;
