import React, { useState } from "react";
import { useNavigate } from "react-router";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styled from "styled-components";
import loginIcon from "../assets/images/loginIcon.png";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const userCollectionRef = collection(db, "chat-users");

  const loginUser = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setErrorMessage("Both email and password fields are required!");
      return;
    }
    setErrorMessage(null);

    const duplicateEmailQuery = query(
      userCollectionRef,
      where("email", "==", email),
      where("provider", "==", "google")
    );
    const emailQuerySnapshot = await getDocs(duplicateEmailQuery);

    if (!emailQuerySnapshot.empty) {
      // Email already exists
      let userDocRef = null;
      console.log("Email already exists under google signin", userDocRef);
      await emailQuerySnapshot.forEach((doc) => {
        userDocRef = doc;
        console.log("User doc: " + doc);
        setErrorMessage(
          "Email already exists under google account. Please use google sign-in"
        );
        return;
      });
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          navigate("/home");
        })
        .catch((error) => {
          setErrorMessage(error.message);
          console.log(errorMessage);
        });
    }
  };

  let handleEmailChange = async (e) => {
    setEmail(e.target.value);
  };

  let handlePasswordChange = async (e) => {
    setPassword(e.target.value);
  };

  return (
    <LoginPage>
      <LoginLogo src={loginIcon} alt="logo" />
      <Header>Welcome back!</Header>
      <div className="form-container">
        <LoginForm onSubmit={loginUser}>
          <InputStyler
            type="email"
            placeholder="Enter your email"
            required
            onChange={handleEmailChange}
          />
          <InputStyler
            type="password"
            required
            placeholder="Enter your password"
            onChange={handlePasswordChange}
          />
          <ButtonContainer>
            <LoginButton type="submit">Log In</LoginButton>
          </ButtonContainer>
        </LoginForm>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </div>
      <ForgotPasswordLink onClick={() => navigate("/forgot-password")}>
        Forgot Password?
      </ForgotPasswordLink>
      <BackButton onClick={() => navigate("/")}>Back</BackButton>
    </LoginPage>
  );
};

export default Login;

const LoginPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginLogo = styled.img`
  width: 100px;
  height: 100px;
`;

const LoginButton = styled.button`
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
  cursor: pointer;
  &:hover {
    background: #b3e0b3;
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

const LoginForm = styled.form`
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
const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  color: #334e68;
  cursor: pointer;
  cursor: pointer;
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
