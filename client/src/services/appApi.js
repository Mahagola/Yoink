import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const appApi = createApi({
    reducerPath:'appApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000'
    }),
    endpoints : (builder)=>({
        SignUpUser: builder.mutation({
            query : (user)=>({
                url : "/users",
                method : "POST",
                body : user,
            })
        }),

        //SignIn
        SignInUser: builder.mutation({
            query:(user)=>({
                url : "/users/signin",
                method:"POST",
                body:user,
            }),
        }),
        
        //SignOut
        SignOutUser : builder.mutation({
            query: (payload)=>({
                url : "/signout",
                method : "DELETE",
                body : payload,
            }),
        })

    })
})

export const {useSignUpUserMutation, useSignInUserMutation, useSignOutUserMutation}=appApi;

export default appApi;