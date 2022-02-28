import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = localStorage.getItem('reactuserinfo') ? JSON.parse(localStorage.getItem('reactuserinfo')) : {
  isLogin: false,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginChanged (state, action) {
      console.log('loginChanged state: ', JSON.stringify(state));
      console.log('action: ', action);
      switch (action.payload.type) {
        case 'in':
          state = Object.assign({
            isLogin: true
          }, action.payload.info);
          if (action.payload.info.remember) {
            localStorage.setItem('reactuserinfo', JSON.stringify(state))
          }
          return state;
        case 'out':
          if (localStorage.getItem('reactuserinfo')) {
            localStorage.removeItem('reactuserinfo')
          }
          state = {
            isLogin: false,
          }
          return state;
        default:
          return state;
      }
    },
  }
})

export const {
  loginChanged,
  selectUserInfo
} = loginSlice.actions

export default loginSlice.reducer