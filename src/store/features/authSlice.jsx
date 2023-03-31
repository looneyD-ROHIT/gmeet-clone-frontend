import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: '',
    accessToken: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeAuthData(state, action) {
            if (action?.payload?.id) {
                console.log('changing id: '+ action.payload.id);
                state.id = action.payload.id
            }
            if (action?.payload?.accessToken) {
                console.log('changing accessToken: '+ action.payload.accessToken);
                state.accessToken = action.payload.accessToken
            }
        }
    }
})


export const authActions = authSlice.actions;

export default authSlice;