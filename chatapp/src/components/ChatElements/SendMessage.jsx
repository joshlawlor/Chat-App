import React, { useState } from "react";
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
    // scroll.current.scrollIntoView({ behavior: "smooth" });
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
    <div id="sendMessage-container">
      <button type="submit" className="message-button">
        ADD ATTACHMENT
      </button>
      <textarea
        value={input}
        id="message-content-input"
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        type="text"
        placeholder="Message"
      />
      <button onClick={sendMessage} type="submit" className="message-button">
        Send
      </button>
    </div>
  );
};

export default SendMessage;
