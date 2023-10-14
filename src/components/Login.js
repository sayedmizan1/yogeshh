import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
const Login = () => {
    const [credentails,setcredentails] = useState({email:" ",password:""})
    let history = useHistory();
    const handlesubmit = async (e)=>{
        e.preventDefault();  
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
             },
            body: JSON.stringify({ email:credentails.email,password:credentails.password }),
          });
          const json = await response.json();
          console.log(json);
          if(json.sucess){
            localStorage.setItem('token',json.authToken);
            history.push("/")
          }else{
            alert("invalid ")
          }
    }
    const onChange=(e)=>{
        setcredentails({...credentails,[e.target.name]:e.target.value})
    }
  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentails.email}
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            
            value={credentails.password}
            onChange={onChange}
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
      
        <button type="submit"  className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
