import { apiSlice } from "./apiSlice";
import {USERS_URL} from '../constants.js'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    login : builder.mutation({
      query : (data) => ({
        url : `${USERS_URL}/auth`,
        method : "POST",
        body : data,
        
      })
    })
  })
})