import React, { useState } from "react";
import { auth, db } from "../../firebase";

import styled from "styled-components";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
const CreateChat = () => {
  const { uid, displayName } = auth.currentUser;
  const [input, setInput] = useState("");
  const [userList, setUserList] = useState([]);

  const createChat = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid chat name");
      return;
    }

    //THIS IS THE ROUTE TO THE CHAT COLLECTION
    const chatCollectionRef = collection(db, "chatRooms");

    const chatDocRef = doc(chatCollectionRef);
    if (!userList.includes(displayName)) {
      console.log(displayName + " changed");
      userList.push(displayName);
    }

    await setDoc(chatDocRef, {
      name: input,
      owner: displayName,
      userList: userList,
      uid,
      timestamp: serverTimestamp(),
    });

    const messagesSubcollectionRef = collection(chatDocRef, "Messages");

    await addDoc(messagesSubcollectionRef, {
      text: "Chat Created",
      timestamp: serverTimestamp(),
      uid: uid,
    });

    setInput("");
    setUserList([""]);
  };

  const cancelChatCreation = () => {
    setInput("");
    setUserList([""]);
    return;
  }

  return (
    <CreateChatWrapper>
      <ContentWrapper>
        <CreateForm onSubmit={createChat}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Chat Name"
          />
          <button type="button" onClick={() => cancelChatCreation()}>
            Cancel
          </button>
          <button type="submit">Create a New Chat</button>
        </CreateForm>
      </ContentWrapper>
    </CreateChatWrapper>
  );
};

export default CreateChat;

const CreateChatWrapper = styled.div``;

const ContentWrapper = styled.div``;

const CreateForm = styled.form``;
