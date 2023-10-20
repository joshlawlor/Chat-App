import React, { useState } from "react";
import styled from "styled-components";
import xIcon from "../../assets/images/xIcon.png";
import sendIcon from "../../assets/images/sendIcon.png";

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
          <strong>Current User List:</strong>
          <CurrentUsers>
            {userList.map((user, index) => (
              <UserButton key={index}>{user}</UserButton>
            ))}
          </CurrentUsers>

          <CreateButton type="submit">
            Create a New Chat <Icon src={sendIcon} />
          </CreateButton>
          <CancelButton type="button" onClick={() => cancelChatCreation()}>
            Cancel
            <Icon src={xIcon} />
          </CancelButton>
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

const CreateForm = styled.form`
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
  overflow-y: auto;
  overflow-x: hidden;

  margin-top: 15px;
  max-height: 10vh;
  max-width: 100%;
  min-width: 50%;

  &::-webkit-scrollbar {
    width: 15px; /* Set the width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(179, 224, 179, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e0b3b3;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b3e0b3;
  }
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

const CurrentUsers = styled.div`
display: flex;
flex-direction: column;
align-items: center;
overflow-y: auto;
overflow-x: hidden;
max-height: 20vh;
max-width: 100%;
min-width: 50%;
margin-bottom: 20px;

&::-webkit-scrollbar {
  width: 15px; /* Set the width of the scrollbar */
}

&::-webkit-scrollbar-track {
  background-color: rgba(179, 224, 179, 0.2);
}

&::-webkit-scrollbar-thumb {
  background-color: #e0b3b3;
  border-radius: 10px;
}

&::-webkit-scrollbar-thumb:hover {
  background-color: #b3e0b3;
`;

const CreateButton = styled.button`
  font-family: Lato;
  border: 3px solid #b3e0b3;
  border-radius: 25px;
  font-size: larger;
  background-color: inherit;
  color: #b3e0b3;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover {
    background-color: rgba(224, 179, 179, 0.1);
    font-weight: bold;
    box-shadow: 0 0 5px 5px #b3e0b3;
  }
`;

const CancelButton = styled.button`
  border: 3px solid #e0b3b3;
  border-radius: 25px;
  font-family: Lato;
  font-size: large;
  background-color: inherit;
  font-family: Lato;
  color: #e0b3b3;
  cursor: pointer;
  &:hover {
    background-color: rgba(224, 179, 179, 0.1);
    font-weight: bold;
    box-shadow: 0 0 5px 5px #e0b3b3;
  }
`;

const Icon = styled.img`
  padding-left: 10px;
  max-height: 1.5vh;
`;
