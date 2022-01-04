import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chats.css";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, colRef } from "./Firebase";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { logout, selectUser } from "./features/appSlice";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { resetCameraImage } from "./features/cameraSlice";

export default function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  useEffect(() => {
    onSnapshot(query(colRef, orderBy("timestamp", "desc")), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => {
            signOut(auth).then(() => dispatch(logout()));
          }}
          className="chats__avatar"
        >
          {user.username[0]}
        </Avatar>
        <div className="chats__search">
          <SearchIcon style={{ color: "white", fontSize: "13px" }} />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon
          style={{ color: "white", fontSize: "18px" }}
          className="chats__chatIcon"
        />
      </div>

      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, imageUrl, read, timestamp },
          }) => {
            return (
              <Chat
                key={id}
                id={id}
                username={username}
                imageUrl={imageUrl}
                timestamp={timestamp}
                read={read}
                profilePic={profilePic}
              />
            );
          }
        )}
      </div>
      <RadioButtonUnchecked
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}
