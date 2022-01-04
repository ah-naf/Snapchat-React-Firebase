import { Button } from "@material-ui/core";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { auth, provider } from "./Firebase";
import "./Login.css";

export default function Login() {
  const dispatch = useDispatch();

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          login({
            username: user.displayName,
            profilePic: user.photoURL,
            id: user.uid,
          })
        );
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
        <Button variant="outlined" onClick={login}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
