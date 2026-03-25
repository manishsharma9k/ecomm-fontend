import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Delete, Pencil, DeleteIcon, Trash } from "lucide-react"
import Modal from '../components/Modal';
import {toast} from 'react-hot-toast'



function Users() {
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  })
  const [editUser, setEditUser] = useState(null)



  const fetchAllUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_API}/api/user/all`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
      );
      if (res.data.success) {
        setUsers(res.data.user)
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");

    }
  };
  useEffect(() => {
    fetchAllUser();
  }, []);
  console.log(users);

  const handleSubmit = async () => {

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_API}/api/user/signup`, formData)
      if (res.data.success) {
        setUsers([...users, res.data.user])
        setOpen(false)
        setFormData({ name: "", email: "", mobile: "" })
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (user) => {
    setEditUser(user)
    setFormData({ name: user.name, email: user.email, mobile: user.mobile })
    setOpen(true)
  }
  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BASE_API}/api/user/update/${editUser._id}`, formData)
      if (res.data.success) {
        const updatedUsers = users.map((user) => user._id === editUser._id ? res.data.user : user)
        setUsers(updatedUsers)
        setEditUser(null)
        setFormData({ name: "", email: "", mobile: "" })
        setOpen(false)
      }
    } catch (error) {
      console.log(error);
    }finally{
      fetchAllUser();
    }
  }
  const handleDelete = async (id) => {
     const confirmDelete = window.confirm("Are you sure?");
       if (!confirmDelete) 
       return;
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_API}/api/user/delete/${id}`)
      if (res.data.success) {
        toast.success(res.data.message)
        const filteredUsers = users.filter((user) => user._id !== id)
        setUsers(filteredUsers)
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  }





  return (
    <div>
      <div className='flex justify-between items-center '>
        <div className='font-bold ml-3'>All User</div>
        <div className='px-2 py-1  rounded bg-blue-500 text-white hover:bg-red-600'><button onClick={() => setOpen(true)}>+Add New</button></div>
      </div>
      <div>
        <table width="100%" className='border '>
          <thead className='bg-gray-600 h-15'>
            <tr className='border-b-2 border-gray-300'>
              <th className='border-l'>Action</th>
              <th className='border-l'>Name</th>
              <th className='border-l'>Email</th>
              <th className='border-l'>phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user?._id} className="border-b">
                <td className='flex gap-1 p-4'>
                  <span onClick={() => handleEdit(user)} className='text-sx bg-blue-50 p-1 hover:bg-green-400'><Pencil /></span>
                  <span onClick={()=>handleDelete(user._id)} className='text-sx bg-blue-50 p-1 hover:bg-red-400'><Trash /></span>
                </td>
                <td className='border-l p-2'>{user?.name}</td>
                <td className='border-l p-2'>{user?.email}</td>
                <td className='border-l p-2'>{user?.mobile}</td>
              </tr>
            ))}
          </tbody>

        </table>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <h1 className='text-2xl font-bold '>
            {editUser ? "Edit User" : "Add New User"}
          </h1>
          <div className='mt-3 '></div>
          <label className='font-bold '>Enter user name:-</label>
          <input type="text"
            placeholder='enter your name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className='w-full outline-0 border rounded  px-4 py-1 mt-2 ' />
          <label className='font-bold '>Enter user email:-</label>
          <input type="email"
            placeholder='enter your email'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className='w-full outline-0 border rounded  px-4 py-1 mt-2 ' />
          <label className='font-bold '>Enter user phone number:-</label>
          <input type="text"
            placeholder='enter your phone number'
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            className='w-full outline-0 border rounded  px-4 py-1 mt-2 ' />
          <div className='flex justify-end'>
            <button onClick={editUser ? handleUpdate : handleSubmit} className='px-3 font-bold text-white bg-blue-400 rounded mt-3 '>
              {editUser ? "Edit" : "Save"}
            </button>
          </div>

        </Modal>
      </div>
    </div>
  )
}

export default Users

