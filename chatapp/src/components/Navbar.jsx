import React , {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth , onAuthStateChanged} from "firebase/auth";

//Logo + Icon imports:
import styled from "styled-components";
import navLogo from "../assets/images/navbarLogo.png";
import homeIcon from "../assets/images/homeIcon.png";
import chatIcon from "../assets/images/chatIcon.png";
export default function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [ displayName,setDisplayName] = useState('please set a username');
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User authenticated", user.displayName);
      if(user.displayName !== null ){
      setDisplayName(user.displayName);
      }
    } else {
      navigate("/");
      console.log("Unauthenticated");
    }
  });
  //Checks current location, to check what page user is currently on
  const location = useLocation();
  const isButtonActive = (path) => location.pathname === path;

  return (
    <NavbarWrapper>
      <NavTitle>
        <NavLogo src={navLogo} />
        <Heading>Welcome {displayName}!</Heading>
      </NavTitle>
      <NavButtonsWrapper>
        <Button
          className={isButtonActive("/home") ? "active" : ""}
          onClick={() => navigate("/home")}
        >
          <Icon src={homeIcon} alt="home" />
          Home
        </Button>
        <Button
          className={isButtonActive("/chat") ? "active" : ""}
          onClick={() => navigate("/chat")}
        >
          <Icon src={chatIcon} alt="chat" />
          Chat
        </Button>
      </NavButtonsWrapper>

      <NavbarFooter></NavbarFooter>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0; /* Fix it to the left */
  min-width: 15vw;
  max-width: 15vw;
  background: #e0b3b3;
  z-index: 1;
`;

const NavTitle = styled.h1`
  margin-top: 50px;
  color: #111d48;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  max-width: 15vw;
  text-align: center;
  font-size: calc(10px + 2vmin);
  color: #b3e0b3;
`;

const NavLogo = styled.img`
  max-height: 15vh;
  max-width: 10vw;
`;

const NavButtonsWrapper = styled.div``;

const Button = styled.button`
  border: none;
  margin-top: 5px;
  margin-right: 1vw;
  font-family: Lato;
  font-size: calc(10px + 2vmin);
  background-color: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #b3e0b3;
  &.active {
    text-decoration: underline;
  }
`;

const Icon = styled.img`
  max-height: 2.5vw;
  margin-right: 25px;
  weight: heavy;
`;

const NavbarFooter = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
