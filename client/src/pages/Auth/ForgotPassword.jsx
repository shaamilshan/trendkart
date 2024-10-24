import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import {  useNavigate } from "react-router-dom";
import axios from 'axios'


const ForgotPassword = () => {

    const [email,setEmail] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [answer,setAnswer] = useState("")
  const navigate = useNavigate()


  const handleSubmit= async (e)=>{
    e.preventDefault()
    try{
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {email,newPassword,answer},
        { timeout: 5000 })
      if(res && res.data.success){
        toast.success(res.data.message)
        navigate('/login')
      }else{
        toast.error(res.data.message)
      }
    }catch(err){
      if (err.response) {
        console.log(err.response.data); // Server response
      } else {
        console.log(err.message); // Network error or other
      }
      toast.error('Something went wrong')
    }
  }
  console.log(process.env.REACT_APP_API)
  return (
    <Layout>
      <div className="register">
        <h1>forgot password page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e)=> setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e)=> setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Favourite Brand"
              required
            />
          </div>
    
           <div> 
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
