import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login'

export default configureStore({
  reducer: {
    login: loginReducer
  }
})