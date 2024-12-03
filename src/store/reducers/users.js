import {createReducer} from '@reduxjs/toolkit';
import {
  getUserProfileRequest,
  setProfile,
  updateUserProfileRequest,
} from '../actions/users';

const initialState = {
  profile: {},
  error: null,
  profileUpdated: {},
  user: {}
};


export const userSlice = createReducer(initialState, (builder) => {
  builder
    .addCase(getUserProfileRequest.pending, (state) => {
      state.error = null;
    })
    .addCase(getUserProfileRequest.fulfilled, (state, {payload}) => {
      const {firstName, lastName, gender, dateOfBirth} = payload
      state.profile = {
        firstName,
        lastName,
        gender,
        dateOfBirth,
      };
      state.user = payload
    })
    .addCase(getUserProfileRequest.rejected, (state) => {
      state.error = 'Error fetching user profile data';
    })

    .addCase(updateUserProfileRequest.fulfilled, (state, {payload}) => {
      state.profileUpdated = payload;
    })
    .addCase(updateUserProfileRequest.rejected, (state, {payload}) => {
      state.error = 'Error updating profile';
    })
    .addCase(setProfile, (state, {payload}) => {
      state.profile = {...state.profile, ...payload};
    })
});
