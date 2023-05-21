import { configureStore } from "@reduxjs/toolkit";


import authSlice from "./features/authSlice";
import streamSlice from "./features/streamSlice";
import participantsSlice from "./features/participantsSlice";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        stream: streamSlice.reducer,
        participants: participantsSlice.reducer,

    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export default store;