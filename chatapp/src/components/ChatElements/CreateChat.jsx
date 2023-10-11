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
const algoliaAppID = process.env.REACT_APP_ALGOLIA_APP_ID;
const algoliaApiKey = process.env.REACT_APP_ALGOLIA_API_KEY;
const algoliasearch = require("algoliasearch");
const client = algoliasearch(algoliaAppID, algoliaApiKey);
const index = client.initIndex("chat-users");

const CreateChat = () => {
  const { uid, displayName } = auth.currentUser;
  const [input, setInput] = useState("");

  //SEARCH STATES:
  const [userList, setUserList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  //FIRESTORE REFERENCES:
  const chatCollectionRef = collection(db, "chatRooms");
  const chatDocRef = doc(chatCollectionRef);
  const messagesSubcollectionRef = collection(chatDocRef, "Messages");

  //SEARCH USERS FUNCTIONS:

  const handleSearchInputChange = (e) => {
    //**NEED TO PUT A CHECK HERE IN CASE OF BLANK SEARCH */
    const value = e.target.value;
    setSearchInput(value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        searchUsers(value);
      }, 500)
    );
  };
  const searchUsers = (value) => {
    if (value === "" || value === " ") {
      alert("Please enter a valid chat username");
      return;
    }
    setSearchInput("");
    index
      .search(value)
      .then(({ hits }) => {
        console.log("USER SEARCH", hits);
        setSearchResults(hits);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserChange = (index, value) => {
    const updatedUserList = [...userList];
    if (!updatedUserList.includes(value)) {
      // If it doesn't exist, add it to the end of the array
      updatedUserList.push(value);
    }
    setUserList([...updatedUserList]);
    console.log(userList);
  };

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
          <input
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e)}
            type="text"
            placeholder="Search for user (username)"
          />
          <div>
            {searchResults.map((result, index) => (
              <button
                type="button"
                key={result.objectID}
                onClick={() => handleUserChange(index, result.username)}
              >
                {result.username}
              </button>
            ))}
          </div>
          <div>
            <strong>Current User List:</strong>
            {userList.map((user, index) => (
              <p key={index}>{user}</p>
            ))}
          </div>
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

const CreateForm = styled.form`
display: flex
flex-direction: column;
`;
