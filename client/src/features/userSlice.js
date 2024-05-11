import {createSlice} from '@reduxjs/toolkit';
import appApi from '../services/appApi';

export const userSlice = createSlice({
    name : 'user',
    initialState : null,
    reducers : {
        addNotifications : (state, {payload})=>{},
        resetNotifications : (state, {payload})=>{},
    },

    extraReducers : (builder)=>{
        builder.addMatcher(appApi.endpoints.SignUpUser.matchFulfilled,(state,{payload})=>payload);
        builder.addMatcher(appApi.endpoints.SignInUser.matchFulfilled,(state,{payload})=>payload);
        builder.addMatcher(appApi.endpoints.SignOutUser.matchFulfilled,()=>null);
        
    }

})


export const {addNotifications,resetNotifications} =  userSlice.actions;
export default userSlice.reducer;