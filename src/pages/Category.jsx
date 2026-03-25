import { Delete, Pencil, Trash } from 'lucide-react';
import React, { useState } from 'react'
import Modal from '../components/Modal';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';


function Category() {
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [categoryImage, setCategoryImage] = useState(null)
  const [editCategory, setEditCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    image: null
  })

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_API}/api/category/all`, {

        headers: { authorization: localStorage.getItem("token") }
      });
      // const data = await res.json();
      console.log(res);

      if ((res.data.success)) {
        setCategories(res.data.category)
      }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllCategory();
  }, [])

  const handleDelete = async (id) => {
    toast.error(data.message || "Category deleted successfully");
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) {
      return;
    }

    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_API}/api/category/delete/${id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      console.log(res);
      if (res.data.success) {
        setCategories(categories.filter(category => category._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {

    try {
      const sendformData = new FormData();
      sendformData.append("name", formData.name);
      sendformData.append("image", formData.image);

      const res = await axios.post(`${import.meta.env.VITE_BASE_API}/api/category/create`, sendformData, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setCategories([...categories, res.data.category]);
        setFormData({ name: "", image: null });
        setOpen(false);

      }



    } catch (error) {
      console.log(error);
      toast.error(error.data.message || "Something went wrong");
    }
  }

  const handleEdit = (category) => {
    setEditCategory(category._id);
    setFormData({ name: category.name, image: null });
    setOpen(true);
  }
  const handleUpdate = async () => {
    try {
      const sendformData = new FormData();
      sendformData.append("name", formData.name);
      sendformData.append("image", formData.image);

      const res = await axios.put(`${import.meta.env.VITE_BASE_API}/api/category/update/${editCategory}`, sendformData, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedCategories = categories.map(category => category._id === editCategory ? res.data.category : category);
        setCategories(updatedCategories);
        setEditCategory(null);
        setFormData({ name: "", image: null });
        setOpen(false);
      } else {
        toast.error(res.data.message || "Failed to update category");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || "Something went wrong");
    } finally {
      getAllCategory();
    }
  }

 return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='font-bold ml-3'>All Category</div>
        <div className='px-2 py-1  rounded mt-1 bg-blue-500 text-white'><button onClick={() => setOpen(true)}>+Add New</button></div>
      </div>
      <div>
        <table width="100%" className='border'>
          <thead>
            <tr className='border-b-2 border-gray-300'>
              <th className='border-l'>Action</th>
              <th className='border-l'>image</th>
              <th className='border-l'>Name</th>

            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category._id} className="border-b">
                <td className='flex gap-1 p-4'>
                  <span onClick={() => handleEdit(category)} className='text-sx bg-blue-50 p-1'><Pencil /></span>
                  <span onClick={() => handleDelete(category)} className='text-sx bg-blue-50 p-1'><Trash /></span>
                </td>
                <td className='border-l p-2'><img className='w-16 h-16 object-cover' src={`${import.meta.env.VITE_BASE_API}/${category.image?.url}`} alt="" /></td>
                <td className='border-l p-2'>{category.name}</td>
                {/* <td className='border-l p-2'>{category.image?.url}</td> */}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h1 className='text-2xl font-bold '>
          {editCategory ? "Edit Category" : "Add New Category"}
        </h1>
        <div className='mt-3 '></div>
        <input type="file"

          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          className='w-full outline-0 border rounded  px-4 py-1 mt-2 ' />
        <label>Enter category name</label>
        <input type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter category name"
          className='w-full outline-0 border rounded  px-4 py-1 mt-2 ' />
        <div className='flex justify-end'>
          <button onClick={editCategory ? handleUpdate : handleSubmit} className='px-3 font-bold text-white bg-blue-400 rounded mt-3 '>
            save
          </button>
        </div>

      </Modal>
    </div>
  )
}

export default Category;