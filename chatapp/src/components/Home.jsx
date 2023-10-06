import React from "react";
import { useNavigate } from "react-router";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User authenticated", user);
    } else {
      navigate("/");
      console.log("Unauthenticated");
    }
  });
  return <div>Home</div>;
};

export default Home;
