import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import editIcon from "../assets/images/editIcon.png";
import addIcon from "../assets/images/addIcon.png";
import trashIcon from "../assets/images/trashIcon.png";
import { db } from "../firebase";

import { doc, collection, updateDoc } from "firebase/firestore";
const EditChat = ({ userList, roomOwner, roomID, roomName, displayName }) => {
  const navigate = useNavigate();
  const chatRoomRef = doc(collection(db, "chatRooms"), roomID);

  //CHAT NAME EDIT:
  const [newRoomName, setNewRoomName] = useState(roomName);
  const editRoomName = async () => {
    try {
      await updateDoc(chatRoomRef, {
        name: newRoomName,
      });
      reloadTitle()
    } catch (error) {
      console.error("Error editing chat: ", error);
    }
  };
  const handleRoomNameChange = (e) => {
    setNewRoomName(e.target.value);
  };

  //SEARCH USERS:
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID;
  const algoliaApiKey = process.env.REACT_APP_ALGOLIA_API_KEY;
  const algoliasearch = require("algoliasearch");
  const client = algoliasearch(algoliaAppId, algoliaApiKey);
  const index = client.initIndex("chat-users");

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
      setSearchInput("");
      return;
    }
    //THIS FUNCTION SEARCHES THE ALGOLIA INDEX OF USERS COLLECTION AND RETURNS WHAT MATCHES
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

  //ADD SEARCHED USER TO USERLIST:
  const [displayUsers, setDisplayUsers] = useState(userList);

  const handleAddUser = (index, value) => {
    const updatedUserList = [...displayUsers];
    console.log(updatedUserList);
    if (!updatedUserList.includes(value)) {
      // If it doesn't exist, add it to the end of the array
      updatedUserList.push(value);
      userListEdit(updatedUserList);
    }
  };

  const userListEdit = async (updatedUserList) => {
    try {
      setDisplayUsers(updatedUserList);
      await updateDoc(chatRoomRef, {
        userList: updatedUserList,
      });
      setSearchInput("");
      setSearchResults([]);
    } catch (error) {
      console.error("Error editing chat user list: ", error);
    }
  };

  //RELOAD PAGE WHEN CHANGES ARE MADE:
  const reloadTitle = () => {
    console.log("RELOADING ROOM");
    navigate("/chat", {
      state: {
        id: roomID,
        name: newRoomName,
        owner: roomOwner,
        userList: userList,
        displayName: displayName,
      },
    });
  };

  return (
    <EditFormWrapper>
      <EditForm>
        <H4>Edit Room Name:</H4>
        <Section>
          <input
            type="text"
            value={newRoomName}
            onChange={handleRoomNameChange}
          />
          <IconButton type="button" onClick={editRoomName}>
            <Icon src={editIcon} />
          </IconButton>
        </Section>

        <H4>Add User:</H4>
        <Section>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e)}
            placeholder="Search for a user to add (username)"
          />
          <IconButton type="button">
            <Icon src={addIcon} />
          </IconButton>
        </Section>
        <Section>
          {searchResults.map((result, index) => (
            <button
              type="button"
              key={result.objectID}
              onClick={() => handleAddUser(index, result.username)}
            >
              {result.username}
            </button>
          ))}
        </Section>
        <H4>Current Users:</H4>
        <Section>
          <div>
            {displayUsers.map((user, index) =>
              user !== roomOwner ? (
                <div key={index}>
                  {user}
                  <button
                    type="button"
                    // onClick={() => removeUserFromList(user)}
                  >
                    X
                  </button>
                </div>
              ) : null
            )}
          </div>
        </Section>
        <br />
        <Section>
          <IconButton type="button">
            <Icon src={trashIcon} />
          </IconButton>
        </Section>
      </EditForm>
    </EditFormWrapper>
  );
};

export default EditChat;

const EditFormWrapper = styled.div``;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Lato;
  margin-top: 5%;
  max-width: 100%;
`;
const Section = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const H4 = styled.h4`
  color: #e0b3b3;
  text-decoration: underline;
`;

const IconButton = styled.button`
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: inherit;
  max-width: 2vw;
  cursor: pointer;
`;
const Icon = styled.img`
  max-height: 1.5vw;
  margin-right: 15px;
`;
