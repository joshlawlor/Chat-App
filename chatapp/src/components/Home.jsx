import React, { useState } from "react";
import { useNavigate } from "react-router";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import menuIcon from "../assets/images/menuIcon.png";

import Navbar from "./Navbar";
import ResetPassword from "../utils/resetPassword";

//CHAT ELEMENT IMPORTS:
import ChatRooms from "./ChatElements/ChatRooms";
const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  // This is the state tracking whether or not user has clicked to view the menu
  const [showMenu, setShowMenu] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User authenticated", user.displayName);
    } else {
      navigate("/");
      console.log("Unauthenticated");
    }
  });
  const openMenu = () => {
    setShowMenu(true);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };

  const logoutHandler = () => {
    auth.signOut();
  };

  return (
    <HomeWrapper>
      <Navbar />
      <MenuWrapper>
        <MenuButton onClick={openMenu}>
          <Icon src={menuIcon} alt="menu" />
          Menu
        </MenuButton>
      </MenuWrapper>
      <ContentWrapper>
        <Heading>Your Chat Rooms:</Heading>
        <ChatRooms />


        
      </ContentWrapper>
      {/* BELOW IS THE CHECK WHETHER OR NOT USER CLICKED THE MENU BUTTON ABOVE */}
      {showMenu && (
        //THIS IS THE MENU POP UP ELEMENT, STYLED BELOW
        <MenuModal onClick={closeMenu}>
          <MenuModalContent>
            <CloseMenu onClick={closeMenu}>x</CloseMenu>
            {/* HERE I AM IMPORTING THE RESET PASSWORD COMPONENT FOR LESS MESS */}
            <ResetPassword />
            <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>
          </MenuModalContent>
        </MenuModal>
      )}
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 15vw; /* Adjust the left margin to match the Navbar width */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  color: #e0b3b3;
`;

const MenuWrapper = styled.div`
  margin-top: 50px;
  position: absolute;
  min-width: 10%;
  right: 0;
  top: 0;
`;

const MenuButton = styled.button`
  border: none;
  margin: 10px;
  font-family: Lato;
  font-size: calc(5px + 2vmin);
  background-color: inherit;
  cursor: pointer;
  color: #e0b3b3;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  max-height: 1.5vw;
  margin-right: 15px;
`;

const MenuModal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const MenuModalContent = styled.div`
  border: 4px solid #e0b3b3;
  border-radius: 25px;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  width: 25%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const LogoutButton = styled.button`
  margin-top: 20px;
`;

const CloseMenu = styled.button`
  color: #b3e0b3;
  font-weight: bold;
  border: none;
  font-family: Lato;
  font-size: calc(10px + 2vmin);
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;
