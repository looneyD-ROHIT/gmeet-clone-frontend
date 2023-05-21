import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    members: [],
}

const participantsSlice = createSlice({
    name: 'participants',
    initialState,
    reducers: {
        addParticipant(state, action){
            if(action?.payload){
                const oldMembers = state.members;
                oldMembers.push(action.payload);
                const newMembers = new Set(oldMembers);
                state.members = Array.from(newMembers);
            }
        },
        addParticipants(state, action){
            if(action?.payload){
                console.log(action.payload.filteredList);
                state.members = action.payload.filteredList;
            }
        },
        updateParticipant(state, action){
            if(action?.payload?.peerId){
                for(let member of state.members){
                    if(member.peerId === action.payload.peerId){
                        member.stream = action.payload.stream;
                    }
                }
            }
        },
        removeParticipant(state, action){
            if(action?.payload){
                const filteredMembers = state.members.filter(member => member.peerId !== action.payload.peerId);
                state.members = filteredMembers;
            }
        }

    }
})


export const participantsActions = participantsSlice.actions;

export default participantsSlice;