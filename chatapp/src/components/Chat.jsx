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

  console.log(roomID);
  const chatRoomRef = doc(collection(db, "chatRooms"), roomID);
  //   //THIS GRABS THE SPECIFIC MESSAGES SUBCOLLECTION FROM THE ROOM DOC
  const messagesSubcollectionRef = collection(chatRoomRef, "Messages");
  const q = query(messagesSubcollectionRef, orderBy("timestamp"));
  console.log(q);

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
`;

const Heading = styled.h1`
  font-familty: Lato;
`;

const MessagesWrapper = styled.div`
min-width: 90%;
max-height: 50vh
overflow-y: auto;
display: flex;
flex-direction: column;
text-align: center;
align-items: flex-end;
position: relative;
`;
const SendMessageWrapper = styled.div`
  border: 3px solid blue;

`