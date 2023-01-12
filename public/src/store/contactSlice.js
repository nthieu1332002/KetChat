import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userAPI from '../config/api/user/userAPI';

const { getAllUserAPI } = userAPI;

const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        status: 'idle'
    },
    reducers: {
        updateLastMessageContact: (state, action) => {
            const index = state.contacts.findIndex(contact => contact.user._id === action.payload.users[0] || contact.user._id === action.payload.users[1])
            state.contacts[index].msgInfo = action.payload
        },
        seenMessage: (state, action) => {
            const index = state.contacts.findIndex(contact => contact.user._id === action.payload)
            state.contacts[index].msgInfo.status = 'seen'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.contacts = action.payload.user
            })
    }
})


export const getAllUser = createAsyncThunk(
    "contacts/getAllUser", async (data) => {
        const res = await getAllUserAPI(data);
        return res;
    }
);

export const { updateLastMessageContact, seenMessage } = contactSlice.actions;
export default contactSlice;