import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    stream: null,
    preferences: {
        audio: false,
        video: true,
    }
}

const streamSlice = createSlice({
    name: 'stream',
    initialState,
    reducers: {
        changeStreamData(state, action) {
            if (action?.payload?.stream) {
                // console.log(JSON.stringify(action.payload.stream));
                state.stream = action.payload.stream;
            }
        },
        toggleAudioPreferences(state, action) {
            state.preferences.audio = !state.preferences.audio;
        },
        toggleVideoPreferences(state, action) {
            state.preferences.video = !state.preferences.video;
        }
    }
})


export const streamActions = streamSlice.actions;

export default streamSlice;