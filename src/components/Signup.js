import React,{useState} from 'react'

import {useHistory} from 'react-router-dom'
const Signup = () => {
    const [credentails,setcredentails] = useState({name:"",email:"",password:""})
    let history = useHistory();
    const handlesubmit = async (e)=>{

        e.preventDefault();  
        const response = await fetch("http://localhost:5000/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
             },
            body: JSON.stringify({name:credentails.name, email:credentails.email,password:credentails.password }),
          });
          const json = await response.json();
          console.log(json);
          if(json.sucess){
            localStorage.setItem('token',json.authtoken);
            history.push("/")
            alert("account create successfully")
            
          }else{
            alert("invalid ")
          }
    }
    const onChange=(e)=>{
        setcredentails({...credentails,[e.target.name]:e.target.value})
    }
  return (
    <div className='container'>
        <form onSubmit={handlesubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Name</label>
    <input type="text" className="form-control" id="name" name='name'  value={credentails.name} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Name"/>
    
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentails.email}  onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
    
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" name='password'  onChange={onChange}  value={credentails.password} placeholder="Password"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
