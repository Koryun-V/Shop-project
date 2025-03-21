import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import Input from "../mini/Input";
import Button from "../mini/Button";
import Loader from "../common/Loader";
import {
  getUserProfileRequest,
  updateUserProfileRequest,
  setProfile,
  updatePassword,
  setPasswordData,
  setAvatar
} from "../../store/actions/users";
import Error from "./Error";
import {ReactComponent as User} from "../../assets/icon/user-solid.svg";
import _ from "lodash";
import {ReactComponent as Pen} from "../../assets/icon/pen-solid.svg";
import Modal from "../common/Modal";
import DatePiker from "../common/DatePiker";
import RadioButton from "../mini/RadioButton";



const fields = [
  {name: 'firstName', label: 'First Name', type: 'text'},
  {name: 'lastName', label: 'Last Name', type: 'text'},
  {name: 'address', label: 'Address', type: 'text'}
];

const passwordFields = [
  {name: 'newPassword', label: 'New Password', type: 'password'},
  {name: 'confirmPassword', label: 'Confirm Password', type: 'password'},
];

const genderOptions = [
  {value: 'Male', label: 'Male'},
  {value: 'Female', label: 'Female'},
];

const Users = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.users.profile);
  const user = useSelector((state) => state.users.user);
  const error = useSelector((state) => state.users.error);
  const passwordError = useSelector((state) => state.users.passwordError);

  const successMessage = useSelector((state) => state.users.successMessage);
  const validationErrors = useSelector((state) => state.users.validationErrors);
  const passwordData = useSelector((state) => state.users.passwordData);
  const avatar = useSelector((state) => state.users.avatar);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isChangePassword, setIsChangePassword] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getUserProfileRequest());

      setLoading(false);

    })();
  }, []);


  // Avatar
  const uploadFile = async ({target}) => {
    const [file] = target.files;

    if (file) {
      if (file.size > 1024 * 1024 * 1024) {
        console.log("Image size should be less than 1MB")
      } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        console.log('Invalid image type. Only JPEG, PNG, and GIF are allowed.')
      } else {
        file._preview = URL.createObjectURL(file);

        dispatch(setAvatar(file));
      }
    }
  };

  // Update profile data
  const changeProfileData = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(updateUserProfileRequest(profile));
    setIsSubmitting(false);
  };

  // Confirm Avatar Upload
  const confirmAvatar = () => {
    dispatch(setProfile({...profile, avatar}));

    dispatch(setAvatar({_preview: null}));
  };

  const cancelAvatar = () => {
    dispatch(setAvatar({_preview: null}));
  };

  const onChangeInputValue = ({target}, type) => {
    const {name, value} = target;
    const updatedValue = type === 'date' ? moment(value).format('YYYY-MM-DD') : value;
    dispatch(setProfile({...profile, [name]: updatedValue}));
  };


  const onPasswordChange = ({target}) => {
    const {name, value} = target;
    dispatch(setPasswordData({...passwordData, [name]: value}));
  };

  //password update
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsChangePassword(true);
    await dispatch(updatePassword({
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword,
    }));
    setIsChangePassword(false);

  };

  const selectedDate = (profile.dateOfBirth && profile.dateOfBirth !== "Invalid date") ? new Date(profile.dateOfBirth) : user.dateOfBirth;

  const handleClose = () => {
    dispatch(setAvatar({_preview: null}));
  };

  const avatarPreview = avatar?._preview;

  return (
    <div className="user__profile">

      <h1 className="user__profile__title">Personal account</h1>
      {loading  ? <Loader/>
        :
        <div className="user__profile__container">
          <div className="user__profile__content">
            <div style={{position: "relative", zIndex: 5,}}>
              {user.avatar?.[0]?.path
                ? <img src={profile?.avatar?._preview || user.avatar[0].path} alt="user-name"
                       className="user__profile_img"/>
                :
                <div className="user__profile_img">
                  <User/>
              </div>
              }

              {/*<label htmlFor="upload_file" className="upload_file">*/}
              <label htmlFor="upload_file" className="active-button upload_file">
                {user.avatar?.[0]?.path
                  ? <Pen/>
                  : <>+</>
                }
              </label>
            </div>

            <p className="user__profile__desc">Personal information</p>
          </div>

          <input
            type="file"
            id="upload_file"
            accept=".jpg, .png"
            style={{display: 'none'}}
            onChange={uploadFile}
          />


          <Modal
            className="big"
            onClose={handleClose}
            isOpen={Boolean(avatarPreview)}
          >
            <div className="preview__block">
              <img
                src={avatarPreview || avatar?.url}
                alt="Avatar Preview"
                className="preview__img"
              />
            </div>

            <div className="modal-actions">
              <Button
                onClick={confirmAvatar}
                className="active-button confirm"
              >
                Confirm
              </Button>
              <Button
                onClick={cancelAvatar}
                className="cancel-btn"
              >Cancel</Button>
            </div>
          </Modal>

          {error && <Error/>}

          <form onSubmit={changeProfileData}>
            <div className="user__profile_wrapper">
              <div className="user__profile__data">
                {fields.map((field) => (

                  <div className="field-profile" key={field.name}>
                    <div className="field-block ">
                      <div style={{height: 50}}>
                        <Input
                          label={field.label}
                          name={field.name}
                          value={profile[field.name]}
                          onChange={(e) => onChangeInputValue(e, field.type)}
                          type={field.type}
                          className="input"
                          classNameLabel={profile[field.name] ? 'active' : 'label'}
                        />
                      </div>
                      {validationErrors?.[field.name] && (
                        <div className="validation-info user">
                         <span>{validationErrors[field.name]}</span> </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Date of Birth */}

              <div className="user__profile__wrapper">
                {/*<div className="user__profile__data">*/}
                <div className="user__profile__label">
                  <label className="user__label date">Date of Birth</label>

                  <div className="user__profile__data">
                    <DatePiker
                      selected={selectedDate}
                      placeholderText="Date of Birth"
                      onChange={(date) => onChangeInputValue({
                        target: {
                          name: 'dateOfBirth',
                          value: date
                        }
                      }, 'date')}
                      showYearDropdown
                      showMonthDropdown
                      minDate={new Date('09-10-1940')}
                      maxDate={new Date('09-10-2010')}
                    />
                  </div>
                </div>

                <div className="user__profile__label">
                  <label className="user__label">E-mail</label>
                  <div className="field-profile">
                    <p>{user.email}</p>
                  </div>
                </div>

                {/* Gender */}
                  <div className="user__profile__gender">
                    {genderOptions.map((option) => (
                      <RadioButton
                        key={option.value}
                        name="gender"
                        value={option.value}
                        checked={profile.gender === option.value}
                        onChange={onChangeInputValue}
                        label={option.label}
                      />
                    ))}
                  </div>

              </div>
            </div>

            {successMessage && <p className="successMessage">{successMessage}</p>}

            <div className="user__profile__button">
              <Button
                type="submit"
                disabled={isSubmitting || !_.isEmpty(validationErrors)}
                loading={isSubmitting}
                className="active-button"
              >
                Change Profile
              </Button>
            </div>
          </form>

          {/* Change Password Form */}
          <div>
            <p className="user__profile__desc">Change Password</p>
            <form onSubmit={handlePasswordChange}>
              <div className="user__profile__content">
                {passwordFields.map((field) => (
                  <div className="field-block" key={field.name}>
                    <div style={{height: 50}}>
                      <Input
                        name={field.name}
                        value={passwordData[field.name]}
                        onChange={onPasswordChange}
                        type={field.type}
                        className="input"
                        classNameLabel={passwordData[field.name] ? 'active' : 'label'}
                      />
                    </div>
                  </div>
                ))}

              </div>

              {passwordError?.password && (
                <div className="validation-info user">
                  <span> {passwordError.password}</span>
                 </div>
              )}

              <div className="user__profile__button">
                <Button
                  type="submit"
                  disabled={isChangePassword || !_.isEmpty(passwordError)}
                  loading={isChangePassword}
                  className="active-button"
                >
                  Change Password
                </Button>
              </div>
            </form>
          </div>

        </div>
      }

    </div>
  );
};

export default Users;
