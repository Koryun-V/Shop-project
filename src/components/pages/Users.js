import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import RadioButton from "../common/RadioButton";
import DatePiker from "../common/DatePiker";
import Input from "../mini/Input";
import Button from "../mini/Button";
import {Link} from "react-router-dom";
import Loader from "../common/Loader";
import {getUserProfileRequest, updateUserProfileRequest, setProfile, updatePassword} from "../../store/actions/users";
import Error from "./Error";
import _ from "lodash";

const fields = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        validation: /^[a-zA-Z]{2,20}$/,
        info: "Use only Latin characters, no space, symbols, or numbers.",
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        validation: /^[a-zA-Z]{2,20}$/,
        info: "Use only Latin characters, no space, symbols, or numbers.",
    },
];

const passwordFields = [
    {name: 'currentPassword', label: 'Current Password', type: 'password'},
    {name: 'newPassword', label: 'New Password', type: 'password'},
    {name: 'confirmPassword', label: 'Confirm Password', type: 'password'},
];

const genderOptions = [
    {value: 'Male', label: 'Male'},
    {value: 'Female', label: 'Female'},
];

const Users = () => {
    const dispatch = useDispatch();

    // const [inputName, setInputName] = useState([]);
    // const [isRegister, setIsRegister] = useState(false)


    const profile = useSelector((state) => state.users.profile);
    const user = useSelector((state) => state.users.user);
    const error = useSelector((state) => state.users.error);
    const passwordError = useSelector((state) => state.users.passwordError);
    const successMessage = useSelector((state) => state.users.successMessage);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Fetch user profile data
    useEffect(() => {
        setLoading(true);
        dispatch(getUserProfileRequest());
        setLoading(false);
    }, []);

    const onChange = (e, type) => {
        const {name, value} = e.target;
        const updatedValue = type === 'date' ? moment(value).format('YYYY-MM-DD') : value;
        dispatch(setProfile({...profile, [name]: updatedValue}));
    };


    // const test = () => {
    //     fields.forEach(({validation, name, id}) => {
    //         if (title === name) {
    //             let test = name !== "repeatPassword" ? validation.test(value) : null
    //             if (test === false || !value.length || title === "repeatPassword" && user["password"] !== user["repeatPassword"]) {
    //                 setInputName((prevState) => (_.uniq([...prevState, title])))
    //             } else {
    //                 const filter = inputName.filter(item => item !== title)
    //                 setInputName(filter)
    //             }
    //         }
    //     })
    // }


    const handleSubmit = async (e) => {

        //if ete isRegister
        e.preventDefault();
        setIsSubmitting(true);
        await dispatch(updateUserProfileRequest(profile));
        setIsSubmitting(false);
    };

    const onPasswordChange = (e) => {
        const {name, value} = e.target;
        setPasswordData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        dispatch(updatePassword({
            newPassword: passwordData.newPassword,
            confirmPassword: passwordData.confirmPassword
        }));
    };

    return (

        <div className="section">

            <div className="container">

                <div className="container-user">
                    {error ? <Error/> : loading ? (
                        <Loader/>
                    ) : (
                        <>
                        <div>
                            <h1>Personal Data</h1>
                            <form onSubmit={handleSubmit}>
                                { fields.length ? fields.map((field) => (
                                    <div className="field-block" key={field.id}>
                                        <div key={field.name} style={{
                                            height: 50,
                                        }}>
                                            <Input
                                                name={field.name}
                                                value={profile[field.name]}
                                                onChange={onChange}
                                                type={field.type}
                                                className="input"
                                                label={field.label}
                                                classNameLabel={profile[field.name].length ? "active" : "label"}
                                            />
                                        </div>

                                        {/*stugum*/}
                                        <div className="validation-info">
                                            {/*{inputName.map(((item, index) => (*/}
                                            {/*    item === field.name ?*/}
                                            {/*        <>*/}
                                            {/*            <div className="test2"></div>*/}
                                            {/*            <span>{!user[item].length ? "Field Required" : field.info}</span>*/}
                                            {/*        </> : null)))}*/}
                                        </div>
                                    </div>
                                )) : null}

                                <div>
                                    <label>Date of Birth:</label>
                                    <DatePiker
                                        selected={profile.dateOfBirth ? new Date(profile.dateOfBirth) : null}
                                        onChange={(date) => onChange({
                                            target: {
                                                name: 'dateOfBirth',
                                                value: date
                                            }
                                        }, 'date')}
                                        showYearDropdown
                                        showMonthDropdown
                                        minDate={new Date("09-10-1950")}
                                        className="input"

                                    />
                                </div>

                                <div className="gender-radio-group">
                                    {genderOptions.length ? genderOptions.map((option) => (
                                        <RadioButton
                                            key={option.value}
                                            name="gender"
                                            value={option.value}
                                            checked={profile.gender === option.value}
                                            onChange={onChange}
                                            label={option.label}
                                        />
                                    )) : null}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    loading={isSubmitting}
                                >
                                    Update Profile
                                </Button>

                                {user.role === "admin" && (
                                    <Link to={"/admin"}>Admin</Link>
                                )}


                            </form>
                        </div>


                            {/*Change Password Form*/}

                            <div>
                                <h2>Change Password</h2>
                                <form onSubmit={handlePasswordChange}>

                                    {passwordFields.length ? passwordFields.map((field) => (
                                        <div className="field-block" key={field.id}>
                                            <div key={field.name} style={{
                                                height: 50,
                                            }}>
                                                <Input
                                                    label={field.label}
                                                    name={field.name}
                                                    value={passwordData[field.name]}
                                                    onChange={onPasswordChange}
                                                    type={field.type}
                                                    className="input"
                                                />
                                            </div>
                                            {/*stugum*/}
                                            <div className="validation-info">
                                                {/*{inputName.map(((item, index) => (*/}
                                                {/*    item === field.name ?*/}
                                                {/*        <>*/}
                                                {/*            <div className="test2"></div>*/}
                                                {/*            <span>{!user[item].length ? "Field Required" : field.info}</span>*/}
                                                {/*        </> : null)))}*/}
                                            </div>
                                        </div>

                                    )) : null}

                                    {!_.isEmpty(passwordError) &&
                                        <p style={{color: 'red'}}>{passwordError.password}</p>}
                                    {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
                                    <Button type="submit" disabled={isSubmitting}
                                            loading={isSubmitting}>
                                        Change Password
                                    </Button>

                                </form>
                            </div>


                        </>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Users;

