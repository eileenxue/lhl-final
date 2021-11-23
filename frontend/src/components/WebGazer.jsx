import { useState, useEffect } from "react";
import Counter from "./Counter";


function WebGazer() {
  const [eye, setEye] = useState("");

  useEffect(() => {
    const webgazer = window.webgazer;

    window.saveDataAcrossSession = true;

    let left_cutoff = window.innerWidth / 8;
    let right_cutoff = window.innerWidth - window.innerWidth / 8;
    let top_cutoff = window.innerHeight / 8;
    let bottom_cutoff = window.innerWidth - window.innerHeight / 8;

    
    webgazer
      .setGazeListener((data, timestamp) => {
        if (data == null) return; 
        if (
          data.x < left_cutoff ||
          data.x > right_cutoff ||
          data.y < top_cutoff ||
          data.y > bottom_cutoff
        ) { 
          console.log("nooooooooo");
          setEye("baaaaaaaad"); 
        } else {
          console.log('ok');
          setEye("nice");
      }
    })
      .begin();
  }, []);

  return (
    <div className="App">
      {/* <h1> super exam </h1>
       <UserList />  */}
      <p style={{ fontSize: "8em" }}>{eye}</p>
      < Counter />
    </div>
  );
}
export default WebGazer;
