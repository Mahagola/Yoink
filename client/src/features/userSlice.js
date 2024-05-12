import {createSlice} from '@reduxjs/toolkit';
import appApi from '../services/appApi';

export const userSlice = createSlice({
    name : 'user',
    initialState : null,
    reducers : {
        addNotifications : (state, {payload})=>{
            if(state.newMessages[payload]){
                state.newMessages[payload]++;
            }
            else state.newMessages[payload]=1;
        },
        resetNotifications : (state, {payload})=>{
            delete state.newMessages[payload];
        },
    },

    extraReducers : (builder)=>{
        builder.addMatcher(appApi.endpoints.SignUpUser.matchFulfilled,(state,{payload})=>payload);
        builder.addMatcher(appApi.endpoints.SignInUser.matchFulfilled,(state,{payload})=>payload);
        builder.addMatcher(appApi.endpoints.SignOutUser.matchFulfilled,()=>null);
        
    }

})


export const {addNotifications,resetNotifications} =  userSlice.actions;
export default userSlice.reducer;