import axios from "axios";
import {getPopularProducts} from "../store/actions/home";


const api = axios.create({
    baseURL: "https://world-of-construction.onrender.com"
})
const token = localStorage.getItem("token");



export default class Api {
    static getPopularProducts(params) {
        return api.get(`/products/popular`, {params})
    }
    static getSharesProducts(params) {
        return api.get(`/products/discounts`, {params})
    }
    static loginUser({email, password}) {
        return api.post(`/users/login`, {email, password});
    }

    static forgotPasswordUser({email}) {
        return api.post(`/users/forgot/password`, {email});
    }

    static registrationUser({firstName, lastName, gender, dateOfBirth, email, password}) {
        return api.post(`/users/registration`,
            {
                firstName,
                lastName,
                gender,
                dateOfBirth,
                email,
                password
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
    }

    static activateUser({key}) {
        return api.post(`/users/activate`, {key});
    }

    static resendActivateUser({email}) {
        return api.post(`/users/resend-activation-key`, {email});
    }

    static getUser() {
        return api.get(`/users/profile`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }


}
