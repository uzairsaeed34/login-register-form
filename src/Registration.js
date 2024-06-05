import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Registration = () => {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const navigate = useNavigate();
  const IsValidate = () => {
    let isproceed = true;
    let errormessage = 'Please enter the vlaue in ';
    if(id === null || id === ''){
      isproceed = false;
      errormessage +='Username;'
    }
    if(id === null || name === ''){
      isproceed = false;
      errormessage +=' Name;'
    }
    if(id === null || email === ''){
      isproceed = false;
      errormessage += ' Email;'
    }
    if(id === null || password === ''){
      isproceed = false;
      errormessage += ' Password;'
    }
    if(!isproceed){
      toast.warning(errormessage)
    }else{
      if (regex.test(email)){

      }else{
        isproceed = false;
        toast.warning('please enter the valid Email')
      }
    }
    return isproceed;
  }

  const handlesubmit = (e) => {
    if(IsValidate()){
    e.preventDefault()
      if (!id || !name || !password || !email) {
        toast.error("Please fill all required fields")
        return
      }
      
      const regobj = { id, name, password, email, address }
      const JSONData = JSON.stringify(regobj)

      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSONData
      }).then((res) => {
        if (res.ok) {
          toast.success('Registered Successfully.')
          navigate('/login');
        } else {
          throw new Error('Failed to register')
        }
      }).catch((err) => {
        toast.error(`Failed: ${err.message}`)
      });
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className='d-flex align-items-center justify-content-center vh-100 offset-lg-3 col-lg-6'>
        <form className='container' onSubmit={handlesubmit}>
          <div className='card'>
            <div className='card-header'>
              <h1>User Registration</h1>
            </div>
            <div className='card-body'>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>User Name<span className='errmsg'>*</span></label>
                    <input value={id} onChange={e => setId(e.target.value)} type='text' className='form-control' required />
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Password<span className='errmsg'>*</span></label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type='password' className='form-control' required />
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Full Name<span className='errmsg'>*</span></label>
                    <input value={name} onChange={e => setName(e.target.value)} type='text' className='form-control' required />
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Email<span className='errmsg'>*</span></label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type='email' className='form-control' required />
                  </div>
                </div>
                <div className='col-lg-12'>
                  <div className='form-group'>
                    <label>Address</label>
                    <textarea value={address} onChange={e => setAddress(e.target.value)} className='form-control'></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer'>
              <button type='submit' className='btn btn-primary'>Register</button>
              <a className='btn btn-danger' style={{ marginLeft: '10px' }}>Back</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration
