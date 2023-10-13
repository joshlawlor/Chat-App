import React, { useState } from "react";
import styled from "styled-components";
import sendIcon from "../../assets/images/sendIcon.png";
import attachmentIcon from "../../assets/images/attachmentIcon.png";
import { auth, db } from "../../firebase";
import { addDoc, doc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ scroll, roomID }) => {
  const [input, setInput] = useState("");
  const CHARACTER_LIMIT = 20000;
  //THIS GRABS THE SPECIFIC ROOM DOC FROM THE CHATS COLLECTION
  const chatRoomRef = doc(collection(db, "chatRooms"), roomID);
  //THIS GRABS THE SPECIFIC MESSAGES SUBCOLLECTION FROM THE ROOM DOC
  const messagesSubcollectionRef = collection(chatRoomRef, "Messages");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid message");
      return;
    }
    const { uid, displayName } = auth.currentUser;

    const inputText = input.slice(0, CHARACTER_LIMIT);
    let truncatedInput = "";

    for (let i = 0; i < inputText.length; i += 74) {
      truncatedInput += inputText.slice(i, i + 74) + " ";
    }

    await addDoc(messagesSubcollectionRef, {
      text: truncatedInput,
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= CHARACTER_LIMIT) {
      setInput(value);
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  return (
    <SendMessagesWrapper>
      
      <TextArea
        value={input}
        id="message-content-input"
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        type="text"
        placeholder="Message"
      />
     
      <IconButton src={sendIcon} onClick={sendMessage} alt="send" type="submit" className="message-button"/>
     
      <IconButton src={attachmentIcon} alt="attachment"/>
    </SendMessagesWrapper>
  );
};

export default SendMessage;

const SendMessagesWrapper = styled.div`
max-height: 9vh;
display: flex;
align-items: center;
justify-content: center;
`;

const IconButton = styled.img`
  max-height: 5vh;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  min-width: 70vw;
  max-width: 70vw
  min-height: 5vh;
  max-height: 5vh;
  border: 6px solid #b3e0b3;
  border-radius: 25px;
  padding: 10px;
  font-size: 25px;
  &:focus {
    outline: none;
    box-shadow: 0 10px 10px -1px #e0b3b3; /* Change the border color when the textarea is focused */
    /* Add any other styles you want for the focused state */
  }

`