import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    members: [],
}

const participantsSlice = createSlice({
    name: 'participants',
    initialState,
    reducers: {
        addParticipant(state, action) {
            if (action?.payload) {
                const oldMembers = [...state.members];
                oldMembers.push(action.payload);
                const newMembers = new Set(oldMembers);
                const t = Array.from(newMembers);
                state.members = t.length > 0 ? t : [];
            }
        },
        addParticipants(state, action) {
            if (action?.payload) {
                console.log(action.payload.filteredList);
                const newList = new Set(action.payload.filteredList);
                const t = Array.from(newList);
                state.members = [...newList];
            }
        },
        updateParticipant(state, action) {
            const oldMembers = [...state.members];
            if (action?.payload?.peerId) {
                for (let member of oldMembers) {
                    if (member.peerId === action.payload.peerId) {
                        if (action.payload.stream) {
                            member.stream = action.payload.stream;
                        }
                        if (action.payload.audioStatus) {
                            member.audioStatus = action.payload.audioStatus;
                        }
                        if (action.payload.videoStatus) {
                            member.videoStatus = action.payload.videoStatus;
                        }

                    }
                }
            }
            state.members = [...oldMembers];
        },
        removeParticipant(state, action) {
            if (action?.payload) {
                const filteredMembers = state.members.filter(member => member.peerId !== action.payload.peerId);
                state.members = filteredMembers;
            }
        }

    }
})


export const participantsActions = participantsSlice.actions;

export default participantsSlice;