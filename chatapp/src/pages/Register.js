import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import registerIcon from "../assets/images/registerIcon.png";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const registerUser = async (e) => {};

  let handleEmailChange = async (e) => {
    setEmail(e.target.value);
  };

  let handlePasswordChange = async (e) => {
    setPassword(e.target.value);
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
            type="password"
            required
            placeholder="Enter your password"
            onChange={handlePasswordChange}
          />
          <InputStyler
            type="password"
            required
            placeholder="Confirm your password"
            onChange={handlePasswordChange}
          />
          <ButtonContainer>
            <RegisterButton type="submit">Register</RegisterButton>
          </ButtonContainer>
        </RegisterForm>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </div>
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
const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  color: #334e68;
  cursor: pointer;
  cursor: pointer;
`;
