import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userAPI from '../config/api/user/userAPI';
import Cookies from 'js-cookie'

const { updateAvatar } = userAPI;

const userSlice = createSlice({
    name: 'user',
    initialState: {
        avatar: Cookies.get("avatar"),
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
            state.avatar = action.payload.avatarImage;
        })
            
    }
})


export const changeAvatar = createAsyncThunk(
    "user/changeAvatar", async (data) => {
        const res = await updateAvatar(data)
        .then((res) => {
            console.log("res",res)
            if (res.status === true) {
            Cookies.set("avatar", res.user?.avatarImage, { expires: 1, path: ''})

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