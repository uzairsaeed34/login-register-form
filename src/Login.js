import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const usenavigate = useNavigate();
  useEffect(()=>{
    sessionStorage.clear();
  },[])

  const ProceedLogin = (e) =>{
    e.preventDefault();
    if(validate()){
      fetch("http://localhost:8000/user/" + username)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("User not found");
          }
        })
        .then((resp) => {
          console.log(resp);
          if(Object.keys(resp).length ===0){
            toast.error('Please enter valid username');
          }else{
            if(resp.password === password){
              toast.success('success');
              sessionStorage.setItem('username', username);
                usenavigate('/')
            }else{
              toast.error('Please enter valid credentials');
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed: " + err.message);
        });
    }
  }

  const validate = () =>{
    let result = true;
    if(username === "" || username === null){
      result = false;
      toast.warning ('Please Enter Username')
    }
    if(password === "" || password === null){
      result = false;
      toast.warning ('Please Enter Password')
    }
    return result;
  }
  return (
    <div className='row d-flex align-items-center justify-content-center vh-100'>
      <div className='offset-lg-1 col-lg-5'>
        <form onSubmit={ProceedLogin} className='container'>
          <div className='card'>
            <div className='card-header'>
              <h2>User Login</h2>
            </div>
            <div className='card-body'>
              <div className='form-group'>
              <label>User Name<span className='errmsg'>*</span></label>
              <input value={username} onChange={e => setusername(e.target.value)} type='text' className='form-control' />
              </div>
              <div className='form-group'>
              <label> Passowrd<span className='errmsg'>*</span></label>
              <input  value={password} onChange={e => setpassword(e.target.value)} type='password' className='form-control' />
              </div>
            </div>
            <div className='card-footer'>
              <button type = "submit" className='btn btn-primary'>Login</button>
              <Link className='btn btn-success' to ={'/register'} style={{ marginLeft: '10px' }}>New User</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
