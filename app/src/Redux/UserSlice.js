import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const data = action.payload;
      console.log('Hello', action.payload);
      state = data;
      console.log(state, 'Hell....');
    },
    deleteUser: (state, action) => {
      const id = action.payload.userID;
      console.log(id, 'Delete', state);
      //state = {};
      delete state[id];
      console.log(id, 'Deleted', state.undefined);
    },
  },
});
export const {addUser, deleteUser} = UserSlice.actions;

export default UserSlice.reducer;
