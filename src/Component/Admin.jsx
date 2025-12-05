import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

function Admin() {

  const [view, setView] = useState("all");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  const [form, setForm] = useState({
    image: "",
    name: "",
    rating: 0,
    description: "",
  });

  const [editId, setEditId] = useState("");

 
  const fetchUsers = () => {
    axios.get("https://students-testimonials-backend.onrender.com/api/getallUser")
      .then(res => setUsers(res.data.user))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add User
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://students-testimonials-backend.onrender.com/api/saveUser", form)
      .then(() => {
        alert("User Added!");
        setForm({ image: "", name: "", rating: 0, description: "" });
        setView("all");
        fetchUsers();
      })
      .catch(err => console.log(err));
  };

  // Update User
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://students-testimonials-backend.onrender.com/api/updateUser/${editId}`, form)
      .then(() => {
        alert("User Updated!");
        setForm({ image: "", name: "", rating: 0, description: "" });
        setEditId("");
        setView("all");
        fetchUsers();
      })
      .catch(err => console.log(err));
  };

  // Delete User
  const handleDelete = (id) => {
    axios.delete(`https://students-testimonials-backend.onrender.com/api/deleteUser/${id}`)
      .then(() => {
        alert("User Deleted!");
        fetchUsers();
      })
      .catch(err => console.log(err));
  };

  // Set Data to Edit
  const startEdit = (user) => {
    setForm(user);
    setEditId(user._id);
    setView("edit");
  };

  return (
    <div className="admin-container">

      <h2>Admin Panel</h2>

      <div className="btn-group">
        <button onClick={() => setView("all")}>All Users</button>
        <button onClick={() => setView("add")}>Add User</button>
         <button onClick={() => navigate("/")}>Go To Home</button>
      </div>

      
      {view === "add" && (
        <form className="form-box" onSubmit={handleSubmit}>
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="rating" type="number" min="1" max="5" placeholder="Rating" value={form.rating} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <button type="submit">Add User</button>
        </form>
      )}

      
      {view === "edit" && (
        <form className="form-box" onSubmit={handleUpdateSubmit}>
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="rating" type="number" min="1" max="5" placeholder="Rating" value={form.rating} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <button  type="submit">Update User</button>
        </form>
      )}

     
      {view === "all" && (
        <div className="user-list-admin">
          {users.map((user) => (
            <div key={user._id} className="user-box">
              <img src={user.image} alt={user.name} />
              <h3>{user.name}</h3>
              <p>Rating: {user.rating}</p>
              <p>{user.description}</p>

              <button className="edit-btn" onClick={() => startEdit(user)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Admin;
