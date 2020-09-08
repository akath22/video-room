import React,{useRef,useEffect} from 'react'

export default function UsersVideos({stream}) {
    const newRef= useRef() 
    useEffect(() => {
        if (stream && newRef.current && !newRef.current.srcObject) {
            newRef.current.srcObject = stream;
          }
    }, [])
    return (
      <video ref={newRef} autoPlay playsInline muted className="video1" ></video>
    )
}
