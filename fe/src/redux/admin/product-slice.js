import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  isLoading: false,
  productList: [],
};
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
   async (formData) => {
    const res = await axios.post('http://localhost:8080/api/admin/products/add',formData,{
        headers:{
            'Conten-Type' : 'application/json',
        }

    }
       
    )
    return res?.data
   }
);
export const getAllProduct = createAsyncThunk(
    "/products/getAllProduct",
     async () => {
      const res = await axios.get('http://localhost:8080/api/admin/products/get'
          )
      return res?.data
     }
  );
  export const editProduct = createAsyncThunk(
    "/products/editProduct",
     async ({id,formData}) => {
      const res = await axios.put(`http://localhost:8080/api/admin/products/edit/${id}`,formData,{
          headers:{
              'Conten-Type' : 'application/json',
          }
  
      }
         
      )
      return res?.data
     }
  );
  export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
     async ({id}) => {
      const res = await axios.delete(`http://localhost:8080/api/admin/products/delete/${id}`
          )
      return res?.data
     }
  );
  const AdminProductSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllProduct.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload;
        })
        .addCase(getAllProduct.rejected, (state, action) => {
          console.error(action.payload);
          state.isLoading = false;
          state.productList = [];
        });
    },
  });
export default AdminProductSlice;
