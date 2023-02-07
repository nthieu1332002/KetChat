import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userAPI from '../config/api/user/userAPI';

const { updateAvatar } = userAPI;

const userSlice = createSlice({
    name: 'user',
    initialState: {
        avatar: [],
        status: 'idle'
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(changeAvatar.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(changeAvatar.fulfilled, (state, action) => {
            state.status = 'success';
            state.avatar = action.payload;
        })
            
    }
})


export const changeAvatar = createAsyncThunk(
    "user/changeAvatar", async (data) => {
        const res = await updateAvatar(data)
        .then((res) => {
            if (res.status === true) {
                return res.user;
            }
        })
        .catch((err) => {
            console.log(err);
        })
        return res;
    }
);

export default userSlice;