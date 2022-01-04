import React, { useEffect } from "react";
import "./App.css";
import WebcamCapure from "./WebcamCapure";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { useSelector } from "react-redux";
import { login, selectUser } from "./features/appSlice";
import { useDispatch } from "react-redux";
import Login from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            username: user.displayName,
            profilePic: user.photoURL,
            id: user.uid,
          })
        );
      }
    });
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
            className="app__logo"
              src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
              alt=""
            />
            <div className="app__body">
              <Routes>
                <Route path="/" element={<WebcamCapure />} />
                <Route path="/preview" element={<Preview />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/chats/view" element={<ChatView />} />
              </Routes>
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
