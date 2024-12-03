import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../utills/Api";
import { toast } from 'react-toastify';


// get user profile
export const getUserProfileRequest = createAsyncThunk(
  'profile/fetchUserProfile',
  async () => {
    const {data} = await Api.getProfile();
     const {user} = data;
     return user
  }
);

export const updateUserProfileRequest = createAsyncThunk(
  'profile/updateUserProfile',
  async (payload, {rejectWithValue }) => {
    try {
      const response = await Api.updateUser({ data: payload });
      toast.success(`${response.data.message}!`);
      return response.data;
    } catch (error) {
      toast.error("Error updating profile");
      return rejectWithValue(error.response.data );
    }
  }
);

export const setProfile = createAction('profile/setProfile');


