import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import messageAPI from '../config/api/chat/messageAPI';
const { getMessageAPI, addMessageAPI, addImageAPI, getImageAPI } = messageAPI;

const messengerSlice = createSlice({
  name: 'messenger',
  initialState: {
    messages: [],
    imgList: [],
    msgStatus: 'idle',
    status: 'idle',
    imgStatus: 'idle',
    imgAmount: 0,

  },
  reducers: {
    getArrivalMessage: (state, action) => {
      state.messages.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.status = 'success';
        state.messages = action.payload
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.msgStatus = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.msgStatus = 'success';
        state.messages.push(action.payload)
      })
      .addCase(sendImage.pending, (state) => {
        state.msgStatus = 'loading';
      })
      .addCase(sendImage.fulfilled, (state, action) => {
        state.msgStatus = 'success';
        state.messages.push(action.payload)
      })
      .addCase(getImage.pending, (state) => {
        state.imgStatus = 'loading';
      })
      .addCase(getImage.fulfilled, (state, action) => {
        state.imgList = action.payload.messages;
        state.imgAmount = action.payload.imgAmount;
        state.imgStatus = 'success';
      })
  }

})

export const getMessages = createAsyncThunk(
  "messenger/getMessages", async (data) => {
    const res = await getMessageAPI(data);
    return res;
  }
);

export const sendMessage = createAsyncThunk(
  "messenger/sendMessage", async (data) => {
    const res = await addMessageAPI(data)
    return res;
  }
);

export const sendImage = createAsyncThunk(
  "messenger/sendImage", async (data) => {
    const res = await addImageAPI(data)
    return res;
  }
);

export const getImage = createAsyncThunk(
  "messenger/getImage", async (data) => {
    const res = await getImageAPI(data)
    return res;
  }
);


export const { getArrivalMessage } = messengerSlice.actions;
export default messengerSlice;