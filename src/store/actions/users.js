import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../utills/Api";
import { toast } from 'react-toastify';
import Utils from "../../components/helpers/Utils";
import _ from "lodash";

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


export const updatePassword = createAsyncThunk(
  'password/updatePassword',
  async (payload, { rejectWithValue }) => {
    const validationErrors = Utils.isValidatePassword(payload.newPassword, payload.confirmPassword);

    if (!_.isEmpty(validationErrors)) {
      return rejectWithValue(validationErrors);
    }

    try {
      await Api.updateUserPassword({
        newPassword: payload.newPassword
      });
      toast.success('Password updated successfully!');
      return { message: 'Password updated successfully!' };
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to update password. Please try again.');
    }
  }
);

export const setProfile = createAction('profile/setProfile');


