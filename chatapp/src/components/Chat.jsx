import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
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
  const location = useLocation();
  const roomID = location.state.id;
  const roomName = location.state.name;
  const roomOwner = location.state.owner;
  const userList = location.state.userList;
  useEffect(() => {
    console.log("USEFFECT MESSAGES RAN");
    const chatRoomRef = doc(collection(db, "chatRooms"), roomID);
    const messagesSubcollectionRef = collection(chatRoomRef, "Messages");

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
  }, [roomName, roomOwner, roomID, chatUser]);

  return (
    <ChatWrapper>
      <Navbar />
      <ContentWrapper>
        <Heading>Chat Room: {roomName}</Heading>
        <MessagesWrapper>
          {messages &&
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
        </MessagesWrapper>
        <SendMessageWrapper>
              <SendMessage roomID={roomID}/>
        </SendMessageWrapper>
      </ContentWrapper>
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
  min-width: 85vw
`;

const Heading = styled.h1`
  font-familty: Lato;
`;

const MessagesWrapper = styled.div`
overflow-y: auto;
overflow-x: hidden;
display: flex;
flex-direction: column;
max-height: 82vh;
max-width: 100%;
padding: 15px;
`;
const SendMessageWrapper = styled.div`
  border: 3px solid blue;

`