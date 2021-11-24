import { useState } from "react";

const Counter = () => {

  const [counter, setCounter]= useState(0); 

  return (


    <div>
      <h2>this is a counter </h2>
      <h2> Counter: {counter}</h2>
      <p> stare at the buttom and click for 5 times </p>
      <buttom onClick = {()=> setCounter(counter+1)}> 🔘 </buttom>
     
    </div>
  );
};

export default Counter;