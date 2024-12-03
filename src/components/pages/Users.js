import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import RadioButton from "../common/RadioButton";
import DatePiker from "../common/DatePiker";
import Input from "../mini/Input";
import Button from "../mini/Button";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import {getUserProfileRequest, updateUserProfileRequest, setProfile} from "../../store/actions/users";

const fields = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

const Users = () => {
  const dispatch = useDispatch();
  const { profile, user, error,  } = useSelector((state) => state.users);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch user profile data

  useEffect(() => {
    (async (e) => {

      setLoading(true);

      await dispatch(getUserProfileRequest());;

      setLoading(false);
    })();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    dispatch(setProfile({ ...profile, [name]: value }));
  };

  const onGenderChange = ({ target }) => {
    const { value } = target;
    dispatch(setProfile({ ...profile, gender: value }));
  };

  const onDateChange = (date) => {
    if (date) {
      dispatch(setProfile({ ...profile, dateOfBirth: moment(date).format("YYYY-MM-DD") }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await dispatch(updateUserProfileRequest(profile));

    setIsSubmitting(false);
  };


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-profile-update">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Personal Data</h1>
          <form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div key={field.name} className="user-profile-block">
                <Input
                  label={field.label}
                  name={field.name}
                  value={profile[field.name]}
                  onChange={handleChange}
                  type={field.type}
                />
              </div>
            ))}

            <div>
              <label>Date of Birth:</label>
              <DatePiker
                selected={profile.dateOfBirth ? new Date(profile.dateOfBirth) : null}
                onChange={onDateChange}
                showYearDropdown
                showMonthDropdown
                minDate={new Date("09-10-1950")}
              />
            </div>

            <div className="gender-radio-group">
              {genderOptions.map((option) => (
                <RadioButton
                  key={option.value}
                  name="gender"
                  value={option.value}
                  checked={profile.gender === option.value}
                  onChange={onGenderChange}
                  label={option.label}
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Update Profile
            </Button>

            {user.role === "admin" && (
              <Link to={"/admin"}>
                Admin
              </Link>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default Users;

