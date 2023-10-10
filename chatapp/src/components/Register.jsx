import React, { useState } from "react";
import { useNavigate } from "react-router";

import { getAuth, updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import {
  collection,
  serverTimestamp,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import styled from "styled-components";
import registerIcon from "../assets/images/registerIcon.png";
const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const registerUser = async (e) => {
    e.preventDefault();
    if (
      email.trim() === "" ||
      username.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setErrorMessage("Both email and password fields are required!");
      return;
    } else if (confirmPassword.trim() !== password.trim()) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    setErrorMessage(null);
    const displayName = username;

    const userCollectionRef = collection(db, "chat-users");
    // Check for duplicate username
    const duplicateUsernameQuery = query(
      userCollectionRef,
      where("username", "==", username)
    );
    const usernameQuerySnapshot = await getDocs(duplicateUsernameQuery);

    if (!usernameQuerySnapshot.empty) {
      setErrorMessage("Username is already taken.");
      return;
    }

    // Check for duplicate email
    const duplicateEmailQuery = query(
      userCollectionRef,
      where("email", "==", email)
    );
    const emailQuerySnapshot = await getDocs(duplicateEmailQuery);

    if (!emailQuerySnapshot.empty) {
      setErrorMessage("Email is already registered.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        displayName
      );

      console.log(userCredential);

      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      console.log("PROFILE UPDATED TO INCLUDE DISPLAYNAME");

      if (usernameQuerySnapshot.empty && emailQuerySnapshot.empty) {
        // No duplicates found, create the new user document
        const userDocRef = doc(userCollectionRef);
        await setDoc(userDocRef, {
          username: username,
          email: email,
          timestamp: serverTimestamp(),
        });
        console.log("User document created.");
      }

      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message);
      console.log(errorMessage);
    }
  };

  let handleEmailChange = async (e) => {
    setEmail(e.target.value);
  };

  let handleUserNameChange = async (e) => {
    setUsername(e.target.value);
  };

  let handlePasswordChange = async (e) => {
    setPassword(e.target.value);
  };

  let handleConfirmPasswordChange = async (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <RegisterPage>
      <RegisterLogo src={registerIcon} alt="logo" />
      <Header>Welcome, glad to have you!</Header>
      <div className="form-container">
        <RegisterForm onSubmit={registerUser}>
          <InputStyler
            type="email"
            placeholder="Enter your email"
            required
            onChange={handleEmailChange}
          />
          <InputStyler
            type="username"
            placeholder="Enter your preferred username"
            required
            onChange={handleUserNameChange}
          />
          <InputStyler
            type="password"
            required
            placeholder="Enter your password"
            onChange={handlePasswordChange}
          />
          <InputStyler
            type="password"
            required
            placeholder="Confirm your password"
            onChange={handleConfirmPasswordChange}
          />
          <ButtonContainer>
            <RegisterButton type="submit">Register</RegisterButton>
          </ButtonContainer>
        </RegisterForm>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </div>
      <BackButton onClick={() => navigate("/")}>Back</BackButton>
    </RegisterPage>
  );
};

export default Login;

const RegisterPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RegisterLogo = styled.img`
  width: 100px;
  height: 100px;
`;

const RegisterButton = styled.button`
  box-sizing: border-box;
  width: 311px;
  height: 44.91px;
  border-radius: 10px;
  border: 1px solid #e9ecff;
  padding: 10px, 40px, 10px, 40px;
  gap: 10px;
  font-family: Lato;
  font-size: 20px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0em;
  background: #e0b3b3;
  &:hover {
    background: lightgray;
  }
`;

const Header = styled.h1`
  width: 311px;
  height: 33px;
  top: 9375px;
  left: -8372px;
  opacity: 40%;
  font-family: "Lato";
  font-weight: 400;
  font-size: 14px;
  line-height: 16.8px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputStyler = styled.input`
  box-sizing: border-box;
  width: 311px;
  height: 44.91px;
  top: 9431px;
  left: -8372px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px #e0b3b3;
  margin-bottom: 10px;
  font-family: "Exo", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 23.92px;
  padding-left: 15px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
`;
const BackButton = styled.button`
  margin-top: 25px;
  background: none;
  border: none;
  font-family: Lato;
  cursor: pointer;
  cursor: pointer;
  font-size: medium;
  font-weight: heavy;
  color: #a6a6a6;
`;
