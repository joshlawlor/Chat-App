import React, { useState } from "react";
import { getAuth, updatePassword } from "@firebase/auth";
import styled from "styled-components";
import resetIcon from "../assets/images/resetIcon.png";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  //Grabbing the current logged in user using firebase getAuth
  const auth = getAuth();
  const currentUser = auth.currentUser;
  //Finds current user and updates the password to reflect what user inputted
  const updateUserPassword = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    await updatePassword(currentUser, newPassword)
      .then(() => {
        setErrorMessage("Password has been successfully updated!");
        //Resets the newPassword input value for next reset request
        setNewPassword("");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  let handlePasswordChange = async (e) => {
    setNewPassword(e.target.value);
  };
  return (
    <ResetPasswordWrapper>
      <ContentWrapper>
        <Heading>Forgot your password? </Heading>

        <ResetForm onSubmit={updateUserPassword}>
          <label>Set a new password: </label>
          <input required onChange={handlePasswordChange} value={newPassword} />
          <ResetButton type="submit">
            Reset 
            <Icon src={resetIcon} />
          </ResetButton>
        </ResetForm>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </ContentWrapper>
    </ResetPasswordWrapper>
  );
};

export default ResetPassword;

const ResetPasswordWrapper = styled.div`
  display: flex;
`;
const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h3`
  color: #e0b3b3;
  font-family: Lato;
`;

const ResetForm = styled.form`
  color: #e0b3b3;
`;

const ResetButton = styled.button`
  border: none;
  margin-left: 10px;
  border-radius: 25px;
  color: #e0b3b3;
  background-color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(224, 179, 179, 0.1);
    font-weight: bold;
    box-shadow: 0 0 5px 5px #e0b3b3;
  }
`;


const CancelButton = styled.button`
  border: 3px solid #e0b3b3;
  border-radius: 25px;
  font-family: Lato;
  font-size: larger;
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
max-height: 1.5vh;
margin-left: 5px;


`;
