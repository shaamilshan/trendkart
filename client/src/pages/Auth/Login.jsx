import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useAuth } from "../../context/auth";

const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [auth,setAuth] = useAuth()
  const navigate = useNavigate()
  const location = useLocation


  const handleSubmit= async (e)=>{
    e.preventDefault()
    try{
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
        {email,password},
        { timeout: 5000 })
      if(res.data.success){
        console.log(res.data)
        toast.success(res.data.message)
        setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
        })
        localStorage.setItem("auth",JSON.stringify(res.data))
        console.log(localStorage.getItem('auth'));
        navigate(location.state||'/')
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
        <h1>login page</h1>
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
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
    
        <div className="mb-3">
        <button type="button" className="btn btn-primary"
         onClick={()=>{navigate('/forgot-password')}}>
            Forgot Password?
          </button>
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

export default Login
