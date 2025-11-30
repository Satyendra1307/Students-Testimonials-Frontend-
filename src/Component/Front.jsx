import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Rating from "../Component/Rating.jsx"     
import "./Front.css"

function Front() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get("http://localhost:7077/api/getallUser") 
      .then(res => {
        console.log(res.data)
        setUsers(res.data.user)
      })
      .catch(err => {
        console.error("Error fetching users:", err)
      })
  }, [])

  return (
    <div className='main-div'>
      <div className='main-heading'>
        <h1>Student Testimonials</h1>
      </div>

      <div className='user-list'>
        {users.map((user, index) => (
          <div key={index} className='user-card'>
            
            <img src={user.image} alt={user.name} />

            <h3 className='name'>{user.name}</h3>

            <Rating userId={user._id} currentRating={user.rating} />

            <p className='desc'>{user.description}</p>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Front
