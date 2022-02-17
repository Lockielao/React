import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = {
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
          if (action.payload.info.remember) {
            localStorage.setItem('userinfo', JSON.stringify(action.payload.info))
          }
          state = Object.assign({
            isLogin: true
          }, action.payload.info);
          console.log('state: ', state);
          return state;
        case 'out':
          if (localStorage.getItem('userinfo')) {
            localStorage.removeItem('userinfo')
          }
          state = {
            isLogin: false,
          }
          return state;
        default:
          return state;
      }
    },
    selectUserInfo: (state) => {
      console.log('selectUserInfo state: ', state);
      return state
    }
  }
})

export const {
  loginChanged,
  selectUserInfo
} = loginSlice.actions

export default loginSlice.reducer