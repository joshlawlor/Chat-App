import React, { useState } from "react";
import { getAuth, updatePassword } from "@firebase/auth";

import styled from "styled-components";
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
        <h3>Forgot your password? </h3>
        <form onSubmit={updateUserPassword}>
          <label>Set a new password: </label>
          <input required onChange={handlePasswordChange} value={newPassword} />
          <button type="submit">Reset password</button>
        </form>
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
