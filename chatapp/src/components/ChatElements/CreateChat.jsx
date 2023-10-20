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
          <h2>New Chat:</h2>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Chat Name"
          />
          <h3>Add Users:</h3>
          <Input
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e)}
            type="text"
            placeholder="Search for user (username)"
          />
          <SearchResults>
            {searchResults.map((result, index) => (
              <UserButton
                type="button"
                key={result.objectID}
                onClick={() => handleUserChange(index, result.username)}
              >
                {result.username}
              </UserButton>
            ))}
          </SearchResults>
          <CurrentUsers>
            <strong>Current User List:</strong>
            {userList.map((user, index) => (
              <p key={index}>{user}</p>
            ))}
          </CurrentUsers>
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

const ContentWrapper = styled.div`
  color: #e0b3b3;
`;

const CreateForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
color: #e0b3b3
border: none;
border:solid 3px #e0b3b3;
border-radius: 25px; 
`;


const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const UserButton = styled.button`
  border: none;
  border: solid 3px #b3e0b3;
  border-radius: 25px;
  margin: 4px;
  cursor: pointer;
  font-family: Lato;
  font-size: 15px;
  font-weight: bold;
  &:hover {
    background-color: rgba(224, 179, 179, 0.1);
    font-weight: bold;
    box-shadow: 0 0 5px 5px #b3e0b3;
  }
`;


const CurrentUsers = styled.div``;
