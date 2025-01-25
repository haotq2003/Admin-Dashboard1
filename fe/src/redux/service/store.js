import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slice/AuthSlice'
import AdminProductSlice from '../admin/product-slice';
export const store = configureStore({
  reducer: {
    auth : authReducer,
    adminProduucts : AdminProductSlice,
  },
})

export default store;