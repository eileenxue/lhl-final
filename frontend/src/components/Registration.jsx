import {useState} from "react"; 

function Registration(db) {


  return (
    <div>
      <div>
        <h1> Registration</h1>
        <label > First Name</label>
        <input type="text" />
        <label > Last Name</label>
        <input type="text" />
        <label > Email</label>
        <input type="email" />
        <label > Password</label>
        <input type="text" />
        <button> Register </button>
      </div>
    </div>
  )
}

export default Registration; 