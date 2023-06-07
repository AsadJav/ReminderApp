import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

export const ReminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    addReminder: (state, action) => {
      console.log(action, state);
      state.unshift(action.payload);
    },
    updateReminder: (state, action) => {
      const updateData = action.payload;
      const indexNo = updateData.indexNo;
      state[indexNo] = updateData;
    },
    deleteReminder: (state, action) => {
      const id = action.payload;
      const indexNo = state.findIndex(item => item.id === id);
      state.splice(indexNo, 1);
    },
  },
});
export const {addReminder, updateReminder, deleteReminder} =
  ReminderSlice.actions;

export default ReminderSlice.reducer;
