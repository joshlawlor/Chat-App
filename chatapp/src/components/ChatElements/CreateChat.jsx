import React, { useState } from "react";
import styled from "styled-components";

import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";

//ALGOLIA REFERENCES::
const algoliaAppID = process.env.ALGOLIA_APP_ID;
const algoliaApiKey = process.env.ALGOLIA_API_KEY;
const algoliasearch = require("algoliasearch");
const client = algoliasearch(algoliaAppID, algoliaApiKey);
const index = client.initIndex("chat-users");

const CreateChat = () => {
  const { uid, displayName } = auth.currentUser;
  const [input, setInput] = useState("");

  //SEARCH STATES:
  const [userList, setUserList] = useState([]);

  //FIRESTORE REFERENCES:
  const chatCollectionRef = collection(db, "chatRooms");
  const chatDocRef = doc(chatCollectionRef);
  const messagesSubcollectionRef = collection(chatDocRef, "Messages");

  //SEARCH USERS FUNCTION:

  //CREATE CHAT FUNCTION:
  const createChat = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid chat name");
      return;
    }
    //Updates userList to include the owner of the chat
    if (!userList.includes(displayName)) {
      console.log(displayName + " changed");
      userList.push(displayName);
    }
    //Creates a chat room
    await setDoc(chatDocRef, {
      name: input,
      owner: displayName,
      userList: userList,
      uid,
      timestamp: serverTimestamp(),
    });
    // Adds an initial document to the 'Messages' subcollection for the chatroom
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
  };

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
