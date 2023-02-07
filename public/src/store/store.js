import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import messengerSlice from "./messengerSlice";
import contactSlice from "./contactSlice.js";
import userSlice from "./userSlice.js";

const store = configureStore({
    reducer: {
        messenger: messengerSlice.reducer,
        contacts: contactSlice.reducer,
        user: userSlice.reducer
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        })
    ],
})
export default store;