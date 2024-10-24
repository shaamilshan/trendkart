import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import { Layout } from 'antd'
import toast from 'react-hot-toast'
import axios from 'axios'

const Products = () => {
    const [product,setProducts] = useState([])

    const getAllProducts = async () =>{
        try{
            const {data} = await axios.get('/api/v1/product/get-product')
            setProducts(data.products)
        }catch(error){
            console.log(error)
            toast.error('Something Went wrong')
        }
    }
    useEffect(()=>{
        getAllProducts()
    },[])
  return (
    <Layout>
    <div>
      <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
            <h1 className='text-center'>All Product List</h1>
        </div>
      </div>
    </div>
    </Layout> 
  )
}

export default Products
