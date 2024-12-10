import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import RadioButton from "../common/RadioButton";
import DatePiker from "../common/DatePiker";
import Input from "../mini/Input";
import Button from "../mini/Button";
import {Link} from "react-router-dom";
import Loader from "../common/Loader";
import {getUserProfileRequest, updateUserProfileRequest, setProfile} from "../../store/actions/users";
import Error from "./Error";

const fields = [
    {name: 'firstName', label: 'First Name', type: 'text'},
    {name: 'lastName', label: 'Last Name', type: 'text'},
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


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch user profile data
    useEffect(() => {
        (async () => {

            setLoading(true);

            await dispatch(getUserProfileRequest());

            setLoading(false);
        })();
    }, []);


    const onChange = (e, type) => {
        const {name, value} = e.target;

        const updatedValue = type === 'date' ? moment(value).format('YYYY-MM-DD') : value;

        dispatch(setProfile({...profile, [name]: updatedValue}));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        await dispatch(updateUserProfileRequest(profile));

        setIsSubmitting(false);
    };


    return (
        <div className="section">
            <div className="container">
                <div className="container-user">
                    {error ? <Error/>

                        : loading ? (
                            <Loader/>
                        ) : (
                            <>
                                <h1>Personal Data</h1>
                                <form onSubmit={handleSubmit}>
                                    {fields.map((field) => (
                                        <div className="field-block" key={field.id}>
                                            <div key={field.name} style={{
                                                height: 50,
                                            }}>
                                                <Input
                                                    label={field.label}
                                                    name={field.name}
                                                    value={profile[field.name]}
                                                    onChange={onChange}
                                                    type={field.type}
                                                    className="input"
                                                />
                                            </div>
                                        </div>
                                    ))}

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
                                        />
                                    </div>

                                    <div className="gender-radio-group">
                                        {genderOptions.map((option) => (
                                            <RadioButton
                                                key={option.value}
                                                name="gender"
                                                value={option.value}
                                                checked={profile.gender === option.value}
                                                onChange={onChange}
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
            </div>
        </div>
    );
};

export default Users;

