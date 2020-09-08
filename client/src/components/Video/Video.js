import React, { useEffect, useState, useRef } from "react";
import Peer from "peerjs";
import "./Video.css";
import UsersVideos from "../UsersVideos/UsersVideos";
import io from "socket.io-client";
const peer = new Peer(undefined, {
  path: "/peerjs/",
  host: "/",
  port: 3030,
});

let socket;
export default function Video(props) {
  const [src, setSrc] = useState([]);
  const srcMe= useRef([])
  const id = useRef("");
  const ENDPOINT = "http://localhost:5000/";
  socket = io(ENDPOINT);
  if (!props.match.params.id) {
    if (id.current === "") {
      fetch("http://localhost:5000/")
        .then((res) => res.json())
        .then((res) => (id.current = res));
    }
  } else {
    id.current = props.match.params.id;
  }
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        srcMe.current=stream
        setSrc(prev=>[...prev,stream])
        peer.on('call',call=>{
          call.answer(stream)
          call.on('stream',otherUserStream=>{
            setSrc((prev) => [otherUserStream])
          })
        })
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
        peer.on("open", (userId) => {
          if (id.current !== "" ) {
            socket.emit("join", { id: id.current, userId });
          }
        });
    socket.on("user-connected", (userId) => {
      const call = peer.call(userId,srcMe.current);
      call.on('stream',otherUserStream=>{
        setSrc((prev) => [...prev, otherUserStream])
      })
    });
  },[src]);

  return (
    <div className="video-grid">
      {src.length!==0?(src.map((stream,index) => {
        console.log(src.length);
        return <UsersVideos stream={stream} key={index}/>;
      })):null}
    </div>
  );
}
