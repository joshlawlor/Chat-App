import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

//Image Imports:
import communityIcon from "../assets/images/communityIcon.png";
import chatGif from "../assets/images/chatGif.gif";
import starGif from "../assets/images/starGif.gif";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <LandingPage>
      <Logo src={communityIcon} alt="logo" />
      <Header>Welcome! Sign in to your account.</Header>
      <ButtonsWrapper>
        <LoginButton onClick={() => navigate("/login")}>
          <LoginIcon src={chatGif} alt="talenticon" />
          <div>
            <ButtonTitle>Log in</ButtonTitle>
            <H3>Start chatting!</H3>
          </div>
        </LoginButton>
        <RegisterButton onClick={() => navigate("/register")}>
          <RegisterIcon src={starGif} alt="talenticon" />
          <div>
            <ButtonTitle>Register</ButtonTitle>
            <H3>Join our community!</H3>
          </div>
        </RegisterButton>
      </ButtonsWrapper>
    </LandingPage>
  );
};

export default Landing;

const LandingPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img``;

const Header = styled.h1`
  width: 298px;
  height: 14.03px;
  top: 8833.28px;
  left: -10137px;
  font-family: "Lato";
  font-size: 20px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  padding-bottom: 30px;
  opacity: 40%;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 670px;
  margin-top: 20px;
`;
const RegisterButton = styled.button`
  width: 325px;
  height: 207.26px;
  top: 8895.03px;
  left: -9982px;
  border-radius: 20px;
  border: 1px solid #E9ECFF;
  box-shadow: 0px 4px 16px 0px rgba(92, 116, 231, 0.15);
  padding:0;
  margin-right: 10px;
  background:  linear-gradient(0deg, #ffffff, #ffffff),
  linear-gradient(0deg, #ffeae8, #ffeae8);
  background-origin: border-box;
  background-clip: content-box, border-box;
  &:hover{
    background: lightgray;
`;
const LoginIcon = styled.img`
  margin: none;
`;
const LoginButton = styled.button`
  width: 325px;
  height: 207.26px;
  top: 8895.03px;
  left: -9982px;
  border-radius: 20px;
  border: 1px solid #ffeae8;
  box-shadow: 0px 4px 16px 0px rgba(243, 179, 171, 0.15);
  padding: 0;
  background: linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(0deg, #ffeae8, #ffeae8);
  background-origin: border-box;
  background-clip: content-box, border-box;
  &:hover {
    background: lightgray;
  }
`;
const RegisterIcon = styled.img``;
const ButtonTitle = styled.h1`
  width: 120px
  height: 24.92px;
  top: 8995.83px;
  left: -9860px;
  weight: 700;
  size: 18px;
  line-height: 21.6px;
  font-family:'lato';
  color: #e0b3b3;
`;
const H3 = styled.h3`
  width: 187px
  height: 32.84px;
  top: 9029.81px;
  left: -9893px;
  font-family:'lato';
  weight: 500;
  size: 14px;
  line-height: 29px;
  color: #e0b3b3;
`;
