import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const usenavigate = useNavigate();
  let username = sessionStorage.getItem('username') || '';
  useEffect(() => {
    let username = sessionStorage.getItem('username');
    if(username==="" || username === null){
      usenavigate('/login');
    }
  }, [username]);
  return (
    <div>
      <div className="header">
        <Link to={'/'}>Home</Link>
        <Link style={{float: 'right'}} to={'/login'}>Logout</Link>
      </div>
      <h1 className='text-content d-flex align-items-center justify-content-center'> Welcome to home page</h1>
    </div>
  )
}

export default Home