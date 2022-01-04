import { Avatar } from "@material-ui/core";
import React from "react";
import "./Chat.css";
import StopRoundIcon from "@material-ui/icons/StopRounded";
import ReactTimeago from "react-timeago";
import { useDispatch } from "react-redux";
import { selectImage } from "./features/appSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { useNavigate } from "react-router-dom";

export default function Chat({
  profilePic,
  username,
  imageUrl,
  read,
  timestamp,
  id,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      const docRef = doc(db, "snap", id);

      updateDoc(docRef, {
        read: true,
      });

      navigate("/chats/view");
    }
  };

  return (
    <div onClick={open} className="chat">
      <Avatar className="chat__avatar" src={profilePic}></Avatar>
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read && 'Tap to view -'}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />{" "}
        </p>
      </div>
      {!read && <StopRoundIcon className="chat__readIcon" />}
    </div>
  );
}
