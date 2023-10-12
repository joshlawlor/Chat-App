import React from "react";
import styled from "styled-components";
import editIcon from "../assets/images/editIcon.png";
import addIcon from "../assets/images/addIcon.png";
import trashIcon from "../assets/images/trashIcon.png";
const EditChat = ({userList, roomOwner}) => {
  return (
    <EditFormWrapper>
      <EditForm>
        <H4>New Room Name:</H4>
        <Section>
          <input type="text" />
          <IconButton type="button">
            <Icon src={editIcon} />
          </IconButton>
        </Section>

        <H4>Add User:</H4>
        <Section>
          <input
            type="text"
            placeholder="Search for a user to add (username)"
          />
          <IconButton type="button">
            <Icon src={addIcon} />
          </IconButton>
        </Section>
        <H4>Current Users:</H4>
        <Section>
          <div>
            {userList.map((user, index) =>
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