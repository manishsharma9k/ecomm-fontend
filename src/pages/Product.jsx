import axios from 'axios';
import React, { useState } from 'react'
import Modal from '../components/Modal';
import { Pencil, Trash } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Product = () => {
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    mrp: "",
    stock: "",
    category: "",
    image: null
  })
  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_API}/api/product/all`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      console.log(res);

      if ((res.data.success)) {
        setProducts(res.data.products)
      }



    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllProduct();
  }, [])

  const handleSubmit = async () => {
    try {
      const sendformData = new FormData();
      sendformData.append("name", formData.name);
      sendformData.append("price", formData.price);
      sendformData.append("description", formData.description);
      sendformData.append("mrp", formData.mrp);
      sendformData.append("stock", formData.stock);
      sendformData.append("category", formData.category);
      sendformData.append("image", formData.image);
      const res = await axios.post(`${import.meta.env.VITE_BASE_API}/api/product/create`, sendformData, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      console.log(res);
      
      if (res.data.success) {
        toast.success(res.data.message)
        setProducts([...products, res.data.product])
        setOpen(false)
        setFormData({
          name: "",
          price: "",
          description: "",
          mrp: "",
          stock: "",
          category: "",
          image: null
        })
      }
    } catch (error) {
      toast.error("Failed to create product")
      console.log(error)
    }
  }

  const handleEdit = (product) => {
    setEditProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description, 
        mrp: product.mrp,
        stock: product.stock,
        category: product.category,
        image: null
      });
    setOpen(true)
  }


  const handleDelete = async (productId) => {
    
    const confirmDelete = window.confirm("Are you sure you want to delete this product?")
    if (!confirmDelete) {
      toast.error("Product deletion cancelled")
      return
    }
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_API}/api/product/delete/${productId}`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      if (res.data.success) {
        toast.success(res.data.message)
        setProducts(products.filter((product) => product._id !== productId))
      }
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='font-bold'>All Products</div>
        <div className='px-2 py-1 ' ><button onClick={() => setOpen(true)}>+Add New</button></div>
      </div>
      <div>
        <table width="100%" className='border'>
          <thead>
            <tr className='border-b-2 border-gray-300'>
              <th className='border-l'>Action</th>
              <th className='border-l'>Image</th>
              <th className='border-l'>Name</th>
              <th className='border-l'>Price</th>
              <th className='border-l'>Description</th>
              <th className='border-l'>MRP</th>
              <th className='border-l'>Stock</th>
              <th className='border-l'>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className='flex gap-1 p-4'>
                  <span onClick={() => handleEdit(product)} className='text-sx bg-blue-50 p-1'><Pencil /></span>
                  <span onClick={() => handleDelete(product._id)} className='text-sx bg-blue-50 p-1'><Trash /></span>
                </td>
                <td className='border-l p-2'>{product.image?.url ? <img className='w-16 h-16 object-cover' src={`${import.meta.env.VITE_BASE_API}/${product.image?.url}`} alt="" /> : 'No Image'}</td>
                <td className='border-l p-2'>{product.name || 'N/A'}</td>
                <td className='border-l p-2'>${product.price.toFixed(2)}</td>
                <td className='border-l p-2'>{product.description || 'N/A'}</td>
                <td className='border-l p-2'>{product.mrp.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h1 className='text-2xl font-bold '>
          {editProduct ? 'Edit Product' : 'Add New Product'}
        </h1>
        <div className='mt-3 '></div>
        <label>Product Name</label>
        <input type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder='enter product name'
          className='w-full outline-0 border rounded  px-4 py-1 mt-2 ' />
        <label>Select file</label>
        <input type="file"
          // value={formData.file}
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          placeholder='choose file'
          className='w-full outline-0 border rounded  px-4 py-1 mt-2 ' />
        <label>enter product description</label>
        <input type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder='enter product description'
          className='w-full outline-0 border rounded  px-4 py-1 mt-2 ' />
        <label>enter product price</label>
        <input type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
          placeholder='enter product price'
          className='w-full outline-0 border rounded  px-4 py-1 mt-2 ' />
        <label>enter product mrp</label>
        <input type="number"
          value={formData.mrp}
          onChange={(e) => setFormData({ ...formData, mrp: parseFloat(e.target.value) || 0 })}
          placeholder='enter product mrp'
          className='w-full outline-0 border rounded  px-4 py-1 mt-2 ' />
        <label>enter product stock</label>
        <input type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
          placeholder='enter product stock'
          className='w-full outline-0 border rounded  px-4 py-1 mt-2 ' />
        <label>enter product category</label>
        <input type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder='enter product category'
          className='w-full outline-0 border rounded  px-4 py-1 mt-2 ' />
        <div className='flex justify-end'>
          <button onClick={() => formData._id ? handleEdit() : handleSubmit()} className='px-3 font-bold text-white bg-blue-400 rounded mt-3 '>
            {formData._id ? 'Update' : 'Submit'}
          </button>
        </div>

      </Modal>
    </div>
  )

}

export default Product